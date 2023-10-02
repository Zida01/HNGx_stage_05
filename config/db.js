const mongoose = require('mongoose');
require('dotenv').config();

// dotenv.config({
//     path: '/config.env'
// })
// // console.log(app.get('env')
// console.log(process.env)

mongoose.set("strictQuery", false);
const { MONGODB_URI } = process.env;

const connectdb = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(" db connected");
    } catch (error) {
        console.log(error);
    }

};
connectdb();