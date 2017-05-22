'use strict';

(function () {
	var imgCont = document.querySelector('.imgCont');
	var inpBtn = document.querySelector('.input-button');
	var res = document.createElement('img');
	inpBtn.addEventListener('change', function (event) {
		var files = inpBtn.files;
		renderImage(files);
	});

	var drawImg = function drawImg(img1) {
		var canvas = document.createElement('canvas');
		var context = canvas.getContext("2d");
		var border = new Image();
		canvas.setAttribute('width', img1.width + 'px');
		canvas.setAttribute('height', img1.height + 'px');
		context.drawImage(img1, 0, 0);
		border.src = 'img/border.png';
		border.onload = function () {
			context.drawImage(border, 0, 0, img1.width, img1.height);
			var result = document.createElement("img");
			result.src = canvas.toDataURL('image/jpeg');
			result.classList.add('min-img');
			var imgMin = document.createElement('a');
			var img = document.createElement('img');
			img.src = canvas.toDataURL('image/jpeg');
			imgMin.href = canvas.toDataURL('image/jpeg');
			imgMin.download = true;
			imgMin.classList.add('imgMin');
			imgMin.appendChild(img);
			imgCont.appendChild(imgMin);
		};
	};

	var renderImage = function renderImage(files) {
		if (files) imgCont.innerHTML = '';
		for (var i = files.length - 1; i >= 0; i--) {
			var reader = new FileReader();
			reader.onload = function (event) {
				var img1 = new Image();
				img1.src = event.target.result;
				img1.onload = function () {
					drawImg(img1);
				};
			};
			reader.readAsDataURL(files[i]);
		}
	};
})();