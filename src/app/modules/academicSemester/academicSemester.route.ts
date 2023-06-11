import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();

// Routes
router.get('/', AcademicSemesterController.getAllSemesters);
router.get('/:id', AcademicSemesterController.getSingleSemester);
router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
);
router.patch('/:id', AcademicSemesterController.updateSemester);

export const AcademicSemesterRoutes = router;
