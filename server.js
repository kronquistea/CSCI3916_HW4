var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var authController = require('./auth');
var authJwtController = require('./auth_jwt');
var jwt = require('jsonwebtoken');
var cors = require('cors');
var User = require('./Users');
var Movie = require('./Movies');
var Review = require('./Reviews');

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

var router = express.Router();

function getJSONObjectForMovieRequirement(req) {
    var json = {
        headers: "No headers",
        key: process.env.UNIQUE_KEY,
        body: "No body"
    };

    if (req.body != null) {
        json.body = req.body;
    }

    if (req.headers != null) {
        json.headers = req.headers;
    }

    return json;
}

router.post('/signup', function(req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Please include both username and password to signup.'})
    } else {
        var user = new User();
        user.name = req.body.name;
        user.username = req.body.username;
        user.password = req.body.password;

        user.save(function(err){
            if (err) {
                if (err.code == 11000)
                    return res.json({ success: false, message: 'A user with that username already exists.'});
                else
                    return res.json(err);
            }

            res.json({success: true, msg: 'Successfully created new user.'})
        });
    }
});

router.post('/signin', function (req, res) {
    var userNew = new User();
    userNew.username = req.body.username;
    userNew.password = req.body.password;

    User.findOne({ username: userNew.username }).select('name username password').exec(function(err, user) {
        if (err) {
            res.send(err);
        }

        user.comparePassword(userNew.password, function(isMatch) {
            if (isMatch) {
                var userToken = { id: user.id, username: user.username };
                var token = jwt.sign(userToken, process.env.SECRET_KEY);
                res.json ({success: true, token: 'JWT ' + token});
            }
            else {
                res.status(401).send({success: false, msg: 'Authentication failed.'});
            }
        })
    })
});

router.route('/movies')
    .get(authJwtController.isAuthenticated, async (req, res) => {
      try {
        const movies = await Movie.find({}); // Fetch all movies from the database
        return res.json(movies); // Return the movies as JSON
      } catch (err) {
        console.error(err); // Log the error
        res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' }); // 500 Internal Server Error
      }
    })
    .post(authJwtController.isAuthenticated, async (req, res) => {
      try {
        if(!req.body.actors || req.body.actors.length === 0) {
            return res.status(400).json({ success: false, message: 'At least one actor is required.' }); // 400 Bad Request
        }
        else {
          const movie = new Movie(req.body); // Create a new movie with the request body
          await movie.save();
          res.status(201).json({ success: true, msg: 'Movie created successfully.', movie });
        }
      } catch (err) {
        console.error(err); // Log the error
        res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' }); // 500 Internal Server Error
      }
    });

router.route('/movies/:title')
    .get(authJwtController.isAuthenticated, async (req, res) => {
      try{
        const movie = await Movie.findOne({ title: req.params.title }); // Find movie by title
        if (!movie) {
          return res.status(404).json({ success: false, message: 'Movie not found.' }); // 404 Not Found
        }
        res.json({success: true, msg: "Movie Found", movie});
      } catch (err) {
        console.error(err); // Log the error
        res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' }); // 500 Internal Server Error
      }
    })
    .put(authJwtController.isAuthenticated, async (req, res) => {
      try{
        const movie = await Movie.findOneAndUpdate(
          { title: req.params.title }, 
          req.body, 
          { new: true, runValidators: true } // Return the updated document and run validators
        );
        if (!movie) {
          return res.status(404).json({ success: false, message: 'Movie not found.' }); // 404 Not Found
        }
        res.json({ success: true, msg: 'Movie updated successfully.', movie }); // Return success message
      } catch (err) {
        console.error(err); // Log the error
        res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' }); // 500 Internal Server Error
      }
    })
    .delete(authJwtController.isAuthenticated, async (req, res) => {
      try{
        const movie = await Movie.findOneAndDelete({ title: req.params.title }); // Delete movie by title
        if (!movie) {
          return res.status(404).json({ success: false, message: 'Movie not found.' }); // 404 Not Found
        }
        res.json({ success: true, msg: 'Movie deleted successfully.', movie }); // Return success message
      } catch (err) {
        console.error(err); // Log the error
        res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' }); // 500 Internal Server Error
      }
    });

router.route('/reviews')
    .get(authJwtController.isAuthenticated, async (req, res) => {
        try {
            const reviews = await Review.find({});
            return res.json(reviews); // Return the movies as JSON
        } catch (err) {
            console.error(err); // Log the error
            res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' }); // 500 Internal Server Error
        }
    })
    .post(authJwtController.isAuthenticated, async (req, res) => {
        try {
            const review = new Review(req.body);
            await review.save();
            res.status(201).json({ success: true, msg: 'Review created successfully.', review });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
        }
    })
    .delete(authJwtController.isAuthenticated, async (req, res) => {
        try {
            const review = await Review.findOneAndDelete({ _id: req.params.id });
            if (!review) {
                return res.status(404).json({ success: false, message: 'Review not found.' });
            }
            res.json({ success: true, msg: 'Review deleted successfully.', review });
        } catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: 'Something went wrong. Please try again later.' });
        }
    });

app.use('/', router);

const PORT = process.env.PORT || 8080; // Define PORT before using it
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // for testing only