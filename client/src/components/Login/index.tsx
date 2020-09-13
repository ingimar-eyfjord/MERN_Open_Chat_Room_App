import React, { useState } from 'react'
import { TextField, Grid, GridSpacing, Button } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom'
import './style.css'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { apiCall } from '../utility';
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
        fields: {
            width: "100%",
            margin: 0,
            padding: 0,
            marginBottom: 12,
        },
        button: {
            width: "100%",
            height: "100%"
        }
    }),
);

export default function Login() {
    const classes = useStyles();
    const [spacing, setSpacing] = React.useState<GridSpacing>(5);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()
    async function loginUser() {

        const res = await apiCall('/api/login', { email, password })
        if (res.status === "ok") {
            //⚠️⚠️ This is bad practice -> change to refresh tokens ⚠️⚠️.
            //Todo:
            // Change to refresh cookie token
            localStorage.setItem('token', res.data)
            alert('You are logged in')
            history.push('/chat')
        } else {
            alert(res.error)
        }




        console.log(res)
    }



    return (


        <div className="LoginForm">
            <Grid className={classes.root} container spacing={spacing} direction="column" alignItems="center" justify="center" >

                <Grid item xs={10} sm={8}>
                    <Card className={classes.paper} >
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Log in
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <form>
                    <Grid container justify="center">

                        <Grid item xs={10} sm={12}>
                            <TextField
                                className={classes.fields}
                                placeholder="your@email.com"
                                label="Your email"
                                variant="outlined"
                                value={email}
                                onChange={(e: any) => setEmail(e.target.value)}
                            >
                            </TextField>
                        </Grid>

                        <Grid item xs={10} sm={12}>
                            <TextField
                                className={classes.fields}
                                placeholder="P@$$W0rd"
                                label="Password"
                                variant="outlined"
                                value={password}
                                onChange={(e: any) => setPassword(e.target.value)}>
                            </TextField>
                        </Grid>

                        <Grid item xs={10} sm={12}>
                            <Button
                                variant="contained"
                                className={classes.button}
                                onClick={loginUser}
                                color="primary"

                            >
                                Login
                        </Button>
                        </Grid>

                    </Grid>

                </form>


            </Grid>
        </div>
    )
}