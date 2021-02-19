require('../startup');
const { schema: commentSchema } = require('./comment');
const mongoose = require('mongoose');
const Joi = require('joi');
const { parseJoiError } = require('../error');

const ObjectId = mongoose.Types.ObjectId;
const Schema = mongoose.Schema;

const schema = new Schema({
    user: {
        type: new Schema({
            name: {
                type: String,
                trim: true,
                default: 'anony'
            },
            email: {
                type: String,
                default: 'user@anony.com',
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

    return this.save();
}

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

function createPost(post, user) {
    const { error } = validatePost(post);

    if (error) {
        let result = parseJoiError(error);
        throw new PostError('Invalid post', result);
    }

    if (user) {
        const { _id, name, email } = user;
        post.user = {
            _id,
            name,
            email,
        };
    } else {
        post.user = {};
    }

    return new Post(post).save();
}

function PostError(message, data) {
    this.message = message;
    this.data = data;
}

const Post = mongoose.model('posts', schema);

module.exports = { Post, PostError };
