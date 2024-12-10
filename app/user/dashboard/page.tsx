import { Header } from '@/components/header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function UserDashboard() {
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
      </main>
    </div>
  )
}

