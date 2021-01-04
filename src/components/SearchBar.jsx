import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  fontSize: {
    fontSize: 38,
  },
}));

export function SearchBar({ value, onChange }) {
  const classes = useStyles();

  return (
    <FormControl fullWidth className={classes.root}>
      <TextField
        color="primary"
        placeholder="Search Movies"
        type="text"
        value={value}
        onChange={onChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="large" />
            </InputAdornment>
          ),
          classes: {
            input: classes.fontSize,
          },
        }}
      />
    </FormControl>
  );
}
