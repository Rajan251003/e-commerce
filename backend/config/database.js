const mongoose = require('mongoose');

const connectDataBase = () => {
    mongoose
        .connect("mongodb://localhost:27017/ecommerce", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then((data) => {
            console.log(`Mongodb connected with server ${data.connection.host}`)
        })
}

module.exports = connectDataBase;