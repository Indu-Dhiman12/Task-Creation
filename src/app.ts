const express = require("express")
import sequelize from "./util/dbConn";
import user from "./router/user/index"
import addTask from "./router/addTask/index"
const cors = require('cors');
const app = express();
const PORT = 5000;
app.use(express.json());
var corsOptions = {
    origin: function (origin: any, callback: any) {
        callback(null, true);
    },
    credentials: true,
};

app.use(cors(corsOptions));
const connectToDb = async () => {
    try {
        await sequelize.sync({ force: false });
        await sequelize.authenticate();
        console.log('Database Connected successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

app.use("/", user);
app.use("/", addTask);

app.listen(PORT, () => {
    connectToDb();
    console.log(`Running on PORT ${PORT}`);
});