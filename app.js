//initial definitions
const express = require('express'); 
const path = require('path'); 
const bodyParser = require('body-parser'); 
ejs = require('ejs')

const PORT_NUMBER = 8080;

const app = express(); 
app.engine("html", ejs.renderFile);
app.set("view engine", "html");
//Potential routes


app.listen(PORT_NUMBER, function () {
    console.log(`Server is running at http://localhost:${PORT_NUMBER}`)
});
//route for homepage
app.get('/', (req, res) => {
    res.render('index');
    //logic for homepage
});

// Authentication and User Management
// POST /auth/signup



// POST /auth/login



// POST /auth/logout


// GET /auth/me  (current logged in user)



//Restaraunt and Halal Places management
// GET /restaurants -> Get a list of all halal restaurants



// GET /restaurants/:id -> Get details of a specific restaurant



// POST /restaurants -> Add a new restaurant (admin only)



// PUT /restaurants/:id -> Add a new restaurant (admin only)



// DELETE /restaurants/:id -> Update restaurant details (admin only)



//Search and Filters
// GET /search?query=<text>&location=<city> ->  Search for restaurants based on name, cuisine, location, or keyword




// GET /filters?cuisine=<type>&rating=<min_rating>&openNow=<true/false> -> Filter restaurants based on user preference




//Reviews and Ratings
// GET /restaurants/:id/reviews -> Get all reviews for a restaurant



// POST /restaurants/:id/reviews -> Request certification (admin or verified user only)




// PUT /reviews/:id -> Edit a review (only if it's the user's review)



// DELETE /reviews/:id -> Delete a review (only if it's the user's review or admin)




//Halal Certification and Verification
// GET /certifications -> List of Halal-certified restaurants


// POST /restaurants/:id/certify -> Request certification (admin or verified user only)



//AI powered search intergration (idk if we actually need this)
// GET /ai-search?query=<text> -> AI-based search for halal experiences, restaurants, and dishes



//Halal Experiences and Locations
//GET /experiences -> Get a list of halal-friendly experiences (mosques, prayer rooms, etc.)


//GET /experiences/:id -> Get details of a halal experience


//POST /experiences -> Add a new halal experience (admin only)


//PUT /experiences/:id -> Update an experience (admin only)


//DELETE /experiences/:id -> Delete an experience (admin only)



//Booking and reservation system
//POST /restaurants/:id/book -> Book a table



//GET /users/:id/bookings -> Get user bookings



//DELETE /bookings/:id -> Cancel a booking



// Newsletter subscribtion
// POST /subscribe -> Subscribe to the newsletter



// DELETE /unsubscribe/:email -> Unsubscribe from the newsletter


//Payment and commision system
//POST /payment -> Process payment for premium restaurant features


//GET /payment/history -> Get payment history for users



//Admin Dashboard Routes
// GET /admin/users -> Manage users (admin only)
// GET /admin/restaurants -> View all restaurants (admin only)
// GET /admin/reviews -> Monitor and manage reviews (admin only)



