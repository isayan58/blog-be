const { response } = require("express");
const Bloggers = require('../models/bloggers');
const Blogs = require ('../models/blogs');

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
        });
    }
}

module.exports = headerServices;