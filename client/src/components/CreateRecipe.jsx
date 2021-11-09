import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getDiets, postRecipe } from "../actions";

export default function CreateRecipe(){
    const BackToHome = useHistory()
    const dispatch = useDispatch();
    const dietsss = useSelector((state) => state.diets);
    const [inputCreate, setInputCreate] = useState({
        name: "",
        summary: "",
        score:"",
        healthyscore:"",
        steps: "",
        diets:[]
    })
    useEffect(() => {
        dispatch(getDiets());
    },[]);
    function inputChanges(e){
        setInputCreate({
            ...inputCreate,
            [e.target.name] : e.target.value
        })
    }
   function selectChanges(e){
       setInputCreate({
           ...inputCreate,
           diets: [...inputCreate.diets, e.target.value]
       })
   }
   function handleSubmit(e){
       e.preventDefault();
       dispatch(postRecipe(inputCreate))
       alert("recipe created succesfully")
       BackToHome.push("/home")
   }
   function deleteDiet(e){
       setInputCreate({
           ...inputCreate,
           diets: inputCreate.diets.filter(die => die !== e)
       })
   }
    return(
        <div>
            <Link to="/home"><button>Home</button></Link>
            <h1>Create your Recipe</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={inputCreate.name} name="name" onChange={(e)=> inputChanges(e)}/>
                </div>
                <div>
                    <label>Summary:</label>
                    <input type="text" value={inputCreate.summary} name="summary" onChange={(e)=> inputChanges(e)}/>
                </div>
                <div>
                    <label>Score:</label>
                    <input type="number" value={inputCreate.score} name="score" onChange={(e)=> inputChanges(e)}/>
                </div>
                <div>
                    <label>Healthy Score:</label>
                    <input type="number" value={inputCreate.healthyscore} name="healthyscore" onChange={(e)=> inputChanges(e)}/> 
                </div>
                <div>
                    <label>Steps:</label>
                    <input type="text" value={inputCreate.steps} name="steps" onChange={(e)=> inputChanges(e)}/>
                </div>
                <select onChange={(e) => selectChanges(e)}>
                   {dietsss.map(el => (
                       <option value={el.name}>
                           {el.name}
                       </option>
                   ))}
                </select>
                
                <button type="submit">Create Recipe</button>
            </form>
            {
                inputCreate.diets.map(el => 
                    <div>
                        <p>{el}</p>
                        <button onClick={() => deleteDiet(el)}>x</button>
                    </div>
                    )
            }
        </div>
    )
}