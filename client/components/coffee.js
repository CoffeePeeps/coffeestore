import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Also stolen from past projects it will probably need to be modified but we are just trting to display a coffee will we still see the 
// list I am not sure 

const Coffee = ({ coffee }) =>{
    
    return(
        <div>
            <header>
                <h1> Coffee </h1>
                <h2>{ coffee.name } </h2>
                <hr />
            </header>
            <main>
                <h4>Details</h4>
                {coffee.descripition && `description: ${coffee.descripition}` }
                <br />
                {coffee.price && `price: ${coffee.price}` }
                {coffee.quantity && `price: ${coffee.quantity}` }
            </main>
        </div>

        )
}

export default connect(
    (state, otherProps)=> {
        //console.log(otherProps)
        // could this work?? we will need something like this 
        const coffee = state.coffees.find(coffee => coffee.id === otherProps.match.params.id * 1) || {};
        return {
            coffee
            };
        }
        
    )(Coffee);
    