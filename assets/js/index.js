console.log("Scipt is running");

const videoGrid =document.getElementById('video-grid')

const myVideo = document.createElement('video');
myVideo.muted = false

let myVedioStream
navigator.mediaDevices.getUserMedia({
    video : true,
    audio : true
})
.then(stream=>{
    myVedioStream = stream;
    addVideoStream(myVideo,stream)
});

const addVideoStream = (video,stream)=>{
    video.srcObject = stream;
    video.addEventListener('loadedmetadata',()=>{
        video.play(); 
    })
    videoGrid.append(video);
}
