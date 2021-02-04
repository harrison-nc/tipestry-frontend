const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const Schema = mongoose.Schema;

const schema = new Schema({
    text: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    user: {
        type: new Schema({
            name: {
                type: String,
                default: 'annon',
                trim: true,
            },
            email: {
                type: String,
                default: 'annon@mail.com',
                trim: true,
            }
        }),
    }
});

const commentSchema = Joi.object({
    postId: Joi.objectId().required(),
    text: Joi.string().trim().required(),
    user: Joi.object({
        name: Joi.string(),
        email: Joi.string().email(),
    })
}).label('comment').required();

function validateComment(input) {
    return commentSchema.validate(input, { abortEarly: false });
}

module.exports = {
    schema,
    validator: validateComment,
};
