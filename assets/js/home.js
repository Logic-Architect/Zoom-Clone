console.log("Scipt is running");

let count = 0;
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
    audio: true
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


    });

// console.log('1', ROOM_ID);
// socket.emit('join-room', ROOM_ID);

// Messaging 
let text = $('input');
console.log(text)

$('html').keydown((e) => {
    if (e.which == 13 && text.val().length != 0) {
        console.log(text.val())
        socket.emit('message', text.val());
        text.val('')
    }
})

socket.on('createMessage', (message, user) => {
    console.log('This is coming from server', message);
    $('ul').append(`
         <li>
            <div id="msg-user">
                <span>
                   ${user}
                </span>
            </div>
            <br>
            <div id="msg-content">
                <span>
                    ${message}
                </span>
            </div>
         </li>
    `)
})

// peer call 
peer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id, username)
})

const connectToNewUser = (userId, stream) => {
    console.log(userId);
    const call = peer.call(userId, stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })
}

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    count++;
    console.log(count)
    if (count == 1) {
        $('.main-video').append(video);
        $('.main-video video').addClass('mainv')
        count++;
    }
    else {
        $('.other-videos').append(video)
        $('.other-videos video').addClass('otherv')
    }

}


// Mute Unmute 
$('.audio').on('click', () => {
    const enabled = myVedioStream.getAudioTracks()[0].enabled;
    if (enabled) {
        myVedioStream.getAudioTracks()[0].enabled = false;
        setUnmuteButton()
    }
    else {
        myVedioStream.getAudioTracks()[0].enabled = true;
        setMuteButton();
    }
})

const setUnmuteButton = () => {
    $('.audio').html(`<i class="fa-solid fa-microphone-slash fa-bounce" style="color: #da1010;" title="Mic wants to get switched on"></i>`)
}
const setMuteButton = () => {
    $('.audio').html('<i class="fa-solid fa-microphone fa-beat-fade" title="Mic is On"></i>')
}

// Show / Hide Video 
$('.video').on('click', () => {
    const enabled = myVedioStream.getVideoTracks()[0].enabled;
    if (enabled) {
        myVedioStream.getVideoTracks()[0].enabled = false;
        setShowButton()
    }
    else {
        myVedioStream.getVideoTracks()[0].enabled = true;
        setHideButton();
    }
})
const setShowButton = () => {
    $('.video').html('<i class="fa-solid fa-camera" style="color: #f00505;"></i>')
}

const setHideButton = () => {
    $('.video').html('<i class="fa-solid fa-camera fa-beat-fade" title="Cam is On"></i> ')
}


$('.otherv').on('click', () => {
    console.log('clicked')
    $('.main-video video').removeClass('mainv').addClass('otherv');
    $(this).addClass('mainv')
})