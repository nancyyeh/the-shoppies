import React, { useState } from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { CompletedNotification } from "./CompletedNotification";
import { SuccessNotification } from "./SuccessNotification";
import { NominationsMovieList } from "./NominationsMovieList";

export function Nominations({
  nominations,
  removeNomination,
  isFiveNominations,
  handleResetNominations,
}) {
  const [isNominationSubmit, setIsNominationSubmit] = useState(false);

  if (Object.keys(nominations).length === 0) {
    return (
      <Box>
        <SuccessNotification
          isNominationSubmit={isNominationSubmit}
          onClose={() => setIsNominationSubmit(false)}
        />
        <img src="public/award.png" alt="Movie Award" width="70%" />
        <h3>No nominations yet! </h3>
        <Typography>Select 5 of your favorite movies to the list.</Typography>
      </Box>
    );
  } else {
    return (
      <Box>
        <CompletedNotification isFiveNominations={isFiveNominations} />
        <NominationsMovieList
          nominations={nominations}
          removeNomination={removeNomination}
        />
        {isFiveNominations && (
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
}
