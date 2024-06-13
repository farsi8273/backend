const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  carName: { type: String, required: true },
  carModel: { type: String, required: true },
  carYear: { type: Number, required: true },
  carManufacturer: { type: String, required: true },
  carPrice: { type: Number, required: true },
  carColor: { type: String, required: true },
  carEngineType: { type: String, required: true },
  carTransmission: { type: String, required: true },
  carMileage: { type: Number, required: true },
  carFuelType: { type: String, required: true },
  carSeatingCapacity: { type: Number, required: true },
  carRegistrationNumber: { type: String, required: true, unique: true },
  carInsuranceDetails: {
    insuranceCompany: { type: String },
    insuranceExpiryDate: { type: Date }
  },
  carServiceRecords: [
    {
      serviceDate: { type: Date },
      serviceDetails: { type: String }
    }
  ],
  carImage: { type: String }
});

// Create a text index on fields you want to search
carSchema.index({
  carName: 'text',
  carModel: 'text',
  carManufacturer: 'text',
  carColor: 'text',
  carEngineType: 'text',
  carTransmission: 'text',
  carFuelType: 'text'
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
