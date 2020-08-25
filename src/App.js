import React, { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./SearchBar";
import FormDialog from "./FormDialog";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import { Button, IconButton, Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import MovieIcon from "@material-ui/icons/Movie";
import DeleteIcon from "@material-ui/icons/Delete";
import StarIcon from "@material-ui/icons/Star";

function App() {
  const [searchKey, setSearchKey] = useState("");
  const [movieData, setMovieData] = useState([]);
  const [numResult, setNumResults] = useState(0);
  const [isError, setIsError] = useState(true);
  const [error, setError] = useState(null);
  const [nominations, setNominations] = useState(
    JSON.parse(localStorage.getItem("nominations") || "{}")
  );
  const [apikey, setApiKey] = useState(localStorage.getItem("apikey") || "");
  const [showApiSetting, setShowApiSetting] = useState(false);
  const [isFiveNominationsBanner, setIsFiveNominationsBanner] = useState(false);
  const [isReachedMaxNominations, setIsReachedMaxNominations] = useState(false);

  // set nominations to local storage
  const onSetNomination = (nominations) => {
    setNominations(nominations);
    localStorage.setItem("nominations", JSON.stringify(nominations));
  };

  // set API Key to local storage
  const onSetApiKey = (apikey) => {
    setApiKey(apikey);
    localStorage.setItem("apikey", apikey);
  };

  // Add movie from nominmation list
  const addNomination = (imdbID) => {
    if (Object.keys(nominations).length < 4) {
      const newNomination = movieData[imdbID];
      onSetNomination({ ...nominations, [imdbID]: newNomination });
    } else if (Object.keys(nominations).length === 4) {
      const newNomination = movieData[imdbID];
      onSetNomination({ ...nominations, [imdbID]: newNomination });
      setIsFiveNominationsBanner(true);
    } else {
      setIsReachedMaxNominations(true);
    }
  };

  // Remove movie from nominmation list
  const removeNomination = (imdbID) => {
    const newNomination = { ...nominations };
    delete newNomination[imdbID];
    onSetNomination(newNomination);
  };

  // open API key settings
  const handleClickOpen = () => {
    setShowApiSetting(true);
  };
  useEffect(() => {
    if (apikey === "") {
      setShowApiSetting(true);
    }
  }, [apikey]);

  // GET MOVIE BACK FROM API ONLY RUN MORE THEN 2 CHARACTERS
  useEffect(() => {
    const url = "http://www.omdbapi.com/?apikey=" + apikey + "&s=" + searchKey;
    if (searchKey.length > 2) {
      fetch(url, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.Response === "True") {
            const data = {};
            result.Search.forEach((item) => {
              if (item.Type === "movie") {
                data[item.imdbID] = item;
              }
            });
            setMovieData(data);
            setIsError(false);
            setNumResults(result.totalResults);
          } else {
            setError(result.Error);
            setIsError(true);
          }
        });
    }
  }, [searchKey]);

  // SEARCH RESULTS
  let showSearchResults;
  if (searchKey.length < 3) {
    showSearchResults = (
      <div>
        <h3>🔍 Find a movie by typing a keyword in the search bar!</h3>
        <p>The keyword needs to be longer than 2 characters</p>
      </div>
    );
  } else if (isError === true) {
    showSearchResults = (
      <Box>
        <h3>
          🎞️ Results for "{searchKey}" ({0})
        </h3>
        <p>😵 Uh no... {error}</p>
      </Box>
    );
  } else {
    showSearchResults = (
      <div>
        <h3>
          🎞️ Results for "{searchKey}" ({numResult})
        </h3>
        <div>
          <List dense={true}>
            {Object.values(movieData).map((movie) => {
              const isNominated = nominations[movie.imdbID] !== undefined;
              return (
                <ListItem key={movie.imdbID}>
                  <ListItemAvatar>
                    <Avatar>
                      <MovieIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={movie.Title} secondary={movie.Year} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="add"
                      onClick={() => addNomination(movie.imdbID)}
                      disabled={isNominated}
                      color="primary"
                    >
                      <StarIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </div>
      </div>
    );
  }

  // SHOW NOMINATIONS
  let showNominations;
  if (Object.keys(nominations).length === 0) {
    showNominations = (
      <div>
        <p>
          Add something to the nomination list... <br />
        </p>
      </div>
    );
  } else {
    showNominations = (
      <div>
        <div>
          <List dense={true}>
            {Object.values(nominations).map((movie) => (
              <ListItem key={movie.imdbID}>
                <ListItemAvatar>
                  <Avatar>
                    <MovieIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={movie.Title} secondary={movie.Year} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="add"
                    onClick={() => removeNomination(movie.imdbID)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    );
  }

  return (
    <Box
      className="App"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      p={3}
    >
      <Box p={2} className="Header">
        <h1>The Shoppies</h1>
      </Box>
      <Box
        m={2}
        className="API-settings"
        position="absolute"
        top={18}
        right={18}
      >
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Set API Key
        </Button>
      </Box>
      <Box
        p={1}
        className="Alert-Banner-5movies"
        display={isFiveNominationsBanner ? "" : "None"}
      >
        {isFiveNominationsBanner && (
          <Alert
            severity="success"
            onClose={() => {
              setIsFiveNominationsBanner(false);
            }}
          >
            You have nominated 5 movies!
          </Alert>
        )}
      </Box>
      <Box
        p={1}
        className="Alert-Banner-Reached-Max"
        display={isReachedMaxNominations ? "" : "None"}
      >
        {isReachedMaxNominations && (
          <Alert
            severity="error"
            onClose={() => {
              setIsReachedMaxNominations(false);
            }}
          >
            You have reached the maximum amount of movie nominations. To add a
            movie, please remove another movie!
          </Alert>
        )}
      </Box>
      <Box p={1}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper>
              <SearchBar
                onChange={(e) => setSearchKey(e.target.value)}
                value={searchKey}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>
              <Box p={1}>{showSearchResults}</Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>
              <Box p={1}>
                <h3>
                  🏆 Nominations List ({5 - Object.keys(nominations).length}{" "}
                  Remaining)
                </h3>
                {showNominations}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <FormDialog
        isOpen={showApiSetting}
        onClose={() => {
          setShowApiSetting(false);
        }}
        value={apikey}
        onSetApiKey={onSetApiKey}
      />
    </Box>
  );
}

export default App;
