import { AuthController } from '../controllers/auth.controller'
import { UserDao } from '../models/dao/user.dao'
import { RegisterDto } from '../models/dto/register.dto'

const userDto = new RegisterDto({
  id: '1',
  username: 'test_test',
  fullName: 'tet test',
  email: 'test@test.co',
  password: 'password',
  bio: 'this is bio',
  phoneNum: '01096942944',
  birthDate: new Date('1997-01-17'),
  gender: 'Male',
  role: 'User',
  isEmailConfirm: false
})
jest.mock('../models/dao/user.dao', () => {
  return {
    UserDao: jest.fn().mockImplementation(() => {
      return {
        createUser: jest.fn().mockResolvedValue(userDto)
      }
    })
  }
})

jest.mock('../controllers/auth.controller', () => ({
  AuthController: {
    register: jest.fn().mockImplementation()
  }
}))

beforeEach(() => {
  jest.clearAllMocks()
})

const mockRequest = (body: any) => ({
  body
})

const mockResponse = () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  }
  return res
}

it('Should create a new user', async () => {
  // mock UserDao
  UserDao.prototype.createUser = jest.fn().mockResolvedValue(userDto)

  const req = mockRequest(userDto)

  const res = mockResponse()

  console.log('before register')
  await AuthController.register(req as any, res as any)
  expect(res.status).toHaveBeenCalledWith(200)

  console.log('after register')
})
