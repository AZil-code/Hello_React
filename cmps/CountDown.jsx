import { utilService } from '../services/util.service.js';

const { useState, useEffect, useRef } = React;

export function CountDown({ toTime, startFrom, onDone }) {
   const [counter, setCounter] = useState(toTime ? calculateToSeconds() : startFrom);
   const clockRef = useRef(null);
   useEffect(() => {
      const intervalId = setInterval(() => countDown(), 1000);
      if (counter <= 0) {
         clearInterval(intervalId);
         onDone(clockRef.current);
      }
      return () => {
         clearInterval(intervalId);
      };
   }, [counter]);

   function countDown() {
      setCounter((prev) => prev - 1);
   }

   function calculateToSeconds() {
      return Math.round((toTime - Date.now()) / 100);
   }
   const timerClass = counter <= 6 ? 'last-seconds' : '';

   function generateTimer() {
      let output;
      if (toTime) {
         const timeComponents = [];
         timeComponents.push(Math.floor(counter / 3600));
         let remains = counter % 3600;
         timeComponents.push(Math.floor(remains / 60));
         timeComponents.push(remains % 60);
         output = utilService.formatClock(timeComponents);
      } else output = counter;
      return (
         <h1 className={`timer ${timerClass}`} ref={clockRef}>
            {output}
         </h1>
      );
   }

   return <section className="count-down-container">{generateTimer()}</section>;
}
