const db = require('../database');

exports.submitFirstForm = async(req, res) => {
    try {
        req.session.firstFormData = req.session.firstFormData || {};
        
        const name = req.body.name;
        const id = req.body.empID;
        const dept = req.body.dept;
        const dob = req.body.dob;
        const gender = req.body.gender;
        const designation = req.body.designation;
        const salary = req.body.salary;
        //console.log(name, id, dept, dob, gender, designation, salary);
        req.session.firstFormData = { name, id, dept, dob, gender, designation, salary };
        console.log(req.session.firstFormData);
        res.redirect('/api/form-extended');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

exports.submitSecondForm = async(req, res) => {
    try{
        req.session.secondFormData = req.session.secondFormData || {};
        const number = req.body.number;
        const address = req.body.address;
        const city = req.body.city;
        const pincode = req.body.pincode;
        const doj = req.body.doj;
        const branch = req.body.branch;
        
        req.session.secondFormData = { number, address, city, pincode, doj, branch };
        console.log(req.session.secondFormData);
        res.redirect('/api/form-review');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

exports.finalSubmit = async (req, res) => {
    try {
        const firstFormData = req.session.firstFormData;
        const secondFormData = req.session.secondFormData;
        await db.promise().query(`insert into emp_table(name, id, dept, dob, gender, designation, salary, phNum, addr, city, pincode, dateOfJoining, branch) values(?,?,?,?,?,?,?,?,?,?,?,?,?)`
        , [ firstFormData.name,
            firstFormData.id,
            firstFormData.dept,
            firstFormData.dob,
            firstFormData.gender,
            firstFormData.designation,
            firstFormData.salary,
            secondFormData.number,
            secondFormData.address,
            secondFormData.city,
            secondFormData.pincode,
            secondFormData.doj,
            secondFormData.branch 
        ]);
        console.log('form data added to database successfully');
        delete req.session.firstFormData;
        delete req.session.secondFormData;
        res.redirect('/api/submitted');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
/*
exports.submitSecondForm = async(req, res) =>{
    try{
        const secondFormData = {
            number: req.body.number,
            address: req.body.address,
            city: req.body.city,
            pincode: req.body.pincode,
            doj: req.body.doj,
            branch: req.body.branch
        };
        const firstFormData = req.session.FormData;

        console.log(secondFormData.number, secondFormData.address, secondFormData.city, secondFormData.pincode, secondFormData.doj, secondFormData.branch);
        
        await db.promise().query(`insert into emp_table(name, id, dept, dob, gender, designation, salary, phNum, addr, city, pincode, dateOfJoining, branch) values(?,?,?,?,?,?,?,?,?,?,?,?,?)`
        , [ firstFormData.name,
            firstFormData.id,
            firstFormData.dept,
            firstFormData.dob,
            firstFormData.gender,
            firstFormData.designation,
            firstFormData.salary,
            secondFormData.number,
            secondFormData.address,
            secondFormData.city,
            secondFormData.pincode,
            secondFormData.doj,
            secondFormData.branch 
        ]);
        console.log("form data added to database");
        delete req.session.firstFormData;
        res.redirect('/api/submitted');
    } catch(err){
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};
*/
