"use strict";
window.onload =function(){
	var player = document.getElementsByTagName("audio");
	var src  =  document.getElementsByTagName("source");
	var url = src[0].src;
	var type = src[0].type;
	var playButton = document.getElementById("play-pause");
	var play = document.getElementById("play-pause").childNodes[1];
	var progressbar = document.getElementsByName("progressbar")[0];
	var loadprogressbar = document.getElementsByName("loadprogressbar")[0];
	var playType;
	if (!player) {
		player  = new Audio();
	}else{
		player = player[0];
	}
	//console.log(play.childNodes[1].className.replace("glyphicon-play","glyphicon-pause"));
	if(player.canPlayType(type)){
		player.src = url;
		playType = true;
	}else{
		playType = false;
	}
	playButton.addEventListener("click",function(){
		if (playType) {
			play.className = play.className.replace("glyphicon-play","glyphicon-loading");
		};
	},false);
	player.addEventListener('canplay',function(){
		play.className = play.className.replace("glyphicon-play","glyphicon-pause");
		player.play();
	},false);
	player.addEventListener('canplaythrough',function(){
		//alert("hah");
	},false);	
	player.addEventListener( ' loadeddata ' ,function(){
		
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

