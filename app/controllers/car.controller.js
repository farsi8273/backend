// const { mongoose } = require('../models');
// const Bookmark = require('../models/bookmark.model');
// const Car = require('../models/car.model');
// exports.browse = async (req, res) => {
//     try {
//         const cars = await Car.find();
//         res.status(200).json(cars);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.bookmark = async (req, res) => {
//     try {
//         const { userId } = req;
//         const { carId } = req.body;
//         const existCar = await Car.findById(mongoose.Types.ObjectId(carId)) 
//         if(!existCar) {
//             return res.status(404).json({message:"CarId not found"})
//         }
//         await new Bookmark({
//             carId,
//             userId
//         }).save()
//         // Logic to update user's bookmarks
//         res.status(200).json({ message: 'Car bookmarked successfully!' });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };
// exports.getSavedCar = async(req, res) => {
//     try {
//         const { userId } = req;
//         // Find bookmarks for the user
//         const bookmarks = await Bookmark.find({ userId: mongoose.Types.ObjectId(userId) }).populate('carId');
//         // Extract cars from bookmarks
//         res.status(200).json(bookmarks);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }


// }



// exports.search = async (req, res) => {
//     try {
//         const { keyword } = req.query;
//         const cars = await Car.find({ $text: { $search: keyword } });
//         res.status(200).json(cars);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };






const { mongoose } = require('../models');
const Bookmark = require('../models/bookmark.model');
const Car = require('../models/car.model');
const { bookmarkSchema } = require('../validation'); // Import validation schema

exports.browse = async (req, res) => {
    try {
        const cars = await Car.find();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.bookmark = async (req, res) => {
    try {
        const { userId } = req;
        const { carId } = req.body;

        // Validate req.body using Joi schema
        const { error } = bookmarkSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const existCar = await Car.findById(mongoose.Types.ObjectId(carId)) 
        if(!existCar) {
            return res.status(404).json({message:"CarId not found"})
        }
        await new Bookmark({
            carId,
            userId
        }).save()
        // Logic to update user's bookmarks
        res.status(200).json({ message: 'Car bookmarked successfully!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getSavedCar = async(req, res) => {
    try {
        const { userId } = req;
        // Find bookmarks for the user
        const bookmarks = await Bookmark.find({ userId: mongoose.Types.ObjectId(userId) }).populate('carId');
        // Extract cars from bookmarks
        res.status(200).json(bookmarks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.search = async (req, res) => {
    try {
        const { keyword } = req.query;
        const cars = await Car.find({ $text: { $search: keyword } });
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
