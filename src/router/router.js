let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Student Model
let studentSchema = require('../model/users');

// CREATE Student
router.post('/create-student', async (req, res, next) => {

  const createusr = new studentSchema(req.body);

  const usr = await createusr.save();
  console.log(usr);
  res.json(usr)

  // studentSchema.create(req.body, (error, data) => {
  //   if (error) {
  //     return next(error)
  //   } else {
  //     console.log(data)
  //     res.json(data)
  //   }
  // })
});

// Login Students

router.get('/login', (req, res) => {
  res.json('hy');
})

router.post('/login', async (req, res) => {

  res.cookie("jwtoken", "kookin", {
    expires: new Date(Date.now + 20000),
    httpOnly: true
  })
  const { email, name } = req.body;
  console.log(req.body.email);
  if (!email || !name) {
    return res.json("please fill data");
  }
  const userLogin = await studentSchema.findOne({ email: email });

  if (userLogin) {

    console.log("data is correct");
    res.json("data is correct");
  }
  else {
    console.log("data invalid");
    res.json("data invalid");
  }

})

// READ Students
router.get('/read', (req, res) => {
  studentSchema.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Single Student
router.get('/edit-student/:id', (req, res) => {
  studentSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update Student
router.put('/update-student/:id', (req, res, next) => {
  studentSchema.findOneAndUpdate({_id: req.params.id}, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Student updated successfully !')
    }
  })
})

// Delete Student
router.delete('/delete-student/:id', (req, res, next) => {
  studentSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = router;
