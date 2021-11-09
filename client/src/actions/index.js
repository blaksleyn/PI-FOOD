import axios from "axios"

export function getRecipes(){
    return async function(dispatch){
        let info = await axios.get("http://localhost:3001/recipes",{

        })
        return dispatch({
            
            type: "GET_RECIPES",
            payload: info.data
        })
    }
}

export function getDiets(){
    return async function(dispatch){
        let info = await axios.get("http://localhost:3001/types", {

        })
        return dispatch({
            type: "GET_DIETS",
            payload: info.data
    })
  }
}

export function filterRecipesByDiets(payload){
   console.log(payload)
    return {
        type: "FILTER_BY_DIET",
        payload
       
    }
}
export function orderedRecipes(payload){
    return {
        type: "ORDERED_RECIPES",
        payload
    }
}
export function orderedRecipespoints(payload){
    return{
        type:"POINTS_RECIPES",
        payload
    }
}
export function recipesByName (payload){
    return async function(dispatch){
        let info = await axios.get(`http://localhost:3001/recipes?name=${payload}`,{

        })
        return dispatch({
            type: "GET_RECIPES_BY_NAME",
            payload: info.data
        })
    }
}
export function postRecipe(recipe){
    return async function(dispatch){
        let info = await axios.post("http://localhost:3001/recipe",recipe);
        return info
        
    }
}
export function recipeDetails(id){
    return async function(dispatch){
        let info = await axios.get("http://localhost:3001/recipes/" + id)
        return dispatch({
            type: "RECIPE_DETAILS",
            payload: info.data

        })
    }
}
    

