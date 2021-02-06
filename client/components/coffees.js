import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// this is just stolen from past projects it will probably need to be modified but we are just trting to display all our coffee 

const Coffees = ( {coffees} ) => {
    // console.log(coffees);
    
    return(
        <div className = { 'list' }>
            <ul>
            {  
                coffees.map( coffee => { 
                    return (
                    <li key={ coffee.id }>
                        <Link to={`/coffees/${ coffee.id }`}>
                            { coffee.name } 
                        </Link>
                    </li>
                );
            })
            }
        </ul>
        </div>
    )
}

const mapStateToProps = (state)=> {
    return state;
};

//call loadStudents here, now need to add a load async
//nick showed me how to simplfy the logic, don't have time to impliment it but hope to go back to it latter  
const mapDispatchToProps = (dispatch) => {
    return {
      bootstrap: ()=> {
        //may need to change the name   
        dispatch(loadCoffees());
      }
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(Coffees);