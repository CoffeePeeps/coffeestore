import React from 'react'
import { connect } from 'react-redux'

import { addProduct } from '../store/product'

export class AdminAddNewProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            stock: 0.0,
            price: 0.0,
            imageURL: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value }) 
    }

    handleSave(event) {
        event.preventDefault();
        this.props.createProduct({ ...this.state })
    }

    componentDidUpdate() {
        this.props.product[0] = this.state;
    }

    render() {

        let name = '';
        let description = '';
        let stock = 0.0;
        let price = 0.0;
        let imageURL = '';

        
        if (this.props.product.length) {
            name = this.props.product[0].name;
            description = this.props.product[0].description;
            stock = this.props.product[0].stock;
            price = this.props.product[0].price;
            imageURL = this.props.product[0].imageURL;
        } 

        return (
            <div>
                <form onSubmit = { this.handleSave } id = "addProductForm">
                    <label htmlFor = "name">Name: </label>
                    <input name = "name" onChange = { this.handleChange } />

                    <br />
                    <label htmlFor = "description">Description: </label>
                    <input name = "description" onChange = { this.handleChange } />

                    <br />
                    <label htmlFor = "stock">Stock: </label>
                    <input name = "stock" onChange = { this.handleChange } />

                    <br />
                    <label htmlFor = "price">Price: </label>
                    <input name = "price" onChange = { this.handleChange } />

                    <br />
                    <label htmlFor = "imageURL">Image URL: </label>
                    <input name = "imageURL" onChange = { this.handleChange } />

                    <br />
                    <input type = "submit" value = "Save"></input>
                </form>

                <br />
                <p>Notes:</p>
                <ul>
                    <li>If you can't save the coffee, it already exists in the database</li>
                    <li>To add more than one coffee, use the Back button and select the "Add New Coffee" button</li>
                    <li>To edit an existing product (including the one you just created), click the Back button and select the coffee you want to edit from the list</li>
                </ul>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        product: state.product
    }
}

function mapDispatchToProps(dispatch) {
    
    return {
        createProduct(newProduct) {
            dispatch(addProduct(newProduct))
        } 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminAddNewProduct)