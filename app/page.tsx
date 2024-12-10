import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import img1 from '@/public/images/image1.jpg';
import img2 from '@/public/images/image2.jpg';
import { BackgroundLines } from '@/components/ui/background-lines';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat opacity-20 z-0 animate-pulse"></div>
      
      {/* BackgroundLines Wrapper */}
      <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 rounded-md">
      <header className="bg-primary text-primary-foreground p-4 rounded-full -mt-10">
        <h1 className="text-2xl font-bold text-center">Simhastha Ujjain Management</h1>
      </header>

        <main className="container mx-auto mt-8 p-4 text-center z-10 relative">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Welcome to Simhastha Ujjain Management Portal</h2>
            <p className="text-xl mb-8">Ensuring safety and efficiency during India’s largest religious gathering</p>
            <div className="flex flex-row gap-10 items-center w-full justify-center mb-4">
              <Image className="rounded-md" src={img1} alt="Ujjain" width={400} height={400} />
              <Image className="rounded-md h-[270px]" src={img2} alt="Ujjain" width={400} height={300} />
              <Image className="rounded-md" src={img1} alt="Ujjain" width={400} height={400} />
            </div>
            <div className="space-x-4 mt-10">
              <Button asChild variant="default" className="text-md">
                <Link href="/user/login">User Login</Link>
              </Button>
              <Button asChild variant="secondary" className="text-md">
                <Link href="/admin/login">Admin Login</Link>
              </Button>
            </div>
          </div>
        </main>
      </BackgroundLines>
    </div>
  );
}
