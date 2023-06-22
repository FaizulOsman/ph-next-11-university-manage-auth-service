import mongoose from 'mongoose';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';
import { IFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // Default Password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }

  // Set role
  user.role = 'student';

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );

  // Generate Student ID
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateStudentId(academicSemester as IAcademicSemester);
    user.id = id;
    student.id = id;

    const newStudent = await Student.create([student], { session });
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    // Set student => _id into user.student
    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    newUserAllData = newUser[0];

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new ApiError(httpStatus.BAD_REQUEST, 'User creation failed');
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        { path: 'academicSemester' },
        { path: 'academicDepartment' },
        { path: 'academicFaculty' },
      ],
    });
  }

  return newUserAllData;
};

// Create Faculty
const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  // Default Password
  if (!user.password) {
    user.password = config.default_faculty_pass as string;
  }

  // set user role
  user.role = 'faculty';

  // generate faculty id
  let newUserAllData = null;
  // start session
  const session = await mongoose.startSession();
  try {
    // start transaction
    session.startTransaction();

    const id = await generateFacultyId();
    user.id = id as string;
    faculty.id = id as string;

    // newFaculty will return an array
    const newFaculty = await Faculty.create([faculty], { session });

    if (!newFaculty?.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    user.faculty = newFaculty[0]._id;

    // newUser will return an array
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    newUserAllData = newUser[0];

    // commit transaction and end session
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    // abort transaction and end session
    await session.abortTransaction();
    await session.endSession();
    throw new ApiError(httpStatus.BAD_REQUEST, 'Faculty creation failed');
  }

  if (newUserAllData) {
    // Populate user data with related faculty information
    newUserAllData = await User.findOne({ id: newUserAllData?.id }).populate({
      path: 'faculty',
      populate: [{ path: 'academicFaculty' }, { path: 'academicDepartment' }],
    });
  }

  return newUserAllData;
};

// Create Admin
const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  // Default password
  if (!user.password) {
    user.password = config.default_admin_pass as string;
  }
  // set user role
  user.role = 'admin';

  // Generate Admin id
  let newUserAllData = null;
  // start session
  const session = await mongoose.startSession();
  try {
    // start transaction
    session.startTransaction();

    const id = await generateAdminId();
    user.id = id as string;
    admin.id = id as string;

    // newAdmin will return an array
    const newAdmin = await Admin.create([admin], { session });

    if (!newAdmin?.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    user.admin = newAdmin[0]._id;

    // newUser will return an array
    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    newUserAllData = newUser[0];

    // commit transaction and end session
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    // abort transaction and end session
    await session.abortTransaction();
    await session.endSession();
    throw new ApiError(httpStatus.BAD_REQUEST, 'Admin creation failed');
  }

  if (newUserAllData) {
    // Populate user data with related faculty information
    newUserAllData = await User.findOne({ id: newUserAllData?.id }).populate({
      path: 'admin',
      populate: [{ path: 'managementDepartment' }],
    });
  }

  return newUserAllData;
};

export const UserService = {
  createStudent,
  createFaculty,
  createAdmin,
};
