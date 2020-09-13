import React from 'react'
import { Button, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import './style.css'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.primary,
        },
        pos: {
            marginBottom: 12,
        },
        h1: {
            fontSize: "2rem",
            marginBottom: 12,
        },
        button: {
            width: "100%",
            height: "100%"
        }
    }),
);







export default function Home() {
    const classes = useStyles();
    const [spacing, setSpacing] = React.useState<GridSpacing>(5);

    return (
        <div className="LoginPage">
            <Grid className={classes.root} container spacing={spacing} direction="column" alignItems="center" justify="center" >



                <Grid item xs={10} sm={8}>
                    <Card className={classes.paper} >
                        <CardContent>
                            <Typography className={classes.h1} component="h1">
                                Chat Room App
                                </Typography>
                            <Typography className={classes.pos} component="p">
                                A common chat room application with oAuth
                                </Typography>
                            <Typography className={classes.pos} component="p">
                                Built with the M.E.R.N stack
                                </Typography>
                            <Typography className={classes.pos} component="p">
                                Styled with Material UI core
                                </Typography>

                        </CardContent>
                    </Card>
                </Grid>

                <Grid container justify="center" spacing={2}>
                    <Grid item xs={10} sm={3}>
                        <Button className={classes.button} color="primary" variant="contained" component={Link} to="/login">
                            Login
                          </Button>
                    </Grid>


                    <Grid item xs={10} sm={3}>
                        <Button variant="contained" color="secondary" className={classes.button} component={Link} to="/register">
                            Sign up
                        </Button>
                    </Grid>
                </Grid>


            </Grid >
        </div>
    )
}