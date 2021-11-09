import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import Landing from "./components/Landing"
import Home from './components/Home';
import CreateRecipe from './components/CreateRecipe';
import Details from "./components/Details"

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
      <Route exact path ="/" component={Landing}/>
      <Route exact path ="/home" component ={Home}/>
      <Route path="/recipe" component={CreateRecipe}/>
      <Route path="/home/:id" component={Details}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
