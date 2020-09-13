"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// initialize websocket server
require("./websocket");
const utility_1 = require("./utility");
const app = express_1.default();
mongoose_1.default.connect('mongodb://localhost:27017/Live_chat_room');
if (process.env.NODE_ENV !== 'production') {
    app.use(cors_1.default());
}
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.send('ok this is working');
});
app.post('/api/register', async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ status: 'error', error: 'Invalid email/password' });
    }
    // todo hash password
    try {
        const user = new user_1.default({ email, password });
        await user.save();
    }
    catch (error) {
        console.log('Error', error);
        res.json({ status: 'error', error: 'Duplicate email' });
    }
    res.json({ status: 'ok' });
});
app.post('/api/login', async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await user_1.default.findOne({ email, password }).lean();
    console.log(user_1.default);
    if (!user) {
        return res.json({ status: 'error', error: 'User Not Found' });
    }
    //Todo
    //1. Refresh Tokens XX
    //2. Storing JWT in memory instead of localStorage
    const payload = jsonwebtoken_1.default.sign({ email }, utility_1.JWT_SECRET_TOKEN);
    return res.json({ status: 'ok', data: payload });
});
app.listen(1337);
