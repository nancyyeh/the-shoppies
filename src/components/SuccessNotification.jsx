import React from "react";
import { Box, Snackbar, Typography, Slide } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

export function SuccessNotification({ isNominationSubmit, onClose }) {
  function SlideTransition(props) {
    return <Slide {...props} direction="down" />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    onClose();
  };

  return (
    <Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={isNominationSubmit}
        autoHideDuration={6000}
        TransitionComponent={SlideTransition}
        onClose={handleClose}
      >
        <Alert severity="success" variant="filled" onClose={handleClose}>
          <AlertTitle>
            <Typography align="left">
              <strong>Submission Success!</strong>
            </Typography>
          </AlertTitle>
          <Typography align="left">
            Your nominations have been submited.
          </Typography>
        </Alert>
      </Snackbar>
    </Box>
  );
}
