# SocketIO-DrawingGame
Drawing game made with SocketIO and Nodejs

Pictionary inspired game, made with SocketIO and a Nodejs server.

 ![alt text](https://github.com/joexbayer/SocketIO-DrawingGame/blob/master/public/logo.png?raw=true)

<h1>How to play:</h1>
<ol>
  <li>A host creates a room by typing a name in the input and presses "Join" </li>
  <li>Other users can join this room by doing the same has host.</li>
  <li>A room can have a maximum of 4 players.</li>
  <li>Only the host can start the game.</li>
  <li>When the game starts, the host will be the first to draw.</li>
  <li>Drawer gets the full word, guessers only number of characters.</li>
  <li>Drawer cant guess, the user who guesses the word will be the next drawer.</li>
  <li>The person that guessed the word gets 100 points, and the drawer gets 70.</li>
</ol>
 
  ![alt text](https://github.com/joexbayer/SocketIO-DrawingGame/blob/master/public/lobby.png?raw=true)
   ![alt text](https://github.com/joexbayer/SocketIO-DrawingGame/blob/master/public/ingame.png?raw=true)
