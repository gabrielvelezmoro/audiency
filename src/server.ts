import path from 'path';
import app from './app';

require('dotenv').config();

const { PORT } = process.env;
const { APP_NAME } = process.env;

app.server.listen(PORT, () => {
  console.log(`${APP_NAME} up! port: ${PORT}`);
});
