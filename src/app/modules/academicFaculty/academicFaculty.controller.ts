import { NextFunction, Request, Response } from 'express';
import { AcademicFacultyService } from './academicFaculty.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IAcademicFaculty } from './academicFaculty.interface';
import { academicFacultyFilterableFields } from './academicFaculty.constant';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFaculty } = req.body;
  const result = await AcademicFacultyService.createFaculty(academicFaculty);

  // Send Response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty Created Successfully',
    data: result,
  });
});

// Get All Faculties
const getAllFaculties = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.headers.authorization);
    console.log(req.user);
    const filters = pick(req.query, academicFacultyFilterableFields);

    const paginationOptions = pick(req.query, paginationFields); // pagination

    const result = await AcademicFacultyService.getAllFaculties(
      filters,
      paginationOptions
    );

    // Send Response
    sendResponse<IAcademicFaculty[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculties retrieved successfully!',
      meta: result.meta,
      data: result.data,
    });

    next();
  }
);

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicFacultyService.getSingleFaculty(id);

  // Send Response
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieved successfully!',
    data: result,
  });
});

// Update Faculty
const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await AcademicFacultyService.updateFaculty(id, updatedData);

  // Send Response
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty updated successfully!',
    data: result,
  });
});

// Delete Faculty
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AcademicFacultyService.deleteByIdFromDB(id);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty deleted successfully',
    data: result,
  });
});

export const AcademicFacultyController = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
