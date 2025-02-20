const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minLength: [3,'First name must be at least 3 char long'],
        },
        lastname: {
            type: String,
            minLength: [3,'Last name must be at least 3 char long'],
        },
    },
    email: {
        type: String,
        required: true,
        minLength:[5,'email must be at least 5 char long']
    },
    password: {
        type: String,
        required: true,
        select:false,
    },
    socketId:{
        type: String,
    }
})
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

userSchema.methods.comparePassword =  async function (password){
   const user = await this.model('User').findById(this._id).select('+password');
   return await bcrypt.compare(password, user.password);
}

userSchema.statics.hashPassword = async(password) =>{
    return await bcrypt.hash(password,10);
}

const userModel = mongoose.model('User',userSchema);
module.exports = userModel;