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

function startGame(){
  tabuleiro = [];
  var id;
  for(id = 0; id < 9; id++){
    var posicao = document.getElementById(id);
    posicao.innerHTML = empty;
    tabuleiro.push(null);
    posicao.style.background = 'transparent';
  }
  document.getElementById('current').innerHTML = players[currentPlayer].img +  players[currentPlayer].name;
  document.getElementById('playAgain').style.display = "none";
  winner = null;
}

function jogar(id){
  var posicao = document.getElementById(id);
  if ( posicao.innerHTML == empty && winner == null){
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
  if (p[0] == p[1] && p[1] == p[2] && p[0] != null){
    pintar([0,1,2]);
    venceu();
  } else if (p[3] == p[4] && p[4] == p[5] && p[3] != null){
    pintar([3,4,5]);
    venceu();
  } else if (p[6] == p[7] && p[7] == p[8] && p[6] != null){
    pintar([6,7,8]);
    venceu();
  } else if (p[0] == p[3] && p[3] == p[6] && p[0] != null){
    pintar([0,3,6]);
    venceu();
  } else if (p[1] == p[4] && p[4] == p[7] && p[1] != null){
    pintar([1,4,7]);
    venceu();
  } else if (p[2] == p[5] && p[5] == p[8] && p[2] != null){
    pintar([2,5,8]);
    venceu();
  } else if (p[0] == p[4] && p[4] == p[8] && p[0] != null){
    pintar([0,4,8]);
    venceu();
  } else if (p[6] == p[4] && p[4] == p[2] && p[6] != null){
    pintar([6,4,2]);
    venceu();
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
}
