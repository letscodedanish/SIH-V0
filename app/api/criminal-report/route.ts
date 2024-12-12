import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const { name, description, lastSeen, photo } = await req.json()
    const photoUrl = `https://my-sih-rekognition-images.s3.ap-south-1.amazonaws.com/${name}.jpg`

    if (!name || !description || !lastSeen || !photo) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 })
    }

    const report = await prisma.criminal.create({
      data: { name, description, lastSeen, photo: photoUrl, reportedBy: 'Admin' },
    })

    return NextResponse.json({ message: 'Report submitted successfully', report }, { status: 200 })
  } catch (error) {
    console.error('Error submitting report:', error)
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const criminals = await prisma.criminal.findMany()
    return NextResponse.json(criminals, { status: 200 })
  } catch (error) {
    console.error('Error fetching reports:', error)
    return NextResponse.json({ message: 'Error fetching reports' }, { status: 500 })
  }
}
