import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { IconButton, Avatar } from "@material-ui/core";

export function NominationsList({ nominations, removeNomination }) {
  if (Object.keys(nominations).length === 0) {
    return (
      <div>
        <p>
          Add something to the nomination list... <br />
        </p>
      </div>
    );
  } else {
    return (
      <div>
        <List dense={true}>
          {Object.values(nominations).map((movie) => (
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
                <IconButton
                  edge="end"
                  aria-label="remove"
                  onClick={() => removeNomination(movie.imdbID)}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}
