const { response } = require("express");
const Bloggers = require('../models/bloggers');
const Blogs = require ('../models/blogs');
const bcrypt = require("bcrypt");

const headerServices = {
    getBloggerNames : (cb) =>
    {
        // console.log('IN SERVICES');
        Bloggers.find({}, (err, response) => {
            if(err)
            {
                cb(err, null);
                return;
            }
            else {
                cb(null, response);
                console.log(response);
            }
        }
        )
    },
    getBlogsService : (req, cb) =>
    {
        Blogs.find({blogger_id: req}, (err, response) =>
        {
            if(err)
            {
                cb(err, null);
                return;
            }
            else{
                cb(null, response);
            }
        });
    },
    getBloggerDetails: (req, cb) =>
    {
        Bloggers.findOne({
            blogger_id: req
        }, (err, response)=>
        {
            if(err)
            {
                cb(err, null);
                return;
            }
            else{
                cb(null, response);
            }
        });
    },
    getBlogService:(req, cb) =>
    {
        Blogs.findOne({
            title: req
        }, (err, response)=>
        {
            if(err)
            {
                cb(err, null);
            }
            else{
                cb(null, response);
            }
        });
    },
    getAllBlogsServices: (cb) =>
    {
        Blogs.find({}, (err, res)=>
        {
            if(err)
            {
                cb(err, null);
            }
            else{
                cb(null, res);
            }
        }).sort({date_posted: -1});
    },
    postBlogsService: (requestBody, cb)=>
    {
        const {
            blogger_id,
            title,
            header_image,
            content,
            tags,
            date_posted
        } = requestBody;
        const blog = new Blogs({
            blogger_id,
            title,
            header_image,
            content,
            tags,
            date_posted
        })
        blog
        .save()
        .then((response)=>
        {
            console.log(response);
            cb(null, response)
        })
        .catch((err) =>
        {
            console.log(err);
            cb(err, null)
        })
    },
    postUserServices: (requestBody, cb) =>
    {
        //Salting the password to encrypt it.
        //Finding the latest User ID
        //Incerement user ID
        //Save new User
    }
}

module.exports = headerServices;