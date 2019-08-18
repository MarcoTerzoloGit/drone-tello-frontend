const express = require('express');
const path = require('path');
const app = express();
const PORT = 8979;

app.use(express.static("./public"));

/* app.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, './public/index.html'))
}) */

app.listen(PORT, () => console.log('listening on PORT', PORT))

