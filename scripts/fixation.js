class Analysis { 
	constructor(dur){
		this.dur = ""; 
	}
}

class Saccade { 
	constructor(dur){ 
		this.duration = dur; 
	}
}

class Fixation { 
	constructor (id, x, y, dur){ 
		this.id = id; 
		this.x = x; 
		this.y = y; 
		this.duration = dur;
	}

}

var analysisStart = 0; 
var analysisEnd = 0; 


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
