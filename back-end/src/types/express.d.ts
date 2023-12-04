import { Request as ExpressRequest } from 'express';

interface User {
  id: number;
  isAdmin: number;
}

export interface ExtendedRequest extends ExpressRequest {
  userId?: User;
}
