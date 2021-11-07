const { response } = require("express");
const Bloggers = require('../models/bloggers');

const headerServices = {
    getBloggerNames : (cb) =>
    {
        Bloggers.find({}, (err, response) => {
            if(err)
            {
                cb(err, null);
                return;
            }
            else {
                cb(null, response);
            }
        }
        )
    },
}

module.exports = headerServices;