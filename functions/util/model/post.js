require('../startup');
const { schema: commentSchema } = require('./comment');
const mongoose = require('mongoose');
const Joi = require('joi');

const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const schema = new Schema({
    user: {
        type: new Schema({
            name: {
                type: String,
                trim: true,
                default: 'annonymous'
            },
            email: {
                type: String,
                default: 'annonymous@mail.com',
                trim: true,
            },
            avatarUrl: {
                type: String,
                default: 'https://picsum.photos/50',
            }
        }),
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    resourceUrl: {
        type: String,
        required: true,
        trim: true,
    },
    description: String,
    upVotes: {
        type: Number,
        default: 0,
    },
    downVotes: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    tags: [String],
    comments: [commentSchema],
});

function createPost(post, user) {
    const { title, resourceUrl, description, tags } = post;

    const dbPost = {
        title,
        resourceUrl,
        description
    };

    if (user) {
        const { _id, name, email } = user;
        dbPost.user = {
            _id,
            name,
            email,
        };
    }

    else dbPost.user = {};

    if (tags) dbPost.tags = tags;

    else dbPost.tags = [];

    return new Post(dbPost).save();
}

schema.statics.newPost = createPost;

schema.methods.addComment = async function (comment) {
    let { text, user } = comment;

    if (!user) user = {};

    const { name, email } = user;
    const _id = new ObjectId();
    const newComment = {
        _id, text, user: { name, email }
    };

    this.comments.push(newComment);

    await this.save();

    return newComment;
}

const Post = mongoose.model('posts', schema);

const inputSchema = Joi.object({
    title: Joi.string().min(5).required(),
    resourceUrl: Joi.string().required(),
    description: Joi.string().allow(''),
    upVotes: Joi.number(),
    downVotes: Joi.number(),
    tags: Joi.array()
}).label('post').required();

function validatePost(input) {
    return inputSchema.validate(input, { abortEarly: false });
}

module.exports = {
    Post,
    validate: validatePost
};
