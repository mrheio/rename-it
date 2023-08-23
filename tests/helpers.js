import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const API_URL = 'http://localhost:3000/api';
