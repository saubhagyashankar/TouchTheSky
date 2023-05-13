const fs = require('fs');
const express = require('express');
const bcrypt = require('bcryptjs');
const userController = express()
const Users = require('../../models/Users');
const multer = require('multer');
const XLSX = require('xlsx');


const uploadsFolder = __dirname + '/../files/'

const upload = multer({storage: multer.memoryStorage()});
const GeneralData = require('../../models/GeneralData');

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


userController.post('/togeneraldata', upload.single('file'), (req, res) => {
    // Read the Excel file and convert the data to JSON
  const workbook = XLSX.read(req.file.buffer, {type: 'buffer'});
  const sheet_name_list = workbook.SheetNames;
  const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

  // Iterate over the data and save each row to the database
  try{
  data.forEach((row) => {
    let item = new GeneralData(row);

        item.save();
    });
    }catch(err){
        res.status(400).send(err);
    }
  res.send({message: 'File uploaded and data saved to the database!'});
})


userController.get('/getAllGeneralData', async(req, res) => {
    try{
        const data = await GeneralData.find({owner: null})
        res.status(200).send({data: data})
    }catch(err){
        res.status(400).send(err)
    }   
})

userController.get('/getAllMyData', async(req, res) => {
    try{
        const userName = req.query.userName;
        console.log('getAllMyData', userName);
        const data = await GeneralData.find({owner: userName, successFailure: null, auctionRecycling: null, auctionRemanufacturing: null})
        res.status(200).send({data: data, count: data.length});
    }catch(err){
        res.status(400).send(err)
    }   
})

userController.get('/getUserDashBoardData', async(req, res) => {
    try{
        userName = req.query.userName
        role = req.query.role
        if(role == 'A'){

            const user = await Users.find({userName: userName, role: role})
            if (user){
                const data = await GeneralData.find({owner: userName, successFailure: {$ne: null}, del: true})
                res.status(200).send({data: data, count: data.length})
            }
        }if(role == 'M'){

            const user = await Users.find({userName: userName, role: role})
            if (user){
                let data = await GeneralData.find({owner: userName, successFailure: {$ne: null}, del: true})
                const data2 = await GeneralData.find({owner: {$ne: userName},remanufactureFacility: userName, successFailure: {$ne: null}, del: true})
                data.push(data2);
                res.status(200).send({data: data, count: data.length})
            }
        }else{
            const user = await Users.find({userName: userName, role: role})
            if (user){
                const data = await GeneralData.find({recycledFacility: userName, successFailure: {$ne: null}, del: true})
                res.status(200).send({data: data, count: data.length})
            }
        }
        }catch(err){
        res.status(400).send(err)
    }
})


userController.post('/buyPart', (req, res) => {
    const userName = req.query.userName;
    const id = req.query.id;
    
    GeneralData.findById(id).then((data) => {
        try{
            data.owner = userName;
            data.save();
            res.send({message: 'Successfully purchased'});
        }catch(err){
            res.status(400).send(err)
        }
    })
})


userController.get('/getRecycleParts', async(req, res) => {
    try{
        const data = await GeneralData.find({auctionRecycling: true, successFailure: null})
        res.send({data: data, count: data.length})
    }catch(err){
        res.status(400).send(err)
    }
})

userController.get('/getRemanufactureParts', async(req, res) => {
    try{
        const data = await GeneralData.find({auctionRemanufacturing: true, successFailure: null})
        res.send({data: data, count: data.length})
    }catch(err){
        res.status(400).send(err)
    }
})

userController.post('/recycleDone', async(req, res) => {
    try{
        const id = req.query.id;
        const userName = req.query.userName;
        const success = req.query.successFailure;
        console.log(id, userName, success)
        const data = await GeneralData.findById(id).then(data => {
            data.recycledFacility = userName;
            data.successFailure = success;
            data.del = true;
            data.save();
        })
        res.status(200).send({message: 'Success'});
    }catch(err){
        res.status(400).send(err)
    }
})


userController.post('/remanufactureDone', async(req, res) => {
    try{
        const id = req.query.id;
        const userName = req.query.userName;
        const success = req.query.successFailure;
        console.log(id, userName, success)
        const data = await GeneralData.findById(id).then(data => {
            data.remanufactureFacility = userName;
            data.successFailure = success;
            data.del = true;
            data.save();
        })
        res.status(200).send({message: 'Success'});
    }catch(err){
        res.status(400).send(err)
    }
})

userController.post('/recycleAuction', async(req, res) => {
    try{
        const id = req.query.id;
        const userName = req.query.userName;
        console.log(id, userName)
        const data = await GeneralData.findById(id).then(data => {
            data.auctionRecycling = true;
            data.del = false;
            data.save();
        })
        res.status(200).send({message: 'Success'});
    }catch(err){
        res.status(400).send(err)
    }

})

userController.post('/remanufactureAuction', async(req, res) => {
    try{
        const id = req.query.id;
        const userName = req.query.userName;
        console.log(id, userName)
        const data = await GeneralData.findById(id).then(data => {
            data.auctionRemanufacturing = true;
            data.del = false;
            data.save();
        })
        res.status(200).send({message: 'Success'});
    }catch(err){
        res.status(400).send(err)
    }

})

module.exports = userController