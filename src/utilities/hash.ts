import bcrypt from 'bcrypt'

export const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hashSync(password, +(process.env.HASH_SECRET as string))
}

export const comparePassword = async (
    password: string | undefined,
    hashedPassword: string | undefined
): Promise<boolean> => {
    if (!password || !hashedPassword) {
        return false
    }
    return bcrypt.compareSync(password, hashedPassword)
}
