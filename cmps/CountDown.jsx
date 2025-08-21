const { useState, useEffect } = React;

export function CountDown({ toTime, startFrom, onDone }) {
   const [counter, setCounter] = useState(toTime ? calculateToSeconds() : startFrom);
   useEffect(() => {
      const intervalId = setInterval(() => countDown(), 1000);
      if (counter <= 0) {
         clearInterval(intervalId);
         onDone();
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
         const hours = Math.floor(counter / 3600);
         let remains = counter % 3600;
         const minutes = Math.floor(remains / 60);
         const seconds = remains % 60;
         output = [hours, minutes, seconds].map((num) => (num < 10 ? `0${num}` : num)).join(':');
      } else output = counter;
      return <h1 className={`timer ${timerClass}`}>{output}</h1>;
   }

   return <section className="count-down-container">{generateTimer()}</section>;
}
