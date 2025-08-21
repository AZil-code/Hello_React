// import { useState } from 'react';

const { useState } = React;

export function SeasonClock() {
   const [isDark, setIsDark] = useState(false);

   function onToggleDarkMode() {
      setIsDark(!isDark);
   }

   const isDarkClass = isDark ? 'dark' : '';
   return (
      <section className={`season-clock ${isDarkClass}`} onClick={onToggleDarkMode}>
         <h2>December (Winter)</h2>
         <img src="./assets/img/season-imgs/autumn.png"></img>
         <h3>Saturady</h3>
      </section>
   );
}
