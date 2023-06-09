import { Types } from 'mongoose';
import { Model } from 'mongoose';
import { IManagementDepartment } from '../managementDepartment/managementDepartment.interface';

type Name = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type IAdmin = {
  id: string;
  name: Name;
  dateOfBirth: string;
  gender?: 'male' | 'female';
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress?: string;
  permanentAddress?: string;
  managementDepartment: Types.ObjectId | IManagementDepartment;
  designation: string;
  profileImage?: string;
};

export type AdminModel = Model<IAdmin, Record<string, unknown>>;

export type IAdminFilter = {
  searchTerm?: string;
  id?: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  email?: string;
  contactNo?: string;
  gender?: 'male' | 'female';
  emergencyContactNo?: string;
  managementDepartment?: string;
  designation?: string;
};
