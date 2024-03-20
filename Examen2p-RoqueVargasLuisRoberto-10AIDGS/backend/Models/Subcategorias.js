import { DataTypes } from 'sequelize';
import sequelize from '../data/database.js';
import Categoria from './Categorias.js';

const Subcategoria = sequelize.define('subcategorias', {
  idSubcategoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  subcategoria: {
    type: DataTypes.STRING,
    allowNull: false
  },
  idCategoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Categoria,
      key: 'idCategoria'
    }
  }
}, {
  timestamps: false
});

export default Subcategoria;
