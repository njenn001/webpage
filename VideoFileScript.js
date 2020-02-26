let video;
let poseNet;
let pose;
let skeleton;
let positions = [];

var iter = 0;
var iWidth = 640; 
var iHeight = 480;

class Rep{ 
  constructor(){
    this.top = 0; 
    this.bottoms = []; 
    this.uROM = 0;
    this.dROM = 0; 
    this.uDur = 0; 
    this.dDur = 0; 
    this.uVel = 0; 
    this.dVel = 0; 
  }

  calcUVel(){
    return this.ROM / this.duration; 
  }
}


function setup() {
  createCanvas(iWidth, iHeight);
  const video = createVideo(['Wo9.MOV']);

  const poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  //console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  //console.log('poseNet ready');
  select('#status').html('Model Loaded Video File Playing');
  
}

function draw() {
  image(video, 0, 0);

  if (pose) {
    fill(0, 0, 255);
    ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
    ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);

    fill(0, 0, 255);
    ellipse(pose.rightShoulder.x, pose.rightShoulder.y, 32);
    ellipse(pose.leftShoulder.x, pose.leftShoulder.y, 32);

    fill(0, 0, 255);
    ellipse(pose.rightElbow.x, pose.rightElbow.y, 32);
    ellipse(pose.leftElbow.x, pose.leftElbow.y, 32);

    positions.push(pose.rightWrist.y); 
    iter = iter + 1; 

    //console.log(pose.rightWrist.y);

    if (positions.length > 5 && iter % 5 == 0){
      if (positions[positions.length - 5] > positions[positions.length - 3]
        && positions[positions.length - 3] < positions[positions.length - 1]) {

        console.log(positions[positions.length - 3]);
        select('#message').html(positions[positions.length - 3]); 
        console.log('Top');
        iter = 0;       	
      }
    }


    /*for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0, 255, 0);
      ellipse(x, y, 16, 16);
    }

    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(255);
      line(a.position.x, a.position.y, b.position.x, b.position.y);
    }*/
  }
}
