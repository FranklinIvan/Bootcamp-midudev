const express = require('express');
const app = express()

app.use(express.json())

let notes = [
    {
        id: 1,
        content: 'HTML is easy',
        date: '2019-05-30T17:30:31.098Z',
        important: true,
    },
    {
        id: 2,
        content: 'Browser can execute only JavaScript',
        date: '2019-05-30T18:39:34.091Z',
        important: false,
    },
    {
        id: 3,
        content: 'GET and POST are the most important methods of HTTP protocol',
        date: '2019-05-30T19:20:14.298Z',
        important: true,
    },
]

app.get('/', (req, res) => {
    res.send('<h1>hi there</h1>')
})

app.get('/info', (req,res) => {
   
    const info = `Phonebook has info for ${notes.length} people`
    const date = new Date().toISOString();

    console.log(info);
    console.log(date);

    res.send(`${info} <br> ${date}`)
})

app.get('/api/notes', (req, res) => {
    if (notes) res.json(notes)
    else res.status(404).end()
})

app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find(note => note.id === id)

    if (note) res.json(note)
    else res.status(404).end()
})

app.post('/api/notes', (req, res) => {
    const body = req.body

    if (!body || !body.content) return res.status(400).json({
        error: true,
        message: 'no note, check and try again'
    })
    
    const ids = notes.map(note => note.id)
    const maxId = Math.max(...ids)

    const newNote = {
        id: maxId + 1,
        content: body.content,
        important: typeof body.important !== 'undefined' ? body.important : false,
        date: new Date().toISOString(),
    }

    notes = notes.concat(newNote)

    if (newNote) res.status(201).json(newNote)
    else res.status(404).end()
})

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id);
    res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => console.log('Server on port', PORT))
