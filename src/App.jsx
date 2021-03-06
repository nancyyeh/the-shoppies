import React, { useState, useCallback } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Box, Grid, Paper, makeStyles } from "@material-ui/core";
import _ from "lodash";

import { SearchBar } from "./components/SearchBar";
import { Nominations } from "./components/Nominations";
import { SearchResults } from "./components/SearchResults";
import { ViewCodeButton } from "./components/ViewCodeButton";
import { findMovies } from "./api/OmdbAPI";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#131316",
    height: "100vh",
    maxHeight: 1,
  },
  nominations: {
    position: "sticky",
    top: 20,
  },
  header: {
    color: "#f2c144",
    fontSize: 96,
  },
}));

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

  const classes = useStyles();

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

  // handle submit nomatinations - clear all nomaintions and clear search key
  const submitNominations = () => {
    onSetNomination({});
    setSearchKey("");
  };

  // update search value
  const onSearchChange = (e) => {
    const searchKey = e.target.value;
    setSearchKey(searchKey);
    delayedQuery(searchKey);
  };

  // perform the search and catch error
  const performSearch = (searchKey, page) => {
    if (searchKey.length > 2) {
      findMovies(searchKey, page)
        .then((results) => {
          setNumResults(results.totalResults);
          setMovieData(results.movies);
          setIsError(false);
        })
        .catch((error) => {
          setError(error);
          setIsError(true);
        });
    }
  };

  // when page number changes
  const handlePageChange = (event, value) => {
    setPage(value);
    performSearch(searchKey, value);
  };

  // debounce - delay query to 200ms to not over load the fetch
  const delayedQuery = useCallback(
    _.debounce((searchKey) => performSearch(searchKey), 200),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <Box
        className={classes.root}
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        textAlign="center"
        p={3}
      >
        <Box p={2} className={classes.header}>
          <img
            src="/the-shoppies/shoppies_logo.png"
            alt="The Shoppies"
            width="70%"
          />
        </Box>
        <Box
          m={2}
          className="API-settings"
          position="absolute"
          top={18}
          right={18}
        >
          <ViewCodeButton />
        </Box>
        <Box>
          <Grid container direction="row-reverse" spacing={3}>
            <Grid item xs={12} sm={12} md={4}>
              <Paper className={classes.nominations}>
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
                    submitNominations={submitNominations}
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
