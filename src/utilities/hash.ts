import bcrypt from 'bcrypt'

export const hashPassword = async (password: string): Promise<string> => {
  const hashSecret = process.env.HASH_SECRET
  if (typeof hashSecret === 'string') {
    return bcrypt.hashSync(password, hashSecret)
  } else {
    throw new Error('HASH_SECRET is not set in environment variables')
  }
}

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compareSync(password, hashedPassword)
}
