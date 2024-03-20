import { DataTypes } from 'sequelize';
import sequelize from '../data/database.js';

const Autor = sequelize.define('autores', {
  idAutor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nacionalidad: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correoElectronico: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

export default Autor;
