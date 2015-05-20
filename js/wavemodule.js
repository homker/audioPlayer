/**
 * Created by homker on 2015/5/20.
 */

define('wavemodule',['zepto','loadAudio'],function(require,exports,module){
    var loadAudio = require("loadAudio"),
        $ = require('zepto'),
        context = new AudioContext(),
        analyser = context.createAnalyser(),
        proccesser = context.createScriptProcessor(4096,1,1), //单帧大小 4096 一个输入池，一个输出池。
        s ={48:261.6,49:330,50:370,51:392,52:440,53:494,54:277},
        displayWave = function(waveByteDate){
            var canvas = $('#display')[0];
            var canvasContext = canvas.getContext('2d');
            canvasContext.fillStyle = "#428bca";
            canvasContext.clearRect(0,0,1024,100);
            for(var i = 0; i<waveByteDate.length; i++){
                canvasContext.fillRect(i,100,1,(0- (waveByteDate[i]/255 * 100)));
            }
            canvasContext.stroke();
        },
        playSoud = function(buffer) {
            console.log("work here");
            var source = context.createBufferSource();
            source.buffer = buffer;
            source.connect(analyser);
            analyser.connect(proccesser);
            proccesser.connect(context.destination);
            var handler = setInterval(function(){
                var waveByteDate = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(waveByteDate);
                displayWave(waveByteDate);//绘制波形
            },10)
            source.start(0);
            source.ended = function(){
                $("#wave").getContext("2d").clearRect(0,0,1024,100);
                clearInterval(handler);
            }
            source.stop = function(){
                if(!source.stop){
                    source.stop = source.noteOff;
                }
            };

        };
    proccesser.onaudioprocess = function(audioProcessingEvent) {
        var inputBuffer = audioProcessingEvent.inputBuffer, //输入帧
            outputBuffer = audioProcessingEvent.outputBuffer; //输出帧

        //循环输出通道
        for (var channel = 0; channel < outputBuffer.numberOfChannels; channel++) {
            var inputData = inputBuffer.getChannelData(channel),//输入数据
                outputData = outputBuffer.getChannelData(channel);//输出数据

            // proccesser = context.createScriptProcessor(4096,1,1), 这里的inputbuffer循环4096次
            for (var sample = 0; sample < inputBuffer.length; sample++) {
                outputData[sample] = inputData[sample];//将输入数据复制到输出数据
                // 如果想添加噪点的话，随机加上点数据就可以了~！
                //outputData[sample] += ((Math.random() * 2) - 1) * 0.2;
            }
        }
    }

    exports.start = function(url){
        console.log("work here");
        loadAudio.setconfig(context,url,playSoud);
        loadAudio.start();
        for( var i in s){
            var  value = s[i];
            s[i] = context.createOscillator();//提供了产生振荡器节点的方法，使用这个节点改变频率可以生成不一样的音调
            s[i].frequency.value = value;
            s[i].start();
        }
        window.addEventListener("keydown",function(e){
            //console.log(e.keyCode);
            if(e = s[e.keyCode]){
                //console.log(e);
                e.connect(proccesser);
            }
        });
        window.addEventListener("keyup",function(e){
            if(e=s[e.keyCode]){
                e.disconnect();
            }
        })
    };
})
