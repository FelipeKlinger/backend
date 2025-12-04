const Note = require("../models/note");

const initialNotes = [
  {
    content: "HTML is easy",
    important: false,
  },
  {
    content: "Browser can execute only JavaScript",
    important: true,
  },
  {
    content: "Felipe Haciendo pruebas",
    important: false,
  },
];

const nonExistingId = async () => {
  const note = new Note({ content: "Cualquier cosa" });
  await note.save();
  await note.deleteOne();
  return note._id.toString();
};

const notesInDb = async () => {
  const notes = await Note.find({});
  return notes.map((note) => note.toJSON());
};

module.exports = {
  initialNotes,
  nonExistingId,
  notesInDb,
};
