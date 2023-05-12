const fs = require('fs');
const express = require('express');
const bcrypt = require('bcryptjs');
const userController = express()
const Users = require('../../models/user');


const USER_FILE_PATH = __dirname + '/../files/users.json';

const getUsers = async(userName) => {
    
    const user = await Users.find({userName: userName}).then(users =>   users);
    console.log(user)
    return user;

}   

userController.get('/', async(req, res) => {
    if(req.cookies['userName']){
        let userName = req.cookies['userName'];
        let users = await getUsers(userName);
        users.map(user => {
            if(user.userName == userName){
                res.send({success: true, userDetails: user});
            }
        })
    }else{
        const userName = req.query.userName;
        const password = req.query.password;
        let userFound = false;
        let users = await getUsers(userName);
        users.map(user => {
            console.log(user);
            if(user.userName == userName) {
                userFound = true;
                if(bcrypt.compareSync(password, user.password)){
                    res.cookie(`userName`, user.userName)
                    res.send({success: true, userDetails: user})
                    return;
                }else{
                    res.send({error: 'Wrong password'})
                    return;
                }
            }
        })
        if(!userFound)
            res.send({error: 'User not found'})
    }
})


userController.get('/logout', (req, res) => {
    req.session = null;
    res.clearCookie('userName')
    res.send({message: 'User logged out'})
})


userController.post('/', async(req, res) => {
    // newUserData = req.body;
    
    // users.push(newUserData)
    // fs.writeFile(USER_FILE_PATH, JSON.stringify(users), err => {
    //     if(err) res.status(400).send({err})
    //     res.send({message: 'New User Created successfully'})
    // })

    //using mongodb
    try{

        let newUser = new Users(req.body);
        const result = await newUser.save();
        res.send({message: "User created successfully"})
    }catch(err) {
        res.status(400).send(err);
    }



})

module.exports = userController