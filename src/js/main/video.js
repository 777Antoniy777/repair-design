const videoWrapper = document.querySelector('.control__video-wrapper');
const video = videoWrapper.querySelector('.control__video');
const button = videoWrapper.querySelector('.control__video-button');

button.addEventListener('click', () => {
  videoWrapper.classList.add('video-pause');
  video.classList.add('video-show');
  button.classList.toggle('btn-pause');

  if (video.paused) {
    video.play();
    button.ariaLabel = "Pause video";
  } else {
    video.pause();
    button.ariaLabel = "Play video";
  }
});
