// ./services/register.service.ts

const mongoose = require('mongoose')
const User = mongoose.model('User')
// const bcrypt = require('bcrypt')
// const bodyParser = require('body-parser')
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
module.exports = async (req,res) => {
    try{
        console.log(req.body.username)
        const ifExists = await User.findOne({ username:req.body.username })
        if (ifExists)
            return res.send('<h1>Username already exists.</h1><p>Please <a href="/register">register</a> with another username</p>');
        const user = new User({
            username:req.body.username,
            password:req.body.password
        })
        console.log(user)
        await user.save()
        return res.redirect('/login');
    }catch(err){
        console.log(err)
        return res.status(500).json('Internal Server Error')
    }
}
