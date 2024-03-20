import Squelize from 'sequelize'

const sequelize = new Squelize('biblioteca', 'root', 'root',{
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize