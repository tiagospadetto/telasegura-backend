import 'dotenv/config';

export const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';
export const PORT = process.env.PORT || 3001;
export const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || '';
export const SECRET = process.env.SECRET || 'minha-secret-trocar';
