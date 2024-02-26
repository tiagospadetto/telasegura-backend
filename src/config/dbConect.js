import mongoose from 'mongoose';
import {DB_CONNECTION_STRING} from './constants.js';

async function conectaNaDatabase() {
  try {
    await mongoose.connect(DB_CONNECTION_STRING);
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
    return mongoose.connection;
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
    throw error;
  }
}

export default conectaNaDatabase;
