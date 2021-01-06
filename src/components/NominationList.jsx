import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Box,
  IconButton,
  Avatar,
  Button,
  Typography,
} from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { CompletedNotification } from "./CompletedNotification";

export function NominationsList({
  nominations,
  removeNomination,
  isFiveNominations,
  handleResetNominations,
}) {
  if (Object.keys(nominations).length === 0) {
    return (
      <Box>
        <img src="award.png" alt="Movie Award" width="70%" />
        <Typography variant="h5">No nominations yet! </Typography>
        <Typography>Select 5 of your favorite movies to the list.</Typography>
      </Box>
    );
  } else {
    return (
      <Box>
        <CompletedNotification isFiveNominations={isFiveNominations} />
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
        {isFiveNominations && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleResetNominations}
            aria-label="reset nominations"
          >
            Submit
          </Button>
        )}
      </Box>
    );
  }
}
