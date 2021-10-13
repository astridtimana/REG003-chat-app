import { prismaMock } from './singleton';
import { createUser, getUsers } from '../src/controller/user';

const mockResponse: any = () => ({
  status: jest.fn((status) => status),
  json: jest.fn((body) => body)
});

const next = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});


const req:any ={
  body:{
    name: 'Rich',
    email: 'rich@prisma.io',
    password:'holis3'
  }
}

const userInDB = {
  id: 1,
  name: 'Rich',
  email: 'rich@prisma.io',
  password:'$2a$10$Rcm3RaGTJrcNaN713OOWZexaSRN621PnNlmKZLrDW95QuW2h0Jugq'
};

const userResJson = {
  email: 'rich@prisma.io', 
  name: 'Rich', 
  id: 1 
}

//-------------------------------------TESTS------------------------------------------

/************ POST ************/

describe('POST', () => {
  it('should create new user ', async () => { 
    const res = mockResponse(); 
    prismaMock.user.create.mockResolvedValue(userInDB);
    await createUser(req, res, next);
    expect(res.json.mock.calls[0][0]).toMatchObject(userResJson);
  });
  
  it( 'Error when same email', async () => {
    const res = mockResponse();
    await createUser(req, res, next);
    expect(next).toHaveBeenCalled();
  })
})


/************ GET ************/

describe('GET', () => {
  it('should get all users from DB', async () => { 
    const res = mockResponse(); 
    prismaMock.user.create.mockResolvedValue(userInDB);
    await createUser(req, res, next);
    prismaMock.user.findMany();
    await getUsers(req, res, next);
    expect(res.json.mock.calls[0][0]).toMatchObject(userResJson);
  });
})


/************ GET/:uid ************/


/************ PUT ************/



/************ DELETE ************/