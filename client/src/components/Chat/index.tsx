import { TextField, Button, ListItemAvatar, Avatar, ListItemText, ListItem, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

type Message = {
    user: string
    message: string
    intent: string
    subject: string
    //Todo: date
}
function processMessage(payload: string) {
    try {
        return JSON.parse(payload)
    } catch (error) {
        return null
    }
}
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));
export default function Chat() {
    const classes = useStyles();
    const [chatMessage, setChatMessage] = useState("")
    const [Subject, setSubject] = useState("")
    const [wsRef, setWsRef] = useState<null | WebSocket>(null)
    const [chatMessages, setChatMessages] = useState<Message[]>([])

    const history = useHistory();
    function sendMessage() {
        if (wsRef?.readyState !== WebSocket.OPEN) {
            // websoket not connected
            return
        }
        wsRef.send(JSON.stringify({ subject: Subject, message: chatMessage, intent: 'chat' }))
        setChatMessage("")
        setSubject("")
    }

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:1338/' + localStorage.getItem('token'))

        ws.addEventListener('error', () => {
            history.replace('/login?authError')
        })
        ws.addEventListener('message', (event) => {
            const data = event.data
            const message: null | Message = processMessage(data)
            if (!message) return
            if (message.intent === "chat") {
                setChatMessages(oldMessages => {
                    return [...oldMessages, message]
                })
            }
        })
        setWsRef(ws)
        return () => {
            ws.close()
        }
    }, [])


    return (
        <div>

            <h1>Chat Page</h1>


            {chatMessages.map((message, index) => {
                return (
                    <ListItem key={index} alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={message.subject}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        {message.message}
                                    </Typography>
                                    {" - " + message.user}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                )
            })}


            <TextField
                onChange={e => setSubject(e.target.value)}
                multiline
                value={Subject}
                label="Subject"
                variant="outlined"
                color="primary">
            </TextField>
            <TextField
                onChange={e => setChatMessage(e.target.value)}
                multiline
                value={chatMessage}
                label="Message"
                variant="outlined"
                color="primary">
            </TextField>

            <Button variant="outlined" color="primary" onClick={sendMessage}>Send Message</Button>
        </div>

    )
}