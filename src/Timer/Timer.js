import React, {useState, useEffect} from 'react';
import './Timer.css'

function Timer(props){
    const [time, setTime] = useState(props.sessionTime * 60);
    const [session, setSession] = useState(true); 
    const [running, setRunning] = useState(false);
    const audio = document.getElementById('beep');

    const formatTime = () => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    const runTimer = () => {
        if(time === 0) {
            const audio = document.getElementById('beep');
            audio.play();
            if(session) {
                setTime(() => props.breakTime * 60);
                
            } else {
                setTime(() => props.sessionTime * 60);
            }
            console.log(session)
            setSession((prevSession) => !prevSession);
            console.log(session, props.sessionTime, props.breakTime)
        } else {
            setTime((prevTime) => prevTime - 1);
        }
    }

    const startStopTimer = () => {
        setRunning(prevRunning => !prevRunning);
        props.disableButtons(true)
    }

    const resetTimer = () => {
        const audio = document.getElementById('beep');
        setRunning(false);
        setTime(() => 25 * 60);
        setSession(true)
        props.disableButtons(false)
        props.reset();
        audio.pause();
        audio.load();
    }

    useEffect(() => {
        let interval = null;

        if(running) {
            interval = setInterval(runTimer, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [running, session, time]);

    useEffect(() => {
        setTime(props.sessionTime * 60);
      }, [props.sessionTime]);

    return(
        <div id="timer">
            <div id="timer-info">
                <div id="timer-label">{session ? 'Session' : 'Break'}</div>
                <div id="time-left" style={{color: time < 60 ? 'rgb(238, 60, 49)': 'inherit'}}>{formatTime()}</div>
            </div>
            <div className="controls">
                <button 
                    id="start_stop"
                    onClick={startStopTimer}
                >
                    {!running ? 
                        <span className="material-symbols-rounded">play_arrow</span> :
                        <span className="material-symbols-rounded">pause</span>    
                    }
                    
                </button>
                <button 
                    id="reset"
                    onClick={resetTimer}
                >
                    <span className="material-symbols-rounded">refresh</span>
                </button>
            </div>
            <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
        </div>
    ) 
}


export default Timer;