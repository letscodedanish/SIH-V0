import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header({ isAdmin = false }) {
  return (
    <header className="bg-primary text-primary-foreground p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary-foreground">Simhastha Ujjain Management</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href={isAdmin ? "/admin/dashboard" : "/user/dashboard"}>Dashboard</Link>
            </li>
            <li>
              <Link href={isAdmin ? "/admin/reports" : "/user/report"}>
                {isAdmin ? "View Reports" : "Report Missing"}
              </Link>
            </li>
            <li>
              <Button variant="secondary" asChild>
                <Link href="/">Logout</Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

