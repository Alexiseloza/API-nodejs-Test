const {generateToken} = require('../helpers/jwt.helper');

let _userService = null;

class AuthService {
    constructor({UserService}){
        _userService = UserService;
    }
    // sing UP or register user
    async signUp(user){
        const {username} = user;
        const userExist = await _userService.getUserByUsername(username);
        if(userExist){
            const error = new Error();
            error.status = 400;
            error.message = "User already Exist";
            throw error
        }
        return await _userService.create(user);

    }
        // sing in Users
    async signIn(user){
        const {username, password} = user;
        // validate user
        const userExist = await _userService.getUserByUsername(username);
        if(!userExist){
            const error = new Error();
            error.status = 404;
            error.message = "User does NOT Exist";
            throw error
        };
        // validate password
        const validPassword = userExist.comparePasswords(password);
        if(!validPassword){
            const error = new Error();
            error.status = 400;
            error.message = "Your Password is Invalid!";
            throw error
        };
        // encode User Name
        const userToEncode = {
            username : userExist.username,
            id: userExist._id
        };

        // generating token
        const token = generateToken(userToEncode);

        return { token, user:userExist};
    }
}

module.exports = AuthService;