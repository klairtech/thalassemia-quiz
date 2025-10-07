import { NextRequest, NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase-server'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const updateData = await request.json()

    // Validate required fields
    if (!id) {
      return NextResponse.json(
        { error: 'Quiz attempt ID is required' },
        { status: 400 }
      )
    }

    // Only allow updating user_mobile and user_email
    const allowedFields = ['user_mobile', 'user_email']
    const filteredData = Object.keys(updateData)
      .filter(key => allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = updateData[key]
        return obj
      }, {} as Record<string, string>)

    if (Object.keys(filteredData).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseServer
      .from('quiz_attempts')
      .update(filteredData)
      .eq('id', id)
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      )
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'Quiz attempt not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: data[0] })
  } catch (error) {
    console.error('Quiz update error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update quiz attempt' },
      { status: 500 }
    )
  }
}
