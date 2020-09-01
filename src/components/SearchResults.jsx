import React from "react";
import { IconButton, Box, Avatar } from "@material-ui/core";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";
import StarIcon from "@material-ui/icons/Star";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  pagination: {
    display: "flex",
    justifyContent: "center",
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
          Find a movie in the search bar!
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
          </span>{" "}
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
          <List dense={true}>
            {Object.values(movieData).map((movie) => {
              const isNominated = nominations[movie.imdbID] !== undefined;
              return (
                <ListItem key={movie.imdbID}>
                  <ListItemAvatar>
                    <Avatar>
                      {movie.Poster === "N/A" ? (
                        <MovieIcon />
                      ) : (
                        <img
                          src={movie.Poster}
                          alt="movie poster"
                          width="100%"
                        />
                      )}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={movie.Title} secondary={movie.Year} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="add"
                      onClick={() => addNomination(movie.imdbID)}
                      disabled={isNominated || isFiveNominations}
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
