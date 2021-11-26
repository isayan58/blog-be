const axios = require("axios");
const { response } = require("express");
const headerServices = require("../Services/headerServices");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    },
    getBlogger: (req, res) =>
    {
        const blogger_id = req.params.blogger_id;
        //console.log(blogger_id);
        headerServices.getBloggerDetails(blogger_id, (err, response) =>
        {
            if(err)
            {
                res.status(500).json({
                    message: "Something went wrong"
                });
            }
            else{
                res.status(200).json(response);
            }
        });
    },
    getBlogContent: (req, res) =>
    {
        const title = req.params.title;
        headerServices.getBlogService(title, (err, response) =>
        {
            if(err)
            {
                res.status(500).json({
                    message: "Something went wrong"
                });
            }
            else{
                res.status(200).json(response);
            }
        });
    },
    getAllBlogs: (req, res) =>
    {
        headerServices.getAllBlogsServices((err, response)=>
        {
            if(err)
            {
                res.status(500).json({
                    message: "Something went wrong"
                });
            }
            else{
                res.status(200).json(response);
            }
        });
    },
    postBlogs: (req, res) =>
    {
        // console.log("REQ Control:", req.body);
        const {
            title,
            header_image,
            content,
            tags,
            date_posted,
            authToken
        } = req.body;
        
        if(title.length === 0 || header_image.length === 0
            || content.length === 0 || tags.length === 0 || date_posted.length === 0)
            {
                res.status(400).json({
                    message: "Invalid input."
                });
            }
        headerServices.postBlogsService(req.body, (err, response)=>
        {
            if(err)
            {
                res.status(500).json({
                    message: "Internal Server error."
                })
            }
            else{
                res.status(200).json({
                    message: "Blog posted."
                })
            }
        })
    },
    postUsers: (req, res) =>
    {
        //console.log(req.body);
        const
        {
            firstName,
            lastName,
            email,
            header_image,
            phoneNumber,
            password,
            date_sign_up
        } = req.body;
        headerServices.postUserServices(req.body, (err, response) =>
        {
            if(err)
            {
                res.status(500).json({
                    message: "Internal Server Error. User not created."
                })
            }
            else{
                res.status(200).json({
                    message: "User Created."
                })
            }
        })
    },
    authenticateUsers: (req, res) =>
    {
        const { email, password } = req.body;
        headerServices.authenticateUserServices(req, (err, response) =>
        {
            if(err)
            {
                res.status(err.status).json(err.message);
            }
            else
            {
                const authToken = jwt.sign({id:response._id}, process.env.secret,
                    {
                        expiresIn: "20 days",
                    });
                res.status(200).json({
                    message: "Logged in.",
                    token: authToken,
                    firstName: response.firstName,
                    lastName: response.lastName
                })
            }
        });
    },
    searchBlog: (req, res) =>
    {
        const searchText = req.params.search;
        console.log(searchText);
        headerServices.searchBlogServices(searchText, (err, response)=>
        {
            if(err)
            {
                res.status(500).json({
                    message: "Internal Server Error."
                })
            }
            else{
                res.status(200).json(response)
            }
        })
    },
    updatePassword: (req, res) =>
    {
        const {email, password} = req.body;
        // console.log("Email: ", email);
        // console.log("Password: ", password);
        headerServices.updatePasswordServices(req.body, (err, response)=>
        {
            if(err)
            {
                res.status(500).json({
                    message: "Internal Server Error"
            })
            }
            else{
                res.status(200).json(
                    {message:"Password Changed."})
            }
        })
    },
}

module.exports = headerController;