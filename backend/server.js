const express = require('express');
const routes = require('./routes/apis');
const cors = require('cors')
const port = 3000
const app = express();
app.use(cors())
app.use(express.json());
app.use('/', routes);

app.listen(port, () => console.log(`Running the best code on port: ${port}.`));