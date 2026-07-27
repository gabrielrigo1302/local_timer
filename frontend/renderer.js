const minutesInput = document.getElementById('minutesInput')
const secondsInput = document.getElementById('secondsInput')
const startBtn = document.getElementById('startBtn')
const pauseBtn = document.getElementById('pauseBtn')
const resetBtn = document.getElementById('resetBtn')
const timerDisplay = document.getElementById('timerDisplay')
const status = document.getElementById('status')

let totalSeconds = 0
let remainingSeconds = 0
let timerInterval = null
let isRunning = false

const formatTime = (value) => {
  const safeValue = Math.max(0, value)
  const minutes = Math.floor(safeValue / 60)
  const seconds = safeValue % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

const getInputSeconds = () => {
  const minutes = Number(minutesInput.value) || 0
  const seconds = Number(secondsInput.value) || 0
  return minutes * 60 + seconds
}

const updateDisplay = () => {
  timerDisplay.textContent = formatTime(remainingSeconds)
}

const syncFromInputs = () => {
  totalSeconds = getInputSeconds()
  remainingSeconds = totalSeconds
  updateDisplay()
  status.textContent = 'Pronto para começar'
}

const startTimer = () => {
  if (remainingSeconds <= 0) {
    syncFromInputs()
  }

  if (isRunning) {
    return
  }

  isRunning = true
  startBtn.disabled = true
  pauseBtn.disabled = false
  status.textContent = 'Contando...'

  timerInterval = window.setInterval(() => {
    remainingSeconds -= 1
    updateDisplay()

    if (remainingSeconds <= 0) {
      clearInterval(timerInterval)
      timerInterval = null
      isRunning = false
      startBtn.disabled = false
      pauseBtn.disabled = true
      status.textContent = 'Tempo encerrado!'
    }
  }, 1000)
}

const pauseTimer = () => {
  if (!isRunning) {
    return
  }

  clearInterval(timerInterval)
  timerInterval = null
  isRunning = false
  startBtn.disabled = false
  pauseBtn.disabled = true
  status.textContent = 'Pausado'
}

const resetTimer = () => {
  clearInterval(timerInterval)
  timerInterval = null
  isRunning = false
  startBtn.disabled = false
  pauseBtn.disabled = true
  totalSeconds = getInputSeconds()
  remainingSeconds = totalSeconds
  updateDisplay()
  status.textContent = 'Timer resetado'
}

minutesInput.addEventListener('change', () => {
  if (!isRunning) {
    syncFromInputs()
  }
})

secondsInput.addEventListener('change', () => {
  if (!isRunning) {
    syncFromInputs()
  }
})

startBtn.addEventListener('click', startTimer)
pauseBtn.addEventListener('click', pauseTimer)
resetBtn.addEventListener('click', resetTimer)

syncFromInputs()