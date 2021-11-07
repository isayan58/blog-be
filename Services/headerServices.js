const { response } = require("express");
const Bloggers = require('../models/bloggers');

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
}

module.exports = headerServices;