"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const singleton_1 = require("./singleton");
const user_1 = require("../src/controller/user");
const mockResponse = () => ({
    status: jest.fn((status) => status),
    json: jest.fn((body) => body)
});
const next = jest.fn();
afterEach(() => {
    jest.clearAllMocks();
});
const req = {
    body: {
        name: 'Rich',
        email: 'rich@prisma.io',
        password: 'holis3'
    }
};
const reqId = {
    params: {
        uid: 1
    }
};
const reqIdErr = {
    params: {
        uid: 350
    }
};
const userInDB = {
    id: 1,
    name: 'Rich',
    email: 'rich@prisma.io',
    password: '$2a$10$Rcm3RaGTJrcNaN713OOWZexaSRN621PnNlmKZLrDW95QuW2h0Jugq'
};
const userResJson = {
    email: 'rich@prisma.io',
    name: 'Rich',
    id: 1
};
const req2 = {
    params: {
        uid: 1
    },
    body: {
        name: 'Richie',
    }
};
const updatedUserRes = {
    id: 1,
    name: 'Richie',
    email: 'rich@prisma.io'
};
const updatedUserInDB = {
    id: 1,
    name: 'Richie',
    email: 'rich@prisma.io',
    password: '$2a$10$Rcm3RaGTJrcNaN713OOWZexaSRN621PnNlmKZLrDW95QuW2h0Jugq'
};
//-------------------------------------TESTS------------------------------------------
/************ POST ************/
describe('POST', () => {
    it('should create new user ', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = mockResponse();
        singleton_1.prismaMock.user.create.mockResolvedValue(userInDB);
        yield (0, user_1.createUser)(req, res, next);
        expect(res.json.mock.calls[0][0]).toMatchObject(userResJson);
    }));
    it('Error when same email', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = mockResponse();
        yield (0, user_1.createUser)(req, res, next);
        expect(next).toHaveBeenCalled();
    }));
});
/************ GET ************/
describe('GET', () => {
    it('should get all users from DB', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = mockResponse();
        singleton_1.prismaMock.user.create.mockResolvedValue(userInDB);
        yield (0, user_1.createUser)(req, res, next);
        singleton_1.prismaMock.user.findMany();
        yield (0, user_1.getUsers)(req, res, next);
        expect(res.json.mock.calls[0][0]).toMatchObject(userResJson);
    }));
});
/************ GET/:uid ************/
describe('GET/:uid', () => {
    it('should get requested user from DB', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = mockResponse();
        // POST user
        singleton_1.prismaMock.user.create.mockResolvedValue(userInDB);
        yield (0, user_1.createUser)(req, res, next);
        // GET user
        singleton_1.prismaMock.user.findUnique.mockResolvedValue(userInDB);
        yield (0, user_1.getUser)(reqId, res, next);
        expect(res.json.mock.calls[0][0]).toMatchObject(userResJson);
    }));
    /* it('should get 404', async () => {
      const res = mockResponse();
      prismaMock.user.findUnique.mockRejectedValue('Usuario no encontrado');
      await getUser(reqIdErr, res, next);
      console.log('Después del await', res.json.mock)
      expect(res.json.mock.calls[0]).toBe('Usuario no encontrado')
      expect(next).toHaveBeenCalledWith(404);
    }); */
});
/************ PUT ************/
describe('PUT', () => {
    it('should update user at DB', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = mockResponse();
        singleton_1.prismaMock.user.create.mockResolvedValue(userInDB);
        yield (0, user_1.createUser)(req, res, next);
        singleton_1.prismaMock.user.update.mockResolvedValue(updatedUserInDB);
        yield (0, user_1.updateUser)(req2, res, next);
        expect(res.json.mock.calls[1][0]).toMatchObject(updatedUserRes);
    }));
    /* it('should return 404', async ()=>{
  
      
    }) */
});
/************ DELETE ************/
describe('DELETE', () => {
    it('should get requested user from DB', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = mockResponse();
        // POST user
        singleton_1.prismaMock.user.create.mockResolvedValue(userInDB);
        yield (0, user_1.createUser)(req, res, next);
        // GET user
        singleton_1.prismaMock.user.delete.mockResolvedValue(userInDB);
        yield (0, user_1.deleteUser)(reqId, res, next);
        expect(res.json.mock.calls[0][0]).toMatchObject(userResJson);
    }));
    /* it('should get error', async () => {
      const res = mockResponse();
      prismaMock.user.delete({
        where: {
          id: 10,
        },
      })
      await deleteUser(reqIdErr, res, next);
      expect(next).toHaveBeenCalled();
    }); */
});
//# sourceMappingURL=user.spec.js.map