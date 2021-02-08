import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Coffee = ({ coffee }) =>{
    console.log("in COFFEE")
    if(!coffee.id){
        return '...loading coffee';
    }
    return(
        <div>
            <header>
                <h1> COFFEE </h1>
                <h2>{ coffee.name } </h2>
                <hr />
            </header>
            <main>
                <h4>Details</h4>
                {coffee.description && `description: ${coffee.description}` }
                <br />
                {coffee.price && `price: ${coffee.price}` }
                {/* { student.email } ---- { student.gpa } */}
            </main>
        </div>

        )
}

export default connect(
    (state, otherProps)=> {
        console.log('IN COFFEE COMPONENT')
        console.log(otherProps)
        const coffee = state.product.find(coffee => coffee.id === otherProps.match.params.id * 1) || {};
        // const coffee = state.product.find(coffee => coffee.id === 1) || {};
        return {
            coffee
            };
        },null
        
    )(Coffee);
    