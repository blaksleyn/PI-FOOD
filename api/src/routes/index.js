const { Router } = require('express');
const {YOUR_API_KEY} = process.env
const axios = require ('axios').default
const {Recipe,Diets} = require("../db")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
 
 
const router = Router(); 

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {
    const urlFood = await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=2b32b0c306af4edeb50f6968f7894bf5&addRecipeInformation=true&number=108');
    
    const foodInfo = await urlFood.data.results.map(element => {
       
        return {
            id: element.id,      
            name: element.title,
            summary: element.summary,     
            diets: element.diets.map(el => el),
            image:element.image,  
            score: element.spoonacularScore,
            healthyscore:element.healthScore,
            steps: element.analyzedInstructions.map(el => el.steps)

        };
    });
  
    return foodInfo;
    
};

const getDataBaseInfo = async () => {
    return await Recipe.findAll({
        include: {
            model: Diets,
            attributes: ["name"],
            through: {
                attributes: []
            }
        }
    });
};

const getRecipes = async () => {
    const apiFood = await getApiInfo();
    const dataBase = await getDataBaseInfo();
    const foodInformation = apiFood.concat(dataBase);
    return foodInformation; 
};

router.get("/recipes", async (req, res) => {
    const name = req.query.name;
    const recipes = await getRecipes();

    if(name){
      let recipeName = await recipes.filter(recipe => recipe.name.toLowerCase().includes(name.toLowerCase()));
       recipeName.length ?
       res.status(200).send(recipeName) :
         res.status(404).send("Esta receta no esta disponible o no existe, perdon!!!")
    } else {
        res.status(200).send(recipes)
    }
});

router.get("/types", async (req, res) => {
    const typesFoodApi = await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=2b32b0c306af4edeb50f6968f7894bf5&addRecipeInformation=true&number=108');
    const typesFood = typesFoodApi.data.results.map(element => element.diets);
    const typeOfFood = typesFood.map(diet => {
          return diet;
    })
    const newArray = []
     typeOfFood.forEach(array =>{
        array.forEach( diet => {
            newArray.push(diet)
        })
    })
   newArray.forEach(  el => {
    Diets.findOrCreate({
                where: { name: el},
           })
   })
   
 
    const typesofFood = await Diets.findAll();
    res.send(typesofFood);
});

router.post("/recipe", async (req, res) => {
    let {
        name,
        summary,
        score,
        diets,
        healthyscore,
        steps,
        createdInDB,
    } = req.body

    let newRecipe = await Recipe.create ({
        name,
        summary,
        score,
        healthyscore,
        steps,
        createdInDB
    })
    let typesRecipesDB = await Diets.findAll({
        where : { name: diets }
    })    
    newRecipe.addDiets(typesRecipesDB)
    res.send("Personaje creado")
});

router.get("/recipes/:id", async (req, res) => {
    const {id} = req.params;
    const recipes = await getRecipes();
    if(id){
        let recipeID = await recipes.filter(el => el.id == id);
        if(recipeID.length){
           return res.status(200).json(recipeID)
        }
       res.status(404).send("No encontre esta receta")
   }
})



module.exports = router;
