import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

import connectDB from '@/lib/mongodb';
import Education from '@/models/Education';


// ==============================
// UPDATE EDUCATION
// ==============================
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid education ID',
        },
        { status: 400 }
      );
    }

    const body = await request.json();

    const updatedEducation =
      await Education.findByIdAndUpdate(
        id,
        {
          degree: body.title,
          institution: body.institution || '',
          passingYear: body.passingYear || '',
          description: body.description || '',
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedEducation) {
      return NextResponse.json(
        {
          success: false,
          message: 'Education not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Education updated successfully',
      data: updatedEducation,
    });

  } catch (error) {

    console.error('Education PUT Error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update education',
      },
      { status: 500 }
    );
  }
}


// ==============================
// DELETE EDUCATION
// ==============================
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid education ID',
        },
        { status: 400 }
      );
    }

    const deletedEducation =
      await Education.findByIdAndDelete(id);

    if (!deletedEducation) {
      return NextResponse.json(
        {
          success: false,
          message: 'Education not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Education deleted successfully',
    });

  } catch (error) {

    console.error('Education DELETE Error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete education',
      },
      { status: 500 }
    );
  }
}