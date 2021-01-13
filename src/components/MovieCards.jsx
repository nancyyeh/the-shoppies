import React from "react";
import { Button, Box, Grid, Typography } from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  box: {
    padding: theme.spacing(1),
    margin: "auto",
    width: 210,
    height: 400,
  },
  image: {
    width: 200,
    height: 280,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  details: {
    width: 205,
    height: 80,
  },
  noimg: {
    background: "#ECECEC",
    width: 200,
    height: 280,
  },
}));

export function MovieCards({ movieData, nominations, addNomination }) {
  const classes = useStyles();
  const numNominations = Object.keys(nominations).length;

  return (
    <Grid container justify="space-evenly" spacing={2}>
      {Object.values(movieData).map((movie) => {
        const isNominated = nominations[movie.imdbID] !== undefined;
        return (
          <Grid item key={movie.imdbID}>
            <Box className={classes.box}>
              <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="center"
              >
                <Grid item className={classes.image}>
                  {movie.Poster === "N/A" ? (
                    <Grid
                      container
                      direction="column"
                      justify="center"
                      alignItems="center"
                      className={classes.noimg}
                      spacing={1}
                    >
                      <Grid item>
                        <MovieIcon
                          fontSize="large"
                          style={{ color: grey[500] }}
                        />
                      </Grid>
                      <Grid item>
                        <Box fontWeight="Bold" style={{ color: grey[500] }}>
                          No Poster
                          <br />
                          Available
                        </Box>
                      </Grid>
                    </Grid>
                  ) : (
                    <img
                      className={classes.img}
                      src={movie.Poster}
                      alt="movie poster"
                    />
                  )}
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item container direction="column">
                    <Grid className={classes.details} item>
                      <Typography gutterBottom variant="subtitle2">
                        <Box component="span" fontWeight="fontWeightBold">
                          {movie.Title.toUpperCase()}
                        </Box>
                        <br />({movie.Year})
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        onClick={() => addNomination(movie.imdbID)}
                        disabled={isNominated || numNominations === 5}
                        color="primary"
                      >
                        {isNominated ? "Nominated!" : "Nominate"}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
}
