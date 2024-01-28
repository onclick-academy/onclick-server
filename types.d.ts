declare global {
  interface UserInterface {
    id: string;
    fullName: string;
    username: string;
    email: string;
    bio: string;
    password: string;
    phoneNum: string;
    profilePic: string;
    birthDate: Date;
    gender: string;
    role: string;
    isEmailConfirmed: boolean;
  }
}

export { UserInterface }
