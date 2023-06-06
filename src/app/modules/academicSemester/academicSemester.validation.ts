import { z } from 'zod';

// Define the Zod schema for creating a AcademicSemester
const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum(['Autumn', 'Summer', 'Fall'], {
      required_error: 'Title is required',
    }),
    year: z.number({
      required_error: 'Year is required',
    }),
    code: z.enum(['01', '02', '03']),
    startMonth: z.enum(
      [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      {
        required_error: 'Start month is required',
      }
    ),
    endMonth: z.enum(
      [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      {
        required_error: 'End month is required',
      }
    ),
  }),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
};
