const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    myblogs: {
        blogs: [
            {
                articleId: {type: Schema.Types.ObjectId, ref: 'Blog', required: true}
            }
        ]
    }
});

userSchema.methods.addtoMyblogs = function(blog) {
    
    const updatedblogs = [...this.myblogs.blogs];
    updatedblogs.push({
        articleId: blog._id
    });
    const updatedMyblogs = {
        blogs: updatedblogs
    };
    this.myblogs = updatedMyblogs;
    return this.save();

}

module.exports = mongoose.model('User', userSchema);