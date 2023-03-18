const express = require("express"),
  morgan = require("morgan"),
  fs = require("fs"),
  path = require("path"),
  uuid = require('uuid'),
  bodyParser = require('body-parser');
const { title } = require("process");

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
  flags: "a",
});

app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error");
});

let users = [
  {
    id: 1,
    name: 'john',
    favoriteMovies: ["Dragon ball super: Broly"]
  },
  {
    id: 2,
    name: 'Erick',
    favoriteMovies: []
  },
  {
    id: 3,
    name: 'Gustavo',
    favoriteMovies: []
  },
]

let movies = [
  {
    "Title": "Skinamarink",
    "Description":"Two children wake up in the middle of the night to find their father is missing, and all the windows and doors in their home have vanished.",
    "Genre":{

     "Name":"Horror",
    "Description":"fiction that is intended to disturb, frighten or scare. Horror is often divided into the sub-genres of psychological horror and supernatural horror, which are in the realm of speculative fiction"
  },
    "Director":{
      "Name": "Kyle Edward Bell",
      "Bio": "Kyle Edward Ball is a Canadian filmmaker, best known for writing and directing the experimental horror film Skinamarink.",
      "Birth":""
    },
    "ImageURL":"https://variety.com/wp-content/uploads/2022/12/Skinamarink-Horizontal.png?w=681&h=383&crop=1&resize=450%2C253",
    "Featured": false 

  },
  {
    "Title": "The Poughkeepsie Tapes",
    "Description":"In an abandoned house in Poughkeepsie, New York murder investigators uncover hundreds of tapes showing decades of a serial killer's work.",
    "Genre":{

      "Name": "Thriller",
      "Description": "fiction with numerous, often overlapping, subgenres, including crime, horror and detective fiction. Thrillers are characterized and defined by the moods they elicit, giving their audiences heightened feelings of suspense, excitement, surprise, anticipation and anxietyr"
    },
    "Director": {
      "Name": "John Erick Dowdle",
      "Bio":"John grew up in the Twin Cities of Minnesota. After graduating St. Thomas Academy, an all-boys, military, Catholic highschool, John moved to Iowa City to attend the University of Iowa. There he would make the move from writing to film. Two years later, John moved to Manhattan to attend NYU's film program. After graduating NYU, John moved to Los Angeles to pursue a career in filmmaking. John wrote and directed his first feature, Full Moon Rising (1996) just out of college. For his sophomore effort, The Dry Spell, John was joined by his brother Drew, who produced the film as John wrote, directed and edited. They now live in Los Angeles, working together as The Brothers Dowdle.",
      "Birth":"December 21, 1972"
    },
    "ImageURL":"https://m.media-amazon.com/images/M/MV5BMTQ5OTA3NzA2N15BMl5BanBnXkFtZTcwODk2MDc0MQ@@._V1_.jpg",
    "Featured":false
  },
  {
    "Title": "Interstellar",
    "Description":"A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    "Genre":{

      "Name": "Adventure",
      "Description": " fiction that usually presents danger, or gives the reader a sense of excitement. Some adventure fiction also satisfies the literary definition of romance fiction"
    },
    "Director": {
      "Name": "Christopher Nolen",
      "Bio":"Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970, in London, England. Over the course of 15 years of filmmaking, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made.",
      "Birth":"July 30, 1970"
    },
    "ImageURL":"https://hbomax-images.warnermediacdn.com/images/GYGP7pwQv_ojDXAEAAAFc/tileburnedin?size=1280x720&partner=hbomaxcom&v=bd4e8b8745a1fcccbb19d76012ae572e&host=art-gallery.api.hbo.com&language=en-us&w=1280",
    "Featured":false

  },
  {
    "Title": "Grave Encounters",
    "Description":"For their ghost hunting reality show, a production crew locks themselves inside an abandoned mental hospital that's supposedly haunted - and it might prove to be all too true.",
    "Genre":{

      "Name": "Horror",
      "Description": "fiction that is intended to disturb, frighten or scare. Horror is often divided into the sub-genres of psychological horror and supernatural horror, which are in the realm of speculative fiction"
    },
    "Director": {
      "Name": "Colin Minihan",
      "Bio":"Minihan wrote, directed and edited the SXSW breakout thriller What Keeps You Alive (2018). The film, produced by Minihan's production company Digital Interference, was a New York Times Critics' pick and hit the top 10 on Netflix US charts. Minihan is also known for co-creating the popular Grave Encounters (2011) franchise, released by Tribeca Film. Minihan co-wrote and directed It Stains the Sands Red (2016), winner of the Midnight Extreme Award at The Sitges International Film Festival. The film was released by Dark Sky Films after its US premiere at the LA Film Festival.",
      "Birth":"1985"
    },
    "ImageURL":"https://resizing.flixster.com/XAqjZxjTJyV5_GzMOhIJuTOD3vc=/300x300/v2/https://resizing.flixster.com/QxxpbRHfLEOMANC_izpgiIEjDzw=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzhhZjM4YzNlLTRiNmYtNDliNS1iMWIyLTc1YmIzM2NmN2Y0ZC53ZWJw",
    "Featured":false
  },
  {
    "Title": "The Ritual",
    "Description":"A group of old college friends reunite for a trip to a forest in Sweden, Northern Europe, but encounter a menacing presence there stalking them.",
    "Genre":{

      "Name": "Horror",
      "Description": "fiction that is intended to disturb, frighten or scare. Horror is often divided into the sub-genres of psychological horror and supernatural horror, which are in the realm of speculative fiction"
    },
    "Director": {
      "Name": "David Bruckner",
      "Bio":"David Bruckner is an American film director. With Jacob Gentry and Dan Bush, he co-wrote and co-directed the 2007 horror film The Signal.",
      "Birth":"1977"
    },
    "ImageURL":"https://upload.wikimedia.org/wikipedia/en/f/ff/The_Ritual_UK_poster.png",
    "Featured":false
  },
  {
    "Title": "CloverField",
    "Description":"A group of friends venture deep into the streets of New York on a rescue mission during a rampaging monster attack.",
    "Genre":{

      "Name": "Horror",
      "Description": "fiction that is intended to disturb, frighten or scare. Horror is often divided into the sub-genres of psychological horror and supernatural horror, which are in the realm of speculative fiction"
    },
    "Director": {
      "Name": "Matt Reeves",
      "Bio":"Matthew George 'Matt' Reeves was born April 27, 1966 in Rockville Center, New York, USA and is a writer, director and producer. Reeves began making movies at age eight, directing friends and using a wind-up camera. He befriended filmmaker J.J. Abrams when both were 13 years old and a public-access television cable channel, Z Channel, aired their short films.",
      "Birth":"April 27, 1966"
    },
    "ImageURL":"https://m.media-amazon.com/images/M/MV5BZDNhNDJlNDktZDI4OC00OTE3LWI2M2UtOThkNTFkNjBjYzRmXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
    "Featured":false
  },
  {
    "Title": "Incantation",
    "Description":"Six years ago, Li Ronan was cursed after breaking a religious taboo. Now, she must protect her daughter from the consequences of her actions.",
    "Genre":{

      "Name": "Mystery",
      "Description": "fiction genre where the nature of an event, usually a murder or other crime, remains mysterious until the end of the story. Often within a closed circle of suspects, each suspect is usually provided with a credible motive and a reasonable opportunity for committing the crime"
    },
    "Director": {
      "Name": "Kevin Ko",
      "Bio":"Taiwanese filmmaker Kevin KO came to prominence for a series of short films he made in college, including horror THE PRINT that screened at festivals in Japan and South Korea. He made his directorial debut with 2009 slasher-horror INVITATION ONLY , which pushed the boundaries of good taste in Taiwan cinema with its fast cars, dismemberment and a Japanese adult video actress.",
      "Birth":"October 27, 1983"
    },
    "ImageURL":"https://m.media-amazon.com/images/M/MV5BYjUxZGI1ODQtMDljMS00ZTUwLWI0NTMtYjc2YmUyZTM3YTdhXkEyXkFqcGdeQXVyNTM2NTY4NzU@._V1_FMjpg_UX1000_.jpg",
    "Featured":false
  },
  {
    "Title": "The Autopsy pf Jane Doe",
    "Description":"A father and son, both coroners, are pulled into a complex mystery while attempting to identify the body of a young woman, who was apparently harboring dark secrets.",
    "Genre":{

      "Name": "Horror",
      "Description": "fiction that is intended to disturb, frighten or scare. Horror is often divided into the sub-genres of psychological horror and supernatural horror, which are in the realm of speculative fiction"
    },
    "Director": {
      "Name": "André Øvredal",
      "Bio":"André Øvredal is known for Troll Hunter (2010), The Autopsy of Jane Doe (2016) and Tunnelen (2016)",
      "Birth":"May 6, 1973"
    },
    "ImageURL":"https://m.media-amazon.com/images/M/MV5BMjA2MTEzMzkzM15BMl5BanBnXkFtZTgwMjM2MTM5MDI@._V1_.jpg",
    "Featured":false
  },
  {
    "Title": "Dragon ball super: Broly",
    "Description":"Goku and Vegeta encounter Broly, a Saiyan warrior unlike any fighter they've faced before.",
    "Genre":{

      "Name": "Anime",
      "Description": "Anime is hand-drawn and computer-generated animation originating from Japan. Outside of Japan and in English, anime refers specifically to animation produced in Japan. However, in Japan and in Japanese, anime describes all animated works, regardless of style or origin."
    },
    "Director": {
      "Name": "Tatsuya Nagamine",
      "Bio":"Tatsuya Nagamine is known for Dragon Ball Super: Broly (2018), One Piece Film Z (2012) and Iesu! Purikyua 5 gô gô! Okashi no kuni no happî bâsudei (2008).",
      "Birth":"October 6, 1971"
    },
    "ImageURL":"https://m.media-amazon.com/images/M/MV5BMjhhMDU5Y2QtMzcyZS00ZGE1LTg3ZjMtMTYyOTM0OTFlYTRkXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    "Featured":false
  },
  {
    "Title": "Hush",
    "Description":"A deaf and mute writer who retreated into the woods to live a solitary life must fight for her life in silence when a masked killer appears at her window.",
    "Genre":{

      "Name": "Thriller",
      "Description": "fiction with numerous, often overlapping, subgenres, including crime, horror and detective fiction. Thrillers are characterized and defined by the moods they elicit, giving their audiences heightened feelings of suspense, excitement, surprise, anticipation and anxiety."
    },
    "Director": {
      "Name": "Mike Flanagan",
      "Bio":"Mike Flanagan was born in Salem, Massachusetts in 1978 to Timothy and Laura Flanagan. The family relocated frequently, as Timothy was in the U.S. Coast Guard, and finally settled in Bowie, Maryland. As a child, he would shoot and edit short movies on VHS. This continued as he attended Archbishop Spalding High School in Severn, Maryland, (Class of 1996) where he was active in the school's drama department and the president of the school's SGA. He also anchored the school's morning television show, and produced commercials and short videos for the students.",
      "Birth":"May 20, 1978"
    },
    "ImageURL":"https://static.metacritic.com/images/products/movies/9/22230fcce928fd404ef1466ffb1fd6d7-250h.jpg",
    "Featured":false
  }
]

//READ
app.get("/", (req, res) => {
  res.send("my Movie Api!");
});

app.get('/documentation', (req, res) => {                  
  console.log('Documentation Request');
  res.sendFile('public/Documentation.html', {root: __dirname});
});

app.get("/movies", (req, res) => {
  res.status(200).json(movies);
});

app.get('/movies/:title', (req, res) => {
  const {title} = req.params;
  const movie = movies.find( movie => movie.Title === title);

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send('no such movie')
  }
});

app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find( movie => movie.Genre.Name === genreName).Genre;

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send('no such genre')
  }
});

app.get('/movies/directors/:directorName', (req, res ) => {
  const { directorName } = req.params;
  const director = movies.find( movie => movie.Director.Name === directorName ).Director;

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send('no such director')
  }
 });

 // CREATE
 app.post('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser)
  } else {
    res.status(400).send('users need names')
  }
 });

 //UPDATE
 app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find( user => user.id == id );
  if (user){
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send('no such user')
  }
 });

 //CREATE
 app.post('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find( user => user.id == id );
  if (user){
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);
  } else {
    res.status(400).send('no such user')
  }
 });

 //DELETE
 app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find( user => user.id == id );
  if (user){
    user.favoriteMovies =user.favoriteMovies.filter(title => title !== movieTitle);
    res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);
  } else {
    res.status(400).send('no such user')
  }
 });

 //DELETE
 app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  let user = users.find( user => user.id == id );
  if (user){
    users = users.filter( user => user.id != id);
    res.status(200).send(` user ${id} has been deleted`);
  } else {
    res.status(400).send('no such user')
  }
 });


app.listen(8005, () => {
  console.log("App listening on port 8005");
});