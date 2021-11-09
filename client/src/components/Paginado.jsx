import React from "react";

export default function Paginado({recipes, recipesinpage, paginado}){
   const numberPaginado = [];

   for(let i = 0; i< Math.ceil(recipes/recipesinpage);i++){
       numberPaginado.push(i + 1);
   };

   return(
       <nav>
           <ul>
               {
                 numberPaginado && numberPaginado.map(numero => (
                       <div>
                            <button onClick={() => paginado(numero)}>{numero}</button>
                       </div>
                  ))
               }
           </ul>
       </nav>
   )
}