console.log("Scipt is running");

const socket = io('/')
const videoGrid = document.getElementById('video-grid')

const myVideo = document.createElement('video');
myVideo.muted = false

var peer = new Peer(undefined, {
    path: '/peerjs',
    host: '/',
    port: 8000
})

let myVedioStream
navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
})
    .then(stream => {
        myVedioStream = stream;
        addVideoStream(myVideo, stream);

        peer.on('call', function (call) {

            call.answer(stream); // Answer the call with an A/V stream.
            const video = document.createElement('video');
            call.on('stream', userVideoStream => {
                addVideoStream(video, userVideoStream);
            });

        });

        socket.on('user-connected', (userId) => {
            connectToNewUser(userId, stream);
        })


        let text = $('input');
        console.log(text)

        $('html').keydown((e) => {
            if (e.which == 13 && text.val().length != 0) {
                console.log(text.val())
                socket.emit('message', text.val());
            }
        })

        socket.on('createMessage', (message,user) => {
            console.log('This is coming from server', message);
            $('ul').append(`<li>${user}-->${message}</li>`)
        })
    });

console.log('1', ROOM_ID);;
// socket.emit('join-room', ROOM_ID);

peer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id)
})

const connectToNewUser = (userId, stream) => {
    console.log(userId);
    const call = peer.call(userId, stream)
    const video = document.createElement('video');
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })
}

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    videoGrid.append(video);
}


