const axios = require("axios");
const headerServices = require("../Services/headerServices");

const headerController =
{
    getBloggers: (req, res) => {
        headerServices.getBloggerNames((err, response) =>
        {
            // console.log("In CONTROLLER");
            if(err){
                res.status(500).json({
                message: "Something went wrong"
                });
            } else{
                res.status(200).json(response);
            }
        });
    },
    fetchBlogs: (req, res) =>
    {
        const blogger_id = req.params.blogger_id;
        headerServices.getBlogsService(blogger_id,(err,response) =>
        {
            if(err)
            {
                res.status(500).json({
                    message: "Something went wrong."
            })
            }
            else{
                res.status(200).json(response);
            }
        })
    }
}

module.exports = headerController;