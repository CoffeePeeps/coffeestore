import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { loadProducts, destroyProduct } from '../store/product'
import { AdminSingleProductView } from '../components/AdminSingleProductView'

export class AdminAllProductView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...this.props.product};
    }

    componentDidMount() {
        this.props.getCoffees()
    }

    // something strange is happening when c 
    // componentDidUpdate() {
    //     this.props.getCoffees()
    // }

    render() {
        
        if (this.props.product) {
            const coffees = this.props.product;
            return (
                
                <div className = { 'coffees' }>
                    <Link to = { '/admin/addNewCoffee' }>
                        <button>Add New Coffee</button>
                    </Link>
                    <ul>
                    {  
                        coffees.map( coffee => { 
                            return (
                            <li key={ coffee.id }>
                                <Link to = { `/admin/singleCoffee/${coffee.id}` }>
                                    Click to edit Coffee: { coffee.name } 
                                </Link>
                                <button onClick = { () => this.props.destroyCoffee(coffee) }>Delete Coffee</button>
                            </li>
                        );
                    })
                    }
                </ul>
                </div>
                )
        } else {
            return (
                <div>
                </div>
            )
                
        }
        
    }

}

const mapStateToProps = (state)=> {
    return {
        product: state.product
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      getCoffees: ()=> {
        dispatch(loadProducts());
      },
      destroyCoffee: (coffee) => {
          dispatch(destroyProduct(coffee));
      }
    };
  }

export default connect(mapStateToProps, mapDispatchToProps)(AdminAllProductView);