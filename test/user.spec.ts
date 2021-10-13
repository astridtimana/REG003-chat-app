import { prismaMock } from './singleton';
import { createUser, deleteUser, getUser, getUsers } from '../src/controller/user';

const mockResponse: any = () => ({
  status: jest.fn((status) => status),
  json: jest.fn((body) => body)
});

const next = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});


const req:any = {
  body:{
    name: 'Rich',
    email: 'rich@prisma.io',
    password:'holis3'
  }
}

const reqId:any = {
  params:{
    uid: 1
  }
}

const reqIdErr:any = {
  params:{
    uid: 5
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

describe('GET/:uid', () => {
  it('should get requested user from DB', async () => { 
    const res = mockResponse(); 

    // POST user
    prismaMock.user.create.mockResolvedValue(userInDB);
    await createUser(req, res, next);

    // GET user
    prismaMock.user.findUnique.mockResolvedValue(userInDB)
    await getUser(reqId, res, next);
    expect(res.json.mock.calls[0][0]).toMatchObject(userResJson);
  });

  it('should get 404', async () => { 
    const res = mockResponse(); 
    prismaMock.user.findUnique({
      where: {
        id: 1,
      },
    })
    await getUser(reqIdErr, res, next);
    expect(next).toHaveBeenCalled();
  });
})


/************ PUT ************/



/************ DELETE ************/

describe('GET/:uid', () => {
  it('should get requested user from DB', async () => { 
    const res = mockResponse(); 

    // POST user
    prismaMock.user.create.mockResolvedValue(userInDB);
    await createUser(req, res, next);

    // GET user
    prismaMock.user.delete.mockResolvedValue(userInDB)
    await deleteUser(reqId, res, next);
    expect(res.json.mock.calls[0][0]).toMatchObject(userResJson);
  });

  it('should get error', async () => { 
    const res = mockResponse(); 
    prismaMock.user.delete({
      where: {
        id: 10,
      },
    })
    await deleteUser(reqIdErr, res, next);
    expect(next).toHaveBeenCalled();
  });
})