"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";

export default function AdminDashboard() {
  const [criminalName, setCriminalName] = useState("");
  const [criminalDescription, setCriminalDescription] = useState("");
  const [lastSeen, setLastSeen] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  interface Report {
    id: string;
    name: string;
    description: string;
    lastSeen: string;
    photo: string;
    type: "Person" | "Item";
    status: string;
  }

  const [reports, setReports] = useState<Report[]>([]);


  const handleClick = (person: Report) => {
    const name = person.name.toLowerCase();

    fetch("http://127.0.0.1:5000/detect-person", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }), // Send name as JSON
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success("Access granted to surveillance.");
        } else {
          toast.error("Failed to access surveillance.");
        }
      })
      .catch((error) => {
        console.error("Error accessing surveillance:", error);
        toast.error("Error accessing surveillance.");
      });
  };

  useEffect(() => {
    async function fetchReports() {
      try {
        const response = await fetch("/api/reports");
        if (!response.ok) throw new Error("Failed to fetch reports");
        const data = await response.json();
        console.log(data);
        setReports(data);
      } catch (error) {
        toast.error(`Error fetching reports: ${(error as Error).message}`);
      }
    }
    fetchReports();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!photo) {
      toast.error("Photo is required");
      return;
    }

    const newReport = {
      name: criminalName,
      description: criminalDescription,
      lastSeen,
      photo,
    };
    try {
      const response = await fetch("/api/criminal-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReport),
      });

      if (!response.ok) throw new Error("Failed to submit report");

      const savedReport = await response.json();
      setReports([...reports, savedReport]);
      toast.success("Report submitted successfully");
    } catch (error) {
      toast.error(`Error submitting report: ${(error as Error).message}`);
    }
  };
  const handleAccess = () => {
    fetch("http://127.0.0.1:5000/trigger-model", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "access_surveillance" }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success("Access granted to surveillance.");
        } else {
          toast.error("Failed to access surveillance.");
        }
      })
      .catch((error) => {
        console.error("Error accessing surveillance:", error);
        toast.error("Error accessing surveillance.");
      });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header isAdmin={true} />
      <main className="container mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-card text-card-foreground p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">View Reports</h2>
            <p className="mb-4">
              View and manage all reported missing persons and items.
            </p>
            <Button asChild>
              <Link href="/admin/reports">View Reports</Link>
            </Button>
          </div>
          <div className="bg-card text-card-foreground p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              Real-Time Surveillance
            </h2>
            <p className="mb-4">
              Access live surveillance footage and face recognition alerts.
            </p>
            <Button asChild variant="outline" onClick={handleAccess}>
              <Link href="">Access Surveillance</Link>
            </Button>
          </div>
          <div className="bg-card text-card-foreground p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Crowd Density Detection</h2>
            <p className="mb-4">
              Hello world
            </p>
            <Button asChild variant="outline">
              <Link href="/admin/crowd-density">Crowd Density</Link>
            </Button>
          </div>
          <div className="bg-card text-card-foreground p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Weapon Detection</h2>
            <p className="mb-4">
              Do your weapon detection
            </p>
            <Button asChild variant="outline">
              <Link href="http://127.0.0.1:5002/video_feed">Weapon Detection</Link>
            </Button>
          </div>
        </div>
        <div className="bg-card text-card-foreground p-6 rounded-lg shadow-md">
  <h2 className="text-xl font-semibold mb-4">Weapon Detection</h2>
  <p className="mb-4">
    Access weapon detection through the camera feed.
  </p>
  {/* <iframe
    src="http://127.0.0.1:50002/video_feed" // Replace with your local IP
    className="w-full h-64 rounded-lg shadow-md"
    allow="camera; fullscreen" // Allow camera access if needed */}
  {/* // ></iframe> */}
</div>

        <div className="bg-card text-card-foreground p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Report Criminal</h2>
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
            <div>
              <Label htmlFor="lastSeen">Last Seen</Label>
              <Input
                id="lastSeen"
                type="string"
                value={lastSeen}
                onChange={(e) => setLastSeen(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="photo">Photo</Label>
              <Input
                id="photo"
                type="file"
                onChange={handleFileChange}
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
              {reports
                .filter((report) => report.type === "Person")
                .map((person) => (
                  <li
                    key={person.id}
                    className="flex items-center justify-between space-x-4"
                  >
                    {/* 1st Column: Image */}
                    <div className="flex-shrink-0">
                      <Image
                        src={`https://my-sih-rekognition-images.s3.ap-south-1.amazonaws.com/${person.name}.jpg`}
                        alt={person.name}
                        width={150}
                        height={150}
                        className="rounded-md"
                      />
                    </div>

                    {/* 2nd Column: Text */}
                    <div className="flex flex-col space-y-1">
                      <p className="font-semibold">{person.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Last seen: {person.lastSeen}
                      </p>
                    </div>

                    {/* 3rd Column: Button */}
                    <div className="ml-auto flex flex-row gap-10">
                      <p className="px-4 py-2 bg-black text-white rounded-md w-full">
                        {person.status}
                      </p>
                      <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        onClick={() => handleClick(person)}
                      >
                        Search
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </div>

          <div className="bg-card text-card-foreground p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Missing Items</h2>
            <ul className="space-y-4">
              {reports
                .filter((report) => report.type === "Item")
                .map((item) => (
                  <li key={item.id} className="flex items-center space-x-4">
                    <Image
                      src={item.photo}
                      alt={item.name}
                      width={150}
                      height={150}
                      className="rounded-md"
                    />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.description}, Last seen: {item.lastSeen}
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
