class SpeechRecognition {
	initializeMicrophone(){
		console.log('INIT MIC');
		const initMic = new webkitSpeechRecognition();
		initMic.onstart = function(){
			initMic.stop();
		};
	}
	collect(callback){
		const recognition = new webkitSpeechRecognition();
		recognition.continuous = true;
		recognition.interimResults = true;
		
		recognition.onend = function(){
			console.log('audio end');
			setTimeout(function(){
				this.collect(callback);
			}.bind(this), 1000);
		}.bind(this);

		recognition.onresult = function(resultList) {
			console.log(resultList.results[0][0].transcript);
			if(resultList.results[0].isFinal){
				console.log('Final: ' + resultList.results[0][0].transcript);
				callback(resultList.results[0][0].transcript);
				recognition.stop();
			}
		}.bind(this);
		recognition.start();
	}
};

const speechRecognition = new SpeechRecognition();

export default speechRecognition;