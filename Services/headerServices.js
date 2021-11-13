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
    postUserServices: async (requestBody, cb) =>
    {
        const
        {
            firstName,
            lastName,
            email,
            header_image,
            phoneNumber,
            password,
            date_sign_up
        } = requestBody;
        //Salting the password to encrypt it.
        const salt= await bcrypt.genSalt(10);
        const encryptedPwd = await bcrypt.hash(password, salt);
        //Finding the latest User ID
        let blogger_id= parseInt(0);
        let blogger_id_1 = 0;
        Bloggers.findOne({}, (err, res)=>
        {
            if(err)
            {
                cb(err, null);
            }
            else{
                blogger_id_1 = res.blogger_id;
                //Incerement user ID
                blogger_id_1++;
                console.log(blogger_id_1);
                const blogger = new Bloggers(
                    {
                        blogger_id: blogger_id_1,
                        firstName,
                        lastName,
                        email,
                        header_image,
                        phoneNumber,
                        password: encryptedPwd,
                        date_sign_up
                    }
                );
                blogger.save()
                .then((response) =>
                {
                    cb(null, response)
                })
                .catch((err)=>
                {
                    cb(err, null)
                });
            }
        }).sort({blogger_id: -1});
        //blogger_id = (parseInt(blogger_id) + 1);
        //console.log("Updated:",blogger_id_1);
        //Save new User
    }
}

module.exports = headerServices;