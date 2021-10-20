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
const auth_1 = require("../src/controller/auth");
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
const userInDB = {
    id: 1,
    name: 'Rich',
    email: 'rich@prisma.io',
    password: '$2a$10$Rcm3RaGTJrcNaN713OOWZexaSRN621PnNlmKZLrDW95QuW2h0Jugq'
};
const req = {
    body: {
        email: 'rich@prisma.io',
        password: 'holis3'
    }
};
describe('POST', () => {
    it('should aunthenticate user ', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = mockResponse();
        singleton_1.prismaMock.user.findUnique.mockResolvedValue(userInDB);
        yield (0, auth_1.login)(req, res);
        //console.log(res.json.mock.calls)
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    }));
    it('should get 404 when user not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = mockResponse();
        singleton_1.prismaMock.user.findUnique.mockRejectedValue({ error: 'User not found' });
        yield (0, auth_1.login)(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
    }));
    // it('should get 404 when user not found', async () => { 
    //     const res = mockResponse(); 
    //     prismaMock.user.findUnique.mockRejectedValue({error: 'Wrong password'});
    //     await login(req, res);
    //     expect(res.status).toHaveBeenCalledWith(400);
    //     expect(res.json).toHaveBeenCalled();
    // });
    it('should get 400 when no body (no crime)', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = { body: {} };
        const res = mockResponse();
        singleton_1.prismaMock.user.update.mockRejectedValue({ error: 'Bad request' });
        yield (0, auth_1.login)(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalled();
    }));
});
//# sourceMappingURL=auth.spec.js.map