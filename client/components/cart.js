import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//so bring in all carts, and carts_products and when returning filter cart.id
//for individual cart??

const Carts = ( {carts, cart_coffees} ) => {
    // console.log(coffees);
    
    return(
        <div className = { 'list' }>
            <ul>
            {  
                //should map through all carts and then map though each cart??
                //not quite sure what the data will look like  
                carts.map( cart => { 
                    return (
                        <li key={ cart.id }>
                            { cart.id } 
                                {/* should probably be it's own compotent */}
                                {/* <ul>
                                {
                                    //take cart.id and map through cart_coffees so filter
                                    cart_coffees.filter( item => cartId === cart.id && {
                                        return (
                                            hi          
                                        );
                                    })
                                }
                            </ul> */}
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
        dispatch(loadUsers());
      }
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(Users);