const { useState, useEffect } = React;

/* 
isOn : true,
pos: {
    x: 0,
    y: 0
}
*/

export function MouseMonitor() {
   const [isOn, setIsOn] = useState(true);
   const [pos, setPos] = useState({ x: 0, y: 0 });

   useEffect(() => {
      if (isOn) {
         console.log('add');
         document.addEventListener('mousemove', updatePos);
      }

      return () => document.removeEventListener('mousemove', updatePos);
   }, [isOn]);

   function onControlClick() {
      setIsOn((prev) => !prev);
   }

   function updatePos({ clientX, clientY }) {
      setPos({ x: clientX, y: clientY });
   }

   return (
      <section className="mouse-monitor">
         <div className="monitor-container">
            <h4>Mouse Position</h4>
            {isOn && <span>{`x: ${pos.x}, y: ${pos.y}`}</span>}
            <button className="control-button" onClick={onControlClick}>
               {isOn ? 'Pause' : 'Resume'}
            </button>
         </div>
      </section>
   );
}
