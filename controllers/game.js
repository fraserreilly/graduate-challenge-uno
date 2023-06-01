import { v4 as uuid } from 'uuid';

const words = ['Banana', 'Canine', 'Unosquare', 'Airport'];
const games = {};

const retrieveWord = () => words[Math.floor(Math.random() * words.length)];

const clearUnmaskedWord = (game) => {
  const withoutUnmasked = {
    ...game,
  };
  delete withoutUnmasked.unmaskedWord;
  return withoutUnmasked;
};

function createGame(req, res) {
  const newGameWord = retrieveWord();
  const newGameId = uuid();
  const newGame = {
    remainingGuesses: 6,
    unmaskedWord: newGameWord,
    word: newGameWord.replace(/[a-zA-Z0-9]/g, '_'),
    status: 'In Progress',
    incorrectGuesses: [],
  };

  games[newGameId] = newGame;

  return res.status(200).send(newGameId);
}

function getGame(req, res) {
  const { gameId } = req.params;
  let game = games[gameId];

  if (!gameId || !game) {
    return res.status(404).json({
      Message: 'Game not found',
    });
  }

  return res.status(200).json(clearUnmaskedWord(game));
}

function deleteGame(req, res) {
  const { gameId } = req.params;

  if (!gameId || !games[gameId]) {
    return res.status(404).json({
      Message: 'Game not found',
    });
  }

  delete games[gameId];

  return res.status(204).json({
    Message: 'Game deleted',
  });
}

function createGuess(req, res) {
  const { gameId } = req.params;
  const { letter } = req.body || {};

  let game = games[gameId];

  if (!gameId || !game)
    return res.status(404).json({
      Message: 'Game not found',
    });

  if (!letter || typeof letter !== 'string' || letter.length != 1) {
    return res.status(400).json({
      Message: 'Guess must be supplied with 1 letter',
    });
  }

  if (!/^[a-zA-Z]$/.test(letter)) {
    return res.status(400).json({
      Message: 'Invalid letter format',
    });
  }

  if (game.status !== 'In Progress')
    return res
      .status(400)
      .json(...clearUnmaskedWord(game), { Message: 'Game is over' });

  if (
    game.incorrectGuesses.includes(letter.toLowerCase()) ||
    game.word.includes(letter)
  ) {
    return res.status(200).json({
      Message: 'Letter already guessed',
    });
  }

  game.remainingGuesses--;

  if (game.unmaskedWord.toLowerCase().includes(letter.toLowerCase())) {
    const unmaskedWordLowerCase = game.unmaskedWord.toLowerCase();
    let updatedWord = '';
    for (let i = 0; i < unmaskedWordLowerCase.length; i++) {
      if (unmaskedWordLowerCase[i] === letter.toLowerCase()) {
        updatedWord += game.unmaskedWord[i];
      } else {
        updatedWord += game.word[i];
      }
    }
    game.word = updatedWord;

    if (game.word === game.unmaskedWord && game.remainingGuesses >= 0) {
      game.status = 'Won';
      return res.status(200).json(clearUnmaskedWord(game));
    }
  } else {
    if (game.remainingGuesses <= 0) {
      game.status = 'Lost';
      return res.status(200).json(clearUnmaskedWord(game));
    }
    game.incorrectGuesses.push(letter.toLowerCase());
  }

  return res.status(200).json(clearUnmaskedWord(game));
}

export { createGame, getGame, deleteGame, createGuess, games };
