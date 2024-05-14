import express from 'express'; // Import 'fetch' module if using Node.js

const app = express();

async function generateRandomJokes() {
    const response = await fetch('https://official-joke-api.appspot.com/jokes/random');
    const parsedResponse = await response.json();
    return parsedResponse;
}

app.get('/api/image/jokes', async (req, res) => { // Make the route handler asynchronous
    try {
        const randomJokes = await generateRandomJokes(); // Await the result of the asynchronous function
        res.json({ jokes: randomJokes }); // Send the response after the function completes
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' }); // Handle errors if any
    }
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
