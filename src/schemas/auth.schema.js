import { z } from 'zod'

export const registerSchema = z.object({
  username: z.string({
    required_error: 'El usuario es requerido'
  }),
  email: z.string({
    required_error: 'El correo es requerido'
  }).email({
    message: 'Correo inválido'
  }),
  password: z.string({
    required_error: 'La contraseña es requerida'
  }).min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres'
  })
})

export const loginSchema = z.object({
  email: z.string({
    required_error: 'El correo es requerido'
  }).email({
    message: 'Correo inválido'
  }),
  password: z.string({
    required_error: 'La contraseña es requerida'
  }).min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres'
  })
})

export const createUserSchema = z.object({
  username: z.string({
    required_error: 'El usuario es requerido'
  }).min(1, {
    message: 'El usuario no puede estar vacío'
  }).min(3, {
    message: 'El usuario debe tener al menos 3 caracteres'
  }),
  email: z.string({
    required_error: 'El correo es requerido'
  }).email({
    message: 'Correo inválido'
  }),
  role: z.string({
    required_error: 'El rol es requerido'
  }),
  password: z.string({
    required_error: 'La contraseña es requerida'
  }).min(1, {
    message: 'La contraseña no puede estar vacía'
  }).min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres'
  })
})




export const updateProfileSchema = z.object({
  username: z.string({
    required_error: 'El usuario es requerido'
  }).min(3, {
    message: 'El usuario debe tener al menos 3 caracteres'
  }),
  email: z.string({
    required_error: 'El correo es requerido'
  }).email({
    message: 'Correo inválido'
  })
});
