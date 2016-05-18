(function(){
	$(document).ready(function(){
		var game = {};

		game.stars = [];
		
		game.height = 800;
		game.width = 1599;
		game.keys = [];
		game.cheese = [];
		game.enemiesDoritos = [];
		game.enemiesDew = [];
		game.enemiesDoge = [];
		game.enemiesSanic = [];
		game.enemiesWeed = [];
		game.images = [];
		game.requiredImages = 0;
		game.totalenemies = 45;
		game.doneImages = 0;
		game.count = 54;
		game.division = 108;
		game.left = false;
		game.enemiesspeed = 3;
		game.fullcheeseTimer = 26;
		game.cheeseTimer = 26;
		game.score = 0;
		game.level = 1;
		game.hitmarker = new Audio("hitmarker.wav");
		game.mom = new Audio("mom.wav");
		game.wow =  new Audio("wow.wav");
		game.sax = new Audio("sax.wav");
		game.sponge = new Audio("sponge.wav");
		game.wombo = new Audio("wombo.wav");
		game.player = {
			x: 743,
			y: 630,
			width: 150,
			height: 150,
			speed: 5,
			rendered: false,
			image: 2
		};

		game.contextBackground = document.getElementById("backgroundCanvas").getContext("2d");
		game.contextPlayer = document.getElementById("playerCanvas").getContext("2d");
		game.contextEnemies = document.getElementById("enemiesCanvas").getContext("2d");
		game.contextSides= document.getElementById("sidesCanvas").getContext("2d");
		
		alert("USE 1,2,3,4,5 TO SWITCH PLAYERS. GOAL: SHOOT ALL THE MLG STUFF")
		
		$(document).keydown(function(e){
			game.keys[e.keyCode ? e.keyCode : e.which] = true;
		});
		
		$(document).keyup(function(e){
			
			delete game.keys[e.keyCode ? e.keyCode : e.which];
		});
		
		function addCheese(){
			game.cheese.push({
				x: game.player.x + 10,
				y: game.player.y,
				size: 20,
				image: 6
			});
		}
		function init(){
			for(i = 0; i < 599; i ++){
				game.stars.push({
					x: Math.floor(Math.random() * 1599),
					y: Math.floor(Math.random() * 900),
					size: Math.random() * 5
				});
			}
			for(y = 0; y < 1; y++){
				for(x = 0; x < 9; x++){
					game.enemiesSanic.push({
						x: (x * 100) + 400,
						y: (y * 120),
						width: 100,
						height: 100,
						image: 5,
						dead: false,
						deadTime: 10
					});
				}
			}
			for(y = 0; y < 1; y++){
				for(x = 0; x < 9; x++){
					game.enemiesDew.push({
						x: (x * 100) + 400,
						y: (y * 120) + 110,
						width: 100,
						height: 100,
						image: 1,
						dead: false,
						deadTime: 10
					});
				}
			}
			for(y = 0; y < 1; y++){
				for(x = 0; x < 9; x++){
					game.enemiesDoge.push({
						x: (x * 100) + 400,
						y: (y * 120) + 220,
						width: 80,
						height: 80,
						image: 4,
						dead: false,
						deadTime: 10
					});
				}
			}
			for(y = 0; y < 1; y++){
				for(x = 0; x < 9; x++){
					game.enemiesWeed.push({
						x: (x * 100) + 400,
						y: (y * 120) + 305,
						width: 80,
						height: 80,
						image: 3,
						dead: false,
						deadTime: 10
					});
				}
			}
			for(y = 0; y < 1; y++){
				for(x = 0; x < 9; x++){
					game.enemiesDoritos.push({
						x: (x * 100) + 400,
						y: (y * 120) + 400,
						width: 100,
						height: 120,
						image: 0,
						dead: false,
						deadTime: 10
					});
				}
			}
			loop();
			setTimeout(function(){
				game.moving = true;
			},1000);
		}

		
		function addStars(num){
			for(i = 0; i < num; i ++){
				game.stars.push({
					x: Math.floor(Math.random() * 1599),
					y: 900,
					size: Math.random() * 5
				});
			}
		}
			/*
		W= 87
		A= 65
		S= 83
		D= 68
		SPACE= 32
		P= 80
		*/

		function update(){
			addStars(1);
			if(game.count > 1000)game.count = 0;
			game.count++;
			if(game.cheeseTimer > 0)game.cheeseTimer--;
			for(i in game.stars){
				if(game.stars[i].y <= 0 - 5){
					game.stars.splice(i, 1);
				}
				game.stars[i].y--;
			}
			if(game.keys[49]){
				game.player.image = 8;
			}
			if(game.keys[50]){
				game.player.image = 7;
			}
			if(game.keys[51]){
				game.player.image = 9;
			}	
			if(game.keys[52]){
				game.player.image = 10;
			}	
			if(game.keys[53]){
				game.player.image = 2;
			}		
			if(game.keys[65]){
				if(game.player.x > 0){
				game.player.x-=game.player.speed;
				game.player.rendered = false;
				}
			}
			if(game.keys[68]){
				if(game.player.x <= game.width - game.player.width){
				game.player.x+=game.player.speed;
				game.player.rendered = false;
				}
			}
			if(game.count % game.division == 0){
				game.left = !game.left;
			}
			for(i in game.enemiesDoritos){
				if(game.left){
					game.enemiesDoritos[i].x-=game.enemiesspeed;
				}else{
					game.enemiesDoritos[i].x+=game.enemiesspeed;
				}
			}
			for(i in game.enemiesDew){
				if(game.left){
					game.enemiesDew[i].x-=game.enemiesspeed;
				}else{
					game.enemiesDew[i].x+=game.enemiesspeed;
				}
			}
			for(i in game.enemiesDoge){
				if(game.left){
					game.enemiesDoge[i].x-=game.enemiesspeed;
				}else{
					game.enemiesDoge[i].x+=game.enemiesspeed;
				}
			}
			for(i in game.enemiesWeed){
				if(game.left){
					game.enemiesWeed[i].x-=game.enemiesspeed;
				}else{
					game.enemiesWeed[i].x+=game.enemiesspeed;
				}
			}
			for(i in game.enemiesSanic){
				if(game.left){
					game.enemiesSanic[i].x-=game.enemiesspeed;
				}else{
					game.enemiesSanic[i].x+=game.enemiesspeed;
				}
			}
			for(i in game.cheese){
				if(game.cheese[i].y <= -10){
					game.cheese.splice(i, 1);
				}
				game.cheese[i].y-=3;
			}
			if(game.keys[32] && game.cheeseTimer <= 0 ){
				addCheese();
				game.cheeseTimer = game.fullcheeseTimer;
				game.wow.play();
			}
		for(e in game.enemiesDoritos){
				for(c in game.cheese){
					if(collision(game.enemiesDoritos[e],game.cheese[c])){
						game.enemiesDoritos[e].dead = true;
						game.hitmarker.play();
						game.contextEnemies.clearRect(game.cheese[c].x, game.cheese[c].y, game.cheese[c].size, game.cheese[c].size + 10);
						game.cheese.splice(c, 1);
						game.score++;
					}
				}
			}
		for(e in game.enemiesDew){
				for(c in game.cheese){
					if(collision(game.enemiesDew[e],game.cheese[c])){
						game.enemiesDew[e].dead = true;
						game.contextEnemies.clearRect(game.cheese[c].x, game.cheese[c].y, game.cheese[c].size, game.cheese[c].size + 10);
						game.cheese.splice(c, 1);
						game.score++;
						game.hitmarker.play();
					}
				}
			}
		for(e in game.enemiesDoge){
				for(c in game.cheese){
					if(collision(game.enemiesDoge[e],game.cheese[c])){
						game.enemiesDoge[e].dead = true;
						game.contextEnemies.clearRect(game.cheese[c].x, game.cheese[c].y, game.cheese[c].size, game.cheese[c].size + 10);
						game.cheese.splice(c, 1);
						game.score++;
						game.hitmarker.play();
					}
				}
			}
		for(e in game.enemiesWeed){
				for(c in game.cheese){
					if(collision(game.enemiesWeed[e],game.cheese[c])){
						game.enemiesWeed[e].dead = true;
						game.contextEnemies.clearRect(game.cheese[c].x, game.cheese[c].y, game.cheese[c].size, game.cheese[c].size + 10);
						game.cheese.splice(c, 1);
						game.score++;
						game.hitmarker.play();
					}
				}
			}
		for(e in game.enemiesSanic){
				for(c in game.cheese){
					if(collision(game.enemiesSanic[e],game.cheese[c])){
						game.enemiesSanic[e].dead = true;
						game.contextEnemies.clearRect(game.cheese[c].x, game.cheese[c].y, game.cheese[c].size, game.cheese[c].size + 10);
						game.cheese.splice(c, 1);
						game.score++;
						game.hitmarker.play();
					}
				}
			}		
			for(i in game.enemiesDoritos){
				if(game.enemiesDoritos[i].dead){
					game.enemiesDoritos[i].deadTime--;
				}
				if(game.enemiesDoritos[i].dead && game.enemiesDoritos[i].deadTime <= 0){
					game.contextEnemies.clearRect(game.enemiesDoritos[i].x, game.enemiesDoritos[i].y, game.enemiesDoritos[i].width, game.enemiesDoritos[i].height);
					game.enemiesDoritos.splice(i, 1);
				}
			}
			for(i in game.enemiesDew){
				if(game.enemiesDew[i].dead){
					game.enemiesDew[i].deadTime--;
				}
				if(game.enemiesDew[i].dead && game.enemiesDew[i].deadTime <= 0){
					game.contextEnemies.clearRect(game.enemiesDew[i].x, game.enemiesDew[i].y, game.enemiesDew[i].width, game.enemiesDew[i].height);
					game.enemiesDew.splice(i, 1);
				}
			}
			for(i in game.enemiesDoge){
				if(game.enemiesDoge[i].dead){
					game.enemiesDoge[i].deadTime--;
				}
				if(game.enemiesDoge[i].dead && game.enemiesDoge[i].deadTime <= 0){
					game.contextEnemies.clearRect(game.enemiesDoge[i].x, game.enemiesDoge[i].y, game.enemiesDoge[i].width, game.enemiesDoge[i].height);
					game.enemiesDoge.splice(i, 1);
				}
			}
			for(i in game.enemiesWeed){
				if(game.enemiesWeed[i].dead){
					game.enemiesWeed[i].deadTime--;
				}
				if(game.enemiesWeed[i].dead && game.enemiesWeed[i].deadTime <= 0){
					game.contextEnemies.clearRect(game.enemiesWeed[i].x, game.enemiesWeed[i].y, game.enemiesWeed[i].width, game.enemiesWeed[i].height);
					game.enemiesWeed.splice(i, 1);
				}
			}
			for(i in game.enemiesSanic){
				if(game.enemiesSanic[i].dead){
					game.enemiesSanic[i].deadTime--;
				}
				if(game.enemiesSanic[i].dead && game.enemiesSanic[i].deadTime <= 0){
					game.contextEnemies.clearRect(game.enemiesSanic[i].x, game.enemiesSanic[i].y, game.enemiesSanic[i].width, game.enemiesSanic[i].height);
					game.enemiesSanic.splice(i, 1);
				}
			}
			
		}
			
		
		function render(){
			game.contextBackground.clearRect(0,0,1599,900);
			game.contextBackground.fillStyle = "orange";
			game.contextSides.drawImage(game.images[7],20, 200, 110, 130);
			game.contextSides.drawImage(game.images[9],20, 600, 110, 130);
			game.contextSides.drawImage(game.images[10],1500, 400, 110, 110);
			game.contextSides.drawImage(game.images[8],1500, 100, 100, 100);
			game.contextSides.drawImage(game.images[2],1500, 600, 100, 100);	
			for(i in game.stars){
				var star = game.stars[i];
				game.contextBackground.fillRect(star.x, star.y, star.size, star.size);
			}
			game.contextBackground.font = "bold 40px monaco";
				game.contextBackground.fillStyle = "white";
				game.contextBackground.fillText("Level:", 1456, 40);
				game.contextBackground.font = "bold 40px monaco";
				game.contextBackground.fillStyle = "white";
				game.contextBackground.fillText(game.level, 1566, 40);
				
			if(!game.player.rendered){
				var player = game.player;
				game.contextPlayer.clearRect(game.player.x, game.player.y, 10000, 10000);
				game.contextPlayer.drawImage(game.images[player.image], game.player.x, game.player.y, game.player.width, game.player.height);
				game.player.rendered = true;
			}
			for(i in game.enemiesDoritos){
				var enemy = game.enemiesDoritos[i];
				game.contextEnemies.clearRect(enemy.x, enemy.y, enemy.width, enemy.height);
				game.contextEnemies.drawImage(game.images[enemy.image], enemy.x, enemy.y, enemy.width, enemy.height)
			}
			for(i in game.enemiesDew){
				var enemy = game.enemiesDew[i];
				game.contextEnemies.clearRect(enemy.x, enemy.y, enemy.width, enemy.height);
				game.contextEnemies.drawImage(game.images[enemy.image], enemy.x, enemy.y, enemy.width, enemy.height)
			}
			for(i in game.enemiesDoge){
				var enemy = game.enemiesDoge[i];
				game.contextEnemies.clearRect(enemy.x, enemy.y, enemy.width, enemy.height);
				game.contextEnemies.drawImage(game.images[enemy.image], enemy.x, enemy.y, enemy.width, enemy.height)
			}
			for(i in game.enemiesSanic){
				var enemy = game.enemiesSanic[i];
				game.contextEnemies.clearRect(enemy.x, enemy.y, enemy.width, enemy.height);
				game.contextEnemies.drawImage(game.images[enemy.image], enemy.x, enemy.y, enemy.width, enemy.height)
			}
			for(i in game.enemiesWeed){
				var enemy = game.enemiesWeed[i];
				game.contextEnemies.clearRect(enemy.x, enemy.y, 100, 100);
				game.contextEnemies.drawImage(game.images[enemy.image], enemy.x, enemy.y, enemy.width, enemy.height)
			}
			for(i in game.cheese){
				var ammo = game.cheese[i];
				game.contextEnemies.clearRect(ammo.x, ammo.y, 23, 23);
				game.contextEnemies.drawImage(game.images[ammo.image], ammo.x, ammo.y, ammo.size, ammo.size);
			}
				game.contextBackground.font = "bold 40px monaco";
				game.contextBackground.fillStyle = "white";
				game.contextBackground.fillText("Score:", 5, 50);
				
				game.contextBackground.font = "bold 40px monaco";
				game.contextBackground.fillStyle = "white";
				game.contextBackground.fillText(game.score, 120, 50);
			if(game.score > 20){
				game.sponge.play();
			}
			if(game.score > 40){
				game.wombo.play();
				game.sax.pause();
				game.sax.currentTime = 0;
			}
			if(game.score > 0 ){
				game.sax.play();
			}
			if(game.score >= 45 && game.keys[80]){
				game.level = 2;
				
			}
		}
	
		function loop(){
			requestAnimFrame(function(){
				loop();
			});
			update();
			render();
		}

		function initImages(paths){
			game.requiredImages = paths.length;
			for(i in paths){
				var img = new Image();
				img.src = paths[i];
				game.images[i] = img;
				game.images[i].onload = function(){
					game.doneImages++;
				}
			}
		}
		function collision(first, second){
			return !(first.x > second.x + second.width ||
				first.x + first.width < second.x ||
				first > second.y + second.height ||
				first.y + first.height < second.y);
		}
		function checkImages(){
			if(game.doneImages >= game.requiredImages){
				init();
			}else{
				setTimeout(function(){
					checkImages();
				}, 1);
			}				
		}
		game.contextBackground.font = "bold 50px monaco";
		game.contextBackground.fillStyle = "white";
		game.contextBackground.fillText("Loading.... pls wait!", 567, 356);
		initImages(["doritos.png","Mtn_Dew.png", "ernst.png", "Weed-.png", "doge.png", "Sanic.png", "cheese.png", "alex.png", "oscar.png", "daan.png", "tommie.png", "wow.png", "ill.png"]);
		checkImages();
	});
})();


window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();