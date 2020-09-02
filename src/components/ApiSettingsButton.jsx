import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import { IconButton, Button } from "@material-ui/core";
import { ApiSettingsModal } from "./ApiSettingsModal";

export function ApiSettingsButton({ apikey, onApiChange }) {
  const [showApiSetting, setShowApiSetting] = useState(false);

  // open API key settings
  const handleClickOpen = () => {
    setShowApiSetting(true);
  };
  useEffect(() => {
    if (apikey === "") {
      setShowApiSetting(true);
    }
  }, [apikey]);

  //CSS for setting icon responsive
  const useStyles = makeStyles((theme) => ({
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  }));
  const classes = useStyles();

  return (
    <>
      <Button
        className={classes.sectionDesktop}
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        aria-label="api settings desktop"
      >
        Set API Key
      </Button>

      <IconButton
        className={classes.sectionMobile}
        onClick={handleClickOpen}
        color="primary"
        aria-label="api settings mobile"
      >
        <SettingsIcon />
      </IconButton>
      <ApiSettingsModal
        isOpen={showApiSetting}
        onClose={() => {
          setShowApiSetting(false);
        }}
        value={apikey}
        onApiChange={onApiChange}
      />
    </>
  );
}
