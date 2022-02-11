import dotenv from 'dotenv';

dotenv.config();

const PG_USER = process.env.PG_USER;
const PG_PASSWORD = process.env.PG_PASSWORD as string;
const PG_HOST = process.env.PG_HOST;
const PG_PORT = parseInt(process.env.PG_PORT as string);
const PG_DATABASE = process.env.PG_DATABASE;

export const PG_URI = `postgres://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${PG_DATABASE}`;
