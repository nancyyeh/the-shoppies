import React from "react";
import { Box, Collapse, Typography } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

export function ReachedFiveNotification({ show }) {
  return (
    <Box>
      <Collapse in={show}>
        <Alert severity="info" variant="filled">
          <AlertTitle>
            <Typography align="left">
              <strong>All done!</strong>
            </Typography>
          </AlertTitle>
          <Typography align="left">You have selected 5 movies.</Typography>
        </Alert>
      </Collapse>
    </Box>
  );
}
