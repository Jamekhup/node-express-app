const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    image:{
        data:buffer,
        type: String,
        required: false
    },
    title:{
        type: String,
        required: [true, 'Title is required']
    },
    description:{
        type: String,
        required: [true, 'Description is required']
    },
    posted_by:{
        type:String,
        required: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updateAt:{
        type: Date,
        default: Date.now,
        required: false
    }
});

module.exports = mongoose.model('post', PostSchema);