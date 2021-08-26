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

    actionButton.addEventListener('click', videoAct);
    videoPlayer.addEventListener('click', videoAct);
    videoPlayer.addEventListener('timeupdate', videoProgress);    
    progressBar.addEventListener('click', videoChangeTime);
    muteButton.addEventListener('click', videoMute);
    volumeScale.addEventListener('change', videoChangeVolume);
    speedSelect.addEventListener('change', videoChangeSpeed);

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

    function videoChangeVolume() {
        
        videoPlayer.volume = volumeScale.value / 100;

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
    function videoBoostSpeed(){
        let speed = (speedSelect.value / 100) +0.25;
        videoPlayer.playbackRate = speed;
    }

   
    volumeScale.value = 50;
    videoChangeVolume();
    
        
   function isFullScreen() {
   return !!(document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
}

   function handleFullscreen() {
    if (isFullScreen()) {
       if (document.exitFullscreen) document.exitFullscreen();
       else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
       else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
       else if (document.msExitFullscreen) document.msExitFullscreen();
       
       setFullscreen(false);
    }
    else {
       if (videoPlayer.requestFullscreen) videoPlayer.requestFullscreen();
       else if (videoPlayer.mozRequestFullScreen) videoPlayer.mozRequestFullScreen();
       else if (videoPlayer.webkitRequestFullScreen) videoPlayer.webkitRequestFullScreen();
       else if (videoPlayer.msRequestFullscreen) videoPlayer.msRequestFullscreen();
       
       setFullscreen(true);
    }
 }

 function setFullscreen(){
     videoPlayer.setAttribute('data-fullscreen', !!state)
 }

        
    fullscreenButton.addEventListener('click', function(e) {
        handleFullscreen();
     });

    ///videoPlayer.addEventListener('click', videoChangeSize);

    function keyboard(event){ 
        console.log("-"+event.key+"-");
        
        if(event.key===' '){
            videoAct();
            return;
        }
        else if(event.key==='k'){
            videoAct();
            return;
        }
       else if (event.key==="m") {
            videoMute();
            return;
        }
        else if (event.key==="f") {
            handleFullscreen();
            return;
        }
        else if(event.key=="shift+."){
            videoBoostSpeed();
            return;
        }
        else if(event.key=="shift+,"){
            videoChangeSpeed();
            return;
        }
        else if(event.key==">"){
            videoChangeSpeed();
        }
            
            
    }
        

   document.addEventListener('keydown', keyboard);
  

}

window.addEventListener('load', function (event) {
    main();
});