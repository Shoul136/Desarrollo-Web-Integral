import { DataTypes } from 'sequelize';
import sequelize from '../data/database.js';
import Autor from './Autor.js';
import Titulo from './Titulos.js';

const TitulosAutores = sequelize.define('TitulosAutores', {
  idAutor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true, 
    references: {
      model: Autor,
      key: 'idAutor'
    }
  },
  idTitulo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true, 
    references: {
      model: Titulo,
      key: 'idTitulo'
    }
  }
}, {
  timestamps: false
});

export default TitulosAutores;
