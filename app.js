function main() {
    const wrap = document.querySelector(".wrap-video")
    const videoPlayer = document.getElementById("video-player");

    const progressBar = document.getElementById("progress-bar");
    const currTime = document.getElementById("curr-time");
    const durationTime = document.getElementById("duration");

    const bigPlayButton = document.getElementById("big_button");
    const actionButton = document.getElementById("action");
    const muteButton = document.getElementById("mute");
    const volumeScale = document.querySelector(".volume");
    const speedSelect = document.querySelector(".speed");
    const fullscreenButton = document.getElementById("fullscreen");

    function videoAct() {
        if (videoPlayer.paused) {
            videoPlayer.play();
            actionButton.setAttribute("class", "action_play");
            bigPlayButton.setAttribute("class", "big_button_off");
        }
        else {
            videoPlayer.pause();
            actionButton.setAttribute("class", "action_pause");
            bigPlayButton.setAttribute("class", "big_button_on");
        }
        if (durationTime.innerHTML == "00:00") {
            durationTime.innerHTML = videoTime(videoPlayer.duration);
        }

    }
    actionButton.addEventListener('click', videoAct);
    videoPlayer.addEventListener('click', videoAct);
    
    function videoTime(time) {
        time = Math.floor(time);
        let minutes = Math.floor(time / 60);
        let seconds = Math.floor(time - minutes * 60);
        let minutesVal = minutes;
        let secondsVal = seconds;
        if (minutes < 10) {
            minutesVal = '0' + minutes;
        }

        if (seconds < 10) {
            secondsVal = '0' + seconds;
        }

        return minutesVal + ":" + secondsVal;
    }

    function videoProgress() {
        progress = videoPlayer.currentTime / videoPlayer.duration;
        progressBar.value = progress * 100;
        currTime.innerHTML = videoTime(videoPlayer.currentTime);
    }

    function videoChangeTime(e) {
        let mouseX = Math.floor(e.pageX - progressBar.offsetLeft);
        let progress = mouseX / progressBar.offsetWidth;
        videoPlayer.currentTime = videoPlayer.duration * progress;
        
    }

    videoPlayer.addEventListener('timeupdate', videoProgress);
    
    progressBar.addEventListener('click', videoChangeTime);

    function videoChangeVolume() {
        let volume = volumeScale.value / 100;

        videoPlayer.volume = volume;

        if (videoPlayer.volume == 0) {

            muteButton.setAttribute('class', 'mute_true');

        } else {

            muteButton.setAttribute('class', 'mute_false');

        }

    }

    function videoMute() {        
        if (videoPlayer.volume === 0) {
            videoPlayer.volume = volumeScale.value / 100;
            muteButton.setAttribute('class', "mute_false");            
        }
        else {
            videoPlayer.volume = 0;
            muteButton.setAttribute('class', "mute_true");
        }
    }

    function videoChangeSpeed() {
        let speed = speedSelect.value / 100;
        videoPlayer.playbackRate = speed;
    }

    muteButton.addEventListener('click', videoMute);

    volumeScale.addEventListener('change', videoChangeVolume);

    speedSelect.addEventListener('change', videoChangeSpeed);
    
    

    function videoChangeSize(){
        if (fullscreenButton==="on"){
            wrap.style.paddingTop = "0";
            wrap.style.paddingBottom = "0";
            wrap.style.margin= "0";
            wrap.style.maxWidth = "auto";
            fullscreenButton.setAttribute('class', "fullscreen_true");
        }
        else{
            wrap.style.paddingTop = "90px";
            wrap.style.paddingBottom = "75px";
            wrap.style.margin= "0 auto";
            wrap.style.maxWidth = "1370px";
            fullscreenButton.setAttribute('class', "fullscreen_false");
        
        }
    }

    fullscreenButton.addEventListener('click', videoChangeSize);
    videoPlayer.addEventListener('click', videoChangeSize);

}

window.addEventListener('load', function (event) {
    main();
});