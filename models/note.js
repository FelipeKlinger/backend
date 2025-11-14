require("dotenv").config(); // carga las variables de entorno desde el archivo .env

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI; // obtiene la URL de conexión desde las variables de entorno, process es un objeto global que contiene las variables de entorno del sistema operativo

console.log("connecting to", url); 

mongoose.connect(url)

  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
module.exports = mongoose.model("Note", noteSchema); // exporta el modelo Note basado en el esquema noteSchema
