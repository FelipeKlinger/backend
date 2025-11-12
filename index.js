const express = require('express')
const app = express();
const cors = require('cors');

app.use(cors()); // middleware to enable CORS

app.use(express.json()); // middleware to parse JSON bodies

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) { //  note is not undefined 
    response.json(note);
  } else {
    response.status(404).end(); // status() sets the status code, end() ends the response
  }
});

app.delete("/api/notes/:id", (request, response) => { // APIREST significa que cada recurso tiene su propia URL
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id); // note.id diferente del id del request, filtra  y guarda los elementos que no coinciden
  response.status(204).end();
});

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) { // !body.content is undefined, ojecto truhty falase
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
