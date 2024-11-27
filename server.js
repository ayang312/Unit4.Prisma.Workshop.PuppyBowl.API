const express = require("express");
const app = express();

const port = process.env.PORT || 3000;

// Body-parsing middleware
app.use(express.json());
app.use(require("morgan")("dev"));

// API routes
app.use('/api', require('./api'));

// Simple error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    const status = err.status ?? 500;
    const message = err.message ?? 'Internal Server Error';
    res.status(status).json({message});
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
