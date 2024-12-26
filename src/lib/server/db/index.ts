import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';



import { PostgresMock } from "pgmock";

const mock = await PostgresMock.create();
env.DATABASE_URL = await mock.listen(5432);
console.log(env.DATABASE_URL);

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
const client = postgres(env.DATABASE_URL);

export const db = drizzle(client);
export * from './schema'