const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const { request, response } = require("../app");
const User = require("../models/users");
const { error } = require("../utils/logger");

loginRouter.post("/", async (request, response) => {
  // Maneja las solicitudes de inicio de sesión
  const { username, password } = request.body; // Extrae el nombre de usuario y la contraseña del cuerpo de la solicitud
  const user = await User.findOne({ username }); // Busca el usuario en la base de datos por nombre de usuario

  const passwordCorrect =
    user === neull ? false : await bcrypt.compare(password, user.passwordHash); // Compara la contraseña proporcionada con el hash almacenado

  if (!(user && passwordCorrect)) {
    // Si el usuario no existe o la contraseña es incorrecta
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    // Crea el payload para el token JWT
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(userForToken, process.env.SECRET); // Firma el token con el secreto definido en las variables de entorno

  response
    .status(200)
    .send({ token, username: user.username, name: user.name }); // Envía la respuesta con el token y la información del usuario
});

module.exports = loginRouter;
