import React, { Component } from 'react';

class MainMenu extends Component {

    render() { 
        return (
            <div className="mainMenu">
                <div className="menuHeading">       
                    <h2> Notify</h2>
                </div>
                <div className="signUpButton">
                    <button>Sign Up</button>
                </div>
            </div>
          );
    }
}
 
export default MainMenu