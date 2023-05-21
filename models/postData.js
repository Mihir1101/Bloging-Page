const mongoose = require(`mongoose`);

const postSchema = mongoose.Schema({
    title:{
        type: String,
        require:true,
        unique:true
    },
    discription:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    createdAT:{
        type:Date,
        default: Date.now
    }

})

const Post = mongoose.model('post', postSchema)

module.exports = Post;