import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log('Request body:', body) // Log the request body for debugging
    const { itemName, reportType, name, description, lastSeen, reportedBy, photo } = body

    let report

    // Conditional logic based on report type
    if (reportType === 'person') {
      // Store as MissingPerson
      report = await prisma.missingPerson.create({
        data: {
          name,
          description,
          lastSeen,
          reportedBy,
          photo,
        },
      })
    } else if (reportType === 'item') {
      // Store as MissingItem
      report = await prisma.missingItem.create({
        data: {
          itemName,
          description,
          lastSeen,
          reportedBy,
          photo,
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

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 })
}