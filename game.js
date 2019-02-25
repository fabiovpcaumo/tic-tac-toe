let game = {
    player1 : "",
    player2 : "",
    player1Icon : '',
    player2Icon : '',
    atual : "",
    vencedor : "",
    primeiroJogador : "",
    turno : 0,
    housesPlayer1 : [],
    housesPlayer2 : [],
};

var gameOn = false; //Verifica se o jogo está rolando

const horizontal1 = ['0x0', '0x1', '0x2'];
const horizontal2 = ['1x0', '1x1', '1x2'];
const horizontal3 = ['2x0', '2x1', '2x2'];

const vertical1 = ['0x0', '1x0', '2x0'];
const vertical2 = ['0x1', '1x1', '2x1'];
const vertical3 = ['0x2', '1x2', '2x2'];

const diagonal1 = ['0x0', '1x1', '2x2'];
const diagonal2 = ['0x2', '1x1', '2x0'];

function start() {
    var board = document.getElementById("gameBoard");
    document.getElementById("log-text").value = ""; //Limpa o log

    if (checkPlayerForm() === true && gameOn === false){ //se o formulário estiver ok e o jogo estiver parado
        gameOn = true;
        sortearPrimeiroJogador();                                       //define o primeiro jogador
        if (board.style.display === "none" || board.style.display === '') {     //verifica se o jogo está visivel
            board.style.display = "block";
        } else {
            board.style.display = "none";
        }
    }
};

function checkPlayerForm(){
    let player1 = document.getElementById("username1").value;           //pega o nome dos usuarios no
    let player2 = document.getElementById("username2").value;           //formulário

    if (player1 === '' || player2 === ''){                              //verifica se o formulario
        alert("Preencha o nome dos jogadores!");                        //está vazio
        return false;
    }
    if (gameOn === true){
        alert("O jogo já está acontecendo!");
        return false;
    }
        game.player1 = player1;                                         //salva o nome dos jogadores
        game.player2 = player2;

        return true;
}

function restart(){                                                    //transforma os valores em
    game.atual = "",                                                   //seus valores iniciais
    game.player1 = "",
    game.player2 = "",
    game.vencedor = "",
    game.turno = 0,
    game.housesPlayer1 = [],
    game.housesPlayer2 = [];

    document.getElementById("gameBoard").style.display = 'none';
    document.getElementById("username1").value = "";
    document.getElementById("username2").value = "";
    document.getElementById("log-text").value = "";

    $('.house').html('');
    $('.house').attr('onclick', 'mark(this.id)');

    gameOn = false;
}

function sortearPrimeiroJogador(){
    let randomNumber = Math.random() * 100;
    console.log(randomNumber);
    if (randomNumber <= 49){
        game.atual = game.player1;
        game.primeiroJogador = game.player1;
        game.player1Icon = '<span class="fa fa-times"></span>';         
        game.player2Icon = '<span class="far fa-circle"></span>';
    }else{
        game.atual = game.player2;
        game.primeiroJogador = game.player2;
        game.player2Icon = '<span class="fa fa-times"></span>';
        game.player1Icon = '<span class="far fa-circle"></span>';
    }

    registrarComeco(game.atual);
}

function mark(id){
    if (game.atual === game.player1){                   //Verifica se o jogador atual é o jogador 1
        $('#' + id).html(game.player1Icon);
        $('#' + id).removeAttr('onclick');
        game.housesPlayer1.push(id);
        registrarJogada(game.atual, id, game.turno);
        game.atual = game.player2;
        
    }else{
        $('#' + id).html(game.player2Icon);             //Verifica se o jogador atual é o jogador 2
        $('#' + id).removeAttr('onclick');              //Impede os jogadores de repetirem a célula
        game.housesPlayer2.push(id);                    //Adiciona a casa no array de células do jogador 2
        registrarJogada(game.atual, id, game.turno)     //Envia um registro ao log
        game.atual = game.player1;                      //O atual jogador passa a ser o jogador 1
    }

    checkVictory();                                     //Verifica se alguma win condition foi atingida
    game.turno++;                                       //Incrementa os turnos da partida
}

function checkVictory(){                                //Checa as win conditions do jogo
    
    if(horizontal1.every(value => game.housesPlayer1.includes(value)) === true){
        game.vencedor = game.player1;
        winner(game.vencedor);
    } else if (horizontal2.every(value => game.housesPlayer1.includes(value)) === true){
        game.vencedor = game.player1;
        winner(game.vencedor);
    } else if (horizontal3.every(value => game.housesPlayer1.includes(value)) === true){
        game.vencedor = game.player1;
        winner(game.vencedor);
    } else if (vertical1.every(value => game.housesPlayer1.includes(value)) === true){
        game.vencedor = game.player1;
        winner(game.vencedor);
    } else if (vertical2.every(value => game.housesPlayer1.includes(value)) === true){
        game.vencedor = game.player1;
        winner(game.vencedor);
    } else if (vertical3.every(value => game.housesPlayer1.includes(value)) === true){
        game.vencedor = game.player1;
        winner(game.vencedor);
    } else if (diagonal1.every(value => game.housesPlayer1.includes(value)) === true){
        game.vencedor = game.player1;
        winner(game.vencedor);
    } else if (diagonal2.every(value => game.housesPlayer1.includes(value)) === true){
        game.vencedor = game.player1;
        winner(game.vencedor);
    }

    if(horizontal1.every(value => game.housesPlayer2.includes(value)) === true){
        game.vencedor = game.player2;
        winner(game.vencedor);
    } else if (horizontal2.every(value => game.housesPlayer2.includes(value)) === true){
        game.vencedor = game.player2;
        winner(game.vencedor);
    } else if (horizontal3.every(value => game.housesPlayer2.includes(value)) === true){
        game.vencedor = game.player2;
        winner(game.vencedor);
    } else if (vertical1.every(value => game.housesPlayer2.includes(value)) === true){
        game.vencedor = game.player2;
        winner(game.vencedor);
    } else if (vertical2.every(value => game.housesPlayer2.includes(value)) === true){
        game.vencedor = game.player2;
        winner(game.vencedor);
    } else if (vertical3.every(value => game.housesPlayer2.includes(value)) === true){
        game.vencedor = game.player2;
        winner(game.vencedor);
    } else if (diagonal1.every(value => game.housesPlayer2.includes(value)) === true){
        game.vencedor = game.player2;
        winner(game.vencedor);
    } else if (diagonal2.every(value => game.housesPlayer2.includes(value)) === true){
        game.vencedor = game.player2;
        winner(game.vencedor);
    }

    if(game.turno == 8 && game.vencedor == ""){
        draw();
    }
    
    console.log("Ainda não houve vencedor.");
}

function registrarComeco(player){
    document.getElementById("log-text").value += "O primeiro jogador é: " + player + ".\n";
    document.getElementById("log-text").value += "O jogador 1 será o X, o jogador 2 será o O.\n";
}

function registrarJogada(player, casa, turno){
    document.getElementById("log-text").value += "Turno [" + turno + "]: " + "O jogador " + player + " marcou a casa " + casa + ".\n";
    console.log("Jogador 1: " + game.housesPlayer1 + ".\n")
    console.log("Jogador 2: " + game.housesPlayer2 + ".\n")
}

function registrarFinal(player){
    if(game.vencedor != ""){
        document.getElementById("log-text").value += "O jogador " + player + " saiu vitorioso!\nAo vencedor, as batatas.";
    }else{
        document.getElementById("log-text").value += "O jogo empatou!\n";
    }
    
}

function winner(player){
    alert("O jogador " + player + " saiu vitorioso! \nParabéns, " + player + ".");
    registrarFinal(player);
    $('.house').removeAttr('onclick');
}

function draw(){
    alert("O jogo empatou!\n");
    registrarFinal();
}