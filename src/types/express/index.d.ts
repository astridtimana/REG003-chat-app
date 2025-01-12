import express from "express";

declare global {
  namespace Express {
    interface Request {
      uid?: Record<string,any>;
      user?: Record<any>
    }
  }
}