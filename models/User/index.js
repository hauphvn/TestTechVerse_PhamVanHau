const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
    name: {
        type: String, required: [true, 'Please provide a name']
    }, email: {
        type: String, required: [true, 'Please provide an email'], unique: true, lowercase: true, trim: true
    }, password: {
        type: String, required: false, // Option when using social login
    }, provider: {
        type: String, default: 'email', enum: ['email', 'google'] // Append more later
    }, providerId: {
        type: String, default: null
    }
}, {
    timestamps: true
});


// Hash password before saving

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model('User', UserSchema);
