import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-primary text-primary-foreground p-4">
        <h1 className="text-2xl font-bold text-center">Simhastha Ujjain Management</h1>
      </header>
      <main className="container mx-auto mt-8 p-4 text-center ">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to Simhastha Ujjain Management Portal</h2>
          <p className="text-xl mb-8">Ensuring safety and efficiency during Indias largest religious gathering</p>
          <div className="space-x-4">
            <Button asChild variant="default">
              <Link href="/user/login">User Login</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/admin/login">Admin Login</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

