import React, { useState } from "react";
import "./App.css";
import SearchBar from "./SearchBar";
import { ApiSettingsButton } from "./ApiSettingsButton";
import { NominationsResults } from "./NominationResults";
import { SearchResults } from "./SearchResults";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

function App() {
  const [searchKey, setSearchKey] = useState("");
  const [movieData, setMovieData] = useState([]);
  const [numResult, setNumResults] = useState(0);
  const [isError, setIsError] = useState(true);
  const [error, setError] = useState(null);
  const [nominations, setNominations] = useState(
    JSON.parse(localStorage.getItem("nominations") || "{}")
  );
  // API Key is currently hard coded in
  const [apikey, setApiKey] = useState(
    localStorage.getItem("apikey") || "cbf06e88"
  );
  const [isFiveNominationsBanner, setIsFiveNominationsBanner] = useState(false);
  const [isReachedMaxNominations, setIsReachedMaxNominations] = useState(false);

  // set nominations to local storage
  const onSetNomination = (nominations) => {
    setNominations(nominations);
    localStorage.setItem("nominations", JSON.stringify(nominations));
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

  // fetch movie list if keyword search is longer than 2 characters
  const onSearch = (searchKey) => {
    const url =
      "http://www.omdbapi.com/?apikey=" +
      apikey +
      "&s=" +
      searchKey +
      "&type=movie";
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
  };

  return (
    <Box
      className="App"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      p={3}
    >
      <Box p={2} className="Header">
        <img src="shoppies_logo.png" alt="shoppies logo" width="70%" />
      </Box>
      <Box
        m={2}
        className="API-settings"
        position="absolute"
        top={18}
        right={18}
      >
        <ApiSettingsButton apikey={apikey} setApiKey={setApiKey} />
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
                onChange={(e) => {
                  setSearchKey(e.target.value);
                  onSearch(e.target.value);
                }}
                value={searchKey}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>
              <Box p={1}>
                <SearchResults
                  searchKey={searchKey}
                  isError={isError}
                  error={error}
                  numResult={numResult}
                  addNomination={addNomination}
                  movieData={movieData}
                  nominations={nominations}
                />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>
              <Box p={1}>
                <h3>
                  <span role="img" aria-label="throphy">
                    🏆
                  </span>{" "}
                  Nominations List ({5 - Object.keys(nominations).length}{" "}
                  Remaining)
                </h3>
                <NominationsResults
                  nominations={nominations}
                  removeNomination={removeNomination}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default App;
