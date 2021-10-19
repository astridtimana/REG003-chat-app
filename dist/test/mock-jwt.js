"use strict";
/* import jwt from 'jsonwebtoken';
jest.mock('jsonwebtoken', () => ({
  ...jest.requireActual('jsonwebtoken'), // import and retain the original functionalities
  verify: jest.fn().mockReturnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEzLCJpYXQiOjE2MzQ1OTg0MDQsImV4cCI6MTYzNDY4NDgwNH0.3W7xFWPdobsneJyLYiuRbjuT42BV9ydLrtIDSwfHVuE'), // overwrite verify
})); */
/* const verify = jwt.verify as jest.MockedFunction<
    (
      token: string,
      secretOrPublicKey: jwt.Secret,
      options?: jwt.VerifyOptions,
    ) => Record<string, unknown> | string
  >;
  verify.mockReturnValue({ verified: 'true' }); */
//# sourceMappingURL=mock-jwt.js.map