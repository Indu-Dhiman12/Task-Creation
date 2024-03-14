"use strict";
import { Sequelize } from "sequelize";

const process = require("process");
const env = process.env.NODE_ENV || "local";
const config = require("../conf/config");
const db: any = {};

let sequelize: any;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);

} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}


export default sequelize;
