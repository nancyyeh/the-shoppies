import React, { useState } from "react";
import { Box, Button, Typography } from "@material-ui/core";

import { CompletedNotification } from "./CompletedNotification";
import { SuccessNotification } from "./SuccessNotification";
import { NominationsMovieList } from "./NominationsMovieList";

export function Nominations({
  nominations,
  removeNomination,
  handleResetNominations,
}) {
  const [isNominationSubmit, setIsNominationSubmit] = useState(false);
  const canSubmit = Object.keys(nominations).length === 5;

  if (Object.keys(nominations).length === 0) {
    return (
      <Box>
        <SuccessNotification
          isNominationSubmit={isNominationSubmit}
          onClose={() => setIsNominationSubmit(false)}
        />
        <img src="/the-shoppies/award.png" alt="Movie Award" width="70%" />
        <h3>No nominations yet! </h3>
        <Typography>Select 5 of your favorite movies to the list.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <CompletedNotification show={canSubmit} />

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
          }}
          aria-label="reset nominations"
        >
          Submit
        </Button>
      )}
    </Box>
  );
}
