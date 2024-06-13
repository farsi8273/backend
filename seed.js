// const mongoose = require('mongoose');
// const Car = require('./app/models/car.model');

// mongoose.connect(`mongodb+srv://salman44farsi:BHR8kDNAeUuIgrhI@cluster0.epukxnl.mongodb.net/`, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch(err => {
//   console.error('Connection error', err);
// });

// // Example of creating a new car
// const newCar = new Car({
//   carname: 'Mustang',
//   carmodel: 'GT',
//   manufacturer: 'Ford',
//   year: 2021,
//   price: 55000,
//   mileage: 5000,
//   color: 'Red',
//   fuelType: 'Petrol',
//   transmission: 'Manual',
//   description: 'A powerful sports car with excellent performance.'
// });

// newCar.save().then(car => {
//   console.log('Car saved:', car);
// }).catch(err => {
//   console.error('Error saving car:', err);
// });



const mongoose = require('mongoose');
const Car = require('./app/models/car.model'); // Adjust the path accordingly

mongoose.connect(`mongodb+srv://salman44farsi:BHR8kDNAeUuIgrhI@cluster0.epukxnl.mongodb.net/caralmax`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Connection error', err);
});

const cars = [
  {
    carName: 'Model S',
    carModel: 'S',
    carYear: 2022,
    carManufacturer: 'Tesla',
    carPrice: 79999,
    carColor: 'Red',
    carEngineType: 'Electric',
    carTransmission: 'Automatic',
    carMileage: 20000,
    carFuelType: 'Electric',
    carSeatingCapacity: 5,
    carRegistrationNumber: 'ABC1234',
    carInsuranceDetails: {
      insuranceCompany: 'Geico',
      insuranceExpiryDate: new Date('2023-12-31')
    },
    carServiceRecords: [
      {
        serviceDate: new Date('2022-01-15'),
        serviceDetails: 'Annual maintenance'
      }
    ],
    carImage: 'https://example.com/images/tesla_model_s.jpg'
  },
  {
    carName: 'Mustang',
    carModel: 'GT',
    carYear: 2020,
    carManufacturer: 'Ford',
    carPrice: 55999,
    carColor: 'Blue',
    carEngineType: 'V8',
    carTransmission: 'Manual',
    carMileage: 15000,
    carFuelType: 'Petrol',
    carSeatingCapacity: 4,
    carRegistrationNumber: 'XYZ5678',
    carInsuranceDetails: {
      insuranceCompany: 'Allstate',
      insuranceExpiryDate: new Date('2024-05-20')
    },
    carServiceRecords: [
      {
        serviceDate: new Date('2021-05-10'),
        serviceDetails: 'Oil change and tire rotation'
      }
    ],
    carImage: 'https://example.com/images/ford_mustang_gt.jpg'
  }
  // Add 98 more car records here
];

const seedCars = async () => {
  try {
  const cars1 = await Car.find();
  if(cars1.length){
    return;
  }
    await mongoose.connection.dropCollection('cars'); // Clear the existing data
    await Car.insertMany(cars);
    console.log('Data seeded successfully!');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedCars();
