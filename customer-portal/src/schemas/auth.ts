import { z } from 'zod'

export const passwordValidationRules = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter (A-Z)')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter (a-z)')
  .regex(/[0-9]/, 'Password must contain at least one number (0-9)')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character (!@#$%^&*)')

export const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }).transform((v) => v.trim()),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
})

export const signupSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }).transform((v) => v.trim()),
  password: passwordValidationRules,
})

export const updateProfileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters').transform((v) => v.trim()),
  password: z.string().optional(),
})

export type LoginFormValues = z.infer<typeof loginSchema>
export type SignupFormValues = z.infer<typeof signupSchema>
export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>
