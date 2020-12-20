import { connectMongoDb } from './db';

// https://docs.nestjs.com/recipes/sql-typeorm

export const dbProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => connectMongoDb(),
  },
];
