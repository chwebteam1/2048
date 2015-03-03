'use strict';

/**
 * @ngdoc function
 * @name 2k48App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the 2k48App
 */
angular.module('2k48App')
  .controller('MainCtrl', function ($scope) {
	var board = [
		{'value' : 0, 'index' : 0},
		{'value' : 0, 'index' : 1},
		{'value' : 0, 'index' : 2},
		{'value' : 0, 'index' : 3},
		{'value' : 0, 'index' : 4},
		{'value' : 0, 'index' : 5},
		{'value' : 0, 'index' : 6},
		{'value' : 0, 'index' : 7},
		{'value' : 0, 'index' : 8},
		{'value' : 0, 'index' : 9},
		{'value' : 0, 'index' : 10},
		{'value' : 0, 'index' : 11},
		{'value' : 0, 'index' : 12},
		{'value' : 0, 'index' : 13},
		{'value' : 0, 'index' : 14},
		{'value' : 0, 'index' : 15}
    ];

    $scope.score = {'value' : 0};

    gameInit();
    // initiating the game

    var VALMAX = 2048;
    var dimmensions = 4;
	var gameover = false;
	var hasMoved = false;

    $scope.key = function($event){

		var oldBoard = board;

		if ($event.keyCode == 38) // up arrow
			moveUP(0);
		else if ($event.keyCode == 39) // right arrow
			moveRight(0);
		else if ($event.keyCode == 40) // down arrow
			moveDown(0);
		else if ($event.keyCode == 37) // left arrow
			moveLeft(0);

		// only if the something has changed in the board do we spicy it a bit

		hasMoved = true;


		for (var i = 0; i < board.length; i++){
			if(oldBoard[i].value !== board[i].value)
				hasMoved = true;
		}

		if(hasMoved)
			spicyUpTheBoard();

		// update the interface
		$scope.board = board;
	};

	$scope.newGame = function newGame(){
		board = [
			{'value' : 0, 'index' : 0},
			{'value' : 0, 'index' : 1},
			{'value' : 0, 'index' : 2},
			{'value' : 0, 'index' : 3},
			{'value' : 0, 'index' : 4},
			{'value' : 0, 'index' : 5},
			{'value' : 0, 'index' : 6},
			{'value' : 0, 'index' : 7},
			{'value' : 0, 'index' : 8},
			{'value' : 0, 'index' : 9},
			{'value' : 0, 'index' : 10},
			{'value' : 0, 'index' : 11},
			{'value' : 0, 'index' : 12},
			{'value' : 0, 'index' : 13},
			{'value' : 0, 'index' : 14},
			{'value' : 0, 'index' : 15}
		];
		gameover = false;
		hasMoved = false;
		gameInit();

	}
	function Gagner(){
		VALMAX *= 2;
		alert("Bravo vous avez gagné ! Libre à vous de continuer. Nous avons élevlé la barre plus haut atteingez maintenant les " + VALMAX + " pour devenir le grand champion");
	}

	function spicyUpTheBoard(){


		// let's add a 2 or a 4 in the board
		var rnd = Math.floor(Math.random() * 2) + 1;
		var val = 2;
		if(rnd == 2){
			val = 4;
		}

		var vide = false;


		// first we check if there's any empty tile in the board
		gameover = true;
		for(var i = 0; i < 16; i++){
			if(board[i].value == 0)
				gameover = false;
		}

		if(gameover){
			alert("Vous avez perdu !");
		}

		// searching for an empty tile
		while(!vide && !gameover){
			rnd = Math.floor(Math.random() * 16) ;
			if(board[rnd].value == 0){
				board[rnd].value = val;
				vide = true;
			}
		}
	}

	function gameInit(){

		var rnd1 = Math.floor(Math.random() * 16);
		var rnd2 = Math.floor(Math.random() * 2) + 1;

		var val = 2;

		if(rnd2 == 2)
			val = 4;

		board[rnd1].value = val;
		var oldrnd = rnd1;

		// pick another number
		while(rnd1 == oldrnd)
			rnd1 = Math.floor(Math.random() * 16);

		rnd2 = Math.floor(Math.random() * 2) + 1;
		val = 2;
		if(rnd2 == 2)
			val = 4;
		
		board[rnd1].value = val;
		$scope.score.value = 0;

		$scope.board = board;

	}

	function From2Dto1D(val1, val2, dim){
		return val1 * dim + val2;
	}



	function moveRight(checkup){

		if(!checkup){
			for (var i = 0; i <= 3; i++){
				for (var y = 0; y <= 3; y++){
					var position1D = From2Dto1D(i,y,dimmensions);

					if(y <= 2){
						var nextY = y + 1;
						var position1DNext = From2Dto1D(i,nextY,dimmensions);
						if (board[position1D].value == board[position1DNext].value){
							board[position1DNext].value *= 2;
							$scope.score.value += board[position1DNext].value;
							board[position1D].value *= 0;
							if(board[position1DNext].value == VALMAX)
								Gagner();
						}else if(board[position1DNext].value == 0){
							board[position1DNext].value = board[position1D].value;
							board[position1D].value *= 0;
						}

					}
				}
			}

		}

		// we go over all the tiles once again to push 0s behind
		// pretty unneffective
		for (var i = 0; i <= 3; i++){
			for (var y = 0; y <= 3; y++){
				position1D = From2Dto1D(i,y,dimmensions);
				if(y <= 2){
					var nextY = y + 1;
					var position1DNext = From2Dto1D(i,nextY,dimmensions);
					if(board[position1DNext].value == 0){
						board[position1DNext].value = board[position1D].value;
						board[position1D].value *= 0;
					}
				}
			}
		}

	}

	function moveLeft(checkup){

		if(!checkup){
			for (var i = 0; i <= 3; i++){
				for (var y = 3; y >= 0; y--){
					var position1D = From2Dto1D(i,y,dimmensions);

					if(y >= 1){
						var nextY = y - 1;
						var position1DNext = From2Dto1D(i,nextY,dimmensions);
						if (board[position1D].value == board[position1DNext].value){
							board[position1DNext].value *= 2;
							$scope.score.value += board[position1DNext].value;
							board[position1D].value *= 0;
							if(board[position1DNext].value == VALMAX)
								Gagner();
						}else if(board[position1DNext].value == 0){
							board[position1DNext].value = board[position1D].value;
							board[position1D].value *= 0;
						}

					}
				}
			}

		}

		// we go over all the tiles once again to push 0s behind
		// pretty unneffective
		for (var i = 0; i <= 3; i++){
			for (var y = 3; y >= 0; y--){
				position1D = From2Dto1D(i,y,dimmensions);
				if(y >= 1){
					var nextY = y - 1;
					var position1DNext = From2Dto1D(i,nextY,dimmensions);
					if(board[position1DNext].value == 0){
						board[position1DNext].value = board[position1D].value;
						board[position1D].value *= 0;
					}
				}
			}
		}

	}

	function moveDown(checkup){

		if(!checkup){
			for (var i = 0; i <= 3; i++){
				for (var y = 0; y <= 3; y++){
					var position1D = From2Dto1D(y,i,dimmensions);
					if(y <= 2){
						var nextY = y + 1;
						var position1DNext = From2Dto1D(nextY,i,dimmensions);
						if (board[position1D].value == board[position1DNext].value){
							board[position1DNext].value *= 2;
							$scope.score.value += board[position1DNext].value;
							board[position1D].value *= 0;
							if(board[position1DNext].value == VALMAX)
								Gagner();
						}else if(board[position1DNext].value == 0){
							board[position1DNext].value = board[position1D].value;
							board[position1D].value *= 0;
						}

					}
				}
			}

		}

		// we go over all the tiles once again to push 0s behind
		// pretty unneffective
		for (var i = 0; i <= 3; i++){
			for (var y = 0; y <= 3; y++){
				position1D = From2Dto1D(y,i,dimmensions);
				if(y <= 2){
					var nextY = y + 1;
					var position1DNext = From2Dto1D(nextY,i,dimmensions);
					if(board[position1DNext].value == 0){
						board[position1DNext].value = board[position1D].value;
						board[position1D].value *= 0;
					}
				}
			}
		}

	}


	function moveUP(checkup){

		if(!checkup){
			for (var i = 0; i <= 3; i++){
				for (var y = 3; y >= 0; y--){
					var position1D = From2Dto1D(y,i,dimmensions);
					if(y >= 1){
						var nextY = y - 1;
						var position1DNext = From2Dto1D(nextY,i,dimmensions);
						if (board[position1D].value == board[position1DNext].value){
							board[position1DNext].value *= 2;
							$scope.score.value += board[position1DNext].value;
							board[position1D].value *= 0;
							if(board[position1DNext].value == VALMAX)
								Gagner();
						}else if(board[position1DNext].value == 0){
							board[position1DNext].value = board[position1D].value;
							board[position1D].value *= 0;
						}

					}
				}
			}

		}

		// we go over all the tiles once again to push 0s behind
		// pretty unneffective
		for (var i = 0; i <= 3; i++){
			for (var y = 3; y >= 0; y--){
				position1D = From2Dto1D(y,i,dimmensions);
				if(y >= 1){
					var nextY = y - 1;
					var position1DNext = From2Dto1D(nextY,i,dimmensions);
					if(board[position1DNext].value == 0){
						board[position1DNext].value = board[position1D].value;
						board[position1D].value *= 0;
					}
				}
			}
		}

	}

  });
