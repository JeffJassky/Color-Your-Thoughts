import ColorYourThoughts from './color-your-thoughts.js'
import SpeechRecognition from './speech-recognition.js'

class Intro {
	constructor(callback){
		this.callback = callback;
		this.instructions = [
			{
				number: 1,
				buttonLabel: 'Okay.'
			},
			{
				number: 2,
				buttonLabel: 'Got it...'
			},
			{
				number: 3,
				buttonLabel: 'Play!'
			}
		];
		this.currentStep = 0;
	}

	start(){
		this.renderStep();
	}

	renderStep() {
		const instruction = this.instructions[this.currentStep];
		const template = `
			<div class="instructions">
				<img src="instruction-${instruction.number}.png"><br />
				<button class="continue">${instruction.buttonLabel}</button>
			</div>
		`;
		document.body.innerHTML = template;
		document.getElementsByClassName('continue')[0].onclick = this.continue.bind(this);
		if(this.currentStep === 1){
			SpeechRecognition.initializeMicrophone();
		}
	}

	continue(){
		if(this.instructions.length -1 == this.currentStep){
			this.renderApp();
		}else{
			this.currentStep++;
			this.renderStep();
		}
	}

	renderApp(){
		ColorYourThoughts.start();	
	}
}

const intro = new Intro();
export default intro;