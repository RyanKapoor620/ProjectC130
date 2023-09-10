song1="";
song2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreleftWrist=0;
scorerightWrist=0;
song_1status="";
song_2status="";
function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}
function setup(){
    canvas=createCanvas(450,450);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    posenet=ml5.poseNet(video,modelloaded);
    posenet.on("pose",gotPoses);
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scorerightWrist=results[0].pose.keypoints[10].score;
        scoreleftWrist=results[0].pose.keypoints[9].score;
        console.log("Score Left Wrist = "+scoreleftWrist);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("Left Wrist X = "+leftWristX+" Left Wrist Y = "+leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("Right Wrist X = "+rightWristX+" Right Wrist Y = "+rightWristY);
    }
}
function modelloaded(){
    console.log("PoseNet is loaded");
}
function draw(){
    image(video,0,0,450,450);
    fill("darkblue");
    stroke("black");
    song_1status=song1.isPlaying();
    song_2status=song2.isPlaying();
    if(scoreleftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        song2.stop();

        if(song_1status == false){
            song1.play();
            document.getElementById("song_name").innerHTML="Song Name= Harry Potter Soundtrack ";
        }
    }
    if(scorerightWrist > 0.2){
        circle(rightWristX,rightWristY,20);
        song1.stop();
        if(song_2status == false){
            song2.play();
            document.getElementById("song_name").innerHTML="Song Name= Peter Pan Soundtrack ";
        }
    }
    
}