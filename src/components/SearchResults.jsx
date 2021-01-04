import React from "react";
import { Button, Box } from "@material-ui/core";
import { Grid, Typography } from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  pagination: {
    display: "flex",
    justifyContent: "center",
  },
  box: {
    padding: theme.spacing(1),
    margin: "auto",
    width: 210,
    height: 400,
  },
  image: {
    width: 200,
    height: 280,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  details: {
    width: 205,
    height: 80,
  },
}));

export function SearchResults({
  searchKey,
  isError,
  error,
  numResult,
  addNomination,
  movieData,
  nominations,
  page,
  handlePageChange,
  isFiveNominations,
}) {
  const classes = useStyles();
  // display instruction that the search key needs to be longer than 2 characters
  if (searchKey.length < 3) {
    return (
      <div>
        <h3>
          <span role="img" aria-label="find">
            🔍
          </span>{" "}
          Find a movie in the search bar above!
        </h3>
        <p>The keyword needs to be longer than 2 characters</p>
      </div>
    );
    // display search error
  } else if (isError === true) {
    return (
      <Box>
        <h3>
          <span role="img" aria-label="film">
            🎞️
          </span>
          {"  "}
          Results for "{searchKey}" ({0})
        </h3>
        <p>
          <span role="img" aria-label="confused">
            😵
          </span>{" "}
          Uh no... {error}
        </p>
      </Box>
    );
    // display search results - button disabled if movie is nominated or have reached 5 nominations. pagination included
  } else {
    return (
      <div>
        <h3>
          <span role="img" aria-label="film">
            🎞️
          </span>{" "}
          Results for "{searchKey}" ({numResult})
        </h3>
        <div>
          <Grid container justify="space-evenly" spacing={2}>
            {Object.values(movieData).map((movie) => {
              const isNominated = nominations[movie.imdbID] !== undefined;
              return (
                <Grid item key={movie.imdbID}>
                  <Box className={classes.box}>
                    <Grid
                      container
                      direction="column"
                      justify="flex-start"
                      alignItems="center"
                    >
                      <Grid item className={classes.image}>
                        {movie.Poster === "N/A" ? (
                          <div>
                            <MovieIcon /> No Image
                          </div>
                        ) : (
                          <img
                            className={classes.img}
                            src={movie.Poster}
                            alt="movie poster"
                          />
                        )}
                      </Grid>
                      <Grid item xs={12} sm container>
                        <Grid item container direction="column">
                          <Grid className={classes.details} item>
                            <Typography gutterBottom variant="subtitle2">
                              <Box component="span" fontWeight="fontWeightBold">
                                {movie.Title.toUpperCase()}
                              </Box>
                              <br />({movie.Year})
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Button
                              variant="contained"
                              onClick={() => addNomination(movie.imdbID)}
                              disabled={isNominated || isFiveNominations}
                              color="primary"
                            >
                              {isNominated ? "Nominated!" : "Nominate"}
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </div>
        <Pagination
          page={page}
          onChange={handlePageChange}
          count={Math.ceil(numResult / 10)}
          className={classes.pagination}
        />
      </div>
    );
  }
}
