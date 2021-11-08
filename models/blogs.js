const mongoose= require("mongoose");
const Schema = mongoose.Schema;

const blogsSchema = new Schema({
    _id: {type: String},
    blogger_id: {type: Number},
    title: {type: String},
    header_image: {type: String},
    content: {type: String},
    tags: {type: Array}
}
);

const Blogs = mongoose.model("Blogs", blogsSchema);
module.exports=Blogs;