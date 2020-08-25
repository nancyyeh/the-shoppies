import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function FormDialog({ isOpen, onClose, onSetApiKey, value }) {
  const [input, setInput] = useState(value);

  const handleClose = () => {
    onClose();
  };

  const updatedValue = () => {
    onClose();
    onSetApiKey(input);
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Set API Key</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To use this Shoppies application, please insert the OMDB api key.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="API Key"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={updatedValue} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
