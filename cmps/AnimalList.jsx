// amimalInfos - [{type, count}]
export function AnimalList({ animalInfos }) {
   const searchUrl = `https://www.google.com/search?q=`;

   return (
      <section className="animals-container">
         <h1>Rare Animals</h1>
         <table className="animals-table">
            <tbody>
               {animalInfos.map((animal) => (
                  <tr key={animal.type}>
                     <td>{animal.type}</td>
                     <td>{animal.count}</td>
                     <td>
                        <a href={searchUrl + animal.type}>Search</a>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </section>
   );
}
