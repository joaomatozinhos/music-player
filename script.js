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

// Array com as músicas disponíveis
let tracks = [
  {
    id: 0,
    capa: 'assets/img/capa-umpedido.jpg',
    nome: 'Um Pedido',
    artista: 'Hungria Hip Hop',
    musica: 'assets/music/umpedido-hungria.mp3'
  },
  {
    id: 1,
    capa: 'assets/img/capa-imprevisivel.jpg',
    nome: 'Imprevisível',
    artista: 'Tribo da Periferia',
    musica: 'assets/music/imprevisivel-tribodaperiferia.mp3'
  },
  {
    id: 2,
    capa: 'assets/img/capa-gratidao.jpg',
    nome: 'Gratidão',
    artista: 'L7NNON',
    musica: 'assets/music/gratidao-l7nnon.mp3'
  }
]

// Inserir música no HTML
function insertMusic(id) {
  coverMusic.innerHTML = `<img src="${tracks[id].capa}" alt="Capa da música" />`
  nameMusic.innerHTML = `${tracks[id].nome}`
  nameArtist.innerHTML = `${tracks[id].artista}`
  boxMusic.innerHTML = `<audio src="${tracks[id].musica}" type="audio/mp3" id="music"></audio>`
}

// Tocar música
function play() {
  let music = document.getElementById('music')
  music.play()

  btnPlay.style.display = 'none'
  btnPause.style.display = 'block'
}

// Pausar música
function pause() {
  music.pause()

  btnPause.style.display = 'none'
  btnPlay.style.display = 'block'
}

// Voltar 10s
function backTime() {
  music.currentTime -= 10
}

// Avançar 10s
function advanceTime() {
  music.currentTime += 10
}

// Controle do tempo do audio
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

// Controle do volume
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

// Mutar
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

// Pular próxima música
let musicID = 0

function nextMusic() {
  musicID++

  if (musicID >= tracks.length) {
    musicID = 0
  }

  insertMusic(musicID)
  play()
}

// Voltar música anterior
function previousMusic() {
  musicID--
  insertMusic(musicID)
  play()
}

// Executar função assim que carregar a página
window.onload = () => {
  insertMusic(0)
  music.volume = 0.5
}
