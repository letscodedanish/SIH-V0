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
  interface Report {
    id: string;
    type: "Person" | "Item";
    name: string;
    photo: string;
    lastSeen: string;
    description?: string;
  }

  const [reports, setReports] = useState<Report[]>([]);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    async function fetchReports() {
      try {
        const response = await fetch("/api/reports");
        const data = await response.json();
        if (Array.isArray(data)) {
          setReports(data);
          localStorage.setItem("cachedReports", JSON.stringify(data));
          localStorage.setItem("cacheTime", Date.now().toString());
        } else {
          console.error("Unexpected API response format", data);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    }
    fetchReports();
  }, []);

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
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the criminal data to your backend
    toast.success(
      "Criminal Information Submitted. The criminal information has been added to the database."
    );
    setCriminalName("");
    setCriminalDescription("");
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
            <Button
              asChild
              variant="outline"
              onClick={handleAccess}
              onMouseOver={() => setHover(true)}
              onMouseOut={() => setHover(false)}
              style={{
                cursor: "pointer",
                backgroundColor: hover ? "#ddd" : "#fff", // Example of hover effect
              }}
            >
              <p>Access Surveillance</p>
            </Button>
          </div>
          <div className="bg-card text-card-foreground p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Communication Center</h2>
            <p className="mb-4">
              Communicate with other officers and manage public updates.
            </p>
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
              {reports
                .filter((report) => report.type === "Person")
                .map((person) => (
                  // <li key={person.id} className="flex items-center space-x-4">
                  //   <div className="flex flex-row">
                  //     <Image
                  //       src={`https://my-sih-rekognition-images.s3.ap-south-1.amazonaws.com/${person.name}.jpg`}
                  //       alt={person.name}
                  //       width={150}
                  //       height={150}
                  //       className="rounded-md"
                  //     />
                  //       <p className="font-semibold">{person.name}</p>
                  //       <p className="text-sm text-muted-foreground">
                  //         Last seen: {person.lastSeen}
                  //       </p>
                  //     <div>
                  //     <button>Search</button>
                  //   </div>
                  //   </div>
                  // </li>
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
                    <div className="ml-auto">
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={() => handleClick(person)}>
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

                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.description}, Last seen: {item.lastSeen}
                    </p>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
