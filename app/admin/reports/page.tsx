'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from 'react-toastify'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Mock data for reports
const mockReports = [
  { id: 1, type: 'Person', name: 'John Doe', description: 'Male, 30 years old, wearing red shirt', lastSeen: 'Near main entrance', status: 'Open' },
  { id: 2, type: 'Item', name: 'Blue Backpack', description: 'Contains important documents', lastSeen: 'Food court area', status: 'Found' },
  { id: 3, type: 'Person', name: 'Jane Smith', description: 'Female, 25 years old, wearing blue jeans and white t-shirt', lastSeen: 'Near the temple', status: 'Open' },
]

export default function AdminReports() {
  const [reportType, setReportType] = useState('person')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [lastSeen, setLastSeen] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the report to your backend
    toast("Report Added: The new report has been successfully added.")
    // Reset form
    setName('')
    setDescription('')
    setLastSeen('')
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
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>{report.name}</TableCell>
                  <TableCell>{report.description}</TableCell>
                  <TableCell>{report.lastSeen}</TableCell>
                  <TableCell>{report.status}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Update</Button>
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

