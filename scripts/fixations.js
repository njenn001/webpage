class Fixation { 
	constructor (id, x, y){ 
		this.id = id; 
		this.x = x; 
		this.y = y; 
	}
}

var fixes = []; 
var clicks = 0; 

function fixate(event) { 

	clicks++; 
    var fix = new Fixation(fixes.length, event.clientX, event.clientY); 

	if (clicks == 2){
	    fixes.push(fix); 
		document.getElementById("fix_count").textContent = fixes.length; 
		document.getElementById("fix_x").textContent = fix.x;
		document.getElementById("fix_y").textContent = fix.y;

		clicks = 0; 
	}

}

function clearFixations() {
	fixes = []; 
	clicks = 0; 
}

function drawLines() { 

	for (var i = 0; i < fixes.length; i++){
		var img = document.getElementById("imgID"); 
		var imgtx = img.getContext("2d"); 

		imgtx.beginPath(); 
		imgtx.arc(fixes[i].x, fixes[i].y, 50, 0, 2 * Math.PI); 
		imgtx.stroke(); 

	}
}