//initial definitions
const express = require('express'); 
const path = require('path'); 
const bodyParser = require('body-parser'); 
ejs = require('ejs')

const PORT_NUMBER = 8080;

const app = express(); 
app.engine("html", ejs.renderFile);
app.set("view engine", "html");

// Middleware
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data
app.use(bodyParser.json()); // Parse JSON data
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
app.use(session({
    secret: 'IffatIsAGenius',
    resave: false,
    saveUninitialized: true
}));

// Set EJS as the template engine
app.engine("html", ejs.renderFile);
app.set("view engine", "html");
app.set("views", path.join(__dirname, "views"));



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
app.post('/auth/signup', (req, res) => {
    const { fullName, email, password } = req.body;
    
    // Dummy logic for signup (Replace with DB logic and need to make decision on what we using you feel)
    req.session.user = { fullName, email };
    res.redirect('/dashboard'); // Redirect to user dashboard after signup
});



// POST /auth/login
app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    // Dummy authentication logic , idk how to do this and mine never workedd in 2095
    if (email === "test@example.com" && password === "password") {
        req.session.user = { email };
        res.redirect('/dashboard');
    } else {
        res.send("Invalid login credentials");
    }
});


// POST /auth/logout
app.post('/auth/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});


// GET /auth/me  (current logged in user)
app.get('/auth/me', (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).send("Not logged in");
    }
});

//GET /dashboard for user dashboard (after login/signup)
app.get('/dashboard', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    res.render('dashboard', { user: req.session.user });
});



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



app.listen(PORT_NUMBER, function () {
    console.log(`Server is running at http://localhost:${PORT_NUMBER}`)
});