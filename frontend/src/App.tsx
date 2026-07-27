import { useEffect, useState } from 'react'

type TimerStatus = 'ready' | 'running' | 'paused' | 'finished'

const formatTime = (value: number) => {
  const safeValue = Math.max(0, value)
  const minutes = Math.floor(safeValue / 60)
  const seconds = safeValue % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

const getInputSeconds = (minutes: number, seconds: number) => minutes * 60 + seconds

function App() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [remainingSeconds, setRemainingSeconds] = useState(25 * 60)
  const [status, setStatus] = useState<TimerStatus>('ready')
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) {
      return
    }

    const interval = window.setInterval(() => {
      setRemainingSeconds((currentValue) => {
        if (currentValue <= 1) {
          window.clearInterval(interval)
          setIsRunning(false)
          setStatus('finished')
          return 0
        }

        return currentValue - 1
      })
    }, 1000)

    return () => window.clearInterval(interval)
  }, [isRunning])

  useEffect(() => {
    if (isRunning) {
      return
    }

    setRemainingSeconds(getInputSeconds(minutes, seconds))
    setStatus('ready')
  }, [minutes, seconds, isRunning])

  const handleStart = () => {
    const nextSeconds = remainingSeconds > 0 ? remainingSeconds : getInputSeconds(minutes, seconds)
    setRemainingSeconds(nextSeconds)
    setStatus('running')
    setIsRunning(true)
  }

  const handlePause = () => {
    if (!isRunning) {
      return
    }

    setStatus('paused')
    setIsRunning(false)
  }

  const handleReset = () => {
    const resetValue = getInputSeconds(minutes, seconds)
    setRemainingSeconds(resetValue)
    setStatus('ready')
    setIsRunning(false)
  }

  const handleMinutesChange = (value: string) => {
    const numericValue = Number(value)
    const safeValue = Number.isNaN(numericValue) ? 0 : Math.max(0, Math.min(180, numericValue))
    setMinutes(safeValue)
  }

  const handleSecondsChange = (value: string) => {
    const numericValue = Number(value)
    const safeValue = Number.isNaN(numericValue) ? 0 : Math.max(0, Math.min(59, numericValue))
    setSeconds(safeValue)
  }

  return (
    <main className="app">
      <h1>Timer Simples</h1>
      <p>Defina um tempo e comece a contagem.</p>

      <div className="controls">
        <div className="input-group">
          <label htmlFor="minutesInput">Minutos</label>
          <input
            id="minutesInput"
            type="number"
            min="0"
            max="180"
            value={minutes}
            onChange={(event) => handleMinutesChange(event.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="secondsInput">Segundos</label>
          <input
            id="secondsInput"
            type="number"
            min="0"
            max="59"
            value={seconds}
            onChange={(event) => handleSecondsChange(event.target.value)}
          />
        </div>
      </div>

      <div className="actions">
        <button onClick={handleStart} disabled={isRunning}>
          Iniciar
        </button>
        <button onClick={handlePause} disabled={!isRunning}>
          Pausar
        </button>
        <button onClick={handleReset}>Resetar</button>
      </div>

      <div className="timer-display">{formatTime(remainingSeconds)}</div>
      <p className="status">
        {status === 'ready' && 'Pronto para começar'}
        {status === 'running' && 'Contando...'}
        {status === 'paused' && 'Pausado'}
        {status === 'finished' && 'Tempo encerrado!'}
      </p>
    </main>
  )
}

export default App
