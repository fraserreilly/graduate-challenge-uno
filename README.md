# Javascript Hangman API

This API provides endpoints to create, retrieve, delete, and make guesses in the Hangman game.

## Endpoints

### Create a New Game

Creates a new Wordle game and returns the game ID.

**URL:** `/game`
**Method:** `POST`

#### Response

- HTTP Status: 200 OK
- Body: Game ID (string)

### Get Game Information

Retrieves the information of a specific Wordle game.

**URL:** `/game/:gameId`
**Method:** `GET`

#### Parameters

- `gameId` (string): The ID of the game to retrieve.

#### Response

- HTTP Status: 200 OK
- Body: Game information (object)

### Delete a Game

Deletes a specific Wordle game.

**URL:** `/game/:gameId`
**Method:** `DELETE`

#### Parameters

- `gameId` (string): The ID of the game to delete.

#### Response

- HTTP Status: 204 No Content

### Make a Guess

Makes a guess in a Wordle game.

**URL:** `/game/:gameId/guess`
**Method:** `POST`

#### Parameters

- `gameId` (string): The ID of the game to make a guess in.

#### Request Body

- `letter` (string): The letter to guess. Must be a single letter.

#### Response

- HTTP Status: 200 OK
- Body: Updated game information (object)

## Error Responses

The API provides appropriate error responses for invalid requests.

- HTTP Status: 400 Bad Request

  - Body: Error message (object)

- HTTP Status: 404 Not Found
  - Body: Error message (object)

## Game Object Structure

The game object returned in the responses has the following structure:

```javascript
{
  remainingGuesses: number,
  unmaskedWord: string,
  word: string,
  status: string,
  incorrectGuesses: Array<string>,
}
```

- remainingGuesses: The number of remaining guesses in the game.
- unmaskedWord: The original word to guess without any masking.
- word: The current state of the word with masked letters represented by underscores.
- status: The status of the game ('In Progress', 'Won', or 'Lost').
- incorrectGuesses: An array of incorrect letters guessed so far.

## Technology stack

In this implementation the technologies used are:

- Node version 18
- Node Package Manager (included with node)
- [Express](https://expressjs.com/)
  - Express is a micro web framework that is used to expose API endpoints.
- [Jest](https://jestjs.io/)
  - Jest is a Javascript testing framework focused on simplicity.

## How to: Run Application

- Please skip Installer sections if you already have the following installed:
  - Node
  - NPM

### Manual Installation macOS & Windows

1. Install Node

To install Node 18 on Windows or macOS, follow these steps:

- Visit the Node website at https://nodejs.org/en/download.

- Make sure the LTS (long-term support) tab is selected

- Click on the installer that is relevant for your computer. A download should begin with the pkg/msi.

- Follow the installation wizard with the default settings selected.

2. Verify installation

- Open a terminal/command line

- type `node -v`
  - You should see `V18.12.0` or similar appear.

### Package Installation

Installation can also be completed using a package manager.

- Chocolatey: Windows
- Homebrew: macOS
- https://nodejs.org/en/download/package-manager: linux

This approach can be more problematic if a problem occurs and requires more terminal/command line experience. If using WSL with windows we can also use the linux package managers depending on the distribution installed on the WSL.

### Node Version Manager

The last approach for installing node can be completed using Node Version Manager (nvm). This is only available using linux or macOS and can be completed follow the guide [here](https://github.com/nvm-sh/nvm).

Once installed you can simply type:

```

nvm install 18
nvm use 18

```

## Running the app

To run the service, follow these steps:

1. Run the following command to install the services dependencies: `npm install` or `npm i`
2. Run the following command to start up the application: `npm start`
3. (optional) Run the following command to execute the unit tests: `npm test`

The app should now be available at: `http://localhost:4567`
