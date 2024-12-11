import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import AWS from 'aws-sdk'

const prisma = new PrismaClient()

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { itemName, reportType, name, description, lastSeen, reportedBy, photo } = body

    // Upload photo to S3
    const photoBuffer = Buffer.from(photo, 'base64')
    const s3Params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME || '',
      Key: `${Date.now()}_${reportType}.jpg`,
      Body: photoBuffer,
      ContentEncoding: 'base64',
      ContentType: 'image/jpg',
    }
    const s3Response = await s3.upload(s3Params).promise()
    const photoUrl = s3Response.Location
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
      ...missingPersons.map((person) => ({
        id: person.id,
        type: 'Person',
        name: person.name,
        description: person.description,
        lastSeen: person.lastSeen,
        reportedBy: person.reportedBy, // Example: Modify this based on your schema
        photo: person.photo,
      })),
      ...missingItems.map((item) => ({
        id: item.id,
        type: 'Item',
        name: item.itemName,
        description: item.description,
        lastSeen: item.lastSeen,
        reportedBy: item.reportedBy, // Example: Modify this based on your schema
        photo: item.photo,
      })),
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