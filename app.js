const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Define Schemas and Models
const employeeSchema = new mongoose.Schema({
  name: String,
  role: String
});

const recipeSchema = new mongoose.Schema({
  name: String,
  price: Number
});

const Employee = mongoose.model('Employee', employeeSchema);
const Recipe = mongoose.model('Recipe', recipeSchema);

// Connect to MongoDB
mongoose.connect('mongodb+srv://test:DataBase03@cluster0.waxzdtb.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

// Define Routes
app.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});