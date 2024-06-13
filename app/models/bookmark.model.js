// const mongoose = require('mongoose');

// const bookmarkSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true }
// });

// const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

// module.exports = Bookmark;




const mongoose = require('mongoose');
const { validateBookmark } = require('../middlewares/validation'); // Import the validation function

const bookmarkSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true }
});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;
