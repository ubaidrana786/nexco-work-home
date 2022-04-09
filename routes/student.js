const express = require("express");
const router = express.Router();
const studentModel = require("../models/students");
const auth = require("../authMiddleware");


router.post("/", auth, async (req, res)=> {

  // const { fname, mname, lname, city, gender, date, email, number, officer, branch } = req.body;

  // if (!fname || !mname || !lname || !city || !gender || !date || !email || !number || !officer || !branch) {
  //   res.status(422).json({ message: "please fill correct data " })
  // }
  
  try {

    const userExist = await studentModel.findOne({email:req.body.email});

    if(userExist){
      res.status(422).json({ error: "email already exist  " })
    }
    

    // const studentCollection = new studentModel({fname, mname,lname,city,gender, date,email,number,officer,branch,
    //   // userId: req.user._id,
    // });

    const studentCollection = new studentModel({
    fname: req.body.fname,
    dob: req.body.dob,
    city: req.body.city,
    gender: req.body.gender,
    date: req.body.date,
    email: req.body.email,
    number: req.body.number,
    officer: req.body.officer,
    branch: req.body.branch,
    image :req.body.image,
    status :req.body.status,
    type:req.body.type,
    buy:req.body.buy,
    userId: req.user._id,
  });

    const userRegister = await studentCollection.save();

      if(userRegister){
        res.status(201).json({ message: "user registered successfully  " })
      }
  } catch (error) {
    console.log(error)
  }


router.get("/", auth, (req, res) => {

  studentModel
    .find()
    .sort({date : -1})
    .countDocuments({})
    .then((response) => {
      res.send(response);
    })
    .catch((err) =>
      res.send({ error: true, message: err.message }).status(500)
    );
});

  // get a data according to filter

  router.get('/filter', auth, (req,res)=>{
    studentModel.find(req.query ?{branch: req.query.branch} :{}).then((response)=>{
      res.send(response);
    }) .catch(err=>res.send({error:true, message:err.message}).status(500))
  })

 



// Update Student
router.route('/:id').put((req, res) => {

  studentModel.findOneAndUpdate({_id : req.params.id},{
    $set : {

      status: req.body.status,

    }
  }).then((result)=>{
    res.status(200).send(result)
  }).catch((error)=>{
    res.status(500).send(error)
  })

});
  
  

})

module.exports = router;
