'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from 'react-toastify'
import Image from 'next/image'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function AdminReports() {
  interface Report {
    id: string;
    type: string;
    name: string;
    lastSeen: string;
    description: string;
    photo: string;
    reportedBy: string;
  }

  const [reports, setReports] = useState<Report[]>([])
  const [reportType, setReportType] = useState('person')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [lastSeen, setLastSeen] = useState('')
  const [photo, setPhoto] = useState('')

  // Fetch reports from backend
  useEffect(() => {
    async function fetchReports() {
      try {
        const response = await fetch('/api/reports', { method: 'GET' })
        if (!response.ok) throw new Error('Failed to fetch reports')
        const data = await response.json()
        setReports(data)
      } catch (error) {
        console.error('Error fetching reports:', error)
        toast.error('Error fetching reports')
      }
    }
    fetchReports()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const payload = {
        reportType,
        name: reportType === 'person' ? name : undefined,
        itemName: reportType === 'item' ? name : undefined,
        description,
        lastSeen,
        reportedBy: 'Admin', // Example value
        photo: photo,
      }

      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error('Failed to submit report')

      const newReport = await response.json()
      toast.success('Report Added')
      setReports((prev) => [...prev, newReport.report]) // Update local state
      setName('')
      setDescription('')
      setLastSeen('')
      setPhoto('')
    } catch (error) {
      console.error('Error submitting report:', error)
      toast.error('Error submitting report')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
      <Header isAdmin={true} />
      <main className="container mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-6">Manage Reports</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Add New Report</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Report Type</Label>
              <RadioGroup defaultValue="person" onValueChange={setReportType} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="person" id="person" />
                  <Label htmlFor="person">Person</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="item" id="item" />
                  <Label htmlFor="item">Item</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="name">{reportType === 'person' ? 'Name' : 'Item Name'}</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastSeen">Last Seen Location</Label>
              <Input
                id="lastSeen"
                value={lastSeen}
                onChange={(e) => setLastSeen(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="photo">Photo</Label>
              <Input
                type='file'
                id="photo"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Add Report</Button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Existing Reports</h2>
          <Table>
            <TableCaption>A list of all reported missing persons and items.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Last Seen</TableHead>
                <TableHead>Reported By</TableHead>
                <TableHead>Photo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>{report.type === 'Item'? report.name: report.name}</TableCell>
                  <TableCell>{report.description}</TableCell>
                  <TableCell>{report.lastSeen}</TableCell>
                  <TableCell>
                    {report.reportedBy}
                  </TableCell>
                  <TableCell>
                    <Image src={report.photo} width={100} height={100} alt={`Photo of ${report.name}`} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  )
}
