const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String
    },
    topic: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    publishedAt: {
        type: Date,
        default: Date.now

    }
});

module.exports = mongoose.model('Blog', blogSchema);
