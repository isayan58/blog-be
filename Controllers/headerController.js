const axios = require("axios");
const headerServices = require("../Services/headerServices");

const headerController =
{
    getBloggers: (req, res) => {
        headerServices.getBloggerNames((err, response) =>
        {
            if(err){
                res.status(500).json({
                message: "Something went wrong"
                });
            } else{
                res.status(200).json({
                    message: response//"Something went wrong"
                    });
            }
        });
    },
}

module.exports = headerController;