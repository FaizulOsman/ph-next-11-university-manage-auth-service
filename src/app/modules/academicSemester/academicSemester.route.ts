import express from 'express';
// import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();

// Routes
router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema)
  //   AcademicSemesterController.createAcademicSemester
);

export const AcademicSemesterRoutes = router;
