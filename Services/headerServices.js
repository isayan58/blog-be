const { response } = require("express");
const Bloggers = require('../models/bloggers');
const Blogs = require ('../models/blogs');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
        // console.log("REQ Service:", requestBody.body);
        const {
            title,
            header_image,
            content,
            tags,
            date_posted,
            authToken
        } = requestBody;
        const decodedToken = jwt.decode(authToken);
        Bloggers.findOne({_id: decodedToken.id}, (err, res) =>
        {
        if(err)
        {
            cb(err, null);
        }
        else{
        const blogger_id = res.blogger_id;
        const blog = new Blogs({
            blogger_id,
            title,
            header_image,
            content,
            tags,
            date_posted,
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
        })}});
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
                //Save new User
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
    },
    authenticateUserServices: (requestBody, cb) =>
    {
        const {email, password} = requestBody.body;
        Bloggers.findOne({email:email}, async (err, response) =>
        {
            if(err){
                cb(err, null)
            }
            else{
                const result = await bcrypt.compare(password, response.password);
                // cb(null, response)
                if(result)
                {
                    cb(null, response);
                }
                else{
                    cb({status: 500, message: "Wrong password"}, null);
                }
            }
        })
    },
    searchBlogServices: (requestParam, cb) =>
    {  //need to modify the code for proper searching
        //const searchtext='/'+requestParam+'/';
        console.log("Services:",requestParam);
        // Bloggers.find({firstName:{ $regex: requestParam, $options: 'i' }}, (err, response)=>
        // {
        //     if(err)
        //     {
        //         cb(err, null)
        //     }
        //     else{
        //         // cb(null, response)
        //         // console.log(response);

                Blogs.find({content: { $regex: requestParam, $options: 'i' },
                    title: { $regex: requestParam, $options: 'i' }}, (err, res)=>
                {
                    if(err)
                    {
                        cb(err, null)
                    }
                    else
                    {
                        cb(null, res)
                    }
                })
                //cb(null, res);
            },
    //     })
    // },
    updatePasswordServices: async(requestBody, cb) =>
    {
        const {email, password} = requestBody;
        //Salting the password to encrypt it.
        const salt= await bcrypt.genSalt(10);
        const encryptedPwd = await bcrypt.hash(password, salt);
        Bloggers.findOne({email: email},
            async (err, res)=>
            {
                if(err)
                {
                    cb(err, null)
                }
                else{
                    Bloggers.updateOne(
                        {email: email},
                        {
                            $set:{
                                password: encryptedPwd
                            }
                        }
                    );
                    //const decodedPwd = jwt.decode(encryptedPwd);
                    cb(null, res);
                }
            })
    },
}

module.exports = headerServices;