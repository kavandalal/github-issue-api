const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const route = require('./Routes/router');
const PORT = process.env.PORT || 3001;

if (process.env.NODE_ENV != 'PRODUCTION') {
	dotenv.config({ path: './.env' });
}

app.use(express.json());

app.use(express.json());
app.use(cors());

app.use('', route);
app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, './client/build/index.html'));
});

app.listen(PORT, () => console.log('Server is running on ', PORT));
