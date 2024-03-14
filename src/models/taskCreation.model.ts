import { DataTypes } from 'sequelize';
import db from '../util/dbConn';

const taskCreation = db.define('taskCreation', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    task: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,

    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    }
});

taskCreation.sync()

export default taskCreation;