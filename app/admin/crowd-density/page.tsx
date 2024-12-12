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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header isAdmin={true} />
      <main>
        <iframe src="http://127.0.0.1:5001/" frameBorder="0" className="w-screen h-screen "></iframe>
      </main>
    </div>
  );
}
