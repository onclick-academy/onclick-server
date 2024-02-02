import bcrypt from 'bcrypt'

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hashSync(password, +(process.env.HASH_SECRET as string))
}

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compareSync(password, hashedPassword)
}
