import z from 'zod';

export const sendOtpSchema = z.object({
  email: z.string().trim().email({ message: 'Invalid Email' }),
});

export type SendOtpDto = z.infer<typeof sendOtpSchema>;

export const signupSchema = z.object({
  email: z.string().trim().email({ message: 'Invalid Email' }),
  name: z.string().trim(),
  password: z.string().trim(),
  otp: z.string().trim().length(6),
});

export type SignupDto = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string().trim().email({ message: 'Invalid Email' }),
  password: z.string().trim(),
});

export type LoginDto = z.infer<typeof loginSchema>;
