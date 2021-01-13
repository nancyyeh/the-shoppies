import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Box,
  Button,
  Avatar,
} from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";

export function MovieList({ movieData, nominations, addNomination }) {
  const numNominations = Object.keys(nominations).length;

  return (
    <Box>
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
                    <img src={movie.Poster} alt="movie poster" width="100%" />
                  )}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={movie.Title} secondary={movie.Year} />
              <ListItemSecondaryAction>
                <Button
                  variant="contained"
                  onClick={() => addNomination(movie.imdbID)}
                  disabled={isNominated || numNominations === 5}
                  color="primary"
                  size="small"
                  edge="end"
                >
                  {isNominated ? "Nominated!" : "Nominate"}
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
