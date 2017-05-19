(function () {

		let w, h;
		let imgCont = document.querySelector('.imgCont');
		let inpBtn = document.querySelector('.input-button');
		let canvas = document.createElement('canvas')
		let context = canvas.getContext("2d");
		let img1 = new Image();
		let border = new Image();
		canvas.classList.add('canvas');
		imgCont.appendChild(canvas);
		let res = document.createElement('img');
		res.classList.add('hidden');
		document.body.appendChild(res);
		let result = document.createElement('img');
		result.classList.add('result');
		imgCont.appendChild(result);
		inpBtn.addEventListener('change', (event) => {
					let file = inpBtn.files[0];
		    	renderImage(file);
				}
		);


		function renderImage(file) {
 		 let reader = new FileReader();
  		reader.onload = function(event) {
 		    the_url = event.target.result;
 		    res.src = the_url;
 		    res.onload = () => {
 		    	w = res.width;
 		    	h = res.height;
 		    	res.style.display = 'none';
 		    	imgCont.querySelector('.placeholder').style.display = 'none';
 		    	canvas.setAttribute('width', w + 'px');
 		    	canvas.setAttribute('height', h + 'px');
 		    	canvas.setAttribute('display', 'block');
 		    	imgCont.style.width =  w + 'px';
 		    	imgCont.style.height =  h + 'px';
 		    	imgCont.style.minHeight =  h + 'px';

 		    }
 		    img1.src = the_url;
 		  }
 		  reader.readAsDataURL(file);
		}
		

		img1.onload = function() {
			context.drawImage(img1, 0, 0, w, h);
			border.src = 'img/border.png';
			border.onload = function() {
				context.drawImage(border, 0, 0, w, h);
				let imgData = canvas.toDataURL('image/jpeg');
				result.src = imgData;
				document.body.appendChild(res);
				let btn = document.querySelector('.download');
				btn.href = imgData;
				btn.style.opacity = 1;
			};
		};

})();