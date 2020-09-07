const express = require('express');
const cors = require('cors');
const scrapping = require('./scrapping')

const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req,res) => {
    res.json({message: "server is working"});
})

app.get('/search/:movie', async (req,res) => {
    const data = await scrapping.getMovies(req.params.movie)
    res.json(data)
});


app.listen(5000, (req, res) => {
    console.log('Server is listenning on port 5000');
})

