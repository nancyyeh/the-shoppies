import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import { IconButton } from "@material-ui/core";

export function ViewCodeButton() {
  return (
    <IconButton
      color="primary"
      aria-label="view source code"
      href="https://github.com/nancyyeh/the-shoppies"
      target="_blank"
    >
      <GitHubIcon />
    </IconButton>
  );
}
