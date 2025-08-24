const { useState } = React;

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

   function onControlClick() {
      setIsOn((prev) => !prev);
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
