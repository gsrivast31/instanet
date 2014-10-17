window.onload = function(){
	var storage = {};
	var stor = true;
	// find storage or set to nothing in order to render
	if (localStorage && localStorage.getItem('list')) {
		storage = JSON.parse(localStorage.getItem('list'));
	}
	else {
		storage = {
			"0": ""
		}
		stor = false;
	}
}

