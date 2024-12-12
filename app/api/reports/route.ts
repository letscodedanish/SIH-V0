import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { itemName, reportType, name, description, lastSeen, reportedBy } = body

    const photoUrl = `https://my-sih-rekognition-images.s3.ap-south-1.amazonaws.com/${name}.jpg`
    console.log('Photo uploaded to S3:', photoUrl)

    let report

    if (reportType === 'person') {
      report = await prisma.missingPerson.create({
        data: {
          name,
          description,
          lastSeen,
          reportedBy,
          photo: photoUrl,
        },
      })
    } else if (reportType === 'item') {
      report = await prisma.missingItem.create({
        data: {
          itemName,
          description,
          lastSeen,
          reportedBy,
          photo: photoUrl,
        },
      })
    } else if (reportType === 'criminal') {
      report = await prisma.criminal.create({
      data: {
        name,
        description,
        lastSeen,
        reportedBy,
        photo: photoUrl,
      },
      })
    } else {
      return NextResponse.json({ message: 'Invalid report type' }, { status: 400 })
    }

    return NextResponse.json({ message: 'Report submitted successfully', report }, { status: 200 })
  } catch (error) {
    console.error('Error submitting report:', error)
    return NextResponse.json({ message: 'Error submitting report' }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Fetch data for both MissingPerson and MissingItem reports
    const missingPersons = await prisma.missingPerson.findMany()
    const missingItems = await prisma.missingItem.findMany()

    // Merge and return the results
    const reports = [
      ...missingPersons.map((person: any) => ({
        id: person.id,
        type: 'Person',
        name: person.name,
        description: person.description,
        lastSeen: person.lastSeen,
        reportedBy: person.reportedBy, // Example: Modify this based on your schema
        photo: person.photo,
        status: person.status
      })),
      ...missingItems.map((item: any) => ({
        id: item.id,
        type: 'Item',
        name: item.itemName,
        description: item.description,
        lastSeen: item.lastSeen,
        reportedBy: item.reportedBy, // Example: Modify this based on your schema
        photo: item.photo,
        status: item.status
      })),
    ...await prisma.criminal.findMany().then((criminals: any[]) => criminals.map((criminal) => ({
      id: criminal.id,
      type: 'Criminal',
      name: criminal.name,
      description: criminal.description,
      lastSeen: criminal.lastSeen,
      reportedBy: criminal.reportedBy,
      photo: criminal.photo,
    }))),
    ]

    return NextResponse.json(reports, { status: 200 })
  } catch (error) {
    console.error('Error fetching reports:', error)
    return NextResponse.json({ message: 'Error fetching reports' }, { status: 500 })
  }
}


export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 })
}