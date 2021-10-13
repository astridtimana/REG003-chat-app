import { prismaMock } from './singleton';
import {createUser} from '../src/controller/user';

// const mockResponse: any = () => {
//   const res: any = {};
//   res.status = jest.fn().mockReturnThis();
//   res.json = jest.fn((body) => body);
//   return res;
// };
const next = jest.fn();

test('should create new user ', async () => { 

    const mockResponse:any= {
      status: jest.fn().mockReturnThis(), // This line
      json: jest.fn().mockReturnThis(), // This line
      send: jest.fn(), // also mocking for send function
    };


    const req:any ={
      body:{
        name: 'Rich',
        email: 'rich@prisma.io',
        password:'holis3'
      }
    }
    const user = {
      id: 1,
      name: 'Rich',
      email: 'rich@prisma.io',
      password:'$2a$10$Rcm3RaGTJrcNaN713OOWZexaSRN621PnNlmKZLrDW95QuW2h0Jugq'
    }

    // const res = mockResponse(); 
    prismaMock.user.create.mockResolvedValue(user)
  
    await createUser(req, mockResponse, next)
    expect(mockResponse.status).toHaveBeenCalledWith(200)

  })