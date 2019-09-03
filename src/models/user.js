const moongose = require('mongoose');
const { Schema } = moongose;
const bcrypt = require('bcryptjs');

const usuarios = new Schema({
    fullName: { type: String, required: true},
    userName: { type: String, required: true},
    password: { type: String, required: true}
});

usuarios.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

usuarios.methods.matchPassword = async (password) => {
    return await bcrypt.compare(password, this.password);
};

module.exports = moongose.model('User', usuarios);