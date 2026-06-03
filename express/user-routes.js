const express = require('express');
const path = require('path');
const app = express();
const publicPath = path.join(__dirname, 'public');
// Serve static files from the 'public' directory
app.use(express.static(publicPath));
// Define route to serve 'index.html' as the home page
app.get('/', (req, res) => {
res.sendFile(`${publicPath}/index.html`);
});
// Handle 404 - Not Found
app.use((req, res) => {
res.status(404).sendFile(`${publicPath}/404.html`);
});
app.listen(3000, () => {
console.log('Server running on port 3000');