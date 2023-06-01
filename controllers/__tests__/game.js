import { createGame, getGame, deleteGame, createGuess, games } from '../game';

const mockId = 'fda56100-0ddb-4f06-9ea4-7c1919ff6d2f';
jest.mock('uuid', () => ({ v4: () => mockId }));

describe('game controller', () => {
  let req, res;
  beforeEach(() => {
    games[mockId] = {
      remainingGuesses: 6,
      unmaskedWord: 'test',
      word: '____',
      status: 'In Progress',
      incorrectGuesses: [],
    };
    req = {};
    res = {
      send: jest.fn(),
      json: jest.fn(),
      status: jest.fn(() => res),
    };
  });
  afterEach(() => {
    jest.clearAllMocks();
    delete games.mockId;
  });
  describe('createGame', () => {
    it('Should return identifier when game created', () => {
      createGame(req, res);

      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.send).toHaveBeenCalledWith(mockId);
    });
  });

  describe('getGame', () => {
    it('Should return 404 when game not found', () => {
      req.params = {
        gameId: 'invalid',
      };

      getGame(req, res);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        Message: 'Game not found',
      });
    });
    it('Should return game when game found', () => {
      req.params = {
        gameId: mockId,
      };

      getGame(req, res);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        remainingGuesses: 6,
        word: '____',
        status: 'In Progress',
        incorrectGuesses: [],
      });
    });
    it('Should return 404 when game id not provided', () => {
      req.params = {};

      getGame(req, res);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
  describe('deleteGame', () => {
    it('Should return 404 when game not found', () => {
      req.params = {
        gameId: 'invalid',
      };

      deleteGame(req, res);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        Message: 'Game not found',
      });
    });
    it('Should return 404 when game id not provided', () => {
      req.params = {};

      getGame(req, res);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(404);
    });
    it('Should return 204 when game deleted', () => {
      req.params = {
        gameId: mockId,
      };

      deleteGame(req, res);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        Message: 'Game deleted',
      });
    });
  });
  describe('createGuess', () => {
    it('Should return 404 when game not found', () => {
      req.params = {
        gameId: 'invalid',
      };

      req.body = {
        letter: 'a',
      };

      createGuess(req, res);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        Message: 'Game not found',
      });
    });
    it('Should return 404 when game id not provided', () => {
      req.params = {};

      req.body = {
        letter: 'a',
      };

      createGuess(req, res);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(404);
    });
    it('Should return 400 when letter not provided', () => {
      req.params = {
        gameId: mockId,
      };

      createGuess(req, res);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        Message: 'Guess must be supplied with 1 letter',
      });
    });
    it('Should return 400 when letter is not a string', () => {
      req.params = {
        gameId: mockId,
      };
      req.body = {
        letter: 5,
      };

      createGuess(req, res);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        Message: 'Guess must be supplied with 1 letter',
      });
    });
    it('Should return 400 when letter is not a single character', () => {
      req.params = {
        gameId: mockId,
      };
      req.body = {
        letter: 'ab',
      };

      createGuess(req, res);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        Message: 'Guess must be supplied with 1 letter',
      });
    });
    it('Should return 400 when letter is not a valid string', () => {
      req.params = {
        gameId: mockId,
      };
      req.body = {
        letter: '/',
      };

      createGuess(req, res);

      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith({
        Message: 'Invalid letter format',
      });
    });
  });
});
