import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css"

export default function Landing(){
    return(
          <div className="image">
              <h1>Welcome to our page!!!</h1>
              <Link to = "/home">
                  <button>Home</button>
              </Link>
          </div>      
    )
}
