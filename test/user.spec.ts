import dotenv from 'dotenv';
import { prismaMock } from './singleton';
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../src/controller/user';

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


const req:any = {
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


/* const updatedUserRes ={
  id:1,
  name: 'Richie',
  email:'rich@prisma.io'
}

const updatedUserInDB ={
  id:1,
  name: 'Richie',
  email:'rich@prisma.io',
  password:'$2a$10$Rcm3RaGTJrcNaN713OOWZexaSRN621PnNlmKZLrDW95QuW2h0Jugq'
} */



//-------------------------------------TESTS------------------------------------------

/************ POST ************/

describe('POST', () => {
  it('should create new user ', async () => { 
    const res = mockResponse(); 
    prismaMock.user.create.mockResolvedValue(userInDB);
    await createUser(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
    // expect(res.json.mock.calls[0][0]).toMatchObject(userResJson);
  });
  
  it( 'Error when email already exists', async () => {
    const res = mockResponse(); 
    prismaMock.user.create.mockResolvedValue(userInDB);
    await createUser(req, res);

    prismaMock.user.findUnique.mockResolvedValue(userInDB);
    await createUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
  })

  it( 'No body (no crime)', async () => {
    const req: any = { body: { } } 
    const res = mockResponse();
    prismaMock.user.create.mockRejectedValue(userInDB);
    await createUser(req, res)
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalled();
  })
})


/************ GET ************/

describe('GET', () => {
  it('should get all users from DB', async () => { 
    const res = mockResponse(); 
    prismaMock.user.findMany();
    await getUsers(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });
}) 


/************ GET/:uid ************/

describe('GET/:uid', () => {
  it('should get requested user from DB', async () => { 
    const req:any = {
      params: { uid: 1 }
    }
    const res = mockResponse(); 

    prismaMock.user.findUnique.mockResolvedValue(userInDB);
    await getUser(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it('should get 400 when bad request', async () => {
    const req:any = { 
      params: {}
    } 
    const res = mockResponse(); 
    prismaMock.user.findUnique.mockRejectedValue('Bad request');
    await getUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
  });
})


/************ PUT ************/

/* describe('PUT', () => {
  it('should update user at DB', async () => { 
    const res = mockResponse(); 
    prismaMock.user.create.mockResolvedValue(userInDB);
    await createUser(req, res);
    prismaMock.user.update.mockResolvedValue(updatedUserInDB);
    await updateUser(req2, res)
    expect(res.json.mock.calls[1][0]).toMatchObject(updatedUserRes);
  }); */

  /* it('should return 404', async ()=>{

    
  }) */
/* }) */



/************ DELETE ************/

describe('DELETE', () => {
  it('should get requested user from DB', async () => { 
    const req:any = {
      params: { uid: 1 }
    }
    const res = mockResponse(); 

    prismaMock.user.delete.mockResolvedValue(userInDB)
    await deleteUser(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it('should get error', async () => { 
    const req:any = { 
      params: {}
    }
    const res = mockResponse(); 
    
    prismaMock.user.delete.mockRejectedValue('Bad request')
    await deleteUser(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
  }); 
}) 