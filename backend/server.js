const app = require('./app');
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDataBase = require("./config/database");

// Handling Uncaugth Exception 
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Uncaugth Exception ");
    server.close(() => {
        process.exit(1);
    });
});

dotenv.config({
    path: "backend/config/config.env"
});

connectDataBase();

cloudinary.config({
    cloud_name: "ddbguafwk",
    api_key: 766782457489675,
    api_secret: "Adv4M3eGWU_3WCdYy5Ws1lkzKW4"
})

// const server = app.listen(process.env.PORT, () => {
//     console.log(`Server is working on http://localhost:${process.env.PORT}`);
// });

const server = app.listen(4000, () => {
    console.log(`Server is working on http://localhost:${4000}`);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandled Promise Rejection");
    server.close(() => {
        process.exit(1);
    })
})