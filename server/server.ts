import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import User from './models/user'
import jwt from 'jsonwebtoken'
import setupWebsocketServer from './websocket'
const app = express()

const JWT_SECRET_TOKEN = 'KzBj24t3H+Gy@9&sZa6T!^pD&83@Z3RznEPQXGbfN7zLU43k8Q-^Z#%rBTYfFXn24-7e=B?B37ksy256?8DtZ@Z9Xs@AxspWLw@TT?G7x@gZCSLbmbkhK7h@xJzaK?&gyRAhwvqhB$r3yHwGa-mVV+cUKYcxAu9?g6-9X6^ak_NUwc*uv2R%bTeZkESP8VgS%exf%BD4&t@pS=neQbwJ4BK3!+Qw+UXAk7*D&PvRx3KC$!ks8fM+m+j-XEDM+Gn7'

mongoose.connect('mongodb://localhost:27017/Live_chat_room')

if (process.env.NODE_ENV !== 'production') {
    app.use(cors())
}
app.use(bodyParser.json())
app.get('/', (req, res) => {

    res.send('ok this is working')
})

app.post('/api/register', async (req, res) => {
    console.log(req.body)

    const { email, password } = req.body

    if (!email || !password) {
        return res.json({ status: 'error', error: 'Invalid email/password' })
    }
    // todo hash password
    try {
        const user = new User({ email, password })
        await user.save()
    } catch (error) {
        console.log('Error', error)
        res.json({ status: 'error', error: 'Duplicate email' })
    }
    res.json({ status: 'ok' })
})



app.post('/api/login', async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body
    const user = await User.findOne({ email, password }).lean()
    console.log(User)
    if (!user) {
        return res.json({ status: 'error', error: 'User Not Found' })
    }

    //Todo
    //1. Refresh Tokens XX
    //2. Storing JWT in memory instead of localStorage


    const payload = jwt.sign({ email }, JWT_SECRET_TOKEN)

    return res.json({ status: 'ok', data: payload })
})

app.listen(1337)
setupWebsocketServer();