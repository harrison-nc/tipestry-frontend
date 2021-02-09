const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const secretKey = process.env.JWT_SECRET;

if (!secretKey) throw new Error('JWT Key not provided');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        minlength: 4,
        maxlenth: 15,
        trim: true,
        required: true,
        set: v => v.toLowerCase(),
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        set: v => v.toLowerCase(),
    },
    password: {
        type: String,
        trim: true,
        required: true,
    }
});

async function createUser(value) {
    const salt = await bcrypt.genSalt(10);

    const user = new User({
        name: value.name,
        email: value.email,
        password: await bcrypt.hash(value.password, salt),
    });

    return user.save();
}

function findByEmail(email) {
    return User.findOne({ email });
}

function verifyPassword(password) {
    return bcrypt.compare(password, this.password);
}

async function login(email, password) {
    const user = await findByEmail(email);

    if (!user) return { succeeded: false };

    const match = await user.verifyPassword(password);

    if (!match) return { succeeded: false };

    const token = user.generateAuthToken();

    return { succeeded: true, token, user };
}

function generateAuthToken() {
    const payload = {
        _id: this._id,
        name: this.name,
        email: this.email,
    };
    const token = jwt.sign(payload, secretKey);
    return token;
}

userSchema.methods.verifyPassword = verifyPassword;
userSchema.methods.generateAuthToken = generateAuthToken;

userSchema.statics.login = login;
userSchema.statics.create = createUser;
userSchema.statics.findByEmail = findByEmail;
userSchema.statics.validateModel = (user) => schema.validate(user, { abortEarly: false });

const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(5).required(),
    name: Joi.string().min(4).max(15).required(),
}).label('user').required();

const User = mongoose.model('users', userSchema);
module.exports = User;
