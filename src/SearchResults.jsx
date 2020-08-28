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

export function SearchResults({
  searchKey,
  isError,
  error,
  numResult,
  addNomination,
  movieData,
  nominations,
}) {
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
}
