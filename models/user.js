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
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetToken: String,
    resetTokenExpiration: Date,
    
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

};

userSchema.methods.removefromMyblogs = function(blogId) {
    const updatedMyblogs = this.myblogs.blogs.filter(blog => {
        return blog.articleId.toString() !== blogId.toString();
    });
    this.myblogs.blogs = updatedMyblogs;
    return this.save(); 
};

module.exports = mongoose.model('User', userSchema);