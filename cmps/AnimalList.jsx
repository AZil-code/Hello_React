// amimalInfos - [{type, count}]
export function AnimalList({ animalInfos }) {
   const searchUrl = `https://www.google.com/search?q=`;

   function calculateOpacity(count) {
      let opacity = count * 0.001;
      return opacity > 0.15 ? opacity : 0.15;
   }

   return (
      <section className="animals-container">
         <h1>Rare Animals</h1>
         <table className="animals-table">
            <tbody>
               {animalInfos.map(({ type, count }) => (
                  <tr key={type}>
                     <td>{type}</td>
                     <td>{count}</td>
                     <td>
                        <a href={searchUrl + type} style={{ opacity: calculateOpacity(count) }}>
                           Search
                        </a>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </section>
   );
}
