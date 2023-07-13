const mongoose = require("mongoose");
const connectDb = async () => {
  try {
    await mongoose.connect("mongodb+srv://Pratik:Pratik1807@cluster0.7thpltd.mongodb.net/?retryWrites=true&w=majority");
    console.log(`Database connected`);
  } catch (error) {
    console.log(`${error}`);
  }
};

module.exports = connectDb;