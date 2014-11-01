"use strict";
window.onload =function(){
	var player = document.getElementsByTagName("audio"),
	src  =  document.getElementsByTagName("source"),
	url = src[0].src,
	type = src[0].type,
	playButton = document.getElementById("play-pause"),
	play = playButton.childNodes[1],
	progressbar = document.getElementsByName("progressbar")[0],
	loadprogressbar = document.getElementsByName("loadprogressbar")[0],
	 playType,
	 start = false;
	 player = (!player)?new Audio() : player[0];
	if(player.canPlayType(type)){
		player.src = url;
		playType = true;
	}else{
		playType = false;
	}
	playButton.addEventListener("click",function(){
		if (playType&&start==false) {
			play.className = play.className.replace("glyphicon-play","glyphicon-loading");
			start = true;
			player.play();
		}else if(start == true){
			player.pause();
			play.className = play.className.replace("glyphicon-pause","glyphicon-play");
			start = false;
		}
	},false);
	player.addEventListener('canplay',function(){
		play.className = play.className.replace("glyphicon-loading","glyphicon-pause");
	},false);
	player.addEventListener('playing',function(){
		play.className = play.className.replace("glyphicon-loading","glyphicon-pause");
	},false);
	player.addEventListener('ended',function(){
		play.className = play.className.replace("glyphicon-pause","glyphicon-play");
		progressbar.style.width = 0 + "%";
		start = false;
	},false);
	setInterval(function(){
		var  loaded = Math.floor(player.buffered.end(0) / player.duration  * 100 );
		var played = Math.floor(player.played.end(0) / player.duration * 100);
		progressbar.style.width = played + "%";
		loaded = loaded - played;
		//console.log(loadprogressbar);
		loadprogressbar.style.width = loaded + "%";
	},100);
	var allPrpos=function(obj){
		var props = "";
		for(var p in obj){
			if(typeof(obj[p]) == "function"){
				console.log(obj[p]);
			}else continue;
		}
	}
}

