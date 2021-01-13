import React, { useState, useCallback } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Box, Grid, Paper } from "@material-ui/core";
import "./App.css";
import { SearchBar } from "./components/SearchBar";
import { Nominations } from "./components/Nominations";
import { SearchResults } from "./components/SearchResults";
import _ from "lodash";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#f2c144",
    },
    secondary: {
      main: "#11cb5f",
    },
    background: {
      paper: "#15161A",
    },
  },
});

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

  // set nominations to local storage
  const onSetNomination = (nominations) => {
    setNominations(nominations);
    localStorage.setItem("nominations", JSON.stringify(nominations));
  };

  // Add movie from nominmation list
  const addNomination = (imdbID) => {
    const newNomination = movieData[imdbID];
    onSetNomination({ ...nominations, [imdbID]: newNomination });
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

  // handle reset nomatinations - clear all nomaintions
  const handleResetNominations = () => {
    onSetNomination({});
  };

  // debounce - delay query to 200m to not over load the fetch
  const delayedQuery = useCallback(
    _.debounce((searchKey) => sendQuery(searchKey), 200),
    []
  );
  const onSearchChange = (e) => {
    const searchKey = e.target.value;
    setSearchKey(searchKey);
    delayedQuery(searchKey);
  };

  // send query to fetch movie list if keyword search is longer than 2 characters
  const sendQuery = (searchKey, page) => {
    const url = `https://www.omdbapi.com/?apikey=cbf06e88&s=${searchKey.trim()}&page=${page}&type=movie`;
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

  return (
    <ThemeProvider theme={theme}>
      <Box
        className="App"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        p={3}
      >
        <Box p={2} className="Header">
          <img
            src="/the-shoppies/shoppies_logo.png"
            alt="The Shoppies"
            width="70%"
          />
        </Box>
        <Box>
          <Grid container direction="row-reverse" spacing={3}>
            <Grid item xs={12} sm={12} md={4}>
              <Paper>
                <Box p={2}>
                  <h3>
                    <span role="img" aria-label="throphy">
                      🏆
                    </span>{" "}
                    Nominee ({5 - Object.keys(nominations).length} Remaining)
                  </h3>

                  <Nominations
                    nominations={nominations}
                    removeNomination={removeNomination}
                    handleResetNominations={handleResetNominations}
                  />
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Paper>
                <Box p={2}>
                  <SearchBar onChange={onSearchChange} value={searchKey} />

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
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
