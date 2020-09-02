import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import { SearchBar } from "./components/SearchBar";
import { ApiSettingsButton } from "./components/ApiSettingsButton";
import { NominationsList } from "./components/NominationList";
import { SearchResults } from "./components/SearchResults";
import { PositionedSnackbar } from "./components/Snackbar";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";
import _ from "lodash";

function App() {
  const [searchKey, setSearchKey] = useState("");
  const [movieData, setMovieData] = useState([]);
  const [numResult, setNumResults] = useState(0);
  const [page, setPage] = useState(1);
  const [isError, setIsError] = useState(true);
  const [error, setError] = useState(null);
  const [nominations, setNominations] = useState(
    JSON.parse(localStorage.getItem("nominations") || "{}")
  );
  const [isFiveNominations, setIsFiveNominations] = useState(false);
  // API Key is currently hard coded in
  const [apikey, setApiKey] = useState(
    localStorage.getItem("apikey") || "cbf06e88"
  );

  // set api key and update in local storage
  const onApiChange = (apikey) => {
    setApiKey(apikey);
    localStorage.setItem("apikey", apikey);
  };

  // set nominations to local storage
  const onSetNomination = (nominations) => {
    setNominations(nominations);
    localStorage.setItem("nominations", JSON.stringify(nominations));
  };

  // Add movie from nominmation list
  const addNomination = (imdbID) => {
    if (Object.keys(nominations).length < 5) {
      const newNomination = movieData[imdbID];
      onSetNomination({ ...nominations, [imdbID]: newNomination });
    }
  };

  // Remove movie from nominmation list
  const removeNomination = (imdbID) => {
    const newNomination = { ...nominations };
    delete newNomination[imdbID];
    onSetNomination(newNomination);
  };

  // when page number changes
  const handlePageChange = (event, value) => {
    setPage(value);
    sendQuery(searchKey, value);
  };

  // debounce - delay query to 300m to not over load the fetch
  const delayedQuery = useCallback(
    _.debounce((searchKey) => sendQuery(searchKey), 300),
    []
  );
  const onSearchChange = (e) => {
    setSearchKey(e.target.value);
    delayedQuery(e.target.value);
  };

  // send query to fetch movie list if keyword search is longer than 2 characters
  const sendQuery = (searchKey, page) => {
    const url =
      "http://www.omdbapi.com/?apikey=" +
      apikey +
      "&s=" +
      searchKey +
      "&page=" +
      page +
      "&type=movie";
    if (searchKey.length > 2) {
      fetch(url, {
        method: "GET",
      })
        .then((response) => response.json())
        .then(
          (result) => {
            if (result.Response === "True") {
              setNumResults(result.totalResults);
              const data = {};
              result.Search.forEach((item) => {
                data[item.imdbID] = item;
              });
              setMovieData(data);
              setIsError(false);
            } else {
              setError(result.Error);
              setIsError(true);
            }
          },
          (error) => {
            setIsError(true);
            setError(error);
          }
        );
    }
  };

  // when api key changes - run query again
  useEffect(() => {
    sendQuery(searchKey, page);
  }, [apikey]);

  // update if nominations num changes. if hits 5 show alert
  useEffect(() => {
    if (Object.keys(nominations).length === 5) {
      setIsFiveNominations(true);
    } else if (Object.keys(nominations).length < 5) {
      setIsFiveNominations(false);
    }
  }, [nominations]);

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
        <ApiSettingsButton apikey={apikey} onApiChange={onApiChange} />
      </Box>
      <Box p={1}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper>
              <SearchBar onChange={onSearchChange} value={searchKey} />
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
                  page={page}
                  handlePageChange={handlePageChange}
                  isFiveNominations={isFiveNominations}
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
                <NominationsList
                  nominations={nominations}
                  removeNomination={removeNomination}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <PositionedSnackbar isFiveNominations={isFiveNominations} />
    </Box>
  );
}

export default App;
