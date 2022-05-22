import express from 'express'

const app = express();

app.get('/user', (req, res) => {
    return res.send('Hello world!')
})

app.listen(3333, () => {
    console.log('HTTP server running')
});