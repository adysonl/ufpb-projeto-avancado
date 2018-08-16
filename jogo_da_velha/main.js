var green, red, empty;
green = '<img src="assets/img/green.png">';
red = '<img src="assets/img/red.png">';
empty = '<img src="assets/img/empty.png">';
var players = [];
players[0] = {name: 'Mario', img: red, pontos: 0};
players[1] = {name: 'Luigi', img: green, pontos: 0};
var currentPlayer = 0;
var tabuleiro;
var i;
var winner;
var jogadas;
var id;

var fundo = new Audio('assets/sounds/fundo.mp3');
fundo.loop = false;
fundo.volume = 0.1;
fundo.loop = true;
var clickAudio = new Audio('assets/sounds/click.mp3');
clickAudio.loop = false;
clickAudio.volume = 0.4;
var winAudio = new Audio('assets/sounds/win.mp3');
winAudio.loop = false;
winAudio.volume = 0.4;
var velhaAudio = new Audio('assets/sounds/velha.mp3');
velhaAudio.loop = false;
velhaAudio.volume = 0.4;

function play(){
  document.getElementById('tabuleiro').style.display = 'inline';
  startGame();
}

function stopAudio(audio){
  audio.pause();
  audio.currentTime = 0;
}

function playAudio(audio){
  stopAudio(audio);
  audio.play();
}

function startGame(){
  playAudio(fundo);
  tabuleiro = [];
  jogadas = 0;
  for(id = 0; id < 9; id++){
    var posicao = document.getElementById(id);
    posicao.innerHTML = empty;
    tabuleiro.push(9);
    posicao.style.background = 'transparent';
  }
  document.getElementById('current').innerHTML = players[currentPlayer].img +  players[currentPlayer].name;
  document.getElementById('playAgain').style.display = "none";
  winner = null;
  atualizarPontos();
}

function jogar(id){
  var posicao = document.getElementById(id);
  if ( posicao.innerHTML == empty && winner == null){
    playAudio(clickAudio);
    jogadas++;
    var img = players[currentPlayer].img;
    posicao.innerHTML = img;
    tabuleiro[id] = currentPlayer;
    verificar();
  }
}

function mudarJogador(){
  if (currentPlayer == 0) {
    currentPlayer = 1;
  } else {
    currentPlayer = 0;
  }
  document.getElementById('current').innerHTML = players[currentPlayer].img + players[currentPlayer].name;
}

function verificar(){
  var p = tabuleiro;
  if (p[0] == p[1] && p[1] == p[2] && p[0] != 9){
    pintar([0,1,2]);
    venceu();
  } else if (p[3] == p[4] && p[4] == p[5] && p[3] != 9){
    pintar([3,4,5]);
    venceu();
  } else if (p[6] == p[7] && p[7] == p[8] && p[6] != 9){
    pintar([6,7,8]);
    venceu();
  } else if (p[0] == p[3] && p[3] == p[6] && p[0] != 9){
    pintar([0,3,6]);
    venceu();
  } else if (p[1] == p[4] && p[4] == p[7] && p[1] != 9){
    pintar([1,4,7]);
    venceu();
  } else if (p[2] == p[5] && p[5] == p[8] && p[2] != 9){
    pintar([2,5,8]);
    venceu();
  } else if (p[0] == p[4] && p[4] == p[8] && p[0] != 9){
    pintar([0,4,8]);
    venceu();
  } else if (p[6] == p[4] && p[4] == p[2] && p[6] != 9){
    pintar([6,4,2]);
    venceu();
  } else if (jogadas == 9){
      velha();
  } else {
    mudarJogador();
  }
}

function pintar(posicoes){
  for(i = 0; i < posicoes.length; i++){
    document.getElementById(posicoes[i]).style.background = 'rgba(255, 255, 255, .5)';
  }
}

function venceu(){
  winner = currentPlayer;
  players[winner].pontos ++;
  document.getElementById('current').innerHTML = players[currentPlayer].img + players[currentPlayer].name + ' Venceu !';
  document.getElementById('playAgain').style.display = "inherit";
  stopAudio(fundo);
  playAudio(winAudio);
  atualizarPontos();
}

function velha(){
  document.getElementById('current').innerHTML = 'Deu Velha !'
  document.getElementById('playAgain').style.display = "inherit";
  stopAudio(fundo);
  playAudio(velhaAudio);
}

function atualizarPontos(){
  document.getElementById('points').innerHTML = 'PONTOS </br>' + players[0].pontos +  players[0].img + players[1].pontos +  players[1].img;

}
