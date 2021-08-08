const socket = io();

const movement = {
    up: false,
    down: false,
    left: false,
    right: false
}
const context = createCanvasContext();

socket.emit('new player');

document.addEventListener('keydown', function(event) {
    keyHandler(event.key, true);
});
document.addEventListener('keyup', function(event) {
    keyHandler(event.key, false);
});

setInterval(function() {
  socket.emit('movement', movement);
}, 1000 / 60);


socket.on('state', function(players) {
  context.clearRect(0, 0, 800, 600);
  context.fillStyle = 'green';
  for (var id in players) {
    var player = players[id];
    context.beginPath();
    context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
    context.fill();
  }
});

function createCanvasContext() {
    const canvas = document.getElementById('canvas');
    canvas.width = 800;
    canvas.height = 600;
    return canvas.getContext('2d');
}

function keyHandler(key, push) {
    switch (key) {
        case 'a':
          movement.left = push;
          break;
        case 'w':
          movement.up = push;
          break;
        case 'd':
          movement.right = push;
          break;
        case 's':
          movement.down = push;
          break;
      }
}