import React, { useEffect } from "react";
import { connect } from "react-redux";
import { cart, delItem, checkoutCart, addNewCoffee } from "../store";

const Cart = ({
  auth,
  cart,
  setCart,
  handleDelete,
  checkout,
  updateCoffee,
}) => {
  useEffect(() => {
    setCart(auth.id);
  }, []);

  console.log(cart);
  return (
    <section>
      <div className="row">
        <div className="col-lg-8">
          <div className="card wish-list mb-3">
            <div className="card-body">
              <h5 className="mb-4">{/* Cart (<span>2</span> items) */}</h5>
              {cart.items.map((item) => (
                <>
                  <div className="row mb-4" key={item.coffee.id}>
                    <div className="col-md-5 col-lg-3 col-xl-3">
                      <div className="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                        <img
                          className="img-fluid w-100"
                          src={window.location.origin + "/assets/Coffee3.jpg"}
                          alt="Sample"
                        />
                      </div>
                    </div>
                    <div className="col-md-7 col-lg-9 col-xl-9">
                      <div>
                        <div className="d-flex justify-content-between">
                          <div>
                            <h5>{item.coffee.name}</h5>
                            <p className="mb-3 text-muted text-uppercase small">
                              ${item.coffee.price} per Unit
                            </p>

                            {/* <p className="mb-3 text-muted text-sentencecase small">
                              Remove From Cart
                            </p> */}
                            <a
                              href="#!"
                              type="button"
                              className="card-link-secondary small text-uppercase mr-3"
                            >
                              <i
                                className="fas fa-trash-alt mr-1"
                                onClick={() =>
                                  handleDelete(item.coffee, auth.id)
                                }
                              ></i>{" "}
                              Remove item{" "}
                            </a>
                          </div>
                          <div>
                            <div className="def-number-input number-input safari_only mb-0 w-100">
                              <button
                                id="basic-example-decrease"
                                // onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
                                className="minus"
                                disabled={item.quantity === 1 && true}
                                onClick={() =>
                                  updateCoffee(-1, auth.id, item.coffeeId)
                                }
                              ></button>
                              <input
                                className="quantity"
                                min="0"
                                name="quantity"
                                value={item.quantity}
                                type="number"
                              />
                              <button
                                id="basic-example-add"
                                // onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                                className="plus"
                                onClick={() =>
                                  updateCoffee(1, auth.id, item.coffeeId)
                                }
                              ></button>
                              <p className="mb-0">
                                <span>
                                  <strong>
                                    {item.coffee.price * item.quantity}
                                  </strong>
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="mb-4" />
                </>
              ))}
            </div>
          </div>

          {/* Credit Cards that we accept */}
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="mb-4">We accept</h5>

              <img
                className="mr-2"
                width="45px"
                src={window.location.origin + "/assets/visa.svg"}
                alt="Visa"
              />
              <img
                className="mr-2"
                width="45px"
                src={window.location.origin + "/assets/amex.svg"}
                alt="American Express"
              />
              <img
                className="mr-2"
                width="45px"
                src={window.location.origin + "/assets/mastercard.svg"}
                alt="Mastercard"
              />
            </div>
          </div>
        </div>

        {/* Grand total Container */}
        <div className="col-lg-4">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="mb-3">The total amount of</h5>

              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Subtotal
                  <span>${cart.total}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Tax
                  <span>$0.00</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                  Shipping
                  <span>Free</span>
                </li>

                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                  <div>
                    <strong>Total</strong>
                  </div>
                  <span>
                    <strong>${cart.total}</strong>
                  </span>
                </li>
              </ul>

              <button
                type="button"
                className="btn btn-primary btn-block waves-effect waves-light"
                onClick={() => checkout(cart.items, auth.id)}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapState = ({ auth, cart }) => {
  return {
    auth,
    cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    setCart(uid) {
      dispatch(cart(uid));
    },
    handleDelete(item, uid) {
      dispatch(delItem(item, uid));
    },
    checkout(items, uid) {
      // handle payment processing here
      const body = {
        payment: "success",
      };
      dispatch(checkoutCart(items[0].cartId, uid, body, items));
    },
    updateCoffee(qty, uid, coffeeId) {
      dispatch(addNewCoffee(qty, uid, coffeeId));
    },
  };
};

export default connect(mapState, mapDispatch)(Cart);

/*
<div>
  <h1>Cart</h1>
  <table>
    <thead>
      <tr>
        <th></th>
        <th></th>
        <th>QTY</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      {cart.items.map(item => (
        <tr key={item.coffee.id}>
          <td>
            <button onClick={() => handleDelete(item.coffee, auth.id)}>
            X
            </button>
          </td>
          <td>{item.coffee.name}</td>
          <td>
            {item.quantity}
            <button onClick={() => updateCoffee(1, auth.id, item.coffeeId)}>+</button>
            <button disabled={item.quantity === 1 && true} onClick={() => updateCoffee(-1, auth.id, item.coffeeId)}>-</button>
          </td>
          <td>{(item.coffee.price * item.quantity)}</td>
        </tr>
      ))}
    </tbody>
  </table>

  <div>
    <h1>Total</h1>
    <div>
      <p>Subtotal: ${cart.total}</p>
      <p>Shipping: FREE</p>
      <p>Tax: $0.00</p>
      <p>Total: ${cart.total}</p>
    </div>

    <button onClick={
      () => checkout(cart.items, auth.id)
    }>Checkout</button>
  </div>

</div>
*/
