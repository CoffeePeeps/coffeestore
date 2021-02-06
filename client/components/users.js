import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

//This would be used for the admin mode 
const Users = ( {users} ) => {
    // console.log(coffees);
    
    return(
        <div className = { 'list' }>
            <ul>
            {  
                users.map( user => { 
                    return (
                    <li key={ user.id }>
                        <Link to={`/users/${ user.id }`}>
                            { user.name } 
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
        dispatch(loadUsers());
      }
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(Users);