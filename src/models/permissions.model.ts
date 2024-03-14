// permission.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../util/dbConn');
const Permission = sequelize.define('Permission', {

    permissionName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    canCreate: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    canEdit: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    canDelete: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    canView: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    // Add other fields as needed
});

module.exports = Permission;
