

const initialState = {
    recipes : [] ,
    recipes2: [],
    diets: [],
    detailsOfRecipes: []
}

function rootReducer(state= initialState, action){
    switch(action.type){
        case "GET_RECIPES": 
        return {
            ...state,
            recipes: action.payload,
            recipes2: action.payload
        }
        case "GET_DIETS": 
        return {
            ...state,
            diets: action.payload
        }
        case "GET_RECIPES_BY_NAME":
            return {
                ...state,
                recipes: action.payload
            }
        case "FILTER_BY_DIET":
                const AllRecipes = state.recipes2
              console.log(AllRecipes)
                const dietfilter = action.payload === "All" ? AllRecipes : AllRecipes?.map(el => {
                    if(el.diets.includes(action.payload.toString()) === true){
                        return el
                    }
                    return
                   }
                 )
                  const filterDiet = dietfilter.filter(el => el !== undefined );
                  console.log(filterDiet)
                
                return{
                    ...state,
                    recipes: filterDiet
                }
                case "ORDERED_RECIPES":
                    const orderedrecipes = action.payload === "des" ?
                    state.recipes.sort((a,b)=>{
                        if(a.name > b.name) {
                            return -1;
                        }
                        if(b.name > a.name) {
                            return 1;
                        }
                        return 0;
                    }): state.recipes.sort((a,b)=> {
                        if(a.name > b.name){
                            return 1;
                        }
                        if(b.name > a.name){
                            return -1;
                        }
                        return 0;
                    })
                    return {
                        ...state,
                        recipes: orderedrecipes
                    }
               case "POINTS_RECIPES":
                   const pointsOrder =action.payload === "non" ?
                   state.recipes2.sort((a,b)=>{
                       if(a.healthyscore > b.healthyscore) {
                           return -1;
                       }
                       if(b.healthyscore > a.healthyscore) {
                           return 1;
                       }
                       return 0;
                   }): state.recipes2.sort((a,b)=> {
                       if(a.healthyscore > b.healthyscore){
                           return 1;
                       }
                       if(b.healthyscore > a.healthyscore){
                           return -1;
                       }
                       return 0;
                   })
                   return {
                    ...state,
                    recipes: pointsOrder
                   }
        case "POST_RECIPE":
            return{
                ...state
            }
            case "RECIPE_DETAILS":
                return {
                    ...state,
                    detailsOfRecipes: action.payload
                }
            
        default: return state;
    }
}

export default rootReducer;