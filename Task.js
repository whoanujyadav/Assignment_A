const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios'); // for making HTTP requests to the Pantry API

const app = express();
const port = 9443;

app.use(bodyParser.json());

// Pantry ID (Replace with your actual Pantry ID)
const pantryId = '43eb6b97-08f1-4bcf-ab62-5336ee66988d';

// Sample in-memory data store for the Pantry API
const pantryData = {};

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Rest of your API implementation...

// Create (POST) Endpoint
app.post('/add-item', async (req, res) => {
    const { basketKey, payload } = req.body;
  
    try {
      // Make a POST request to the Pantry API to add the item
      const response = await axios.post(
        `https://getpantry.cloud/apiv1/pantry/${pantryId}/basket/${basketKey}`,
        payload
      );
  
      if (response.status === 200) {
        res.json({ message: 'Item added successfully' });
      } else {
        res.status(500).json({ error: 'Failed to add item' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });

  // Rest of your Express application setup...

// GET Endpoint
app.get('/get-item', async (req, res) => {
    const { basketKey } = req.query;
  
    try {
      // Make a GET request to the Pantry API to retrieve the item
      const response = await axios.get(
        `https://getpantry.cloud/apiv1/pantry/${pantryId}/basket/${basketKey}`
      );
  
      if (response.status === 200) {
        res.json({ itemData: response.data });
      } else if (response.status === 404) {
        res.status(404).json({ error: 'Item not found' });
      } else {
        res.status(500).json({ error: 'Failed to retrieve item' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
  
  // List Baskets (GET) Endpoint with Filtering
  app.get('/list-baskets', async (req, res) => {
    const { filter } = req.query;
  
    try {
      // Make a GET request to the Pantry API to retrieve all baskets
      const response = await axios.get(
        `https://getpantry.cloud/apiv1/pantry/${pantryId}`
      );
  
      if (response.status === 200) {
        const baskets = Object.keys(response.data);
  
        // Filter baskets by name
        const filteredBaskets = baskets.filter((key) =>
          key.includes(filter || '')
        );
  
        res.json({ baskets: filteredBaskets });
      } else {
        res.status(500).json({ error: 'Failed to list baskets' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
  
  // Update (PUT) Endpoint
  app.put('/update-item', async (req, res) => {
    const { basketKey, payload } = req.body;
  
    try {
      // Make a PUT request to the Pantry API to update the item
      const response = await axios.put(
        `https://getpantry.cloud/apiv1/pantry/${pantryId}/basket/${basketKey}`,
        payload
      );
  
      if (response.status === 200) {
        res.json({ message: 'Item updated successfully' });
      } else if (response.status === 404) {
        res.status(404).json({ error: 'Item not found' });
      } else {
        res.status(500).json({ error: 'Failed to update item' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
  
  // DELETE Endpoint
  app.delete('/delete-item', async (req, res) => {
    const { basketKey } = req.body;
  
    try {
      // Make a DELETE request to the Pantry API to delete the item
      const response = await axios.delete(
        `https://getpantry.cloud/apiv1/pantry/${pantryId}/basket/${basketKey}`
      );
  
      if (response.status === 200) {
        res.json({ message: 'Item deleted successfully' });
      } else if (response.status === 404) {
        res.status(404).json({ error: 'Item not found' });
      } else {
        res.status(500).json({ error: 'Failed to delete item' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });