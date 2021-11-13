const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const bloggersSchema = new Schema(
    {
        blogger_id: { type: Number, index: true, required: true},
        header_image: {type: String},
        firstName: {type: String},
        lastName: {type: String},
        email: {type: String},
        phoneNumber: {type: Number},
        password: {type: String},
        date_sign_up: {type:String}
    }
);

const Bloggers = mongoose.model("Bloggers", bloggersSchema);
module.exports = Bloggers;