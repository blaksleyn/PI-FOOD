import React from "react";
import { useDispatch } from "react-redux";
import { recipesByName } from "../actions";
import { useState } from "react";


export default function SearchBar(){
    const dispatch = useDispatch();
    const [recipeName, setRecipeName] = useState("");
    function inputRecipe(e){
        e.preventDefault();
        setRecipeName(e.target.value);
        
    }
    function searchRecipe(e){
        e.preventDefault();
        dispatch(recipesByName(recipeName))
       
       
    }
    return (
        <div>
            <input type="text" placeholder="Search recipe..." onChange={e => inputRecipe(e)}/>
            <button type="submit" onClick={e => searchRecipe(e)}>Search</button>
        </div>
    )
}