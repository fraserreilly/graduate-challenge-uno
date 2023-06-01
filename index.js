import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import pkg from 'body-parser';
const { json, urlencoded } = pkg;
import {
  createGame,
  getGame,
  deleteGame,
  createGuess,
} from './controllers/game.js';

const app = express();

app.use(cors());
app.use(json());
app.use(morgan('tiny'));
app.use(urlencoded({ extended: true }));

app.post('/games', createGame);
app.get('/games/:gameId', getGame);
app.post('/games/:gameId/guesses', createGuess);
app.delete('/games/:gameId', deleteGame);

app.listen(4567);
