class ImageLoader{
	
	load(queryString, callback){
		const url = `https://www.googleapis.com/customsearch/v1?q=${queryString}&searchType=image&imgType=face&colorType=color&cx=000726481298009653627%3Amhawcjonnia&key=AIzaSyBu-WFo6qEtBIJW2hGjkvnnHBdDYV35uQ0`;
		this.loadJSON(url, function(status, response){
			console.log('Image Loader', status, response);
			if(response.items){
				callback(response.items);
			}else{
				callback(false);
			}
		});
	}

	loadJSON(url, callback){
	    var xhr = new XMLHttpRequest();
	    xhr.open('GET', url, true);
	    xhr.responseType = 'json';
	    xhr.onload = function() {
	      var status = xhr.status;
	      if (status === 200) {
	        callback(null, xhr.response);
	      } else {
	        callback(status, xhr.response);
	      }
	    };
	    xhr.send();
	}

}

const imageLoader = new ImageLoader();

export default imageLoader;