'use client'

import { useState } from 'react'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'react-toastify'
import Link from 'next/link'
import Image from 'next/image'

// Mock data for missing people and items
const missingPeople = [
  { id: 1, name: "John Doe", age: 30, lastSeen: "Main entrance", image: "/placeholder.svg", found: false },
  { id: 2, name: "Jane Smith", age: 25, lastSeen: "Food court", image: "/placeholder.svg", found: true },
]

const missingItems = [
  { id: 1, name: "Blue Backpack", description: "Contains important documents", lastSeen: "Near temple", image: "/placeholder.svg", found: false },
  { id: 2, name: "Gold Watch", description: "Antique, high value", lastSeen: "Restroom area", image: "/placeholder.svg", found: true },
]

export default function AdminDashboard() {
  const [criminalName, setCriminalName] = useState('')
  const [criminalDescription, setCriminalDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the criminal data to your backend
    toast.success("Criminal Information Submitted. The criminal information has been added to the database.")
    setCriminalName('')
    setCriminalDescription('')
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header isAdmin={true} />
      <main className="container mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-card text-card-foreground p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">View Reports</h2>
            <p className="mb-4">View and manage all reported missing persons and items.</p>
            <Button asChild>
              <Link href="/admin/reports">View Reports</Link>
            </Button>
          </div>
          <div className="bg-card text-card-foreground p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Real-Time Surveillance</h2>
            <p className="mb-4">Access live surveillance footage and face recognition alerts.</p>
            <Button asChild variant="outline">
              <Link href="/admin/surveillance">Access Surveillance</Link>
            </Button>
          </div>
          <div className="bg-card text-card-foreground p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Communication Center</h2>
            <p className="mb-4">Communicate with other officers and manage public updates.</p>
            <Button asChild variant="outline">
              <Link href="/admin/communication">Open Communication Center</Link>
            </Button>
          </div>
        </div>

        <div className="bg-card text-card-foreground p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Find Criminal</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="criminalName">Criminal Name</Label>
              <Input
                id="criminalName"
                value={criminalName}
                onChange={(e) => setCriminalName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="criminalDescription">Description</Label>
              <Textarea
                id="criminalDescription"
                value={criminalDescription}
                onChange={(e) => setCriminalDescription(e.target.value)}
                required
              />
            </div>
            <Button type="submit">Submit Criminal Information</Button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card text-card-foreground p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Missing People</h2>
            <ul className="space-y-4">
              {missingPeople.map((person) => (
                <li key={person.id} className="flex items-center space-x-4">
                  <Image src={person.image} alt={person.name} width={50} height={50} className="rounded-full" />
                  <div>
                    <p className="font-semibold">{person.name}</p>
                    <p className="text-sm text-muted-foreground">Age: {person.age}, Last seen: {person.lastSeen}</p>
                  </div>
                  <span className={`ml-auto ${person.found ? 'text-green-500' : 'text-red-500'}`}>
                    {person.found ? 'Found' : 'Missing'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-card text-card-foreground p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Missing Items</h2>
            <ul className="space-y-4">
              {missingItems.map((item) => (
                <li key={item.id} className="flex items-center space-x-4">
                  <Image src={item.image} alt={item.name} width={50} height={50} className="rounded-full" />
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.description}, Last seen: {item.lastSeen}</p>
                  </div>
                  <span className={`ml-auto ${item.found ? 'text-green-500' : 'text-red-500'}`}>
                    {item.found ? 'Found' : 'Missing'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}

