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
	timebar = document.getElementsByName("timebar")[0],
	 playType,
	 start = false,
	 secondsToTime = function( secs ){
		var hoursDiv = secs / 3600, hours = Math.floor( hoursDiv ), minutesDiv = secs % 3600 / 60, minutes = Math.floor( minutesDiv ), seconds = Math.ceil( secs % 3600 % 60 );
		if( seconds > 59 ) { seconds = 0; minutes = Math.ceil( minutesDiv ); }
		if( minutes > 59 ) { minutes = 0; hours = Math.ceil( hoursDiv ); }
		return ( hours == 0 ? '' : hours > 0 && hours.toString().length < 2 ? '0'+hours+':' : hours+':' ) + ( minutes.toString().length < 2 ? '0'+minutes : minutes ) + ':' + ( seconds.toString().length < 2 ? '0'+seconds : seconds );
	},
	changeClassName = function(obj, firstName, secondName){
		obj.className = obj.className.replace(firstName,secondName);
	}
	 player = (!player)?new Audio() : player[0];
	if(player.canPlayType(type)){
		player.src = url;
		playType = true;
	}else{
		playType = false;
	}
	playButton.addEventListener("click",function(){
		if (playType&&start==false) {
			changeClassName(play,"glyphicon-play","glyphicon-loading");
			start = true;
			player.play();
		}else if(start == true){
			player.pause();
			changeClassName(play,"glyphicon-pause","glyphicon-play");
			start = false;
		}
	},false);
	player.addEventListener('canplay',function(){
		changeClassName(play,"glyphicon-loading","glyphicon-pause");
	},false);
	player.addEventListener('playing',function(){
		changeClassName(play,"glyphicon-loading","glyphicon-pause");
	},false);
	player.addEventListener('ended',function(){
		changeClassName(play,"glyphicon-pause","glyphicon-play");
		progressbar.style.width = 0 + "%";
		start = false;
	},false);
	console.log(timebar);
	setInterval(function(){
		var  loaded = Math.floor(player.buffered.end(0) / player.duration  * 100 );
		var played = Math.floor(player.played.end(0) / player.duration * 100);
		progressbar.style.width = played + "%";
		loaded = loaded - played;
		console.log(secondsToTime(played));
		timebar.innerHTML = secondsToTime(played) + "/"  + secondsToTime(player.duration);
		loadprogressbar.style.width = loaded + "%";
	},100);
}

