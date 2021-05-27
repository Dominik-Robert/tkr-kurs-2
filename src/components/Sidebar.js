import React, { Component } from 'react';

class Sidebar extends Component {

    render() { 
        return (
            <div className="sidebar">
               <div className="sidebarMenuTitle">
                   <h2>Notizbücher</h2>
               </div>
               <div className="sidebarMenu">
                <ul>
                    <li>
                        <a href="#">Schule</a>
                    </li>
                    <li>
                        <a href="#">Sport</a>
                    </li>
                    <li>
                        <a href="#">Ernährung</a>
                    </li>
                    <li>
                        <a href="#">Programmieren</a>
                    </li>
                    <li>
                        <a href="#">Fotographieren</a>
                    </li>
                    <li>
                        <a href="/note">Notiz Hinzufügen</a>
                    </li>
                    <li>
                        <a href="/login">Login</a>
                    </li>
                    <li>
                        <a href="/signup">SignUp</a>
                    </li>
                </ul>
               </div>
            </div>
          );
    }
}
 
export default Sidebar