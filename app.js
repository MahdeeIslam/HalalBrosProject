// Initial definitions
const express = require('express'); 
const path = require('path'); 
const bodyParser = require('body-parser'); 
const ejs = require('ejs');

const PORT_NUMBER = 8080;
const app = express(); 

// Middleware
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data
app.use(bodyParser.json()); // Parse JSON data
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Set EJS as the template engine
app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "views")); // Views are in the "views" folder

// Route for homepage
app.get('/', (req, res) => {
    res.render('index'); // Views/index.html
});

// Restaurant and Halal Places management
// Get a list of all halal restaurants
app.get('/restaurants', (req, res) => {
    // Logic for fetching and rendering restaurant data from DB
    res.render('restaurants'); // Example page to show the list
});

// Get details of a specific restaurant
app.get('/restaurants/:id', (req, res) => {
    const restaurantId = req.params.id;
    // Logic for fetching and rendering details of the restaurant
    res.render('restaurant-details', { id: restaurantId });
});

// Add a new restaurant (Admin only)
app.post('/restaurants', (req, res) => {
    const { name, location, halalCertified, dishes } = req.body;
    // Logic to add a new restaurant
    res.redirect('/restaurants'); // Redirect to restaurant list
});

// Update restaurant details (Admin only)
app.put('/restaurants/:id', (req, res) => {
    const { name, location, halalCertified, dishes } = req.body;
    const restaurantId = req.params.id;
    // Logic to update restaurant details in DB

    
    res.redirect(`/restaurants/${restaurantId}`); // Redirect to updated restaurant page
});

// Delete a restaurant (Admin only)
app.delete('/restaurants/:id', (req, res) => {
    const restaurantId = req.params.id;
    // Logic to delete the restaurant
    res.redirect('/restaurants'); // Redirect to restaurant list
});

// Search and Filters
// Search for restaurants based on name, cuisine, location, or keyword
app.get('/search', (req, res) => {
    const { query, location } = req.query;
    // Logic to search restaurants based on query and location
    res.render('search-results', { query, location });
});

// Filter restaurants based on user preference
app.get('/filters', (req, res) => {
    const { cuisine, rating, openNow } = req.query;
    // Logic to filter restaurants based on cuisine, rating, and openNow
    res.render('filtered-restaurants', { cuisine, rating, openNow });
});

// Reviews and Ratings
// Get all reviews for a restaurant
app.get('/restaurants/:id/reviews', (req, res) => {
    const restaurantId = req.params.id;
    // Logic to fetch reviews for the restaurant
    res.render('reviews', { restaurantId });
});

// Add a new review for a restaurant
app.post('/restaurants/:id/reviews', (req, res) => {
    const restaurantId = req.params.id;
    const { user, review, rating } = req.body;
    // Logic to add a new review
    res.redirect(`/restaurants/${restaurantId}/reviews`);
});

// Edit or delete a review (only by the user who wrote it or admin)
app.put('/reviews/:id', (req, res) => {
    const reviewId = req.params.id;
    const { review, rating } = req.body;
    // Logic to update review
    res.redirect(`/restaurants/${reviewId}`);
});

app.delete('/reviews/:id', (req, res) => {
    const reviewId = req.params.id;
    // Logic to delete review
    res.redirect('/restaurants'); // Redirect to restaurant list
});

// Halal Certification and Verification
// List of Halal-certified restaurants
app.get('/certifications', (req, res) => {
    // Logic to list certified halal restaurants
    res.render('certified-restaurants');
});

// Request certification for a restaurant (Admin or verified user only)
app.post('/restaurants/:id/certify', (req, res) => {
    const restaurantId = req.params.id;
    // Logic to request certification for the restaurant
    res.redirect(`/restaurants/${restaurantId}`);
});

// AI-powered search integration (optional)
// Search for halal experiences, restaurants, and dishes
app.get('/ai-search', (req, res) => {
    const query = req.query.query;
    // Logic for AI-powered search
    res.render('ai-search-results', { query });
});

// Halal Experiences and Locations
// Get a list of halal-friendly experiences (mosques, prayer rooms, etc.)
app.get('/experiences', (req, res) => {
    // Logic to list halal-friendly experiences
    res.render('experiences');
});

// Get details of a halal experience
app.get('/experiences/:id', (req, res) => {
    const experienceId = req.params.id;
    // Logic to fetch experience details
    res.render('experience-details', { experienceId });
});

// Add a new halal experience (Admin only)
app.post('/experiences', (req, res) => {
    const { name, location, type } = req.body;
    // Logic to add a new halal experience
    res.redirect('/experiences');
});

// Update an experience (Admin only)
app.put('/experiences/:id', (req, res) => {
    const experienceId = req.params.id;
    const { name, location, type } = req.body;
    // Logic to update experience
    res.redirect(`/experiences/${experienceId}`);
});

// Delete an experience (Admin only)
app.delete('/experiences/:id', (req, res) => {
    const experienceId = req.params.id;
    // Logic to delete experience
    res.redirect('/experiences');
});

// Booking and Reservation System
// Book a table at a restaurant
app.post('/restaurants/:id/book', (req, res) => {
    const restaurantId = req.params.id;
    const { userId, bookingTime } = req.body;
    // Logic to book a table
    res.redirect(`/restaurants/${restaurantId}`);
});

// Get user bookings
app.get('/users/:id/bookings', (req, res) => {
    const userId = req.params.id;
    // Logic to fetch user bookings
    res.render('user-bookings', { userId });
});

// Cancel a booking
app.delete('/bookings/:id', (req, res) => {
    const bookingId = req.params.id;
    // Logic to cancel a booking
    res.redirect('/user-bookings');
});

// Newsletter Subscription
// Subscribe to the newsletter
app.post('/subscribe', (req, res) => {
    const { email } = req.body;
    // Logic to subscribe to the newsletter
    res.send(`Subscribed ${email}`);
});

// Unsubscribe from the newsletter
app.delete('/unsubscribe/:email', (req, res) => {
    const email = req.params.email;
    // Logic to unsubscribe from the newsletter
    res.send(`Unsubscribed ${email}`);
});

// Admin Dashboard Routes (admin only)
// View and manage users, restaurants, reviews, etc.
app.get('/admin/users', (req, res) => {
    // Admin-only route to manage users
    res.render('admin-users');
});

app.get('/admin/restaurants', (req, res) => {
    // Admin-only route to view all restaurants
    res.render('admin-restaurants');
});

app.get('/admin/reviews', (req, res) => {
    // Admin-only route to monitor reviews
    res.render('admin-reviews');
});

// Start the server
app.listen(PORT_NUMBER, function () {
    console.log(`Server is running at http://localhost:${PORT_NUMBER}`);
});
