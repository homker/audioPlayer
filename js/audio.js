"use strict";
window.onload =function(){
	var player = document.getElementsByTagName("audio");
	var src  =  document.getElementsByTagName("source");
	var url = src[0].src;
	var type = src[0].type;
	var play = document.getElementById("play-pause").childNodes[1];
	if (!player) {
		player  = new Audio();
	}else{
		player = player[0];
	}
	//console.log(play.childNodes[1].className.replace("glyphicon-play","glyphicon-pause"));
	if(player.canPlayType(type)){
		player.src = url;
		play.className = play.className.replace("glyphicon-play","glyphicon-loading");
	}else{
		return false;
	}
}

