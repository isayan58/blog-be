const mongoose = require("mongoose");
const dbConnect = {
    connect: (url) => {
    mongoose
    .connect(url)
    .then((response) =>
    {
        console.log("Database connected successfully.");
    })
    .catch((err) =>
    {
        console.log("Connection unsuccessful: ",err);
    })
},
};

module.exports = dbConnect;