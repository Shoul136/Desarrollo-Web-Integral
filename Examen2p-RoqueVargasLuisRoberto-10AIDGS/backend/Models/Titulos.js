import { DataTypes } from 'sequelize';
import sequelize from '../data/database.js';
import Subcategoria from './Subcategorias.js';

const Titulo = sequelize.define('titulos', {
  idTitulo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  editorial: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isbn: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fechaPublicacion: {
    type: DataTypes.DATE,
    allowNull: false
  },
  noEjemplares: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idSubcategoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Subcategoria,
      key: 'idSubcategoria'
    }
  }
}, {
  timestamps: false
});

export default Titulo;
