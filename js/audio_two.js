"use strict";

window.onload =function(){
      var Context=window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext,
      	player = new Context(),
      	mp3 = new Audio();
      	media = player.createMediaElementSource(audio),
      	processor = player.createScriptProcessor(4096,1,1),
      	srouce = document.getElementsByTagName('source'),
      	src = srouce[0].src,
      	analyser = player.createAnalyser(),
      	secondsToTime = function( secs ){
		var hoursDiv = secs / 3600, hours = Math.floor( hoursDiv ), minutesDiv = secs % 3600 / 60, minutes = Math.floor( minutesDiv ), seconds = Math.ceil( secs % 3600 % 60 );
		if( seconds > 59 ) { seconds = 0; minutes = Math.ceil( minutesDiv ); }
		if( minutes > 59 ) { minutes = 0; hours = Math.ceil( hoursDiv ); }
		return ( hours == 0 ? '' : hours > 0 && hours.toString().length < 2 ? '0'+hours+':' : hours+':' ) + ( minutes.toString().length < 2 ? '0'+minutes : minutes ) + ':' + ( seconds.toString().length < 2 ? '0'+seconds : seconds );
	},
      	play = function(buffer){
      		var source = player.createBufferSource();
      		source.buffer = buffer;
      		source.connect(analyser);
      		analyser.smoothingTimeConstant = 0.85;
      		source.connect(player.destination);
      		var handler = setInterval(function(){
      			var waveByteDate = new Uint8Array(analyser.frequencyBinCount);
      			analyser.getByteFrequencyData(waveByteDate);
      			displayWave(waveByteDate);
      		},10)
      		source.start(0);
      		source.ended = function(){
      			document.getElementById("wave").getContext("2d").clearRect(0,0,1024,100);
      			clearInterval(handler);
      		}
                                          source.stop = function(){
                                                if(!source.stop){
                                                      source.stop = source.noteOff;
                                                }

                                          };
      	},
      	displayWave = function(waveByteDate){
      		var  canvasContext = document.getElementById("display").getContext('2d');
      		canvasContext.fillStyle = '#66ccff';
      		canvasContext.clearRect(0,0,1024,100);
      		for(var i = 0; i < waveByteDate.length; i++){
      			var height = (0- (waveByteDate[i]/255 * 100));
      			canvasContext.fillRect(i,100,1,height);
      		}

      	}
loadeAduio();
console.log(player);
console.log(player.destination.context.currentTime);
setInterval(function(){
	console.log(secondsToTime(player.currentTime));
},100);	
}


