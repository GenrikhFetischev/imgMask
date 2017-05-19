'use strict';

(function () {

	var w = void 0,
	    h = void 0;
	var imgCont = document.querySelector('.imgCont');
	var inpBtn = document.querySelector('.input-button');
	var canvas = document.createElement('canvas');
	var context = canvas.getContext("2d");
	var img1 = new Image();
	var border = new Image();
	canvas.classList.add('canvas');
	imgCont.appendChild(canvas);
	var res = document.createElement('img');
	res.classList.add('hidden');
	document.body.appendChild(res);
	var result = document.createElement('img');
	result.classList.add('result');
	imgCont.appendChild(result);
	inpBtn.addEventListener('change', function (event) {
		var file = inpBtn.files[0];
		renderImage(file);
	});

	function renderImage(file) {
		var reader = new FileReader();
		reader.onload = function (event) {
			var the_url = event.target.result;
			res.src = the_url;
			res.onload = function () {
				w = res.width;
				h = res.height;
				res.style.display = 'none';
				imgCont.querySelector('.placeholder').style.display = 'none';
				canvas.setAttribute('width', w + 'px');
				canvas.setAttribute('height', h + 'px');
				canvas.setAttribute('display', 'block');
				imgCont.style.width = w + 'px';
				imgCont.style.height = h + 'px';
				imgCont.style.minHeight = h + 'px';
			};
			img1.src = the_url;
		};
		reader.readAsDataURL(file);
	}

	img1.onload = function () {
		context.drawImage(img1, 0, 0, w, h);
		border.src = 'img/border.png';
		border.onload = function () {
			context.drawImage(border, 0, 0, w, h);
			var imgData = canvas.toDataURL('image/jpeg');
			result.src = imgData;
			var btn = document.querySelector('.download');
			btn.href = imgData;
			btn.style.opacity = 1;
		};
	};
})();