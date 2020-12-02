const ErrorResponse = require('../utils/errorResponse');
const Bootcamp = require('../models/Bootcamp'); //now we have our model in which we can do get delete e
//now we have a controller which controls the routes

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  PUBLIC                      //b/c it doesn't have token 
exports.getBootcamps = async (req, res, next) => {
    try {
        const bootcamps = await Bootcamp.find();
        res.status(200).json({success: true, count: bootcamps.length, data: bootcamps});
    } catch (err) {
        next(err);
       
    }
};

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps/:id
// @access  Private                   //b/c we have to send the token
exports.getBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);

        if(!bootcamp){  //this will show 404 and message if there is invalid but properly formatted id
           return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)); 
        }


        res.status(200).json({success: true, data: bootcamp});
    } catch (err) {
        next(err); //this will show 404 and message if there is not properly formatted id
    }
   
};

// @desc    Create new bootcamp
// @route   POST /api/v1/bootcamp
// @access  PRIVATE                         //b/c it doesn't have token 
exports.createBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.create(req.body);

        res.status(201).json(
            {
                success: true,
                data: bootcamp
            }
        );
    } catch (err) {
      //  res.status(400).json({ success: false});  //will show error if there is a same name used more than once sucess:false in postman or any constraint is violated
        next(err);
    }
};


// @desc    Update bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  PRIVATE                //b/c we have to send the token
exports.updateBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true, //to get updated or new data
            runValidators: true, //to run validator on data as well
        });
    
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
        }
        //res.status(200).json({success:true, msg: `Update bootcamp ${req.params.id}`});
        res.status(200).json({success: true, data: bootcamp});
        
    } catch (err) {
        next(err);
    }
   
};


// @desc    Delete bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  PRIVATE                     //b/c it doesn't have token 
exports.deleteBootcamp = async (req, res, next) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id );//we dont need to sent anything so dont need req.body
    
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
        }
        //res.status(200).json({success:true, msg: `Update bootcamp ${req.params.id}`});
        res.status(200).json({success: true, data: {}});
        
    } catch (err) {
        next(err);
    }
};


