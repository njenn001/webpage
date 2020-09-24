import Analysis from './fixation.js'; 

var Stopwatch = function(elem, options) {

  var timer       = createTimer(),
      startButton = createButton("start", start),
      stopButton  = createButton("stop", stop),
      resetButton = createButton("reset", reset),
      offset,
      clock,
      interval;

  // default options
  options = options || {};
  options.delay = options.delay || 1;

  // append elements     
  elem.appendChild(timer);

  // initialize
  reset();

  // private functions
  function createTimer() {
    return document.createElement("span");
  }

  function createButton(action, handler) {
    var a = document.createElement("a");
    a.href = "#" + action;
    a.innerHTML = action;
    a.addEventListener("click", function(event) {
      handler();
      event.preventDefault();
    });
    return a;
  }

  function start() {
    if (!interval) {
      offset   = Date.now();
      interval = setInterval(update, options.delay);
    }
  }

  function stop() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  function reset() {
    clock = 0;
    render();
  }

  function update() {
    clock += delta();
    render();
  }

  function render() {
    timer.innerHTML = ((clock/1000) + " seconds");  
  }

  function delta() {
    var now = Date.now(),
        d   = now - offset;

    offset = now;
    return d;
  }

  // public API
  this.start  = start;
  this.stop   = stop;
  this.reset  = reset;
};
var timer;
var im_start = 0; 
var im_end = 0; 
var analysis = new Analysis(); 

function startAnalysis(){

  var elem = document.getElementById("im_dur");
  timer = new Stopwatch(elem, {delay: 10});

  document.getElementById("name_text").textContent = prompt("Please enter your name", "Noah Jennings");   
                    
  timer.reset();
  timer.start(); 
  im_start = new Date(); 
  analysis.start_time = new Date(); 

  document.getElementById("w_text").textContent = document.getElementById("imageLayer").clientWidth; 
  document.getElementById("h_text").textContent = document.getElementById("imageLayer").clientHeight;  

  document.getElementById("toolbar").style.display = "none";
  document.getElementById("stop_button").style.display = "block";
  document.getElementById("start_button").style.display = "none";
  document.getElementById("imageLayer").style.cursor = "cell"; 
  document.getElementById("status_circle").style.display = "block";
  document.getElementById("status_circle").style.backgroundColor = "#4CAF50"}

function endAnalysis(){ 
  document.getElementById("imageLayer").style.cursor = "auto"; 

  document.getElementById("start_button").style.display = "block";
  document.getElementById("stop_button").style.display = "none";
  document.getElementById("status_circle").style.display = "none";

  timer.stop(); 
  im_end = new Date(); 
  analysis.end_time = new Date(); 
  var duration = ((analysis.start_time = analysis.end_time) / 1000); 

    //console.log(fixes);

  var fix_arr = []; 
  var im_arr = []; 

  im_arr.push(document.getElementById("src_text").textContent); 
  im_arr.push(document.getElementById("imageLayer").clientWidth);
  im_arr.push(document.getElementById("imageLayer").clientHeight);
  im_arr.push(duration); 
  im_arr.push(document.getElementById("name_text").textContent.replace(" ", "")); 

  fix_arr.push(im_arr); 
    
  for (var i = 0; i < fixes.length; i++){ 
    var x_arr = []; 
    
    x_arr.push(fixes[i].id);
    //x_arr.push(fixes[i].x);
    //x_arr.push(fixes[i].y);
    //x_arr.push(fixes[i].end);
    //x_arr.push(fixes[i].duration); 
    //x_arr.push(fixes[i].duration); 
    //x_arr.push( ((fixes[i].startTime - analysis.start_time) / 1000) + "s" );
    
    fix_arr.push(x_arr); 
  }


  let csvContent = "data:text/csv;charset=utf-8,";

  fix_arr.forEach(function(rowArray) {
      let row = rowArray.join(",");
      csvContent += row + "\r\n";
  });

  var fname = ""; 

  if (document.getElementById("src_text").textContent.includes(".dcm")){ 
    fname = document.getElementById("src_text").textContent.replace(".dcm", ""); 
  }

  else if (document.getElementById("src_text").textContent.includes(".png")){ 
    fname = document.getElementById("src_text").textContent.replace(".png", ""); 
  }

  else if (document.getElementById("src_text").textContent.includes(".jpg")){ 
    fname = document.getElementById("src_text").textContent.replace(".jpg", ""); 
  }

  else if (document.getElementById("src_text").textContent.includes(".JPEG")){ 
    fname = document.getElementById("src_text").textContent.replace(".JPEG", ""); 
  }

  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", (document.getElementById("name_text").textContent.replace(" ", "") + fname + ".csv"));
  document.body.appendChild(link); // Required for FF

  link.click();
}
