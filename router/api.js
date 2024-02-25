const express = require('express');
const controller = require('../user/userControl');
const path = require('path');
const fs = require('fs');

const router = express.Router();

router.get('/form', (req, res)=>{
    res.sendFile(path.join(__dirname, '..' ,'form1.html')); 
});

router.post('/form', controller.submitFirstForm);

router.get('/form-extended', (req, res)=>{
    if(!req.session.firstFormData){
        res.redirect('/api/form');
    }
    else{
        res.sendFile(path.join(__dirname, '..' ,'public','form2.html'));
    } 
});

router.post('/form1submission', controller.submitFirstForm);

router.post('/submit', controller.submitSecondForm);

router.get('/form-review', (req, res)=> {
    const firstFormData = req.session.firstFormData || {};
    const secondFormData = req.session.secondFormData || {}; 
    //console.log("From server..", firstFormData.name, secondFormData.address);
    reviewPath = path.join(__dirname, '..', 'public', 'review.html');
    fs.readFile(reviewPath, 'utf8', (err, data)=>{
        if(err) return res.status(500).send('Internal Server Error');
        const html = data
            .replace('{name}', firstFormData.name)
            .replace('{empID}', firstFormData.id)
            .replace('{dept}', firstFormData.dept)
            .replace('{dob}', firstFormData.dob)
            .replace('{gender}', firstFormData.gender)
            .replace('{designation}', firstFormData.designation)
            .replace('{salary}', firstFormData.salary)
            .replace('{number}', secondFormData.number)
            .replace('{address}', secondFormData.address)
            .replace('{city}', secondFormData.city)
            .replace('{pincode}', secondFormData.pincode)
            .replace('{doj}', secondFormData.doj)
            .replace('{branch}', secondFormData.branch)
        res.send(html);
    })
});

router.post('/final-submit', controller.finalSubmit);

router.get('/submitted', (req, res)=>{
    res.sendFile(path.join(__dirname, '..' ,'public','submitted.html')); 
});

module.exports = router;