import React, {useEffect} from 'react'

function Timer({timeLeft, setTimeLeft, active}) {

    useEffect(() =>{
        let timer;

        if (active && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1)
            }, 1000);
        }

        return () => {
            clearInterval(timer);
        };
    }, [active, timeLeft, setTimeLeft])

    const getTimerColor = () => {
        if (timeLeft <= 5 ) return 'red';
        if (timeLeft <= 10 ) return 'orange';
        return 'green';
    }

  return (
    <div className='timer' style={{color: getTimerColor() }}>
        Time Left: {timeLeft} seconds 
    </div>
  );
}

export default Timer