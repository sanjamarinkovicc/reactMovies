import React, {Component} from 'react';
import "./Landing.css"

class Landing extends Component {

  render() {

    return (
       
      <div id="landing-header">
        <div className="nekiDiv">
         <h1>Welcome to Movies React App</h1>
         <p className="para">On the movie page, you can see list of all available movies!</p>
         	<button class="dugme"><a class="dugme" href="/movies">View All Movies</a></button>
           </div>
        </div>
    )
  }
}

export default Landing;