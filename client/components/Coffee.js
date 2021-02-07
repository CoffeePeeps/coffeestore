import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadProducts } from '../store/product'

// this is just stolen from past projects it will probably need to be modified but we are just trting to display all our coffee 

class Coffees extends Component{
    constructor(props){
      super(props)
      this.state = {}
    }
  
    componentDidMount(){
      this.props.bootstrap()
    }
    render(){
            // console.log(this.props.product)
            console.log(this.props)
            const coffees = this.props.product;
        return(
    //    ' hi'
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
}

const mapStateToProps = (state)=> {
    return state;
};

//call loadStudents here, now need to add a load async
//nick showed me how to simplfy the logic, don't have time to impliment it but hope to go back to it latter  
const mapDispatchToProps = (dispatch) => {
    console.log('in bootstrap');
    return {
      bootstrap: ()=> {
        //may need to change the name   
        
        dispatch(loadProducts());

      }
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(Coffees);