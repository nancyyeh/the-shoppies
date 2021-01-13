import React, { useState } from "react";
import { Box, Button, Typography, makeStyles } from "@material-ui/core";

import { ReachedFiveNotification } from "./ReachedFiveNotification";
import { SubmittedNotification } from "./SubmittedNotification";
import { NominationsMovieList } from "./NominationsMovieList";

const useStyles = makeStyles((theme) => ({
  img: {
    maxWidth: 300,
  },
}));

export function Nominations({
  nominations,
  removeNomination,
  handleResetNominations,
  clearSearch,
}) {
  const classes = useStyles();
  const [isNominationSubmit, setIsNominationSubmit] = useState(false);
  const canSubmit = Object.keys(nominations).length === 5;

  if (Object.keys(nominations).length === 0) {
    return (
      <Box>
        <SubmittedNotification
          isNominationSubmit={isNominationSubmit}
          onClose={() => setIsNominationSubmit(false)}
        />
        <img
          src="/the-shoppies/award.png"
          alt="Movie Award"
          className={classes.img}
          width="70%"
        />
        <h3>No nominations yet! </h3>
        <Typography>Add 5 of your favorite movies to the list.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <ReachedFiveNotification show={canSubmit} />

      <NominationsMovieList
        nominations={nominations}
        removeNomination={removeNomination}
      />

      {canSubmit && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setIsNominationSubmit(true);
            handleResetNominations();
            clearSearch();
          }}
          aria-label="reset nominations"
        >
          Submit
        </Button>
      )}
    </Box>
  );
}
