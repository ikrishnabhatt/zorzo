const express = require('express');
const bodyParser = require('body-parser');
const cartRoutes = require('./routes/cartRoutes.cjs');

const app = express();
const PORT = 5173;

// Middleware
app.use(bodyParser.json());

// Routes
app.use(cartRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});