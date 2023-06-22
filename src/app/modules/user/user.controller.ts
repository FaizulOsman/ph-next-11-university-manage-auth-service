import { Request, RequestHandler, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IUser } from './user.interface';

// Create Student
const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    console.log('cookie is', req.cookies);
    const { student, ...userData } = req.body;
    const result = await UserService.createStudent(student, userData);

    // Send Response
    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Created Successfully',
      data: result,
    });
  }
);

// Create Faculty
const createFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { faculty, ...userData } = req.body;

  const result = await UserService.createFaculty(faculty, userData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculty created successfully',
    data: result,
  });
});

// Create Admin
const createAdmin: RequestHandler = catchAsync(async (req, res) => {
  const { admin, ...adminData } = req.body;

  const result = await UserService.createAdmin(admin, adminData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
};
