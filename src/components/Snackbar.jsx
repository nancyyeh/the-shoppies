import React from "react";
import { Snackbar, Box } from "@material-ui/core/";
import Alert from "@material-ui/lab/Alert";
import { useEffect } from "react";
import Slide from "@material-ui/core/Slide";

export function PositionedSnackbar({ isFiveNominations }) {
  const [open, setOpen] = React.useState(false);

  function SlideTransition(props) {
    return <Slide {...props} direction="down" />;
  }

  useEffect(() => {
    if (isFiveNominations) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isFiveNominations]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
      >
        <Alert onClose={handleClose} severity="success" variant="filled">
          You have nominated 5 movies!
        </Alert>
      </Snackbar>
    </Box>
  );
}
