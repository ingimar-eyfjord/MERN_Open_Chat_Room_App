import React from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
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
            color: theme.palette.text.secondary,
        },
    }),
);

const btnWH = {
    width: "100%",
    height: "100%"
}





export default function Home() {
    const classes = useStyles();
    const [spacing, setSpacing] = React.useState<GridSpacing>(5);

    return (
        <div className="LoginPage">
            <Grid className={classes.root} container spacing={spacing} direction="column" alignItems="center" justify="center" >



                <Grid item justify="center" xs={10} sm={8}>
                    <Paper className={classes.paper} >

                        <header className="App-header">
                            <h1>
                                Chat Room App
                         </h1>
                            <p>A common chat room application with oAuth</p>
                            <p>Built with the M.E.R.N stack</p>
                            <p>Styled with Material UI core</p>
                        </header>
                    </Paper>
                </Grid>

                <Grid container justify="center" spacing={2} xs={10} sm={8}>
                    <Grid item justify="center" xs={10} sm={3}>
                        <Button style={btnWH} color="primary" variant="contained" component={Link} to="/login">
                            Login
                          </Button>
                    </Grid>


                    <Grid item justify="center" xs={10} sm={3}>
                        <Button variant="contained" color="secondary" style={btnWH} component={Link} to="/register">
                            Sign up
                        </Button>
                    </Grid>
                </Grid>


            </Grid >
        </div>
    )
}