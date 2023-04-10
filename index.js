const express = require("express");
const app = express();
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Models = require("./models.js");
const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect("mongodb://localhost:27017/myFlixDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.static("public"));

//READ check
app.get("/", (req, res) => {
  res.send("my Movie Api!");
});
//Add a user
app.post("/users", (req, res) => {
  Users.findOne({ Username: req.body.Username })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + "already exists");
      } else {
        Users.create({
          Username: req.body.Username,
          Password: req.body.Password,
          Email: req.body.Email,
          Birthday: req.body.Birthday,
        })
          .then((user) => {
            res.status(201).json(user);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

//Get all users
app.get("/users", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// get a user by username
app.get("/users/:Username", (req, res) => {
  Users.findOne({ Username: req.params.Username })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Update a user's info, by username
app.put("/users/:Username", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
      },
    },
    { new: true }
  )
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((e) => {
      res.status(500).send("Error: " + e);
      console.error(e);
    });
});

//Add a movie to a user's list of favorites
// app.post("/users/:Username/movies/:MovieId", (req, res) => {
//   Users.findOneAndUpdate(
//     { Username: req.params.Username },
//     {
//       $push: { FavoriteMovies: req.params.MovieId },
//     },
//     { new: true }, // This line makes sure that the updated document is returned
//     (err, updatedUser) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send("Error: " + err);
//       } else {
//         res.json(updatedUser);
//       }
//     }
//   );
// });

// EXAMPLE WITH THEN AND CATCH
app.post("/users/:Username/movies/:MovieId", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $push: { FavoriteMovies: req.params.MovieId },
    },
    { new: true }
  )
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((e) => {
      res.status(500).send("Error: " + e);
      console.error(e);
    });
});

// EXAMPLE WITH ASYNC/AWAIT
// app.post("/users/:Username/movies/:MovieId", async (req, res) => {
//   try {
//     let updatedUser = await Users.findOneAndUpdate(
//       { Username: req.params.Username },
//       { $push: { FavoriteMovies: req.params.MovieId } },
//       { new: true }
//     );
//     res.json(updatedUser);
//   } catch (e) {
//     console.error(e);
//     res.status(500).send("Error: " + e);
//   }
// });

//Deleted a user by username
app.delete("/users/:Username", (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found");
      } else {
        res.status(200).send(req.params.Username + " was deleted.");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Delete a movie from user list
// app.delete("/users/:Username/movies/:MovieId", (req, res) => {
//   Users.findOneAndUpdate(
//     { Username: req.params.Username },
//     {
//       $pull: { FavoriteMovies: req.params.MovieId },
//     },
//     { new: true },
//     (err, updatedUser) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send("Error: " + err);
//       } else {
//         res.json(updatedUser);
//       }
//     }
//   );
// });

app.delete("/users/:Username/movies/:MovieId", (req, res) => {
  Users.findOneAndUpdate(
    { Username: req.params.Username },
    {
      $pull: { FavoriteMovies: req.params.MovieId },
    },
    { new: true }
  )
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((e) => {
      res.status(500).send("Error: " + e);
      console.error(e);
    });
});

//get all movies check
app.get("/movies", (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      res.status(500).send("Error: " + err);
    });
});

//Get a movie by title check
app.get("/movies/:Title", (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});
//Get a Movie by Genre check
app.get("/movies/genre/:genreName", (req, res) => {
  Movies.findOne({ "Genre.Name": req.params.genreName })
    .then((movie) => {
      res.json(movie.Genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//Get a Movie by director check
app.get("/movies/directors/:directorName", (req, res) => {
  Movies.findOne({ "Director.Name": req.params.directorName })
    .then((movie) => {
      res.json(movie.Director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

//check
app.get("/documentation", (req, res) => {
  console.log("Documentation Request");
  res.sendFile("public/Documentation.html", { root: __dirname });
});

//error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error? why? :(");
});

app.listen(8080, () => {
  console.log("App listening on port 8080");
});
