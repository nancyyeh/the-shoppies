import React from "react";
import { Box, Button, Collapse, Typography } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { useEffect } from "react";

export function CompletedNotification({ isFiveNominations }) {
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    if (isFiveNominations) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isFiveNominations]);

  return (
    <Box>
      <Collapse in={open}>
        <Alert severity="success" variant="filled">
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
