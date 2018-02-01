import SpeechRecognition from './speech-recognition.js'
import ImageLoader from './image-loader.js'

class ColorYourThoughts{
	constructor(){
		this.layers = [];
		this.thought = null;
		this.queries = 0;
		this.comments = [
			'Nice! Try another one. Like Cloudy Sky or Palm Tree',
			'Wow. so pretty.',
			'Hint: Press the [I] key to peek behind the sceens.'
		]
	}
	start(){
		const template = `
			<div class="app">
				<div class="background">
					<div class="layer"></div>
					<div class="layer"></div>
					<div class="layer"></div>
					<div class="layer"></div>
					<div class="layer"></div>
				</div>
				<div class="thought-wrapper">
					<div class="query">
						Go ahead. Try it.
					</div>
					<div class="comment">

					</div>
				</div>
				<div class="image">

				</div>
			</div>
		`;
		document.body.innerHTML = template;


		SpeechRecognition.collect(this.loadImages.bind(this));
		this.layers = document.getElementsByClassName('layer');
		this.query = document.getElementsByClassName('query')[0];
		this.image = document.getElementsByClassName('image')[0];
		this.comment = document.getElementsByClassName('comment')[0];
		document.onmousemove = this.onMouseMove.bind(this);
		document.onkeydown = this.onKeyDown.bind(this);
		document.onkeyup = this.onKeyUp.bind(this);

	}
	loadImages(query){
		this.queries++;
		ImageLoader.load(query, function(images){
			if(images){
				const layers = this.layers;

				let selectedColors = null;
				for(var image in images){
					Vibrant.from(images[image].link).getPalette((err, colors) => {
						if(!err && !selectedColors && colors && Object.keys(colors).length >= 5){
							selectedColors = colors;
							let i=0;
							const cssColors = [];
							for(var colorName in selectedColors){
								if(selectedColors[colorName]){
									const rgb = selectedColors[colorName]._rgb;
									const backgroundStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
									cssColors.push(backgroundStyle);
									if(this.layers.hasOwnProperty(i)){
										this.layers[i].style.background = backgroundStyle;
										this.layers[i].style.opacity = 0.8;
									}
									i++;
								}
							}
							document.body.style.background = 'linear-gradient(233deg,'+cssColors.join(',')+')';
							document.body.style.backgroundSize = '1200%,1200%';
							this.image.style.background = 'url('+images[image].link+') no-repeat';
							this.image.style.backgroundSize = 'cover';
						}
					});
				}
				const commentIndex = Math.min(this.queries, this.comments.length - 1);
				this.comment.innerHTML = this.comments[commentIndex];
				this.query.innerHTML = query;
			}else{
				this.query.innerHTML = 'Wow, you talk a lot.';
				this.comment.innerHTML = "Sorry, It's not you. It's me. My API is down."
			}
		}.bind(this))
	}
	onMouseMove(e){
		const moveAmount = 1;
		const xPercentage = (10 / window.innerWidth * e.clientX) - 5;
		const yPercentage = (10 / window.innerHeight * e.clientY) - 5;
		for(let i=0; i<5; i++){
			let xMargin = moveAmount * i * xPercentage;
			let yMargin = moveAmount * i * yPercentage;
			this.layers[i].style.transform = `translate(${xMargin}px)`;
		}
	}
	onKeyDown(e){
		if(e.which === 73){
			this.image.classList.add('shown');
		}
	}
	onKeyUp(e){
		if(e.which === 73){
			this.image.classList.remove('shown');
		}
	}
}

const colorYourThoughts = new ColorYourThoughts();

export default colorYourThoughts;