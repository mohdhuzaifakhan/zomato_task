

const express = require('express');
const router = express.Router();
const path = require('path')
const registerService = require('../services/register.service')
const passport = require('passport');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './upload_images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

router.get('/', (req, res) => {
    // res.send('Image uploaded successfully!');
    if(req.isAuthenticated())
    {
        res.render('upload.ejs')
    }
    else{
        res.redirect('/login')
    }

});

router.post('/upload', upload.single('image'), (req, res) => {
    // Access the uploaded file details through req.file
    if (!req.file) {
      return res.status(400).render('upload_file.ejs',{message:"No file is uploaded"});
    }
    res.render('upload_file.ejs',{message:"File uploaded successfully"})
  });
router.get('/register', (req, res) => {
    res.render('signup.ejs');
});
router.post('/register',registerService)

//User Login routes
router.get('/login', (req, res) => {
    res.render('login.ejs');

});
router.post('/login', passport.authenticate('local', { failureRedirect: '/login-failure'}),(req,res)=>{
    res.redirect('/');
});

router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/'); // Redirect to the home page or login page after logout
    });
});

router.get('/login-failure', (req, res) => {
    console.log('login-failed')
    res.render('login_failure.ejs')
});

module.exports = router
