'use client'
import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function UserDashboard() {
  interface Criminal {
    id: number
    name: string
    photo: string
    description: string
    lastSeen: string
  }

  const [criminals, setCriminals] = useState<Criminal[]>([])

  useEffect(() => {
    async function fetchCriminals() {
      try {
        const response = await fetch('/api/criminal-report')
        if (!response.ok) throw new Error('Failed to fetch criminals')
        const data = await response.json()
        setCriminals(data)
      } catch (error) {
        console.error('Error fetching criminals:', error)
      }
    }
    fetchCriminals()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-100 to-orange-200">
      <Header />
      <main className="container mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Report Missing</h2>
            <p className="mb-4">Report a missing person or item quickly and easily.</p>
            <Button asChild>
              <Link href="/user/report">Report Now</Link>
            </Button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Check Status</h2>
            <p className="mb-4">Check the status of your reported missing person or item.</p>
            <Button asChild variant="outline">
              <Link href="/user/status">Check Status</Link>
            </Button>
          </div>
        </div>

                {/* Criminals Section */}
                <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-center mt-10">Reported Criminals</h2>
          {criminals.length === 0 ? (
            <p>No criminals reported yet.</p>
          ) : (
            <div className="flex flex-row gap-10 justify-center w-full">
              {criminals.map((criminal) => (
                <div
                  key={criminal.id}
                  className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center w-[20%]"
                >
                  <Image
                    src={criminal.photo}
                    alt={criminal.name}
                    width={150}
                    height={150}
                    className="rounded-md mb-4"
                  />
                  <h3 className="text-lg font-bold">{criminal.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {criminal.description}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    <strong>Last Seen:</strong> {criminal.lastSeen}
                  </p>

                    <button
                      className="mt-4 bg-black text-white font-bold py-2 px-4 rounded"
                      onClick={(e) => {
                      const button = e.currentTarget
                      button.style.backgroundColor = 'darkred'
                      setTimeout(() => {
                        button.style.backgroundColor = 'black'
                      }, 4000)
                      }}
                    >
                      Report
                    </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}