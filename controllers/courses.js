const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Course = require('../models/Course'); 
const Bootcamp = require('../models/Bootcamp'); 
// @desc    Get courses
// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamps/:bootcampId/courses
// @access  PUBLIC   
exports.getCourses = asyncHandler( async (req, res, next) => {
    let query;

    if(req.params.bootcampId){
        query = Course.find({ bootcamp: req.params.bootcampId });
    }else{
        //query = Course.find().populate('bootcamp');
        query = Course.find().populate({
            path: 'bootcamp',
            select: 'name description'
        });
    }
    //execute query
    const courses = await query;

    res.status(200).json({
        success: true,
        count: courses.length,
        data: courses
    });
}

);


// @desc    Get single courses
// @route   GET /api/v1/courses/:id
// @access  PUBLIC   
exports.getCourse = asyncHandler( async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate(
      {
          path: 'bootcamp',
          select: 'name description'
      });
      if(!course){
          return next(new ErrorResponse(`No course with the id of ${req.params.id}`), 404);
      }

    res.status(200).json({
        success: true,
        data: course
    });
});

// @desc    Add course
// @route   POST /api/v1/bootcamps/:bootcampId/courses
// @access  Private   
exports.addCourse = asyncHandler( async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId; //we need to get bootcamp id and submit it as body field (refering to bootcamp id present in course model)
        console.log(req.body.bootcamp);
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

      if(!bootcamp){
          return next(new ErrorResponse(`No bootcamp with the id of ${req.params.bootcampId}`), 404);
      }
      const course = await Course.create(req.body); //create new course (also include the bootcamp as we did  req.body.bootcamp = req.params.bootcampId;  )

    res.status(200).json({
        success: true,
        data: course
    });
});