const fs = require('fs');
const express = require('express');
const bcrypt = require('bcryptjs');
const { isFloat64Array } = require('util/types');
const userController = express()


const USER_FILE_PATH = __dirname + '/../files/users.json';

const users = require(USER_FILE_PATH);

userController.get('/', (req, res) => {
    if(req.cookies['userName']){
        let userName = req.cookies['userName'];
        users.map(user => {
            if(user.userName == userName){
                res.send({success: true, userDetails: user});
            }
        })
    }else{
        const userName = req.query.userName;
        const password = req.query.password;
        let userFound = false;
        users.map(user => {
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


userController.post('/', (req, res) => {
    newUserData = req.body;
    users.push(newUserData)
    fs.writeFile(USER_FILE_PATH, JSON.stringify(users), err => {
        if(err) res.status(400).send({err})
        res.send({message: 'New User Created successfully'})
    })
})

module.exports = userController