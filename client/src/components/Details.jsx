    import React from "react";
    import { Link } from "react-router-dom";
    import { recipeDetails } from "../actions";
    import { useEffect } from "react";
    import { useDispatch, useSelector } from "react-redux";

export default function Details(props){
    const dispatch = useDispatch();
    const detailsss = useSelector((state) => state.detailsOfRecipes)
    useEffect(()=>{
        dispatch(recipeDetails(props.match.params.id));
    })
    
    return (
        <div>
            {
                detailsss.length > 0 ? 
                <div>
                    <h1>{detailsss[0].name}</h1>
                    <img src={detailsss[0].image}/>
                    <h3>Summary:         {detailsss[0].summary}</h3>
                    <h4>Spoonacular score:{detailsss[0].score}</h4>
                    <h4>Healthy Score:{detailsss[0].healthyscore}</h4>
                    <h3>Steps: {!detailsss[0].createdInDB ? detailsss[0]?.steps[0]?.map((ele, index) => {
                      
                       return  `${index + 1}: ${ele.step} ` 
                        
                        }
                        ) : detailsss[0].steps
                        }
                        </h3>
                    <h2>Diets: {detailsss[0].diets.map(el =>{if( el.name){ return " "+ el.name + " ///"} else {return " "+ el + " ///"}})}</h2>
                </div>: <p> Recipe not found</p>
            }
            <Link to ="/home">
                <button>Home</button>
            </Link>
        </div>
    )
}