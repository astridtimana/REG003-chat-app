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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const singleton_1 = require("./singleton");
const user_1 = require("../src/controller/user");
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn((body) => body);
    res.cookie = jest.fn().mockReturnValue(res);
    return res;
};
dotenv_1.default.config();
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
const userInDB = {
    id: 1,
    name: 'Rich',
    email: 'rich@prisma.io',
    password: '$2a$10$Rcm3RaGTJrcNaN713OOWZexaSRN621PnNlmKZLrDW95QuW2h0Jugq'
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
        yield (0, user_1.createUser)(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
        // expect(res.json.mock.calls[0][0]).toMatchObject(userResJson);
    }));
    it('Error when email already exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = mockResponse();
        singleton_1.prismaMock.user.create.mockResolvedValue(userInDB);
        yield (0, user_1.createUser)(req, res);
        singleton_1.prismaMock.user.findUnique.mockResolvedValue(userInDB);
        yield (0, user_1.createUser)(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalled();
    }));
    it('No body (no crime)', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = { body: {} };
        const res = mockResponse();
        singleton_1.prismaMock.user.create.mockRejectedValue(userInDB);
        yield (0, user_1.createUser)(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalled();
    }));
});
/************ GET ************/
describe('GET', () => {
    it('should get all users from DB', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = mockResponse();
        singleton_1.prismaMock.user.findMany();
        yield (0, user_1.getUsers)(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    }));
});
/************ GET/:uid ************/
describe('GET/:uid', () => {
    it('should get requested user from DB', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: { uid: 1 }
        };
        const res = mockResponse();
        singleton_1.prismaMock.user.findUnique.mockResolvedValue(userInDB);
        yield (0, user_1.getUser)(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    }));
    it('should get 400 when bad request', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: {}
        };
        const res = mockResponse();
        singleton_1.prismaMock.user.findUnique.mockRejectedValue('Bad request');
        yield (0, user_1.getUser)(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalled();
    }));
});
/************ PUT ************/
describe('PUT', () => {
    it('should update user at DB', () => __awaiter(void 0, void 0, void 0, function* () {
        const req2 = {
            params: {
                uid: 1
            },
            body: {
                name: 'Richie',
            }
        };
        const req3 = {};
        const res = mockResponse();
        singleton_1.prismaMock.user.create.mockResolvedValue(userInDB);
        yield (0, user_1.createUser)(req, res);
        singleton_1.prismaMock.user.update.mockResolvedValue(updatedUserInDB);
        yield (0, user_1.updateUser)(req2, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    }));
    it('should return status 500', () => __awaiter(void 0, void 0, void 0, function* () {
        const req3 = {};
        const res = mockResponse();
        singleton_1.prismaMock.user.create.mockResolvedValue(userInDB);
        yield (0, user_1.createUser)(req, res);
        singleton_1.prismaMock.user.update.mockResolvedValue(updatedUserInDB);
        yield (0, user_1.updateUser)(req3, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalled();
    }));
    it('should return status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const req4 = {
            params: {
                uid: 1
            },
            body: {
                name: 'Richie',
                password: 'hola2'
            }
        };
        const res = mockResponse();
        singleton_1.prismaMock.user.create.mockResolvedValue(userInDB);
        yield (0, user_1.createUser)(req, res);
        singleton_1.prismaMock.user.update.mockResolvedValue(updatedUserInDB);
        yield (0, user_1.updateUser)(req4, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    }));
    it('should return status 200', () => __awaiter(void 0, void 0, void 0, function* () {
        const req4 = {
            params: {
                uid: 2
            },
            body: {
                name: 'Richie',
            }
        };
        const res = mockResponse();
        singleton_1.prismaMock.user.create.mockResolvedValue(userInDB);
        yield (0, user_1.createUser)(req, res);
        singleton_1.prismaMock.user.update.mockResolvedValue(updatedUserInDB);
        yield (0, user_1.updateUser)(req4, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
        // console.log(res.json.mock.calls)
    }));
});
/************ DELETE ************/
describe('DELETE', () => {
    it('should get requested user from DB', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: { uid: 1 }
        };
        const res = mockResponse();
        singleton_1.prismaMock.user.delete.mockResolvedValue(userInDB);
        yield (0, user_1.deleteUser)(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    }));
    it('should get error', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: {}
        };
        const res = mockResponse();
        singleton_1.prismaMock.user.delete.mockRejectedValue('Bad request');
        yield (0, user_1.deleteUser)(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalled();
    }));
});
//# sourceMappingURL=user.spec.js.map