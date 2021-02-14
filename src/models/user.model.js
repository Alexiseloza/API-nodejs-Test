const mongoose = require('mongoose');
const {Schema } = mongoose;
const {compareSync,hashSync, genSaltSync} = require('bcryptjs');


const UserSchema = new Schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true}
});

// hide password 
UserSchema.methods.toJSON = function(){
    let user = this.toObject();
    delete user.password;
    return user;
};

// compare passwords
UserSchema.methods.comparePasswords = function(password){
    return compareSync(password, this.password);
};


// hash password
UserSchema.pre("save", async function(next){
    const user = this;

    if(!user,this.isModified("password")){
        return next();
    }
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(user.password, salt);
    user.password = hashedPassword;
    next();
})


module.exports = mongoose.model("user", UserSchema);