import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

// load env variables
config(); 

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  // INFO: Путь к скомпилированным сущностям
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false,  // WARN: always `false` for migrations
};
// console.log(dataSourceOptions);

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
