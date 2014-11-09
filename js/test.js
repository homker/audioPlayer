"use strict";
(window.onload =function(){
       var player  =  document.getElementsByTagName("audio"),//get the audio element
             Context = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext,
	Context = new Context(),//get the audiocontext element
	processor = Context.createScriptProcessor(4096,1,1),//create the node of the script 
	analyser = Context.createAnalyser(), // create the analyser of the audiocontext
	src  =  document.getElementsByTagName("source"),// get the source element
	url = src[0].src, // get the source from the source element
	type = src[0].type,// get the  audio type from the source element  mpeg/mp3 ogg wav || video avi mp4   webm ogg 
	playButton = document.getElementById("play-pause"),
	play = playButton.childNodes[1],
	progressbar = document.getElementsByName("progressbar")[0],
	loadprogressbar = document.getElementsByName("loadprogressbar")[0],
	timebar = document.getElementsByName("timebar")[0],
	 playType,
	 start = false,
	 s = {48:261.6,49:330,50:370,51:392,52:440,53:494,54:277},
	 secondsToTime = function( secs ){  //the function to make the seconds to time like the i:s
		var hoursDiv = secs / 3600, hours = Math.floor( hoursDiv ), minutesDiv = secs % 3600 / 60, minutes = Math.floor( minutesDiv ), seconds = Math.ceil( secs % 3600 % 60 );
		if( seconds > 59 ) { seconds = 0; minutes = Math.ceil( minutesDiv ); }
		if( minutes > 59 ) { minutes = 0; hours = Math.ceil( hoursDiv ); }
		return ( hours == 0 ? '' : hours > 0 && hours.toString().length < 2 ? '0'+hours+':' : hours+':' ) + ( minutes.toString().length < 2 ? '0'+minutes : minutes ) + ':' + ( seconds.toString().length < 2 ? '0'+seconds : seconds );
	},
	changeClassName = function(obj, firstName, secondName){
		obj.className = obj.className.replace(firstName,secondName);
	},
	displayWave = function(output){
		var canvas = document.getElementById('display');
		var width=canvas.width,height=canvas.height;
		//console.log(height);
		var canvasContext = canvas.getContext('2d'); // get the elemet of the canvas
		canvasContext.clearRect(0,0,width,height);
		canvasContext.beginPath();
		canvasContext.strokeStyle = "#428bca";
		for(var i = 0; i<width; i++){
			canvasContext.lineTo(i,height/2*output[output.length*i/(width*2)|0]+50);
			//console.log(output.length*i/(width*2)|0);
		}
		canvasContext.stroke();
	};
	 player = (!player)?new Audio() : player[0];
	 var 	media = Context.createMediaElementSource(player);//get the source from the audio
	playButton.addEventListener("click",function(){
		if (start==false) {
			changeClassName(play,"glyphicon-play","glyphicon-loading");
			start = true;
			//console.log("do this");
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
		clearInterval(handler);
	},false);
	console.debug(processor);
	// some thing for the keybroad audio
	for( var i in s){
		var  value = s[i];
		s[i] = Context.createOscillator();
		s[i].frequency.value = value;
		s[i].start();
	}
	window.addEventListener("keydown",function(e){
		//console.log(e.keyCode);
		if(e = s[e.keyCode]){
			console.log(e);
			e.connect(processor);
		}
	});
	window.addEventListener("keyup",function(e){
		if(e=s[e.keyCode]){
			e.disconnect();
		}
	})
	// for the mp3 audio
	media.connect(processor);
	//analyser.smoothingTimeConstant = 0.85;
	processor.connect(Context.destination);

	processor.onaudioprocess = function(e){
		 var input = e.inputBuffer.getChannelData(0);
		 var output = e.outputBuffer.getChannelData(0);
		 for( var i = 0; i<input.length; i++){
		 	output[i] = input[i];
		 }
		 displayWave(output);
	};
	//console.log(processor);
	var handler = setInterval(function(){
		var  loaded = Math.floor(player.buffered.end(0) / player.duration  * 100 );
		var played = Math.floor(player.played.end(0) / player.duration * 100);
		progressbar.style.width = played + "%";
		loaded = loaded - played;
		timebar.innerHTML = secondsToTime(played) + "/"  + secondsToTime(player.duration);
		loadprogressbar.style.width = loaded + "%";
	},1000);
})();


