(function () {

		let w, h;
		let maxW = 700;
		let imgCont = document.querySelector('.imgCont');
		let inpBtn = document.querySelector('.input-button');

		
		function renderImage(file) {
 		 let reader = new FileReader();
  		reader.onload = function(event) {
 		    the_url = event.target.result;
 		    res.src = the_url;
 		    res.onload = () => {
 		    	w = res.width;
 		    	h = res.height;
 		    	res.style.display = 'none';
 		    	let size = calcSize(w, h, maxW);
 		    	imgCont.querySelector('.placeholder').style.display = 'none';
 		    	canvas.setAttribute('width', size.width + 'px');
 		    	canvas.setAttribute('height', size.height + 'px');
 		    	canvas.setAttribute('display', 'block');
 		    }
 		    img1.src = the_url;
 		  }
 		  reader.readAsDataURL(file);
		}

		inpBtn.addEventListener('change', (event) => {
			let file = inpBtn.files[0];
    	renderImage(file);
		});

		function calcSize(w, h, maxW) {
			let wh = h/w;
			let newW = maxW;
			let newH = newW * wh;
			return size = {
				height: h,
				width: w,
			}
		}



		let canvas = document.createElement('canvas')
		canvas.classList.add('canvas');
		imgCont.appendChild(canvas);
		let context = canvas.getContext("2d");


		let res = document.createElement('img');
		res.classList.add('hidden');
		document.body.appendChild(res);

		let result = document.createElement('img');
		result.classList.add('result');
		imgCont.appendChild(result);




		

		let img1 = new Image();
		let border = new Image();
		img1.onload = function() {
			let size = calcSize(w, h, maxW);
			console.log(size);
			context.drawImage(img1, 0, 0, size.width, size.height);

			border.src = 'img/border.png';
			border.onload = function() {
				context.drawImage(border, 0, 0, size.width, size.height);

				let imgData = canvas.toDataURL('image/jpeg');
				result.src = imgData;
				document.body.appendChild(res);
				let btn = document.querySelector('.download');
				btn.href = imgData;
				btn.style.opacity = 1;
			};
		};




		









})();