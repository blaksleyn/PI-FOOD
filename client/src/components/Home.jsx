import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, filterRecipesByDiets,orderedRecipes,orderedRecipespoints } from "../actions";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

export default function Home() {
    const dispatch = useDispatch();
    const recipesss = useSelector ((state) => state.recipes);
    const [page, setPage] = useState(1);
    const [recipePage, setRecipePage] = useState(9);
    const [orderRec, setOrderRec] = useState("")
    const [orderPoint, setOrderPoint] = useState("")
    const lastRecipe = page * recipePage;
    const recipe1 = lastRecipe - recipePage;
    const recipesInPage = recipesss.slice(recipe1,lastRecipe);
    const pages = (pagex) =>{
        setPage(pagex)
    }
    useEffect(()=> {
        dispatch(getRecipes())
    },[dispatch])

    function resetRecipes(event){
        event.preventDefault();
        dispatch(getRecipes())
    }
    function filterDiets(e){
        dispatch(filterRecipesByDiets(e.target.value))
        
    }
    function orderedrecipesbyname(e){
        e.preventDefault();
        dispatch(orderedRecipes(e.target.value));
        setPage(1);
        setOrderRec("Now you are ordering by" + e.target.value)
    }
    function orderrecipesbypoints(e){
        e.preventDefault();
        dispatch(orderedRecipespoints(e.target.value));
        setPage(1);
        setOrderPoint("Now you are ordering by" + e.target.value)
    }
    return( 
        <div>
            <Link to="/recipe">Create Recipe</Link>
            <h1>Welcome to our HomePage</h1>
            <button onClick={e => {resetRecipes(e)}}>
                Reset Recipes
            </button>
            <div>
                <select onChange={ e => orderrecipesbypoints(e)}>
                    <option value ="healthy">Healthier</option>
                    <option value="non">Non Healthier</option>
                </select>
                <select onChange={e => orderedrecipesbyname(e)}>
                    <option value="asc">Ascendant</option>
                    <option value="des">Degressive</option>
                </select>
                <select onChange={e => filterDiets(e)}>
                    <option value="All">All</option>
                    <option value="gluten free">Gluten Free</option>
                    <option value="vegan">Vegan</option>
                    <option value="dairy free">Dairy Free</option>
                    <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
                    <option value="primal">Primal</option>
                    <option value="paleolithic">Paleolithic</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="fodmap friendly">Fodmap Friendly </option>
                    <option value="whole 30">Whole 30</option>
                </select>
               <Paginado paginado={pages} recipes={recipesss.length} recipesinpage={recipePage}/>
               <SearchBar />
                {
                    recipesInPage && recipesInPage.map(el => {
                        return( 
                            <div>
                                <Link to ={"/home/" + el.id}>
                        <Card name={el.name} image={el.image} diets={el.diets.map(el =>{if( el.name){ return " "+ el.name + " ///"} else {return " "+ el + " ///"}})} key={el.id}/>
                        </Link>
                        </div>
                        );
                    })
                }
            </div>
        </div>
    )
}