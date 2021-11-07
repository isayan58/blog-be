const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const bloggersSchema = new Schema(
    {
        blogger_id: { type: Number, index: true, required: true},
        name: {type: String, required: true},
        rating: {type: Number},
    }
);

const Bloggers = mongoose.model("Bloggers", bloggersSchema);
module.exports = Bloggers;