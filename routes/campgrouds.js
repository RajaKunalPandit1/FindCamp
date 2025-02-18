const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware');
const review = require('../models/review');
const campgrounds = require('../controllers/campgrounds');
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});

router.get('/', catchAsync (campgrounds.index));

router.get('/new',isLoggedIn, campgrounds.renderNewForm);

router.post('/',isLoggedIn,upload.array('image'), validateCampground, catchAsync (campgrounds.createCampground));
// router.post('/', upload.array('image'),(req,res)=>{
//     console.log(req.body, req.files);
//     res.send("it workds");
// })

router.get('/:id', catchAsync (campgrounds.showCampground));

router.get('/:id/edit',isLoggedIn,isAuthor, catchAsync (campgrounds.renderEditForm));

router.put('/:id',isLoggedIn, isAuthor,upload.array('image'), validateCampground, catchAsync (campgrounds.updateCampgrounds));

router.delete('/:id',isLoggedIn, isAuthor, catchAsync (campgrounds.deleteCampgrounds));

module.exports = router;