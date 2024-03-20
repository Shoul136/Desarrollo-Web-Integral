import { DataTypes } from 'sequelize';
import sequelize from '../data/database.js';

const Categoria = sequelize.define('categorias', {
  idCategoria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

export default Categoria;
