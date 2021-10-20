import dotenv from 'dotenv';
import { prismaMock } from './singleton';
import { login } from '../src/controller/auth';

const mockResponse: any = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn((body) => body);
  res.cookie = jest.fn().mockReturnValue(res);
  return res;
};


dotenv.config();

afterEach(() => {
  jest.clearAllMocks();
});

const userInDB = {
    id: 1,
    name: 'Rich',
    email: 'rich@prisma.io',
    password:'$2a$10$Rcm3RaGTJrcNaN713OOWZexaSRN621PnNlmKZLrDW95QuW2h0Jugq'
};

const req:any = {
    body:{
        email: 'rich@prisma.io',
        password: 'holis3'
    }
}

describe('POST', () => {
    it('should aunthenticate user ', async () => { 
      const res = mockResponse(); 
      prismaMock.user.findUnique.mockResolvedValue(userInDB)
      await login(req, res);
      //console.log(res.json.mock.calls)
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalled();
    });
    
    it('should get 404 when user not found', async () => { 
        const res = mockResponse(); 
        prismaMock.user.findUnique.mockRejectedValue({error: 'User not found'});
        await login(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
    });
    // it('should get 404 when user not found', async () => { 
    //     const res = mockResponse(); 
    //     prismaMock.user.findUnique.mockRejectedValue({error: 'Wrong password'});
    //     await login(req, res);
    //     expect(res.status).toHaveBeenCalledWith(400);
    //     expect(res.json).toHaveBeenCalled();
    // });
    it('should get 400 when no body (no crime)', async ()=>{
        const req:any = { body: { } }
        const res = mockResponse();
        
        prismaMock.user.update.mockRejectedValue({error: 'Bad request'});
        await login(req, res)
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalled();
      });
  })