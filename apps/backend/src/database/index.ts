import Sequelize from 'sequelize';

import { database } from '../config';

const connection = new Sequelize.Sequelize(database);

export default connection;
