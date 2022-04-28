sound1= ""
sound2=""
sound1status=""
sound2status=""
leftwristy = ""
leftwristx = ""
rightwristy = ""
rightwristx = ""
leftwristscore = ""
rightwristscore = ""
function preload() {
    sound1= loadSound("music.mp3");
    sound2= loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(500, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(500, 500)
    video.hide();
    posenet = ml5.poseNet(video, modeloaded);
    posenet.on("pose", getposes);
}

function modeloaded() {
    console.log("model is loaded");
}

function getposes(results) {
    if (results.length > 0) {
        console.log(results);
        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y;
        rightwristx = results[0].pose.rightWrist.x;
        rightwristy = results[0].pose.rightWrist.y;
        console.log(leftwristy)
        console.log(leftwristx);
        console.log(rightwristy);
        console.log(rightwristx);
        leftwristscore = results[0].pose.keypoints[9].score;
        console.log("leftwristscore" + leftwristscore);
        rightwristscore = results[0].pose.keypoints[10].score;
        console.log("rightwristscore" + rightwristscore);
    }
}

function draw() {
    image(video, 0, 0, 500, 500);
    fill("red");
    stroke("blue");
    sound1status=sound1.isPlaying()
    sound2status=sound2.isPlaying()
    if (leftwristscore > 0.2) {
        circle(leftwristx, leftwristy, 20);
        sound1.stop()
        if (sound2status==false) {
            sound2.play()
            document.getElementById("Current_song").innerHTML="playing peter pan"
        }
    }
    if (rightwristscore > 0.2) {
        circle(rightwristx, rightwristy, 20)
        sound2.stop()
        if (sound1status==false) {
            sound1.play()
            document.getElementById("Current_song").innerHTML="playing harry potter theme"
        }
    }
}

function play() {
    sound.play();
    sound.setVolume(1);
    sound.rate(1);
}

function stop() {
    sound.stop();
}