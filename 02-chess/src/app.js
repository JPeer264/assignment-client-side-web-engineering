import $ from 'jquery';
import Chess from 'chess.js';
import ChessBoard from 'chessboardjs';
import io from 'socket.io-client';

import config from './config';

window.$ = $;

let game = undefined;
let board = ChessBoard('board');
let ownColor = undefined;

const socket = io(config.SERVER_URL);

const $join = $('#join');
const $host = $('#host');
const $gameId = $('#game-id');
const $restart = $('#restart');
const $joinInput = $('#join-input');

const onDragStart = (source, piece) => (
  !(game.game_over() === true
    || (game.turn() === 'w' && piece.search(/^b/) !== -1)
    || (game.turn() === 'b' && piece.search(/^w/) !== -1)
    || (game.turn() !== game.player))
);

const onDrop = (source, target) => {
  const move = game.move({
    from: source,
    to: target,
    promotion: 'q'
  });

  if (!move) {
    return 'snapback';
  }

  socket.emit('move', { move: move.san });

};

const startGame = ({ orientation, position }) => {
  const config = {
    draggable: true,
    orientation,
    pieceTheme: 'img/chesspieces/alpha/{piece}.png',
    position,
    onDragStart,
    onDrop,
  };

  board = ChessBoard('board', config);
  board.orientation(orientation);
  game = Chess.Chess()
  game.player = orientation.charAt(0);
}

function registerSockets() {
  socket.on('game created', (data) => {
    if (data.game.id) {
      $gameId.html(data.game.id);
    }
  });

  socket.on('game joined', (data) => {
    ownColor = data.player.color;
    $gameId.html(data.game.id);
  });

  socket.on('game started', () => {
    startGame({
      position: 'start',
      orientation: ownColor
    });

    $restart.show();
  });

  socket.on('move', (data) => {
    const move = game.move(data.move);

    board.move(`${move.from}-${move.to}`);
  });

  socket.on('restart', () => {
    startGame({
      position: 'start',
      orientation: ownColor
    });
  });
}

function registerHandler() {
  $host.click(() => {
    socket.emit('new game');
  });

  $join.click(() => {
    const gameName = $joinInput.val();

    if (gameName !== '') {
      socket.emit('join game', {game: gameName});
    }
  });

  $restart.click(() => {
    socket.emit('restart');

    startGame({
      position: 'start',
      orientation: ownColor
    });
  });
}

registerSockets();
registerHandler();
