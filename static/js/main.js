const APP_ID = "dced2be1f2814675952ea9a22758151b "
const TOKEN = "007eJxTYCgv1Lz27Z++9L4nBXUhv47M1nr6y9R5VW2vgWvO3FORzPYKDCnJqSlGSamGaUYWhiZm5qaWpkapiZaJRkbmphaGpoZJC06lpTYEMjJUtgawMjJAIIjPwpCbmJnHwAAArWYgJg=="
const CHANNEL = "main"

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })

let localTracks = []
let remoteUsers = {}

let joinAndDisplayLocalStream = async () => {

    client.on('user-published', handleUserJoined)
    client.on('user-left', handleUserLeft)
    // client.on('user-left', handleUserLeft)

    let UID = await client.join(APP_ID, CHANNEL, TOKEN, null)

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()

    let player = `<div class="video-container" id="user-container-${UID}">
                        <div class="video-player" id="user-${UID}"></div>
                  </div>`
    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)

    localTracks[1].play(`user-${UID}`)

    await client.publish([localTracks[0], localTracks[1]])
}

let joinStream = async () => {
    await joinAndDisplayLocalStream()
    $("#join-btn").addClass("hidden")
    $("#stream-wrapper").addClass('stream-wrapper').removeClass('hidden')
    $(".messageBox").addClass("hidden")
    $("#stream-controls").addClass('flex gap-5').removeClass('hidden')
    let sendCallHtmlString = `
    <div id="send-call " class="flex justify-center m-2">
    <p class="text-blue-500"> ${user_username} invite yours <button onclick="joinStream()" class="underline">Let Join with us! <i class="fa-solid fa-phone-volume" style="color: #3584e4;"></i></button></p>

  </div>
    `;
    console.log("cek ini ",sendCallHtmlString);
    post(sendCallHtmlString)
}

let handleUserJoined = async (user, mediaType) => {
    remoteUsers[user.uid] = user
    await client.subscribe(user, mediaType)

    if (mediaType === 'video') {
        let player = document.getElementById(`user-container-${user.uid}`)
        if (player != null) {
            player.remove()
        }

        player = `<div class="video-container" id="user-container-${user.uid}">
                        <div class="video-player" id="user-${user.uid}"></div> 
                 </div>`
        document.getElementById('video-streams').insertAdjacentHTML('beforeend', player)

        user.videoTrack.play(`user-${user.uid}`)
    }

    if (mediaType === 'audio') {
        user.audioTrack.play()
    }
}

let handleUserLeft = async (user) => {
    delete remoteUsers[user.uid]
    document.getElementById(`user-container-${user.uid}`).remove()
}

let leaveAndRemoveLocalStream = async () => {
    for (let i = 0; localTracks.length > i; i++) {
        localTracks[i].stop()
        localTracks[i].close()
    }

    await client.leave()
    document.getElementById('join-btn').style.display = 'block'
    $("#stream-controls").addClass('hidden').removeClass('flex gap-5')
    document.getElementById('video-streams').innerHTML = ''
    $("#join-btn").removeClass("hidden")
    $("#stream-wrapper").removeClass('stream-wrapper').addClass('hidden')
    $(".messageBox").removeClass("hidden")
}

// Mic
let toggleMic = async (e) => {
    if (localTracks[0].muted) {
        await localTracks[0].setMuted(false)
        $(e.target).html(`
        Mic on <i class="fa-solid fa-microphone" style="color: #ffffff;"></i>
    `).css('background-color', 'blue');
    } else {
        await localTracks[0].setMuted(true)
        $(e.target).html(`
        mic off 
    `).css('background-color', '#EE4B2B');

    }
}


// Camera
let toggleCamera = async (e) => {
    if (localTracks[1].muted) {
        await localTracks[1].setMuted(false)
        $(e.target).html(`
        Camera on <i class="fa-solid fa-camera" style="color: #ffffff;"></i>
    `).css('background-color', 'blue');
    } else {
        await localTracks[1].setMuted(true)
        $(e.target).html(`
        Camera off
    `).css('background-color', '#EE4B2B');
    }
}

document.getElementById('join-btn').addEventListener('click', joinStream)
document.getElementById('leave-btn').addEventListener('click', leaveAndRemoveLocalStream)
document.getElementById('mic-btn').addEventListener('click', toggleMic)
document.getElementById('camera-btn').addEventListener('click', toggleCamera)
