(function () {
	let imgCont = document.querySelector('.imgCont');
	let inpBtn = document.querySelector('.input-button');
	let res = document.createElement('img');
	inpBtn.addEventListener('change', (event) => {
				let files = inpBtn.files;
	    	renderImage(files);
			}
	);
	let drawImg = (img1) => {
		let canvas = document.createElement('canvas');
		let context = canvas.getContext("2d");
		let border = new Image();
		canvas.setAttribute('width', img1.width + 'px');
 		canvas.setAttribute('height', img1.height + 'px');
		context.drawImage(img1, 0, 0);
		border.src = 'img/border.png';
		border.onload = () => {
			context.drawImage(border, 0, 0, img1.width, img1.height);
			let result = document.createElement("img");
			result.src = canvas.toDataURL('image/jpeg');
			result.classList.add('min-img');
			let imgMin = document.createElement('a');
			let img = document.createElement('img');
			img.src = canvas.toDataURL('image/jpeg');
			imgMin.href = canvas.toDataURL('image/jpeg');
			imgMin.download = true;
			imgMin.classList.add('imgMin');
			imgMin.appendChild(img);
			imgCont.appendChild(imgMin);
		}
	}
	let renderImage = (files) => {
		if(files) imgCont.innerHTML = '';
		for (var i = files.length - 1; i >= 0; i--) {
			let reader = new FileReader();
			reader.onload = (event) => {
				let img1 = new Image();
				img1.src = event.target.result;
				img1.onload = () => {
					drawImg(img1)
				}
			}
			reader.readAsDataURL(files[i]);
		}

	}

































})();
