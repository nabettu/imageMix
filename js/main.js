var userImg1 = new Image();
var userImg2 = new Image();

function $(id) {
	return document.querySelector(id);
}

//画像アップロード用
$("#afile1").onchange = function(evt){
	var files = evt.target.files;
	if(files.length == 0) return;
	var file = files[0];
	if(!file.type.match(/image/)) {
		alert('画像ファイルを選んでください');
		return;
	}
	if(10240000 < file.size){
		alert('画像が大きすぎます(10MBまで)');
		return;
	};
	var reader = new FileReader();
	reader.onload = function(evt) {
		userImg1.src = reader.result;
		if(userImg1.width == 0)reader.readAsDataURL(file);
	}
	reader.readAsDataURL(file);
}


$("#afile2").onchange = function(evt){
	var files = evt.target.files;
	if(files.length == 0) return;
	var file = files[0];
	if(!file.type.match(/image/)) {
		alert('画像ファイルを選んでください');
		return;
	}
	if(10240000 < file.size){
		alert('画像が大きすぎます(10MBまで)');
		return;
	};
	var reader = new FileReader();
	reader.onload = function(evt) {
		userImg2.src = reader.result;
		if(userImg2.width == 0)reader.readAsDataURL(file);
	}
	reader.readAsDataURL(file);
}

function imgMix(){
	var Tcanvas1 = document.createElement('canvas');
	Tcanvas1.width = userImg1.width;
	Tcanvas1.height = userImg1.height;
	var Tcontext1 = Tcanvas1.getContext('2d');
	Tcontext1.drawImage(userImg1, 0, 0);
	var originImgData1 = Tcontext1.getImageData(0, 0, userImg1.width, userImg1.height);

	var Tcanvas2 = document.createElement('canvas');
	Tcanvas2.width = userImg2.width;
	Tcanvas2.height = userImg2.height;
	var Tcontext2 = Tcanvas2.getContext('2d');
	Tcontext2.drawImage(userImg2, 0, 0);
	var originImgData2 = Tcontext2.getImageData(0, 0, userImg2.width, userImg2.height);

	var afterImgData = Tcontext2.getImageData(0, 0, userImg2.width, userImg2.height);;

	for(var i = 0; i < originImgData1.data.length; i=i+1){
	   afterImgData.data[i] = parseInt((originImgData1.data[i]*0.3 + originImgData2.data[i]*1.7)/2);
	}

	Tcontext1.putImageData(afterImgData, 0, 0);
	$("#resultImg").src = Tcanvas1.toDataURL();
}
