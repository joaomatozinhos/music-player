let coverMusic = document.getElementById('capa-musica')
let nameMusic = document.getElementById('nome-musica')
let nameArtist = document.getElementById('nome-artista')
let boxMusic = document.getElementById('box-musica')
let MinutesSeconds = document.getElementById('MinutesSeconds')
let MinutesSecondsLive = document.getElementById('MinutesSecondsLive')
let inputProgress = document.getElementById('input-progress')
let btnPrevMusic = document.getElementById('previousMusic')
let btnBackTime = document.getElementById('backTime')
let btnPlay = document.getElementById('play')
let btnPause = document.getElementById('pause')
let btnAdvTime = document.getElementById('advanceTime')
let btnNextMusic = document.getElementById('nextMusic')
let inputVolume = document.getElementById('input-volume')
let sound = document.getElementById('sound')

inputProgress.addEventListener('input', timeMusic)
btnPrevMusic.addEventListener('click', previousMusic)
btnBackTime.addEventListener('click', backTime)
btnPlay.addEventListener('click', play)
btnPause.addEventListener('click', pause)
btnAdvTime.addEventListener('click', advanceTime)
btnNextMusic.addEventListener('click', nextMusic)
inputVolume.addEventListener('input', changeVolume)

let tracks = [
  {
    id: 0,
    capa: 'assets/img/capa-umpedido.jpg',
    nome: 'Um Pedido',
    artista: 'Hungria Hip Hop',
    musica: 'assets/music/umpedido-hungria.mp3'
  }
]

let firstMusic = tracks[0]

function playFirstMusic() {
  coverMusic.innerHTML = `<img src="${firstMusic.capa}" alt="Capa da música" />`
  nameMusic.innerHTML = `${firstMusic.nome}`
  nameArtist.innerHTML = `${firstMusic.artista}`
  boxMusic.innerHTML = `<audio src="${firstMusic.musica}" type="audio/mp3" id="music"></audio>`
}

function play() {
  let music = document.getElementById('music')
  music.play()

  btnPlay.style.display = 'none'
  btnPause.style.display = 'block'
}

function pause() {
  music.pause()

  btnPause.style.display = 'none'
  btnPlay.style.display = 'block'
}

function backTime() {
  music.currentTime -= 10
}

function advanceTime() {
  music.currentTime += 10
}

function convertTimeAudio() {
  let Minutes = Math.floor(music.duration / 60)
  let Seconds = Math.floor(music.duration % 60)
  let MinutesLive = Math.floor(music.currentTime / 60)
  let SecondsLive = Math.floor(music.currentTime % 60)

  if (MinutesLive < 10) {
    MinutesLive = '0' + MinutesLive
  }
  if (SecondsLive < 10) {
    SecondsLive = '0' + SecondsLive
  }
  if (Minutes < 10) {
    Minutes = '0' + Minutes
  }
  if (Seconds < 10) {
    Seconds = '0' + Seconds
  }

  MinutesSeconds.innerText = `${Minutes}:${Seconds}`
  MinutesSecondsLive.innerText = `${MinutesLive}:${SecondsLive}`
}

setInterval(convertTimeAudio, 1000)

function timeMusic() {
  music.currentTime = inputProgress.value
}

function progressMusic() {
  inputProgress.max = music.duration
  inputProgress.value = music.currentTime
}

setInterval(progressMusic, 100)

let soundMuted = false

function changeVolume() {
  music.volume = inputVolume.value / 100

  if (inputVolume.value == 0) {
    sound.setAttribute('class', 'fas fa-volume-mute')
    music.muted = true
    soundMuted = true
    return soundMuted
  } else if (inputVolume.value <= 30) {
    sound.setAttribute('class', 'fas fa-volume-down')
    music.muted = false
    soundMuted = false
    return soundMuted
  } else {
    sound.setAttribute('class', 'fas fa-volume-up')
    music.muted = false
    soundMuted = false
    return soundMuted
  }
}

let UserVol
function mute() {
  UserVol = music.volume * 100

  if (music.muted == true) {
    sound.setAttribute('class', 'fas fa-volume-up')
    music.muted = false
    soundMuted = false
    inputVolume.value = UserVol
  } else {
    sound.setAttribute('class', 'fas fa-volume-mute')
    music.muted = true
    soundMuted = true
    inputVolume.value = 0
  }
}

function previousMusic() {}

function nextMusic() {}

window.onload = () => {
  playFirstMusic()
  music.volume = 0.5
}
