import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loadProducts } from "../store/product";
import { Button, Card, Container, Row, Col, Image } from "react-bootstrap";
import {addNewCoffee, updatedStock} from '../store'

class Coffees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: '',
      page: 1
    };
  
    this.onChange = this.onChange.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  componentDidMount() {
    this.props.bootstrap();
  }

  putInCart(coffeeId, coffeeStock){
    
    let stock = coffeeStock - 1;
    // should update the stock of coffee we have in the store
    if (stock >= 0){
      this.props.updateStock(stock, coffeeId)
    }
    // we are out of stock can't put it in the cart
    if (coffeeStock > 0) {      
      this.props.addNewCoffee(1, this.props.auth.id, coffeeId);
      //ideally a function for a pop up window would be called to tell user they added to cart
      
    }   
  }

  nextPage(number){
    
    console.log(this.state.page);
    let num = this.state.page + number;
    this.setState({page: num});  
  
  }

  onChange(ev){
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  render() {
    const categories = ['LIGHT', 'DARK'];
    let coffees = this.props.product;
    console.log(coffees);
    const { category, page } = this.state;
    const { onChange } = this;
    // console.log(category);
    if (category !== ''){
      coffees = coffees.filter(coffee=> coffee.category === category )
    }
    const lastPage = Math.ceil(coffees.length/12);
    console.log(lastPage);
    // maybe just take 12 coffees need some more logic to turn off buttons
    coffees = coffees.filter((coffee, idx) => { if ((idx) < 13  * page && idx >= 13 * (page-1) ){ return coffee}});
    console.log(coffees);
    return (
      <div className={"list"}>
            <select name='category' value={ category } onChange = { onChange }>
                    <option value = ''>-- all</option>
                    {
                        categories.map( (cat) => { 
                                return (
                                    <option key={ cat } value = { cat }>
                                        { cat } 
                                    </option>
                                );
                            })
                    }

                </select>
        {/* can turn this off at page 1 */}
        <Button variant="primary" disabled={page <= 1 } onClick = {()=> this.nextPage(-1)}>Previous Page</Button>
        {/* need to caluclate length divide by 12 an stop at that page */}
        { page < lastPage &&
        <Button variant="primary" onClick = {()=> this.nextPage(1)}>Next Page</Button>}
        <Container>
          <Row>
            {coffees.map((coffee) => {
              return (
                <div key={coffee.id}>
                  <Col md={4} sm={6}>
                    {" "}
                    <Card
                      className="bg-dark text-white mt-4"
                      className="body2 mt-4"
                      style={{ width: "18rem" }}
                      key={coffee.id}
                    >
                      <Card.Img
                        variant="top"
                        src={window.location.origin + "/assets/Coffee1.jpg"}
                      />
                      <Card.Body>
                        <Card.Title>
                          <Link to={`/coffee/${coffee.id}`}>{coffee.name}</Link>{" "}
                        </Card.Title>
                        <Card.Text>{coffee.category}</Card.Text>
                        { coffee.stock > 0 ? (
                          <Button variant="primary" onClick = {()=> this.putInCart(`${coffee.id}`, `${coffee.stock}`)}>Add to Cart</Button> 
                          ) : (
                            <p>Out of Stock</p>
                          )}

                      </Card.Body>
                    </Card>
                  </Col>
                </div>
              );
            })}
          </Row>
        </Container>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    bootstrap: () => {
      dispatch(loadProducts());
    },
    addNewCoffee(quantity, userId, coffeeId){
      dispatch(addNewCoffee(quantity, userId, coffeeId))
    },
    updateStock(stock, coffeeId){
      dispatch(updatedStock(stock, coffeeId))
    },  
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Coffees);
