import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { decQuantity, emptyCart, incQuantity, removeFromCart } from "../Redux/Slices/cartSlice";

function Cart() {
  const cart = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch()
  const navigateTo = useNavigate()

  const handleCheckOut = ()=>{
    alert("Transaction successfull...Thanks for shopping with us!")
    dispatch(emptyCart())
    navigateTo("/")
  }

  const handleDecrement = (products)=>{
    if(products.quantity>1){
      dispatch(decQuantity(products))
    }else{
      dispatch(removeFromCart(products?.id))
    }
  }

  return (
    <div style={{ marginTop: "100px" }}>
      {cart?.length > 0 ? (
        <div style={{ marginBottom: "230px" }}>
          <Container>
            <h1>Cart Summary</h1>
            <Row>
              <Col lg={8}>
                <table className="table table-dark table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Product</th>
                      <th scope="col">Image</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Total Price</th>
                      <th scope="col">Remove</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {cart.map((products, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td><Link style={{textDecoration:"none", color:"white"}} to={`/view/${products.id}`}>{products?.title}</Link></td>
                        <td>
                          <img
                            width={"80px"}
                            height={"80px"}
                            src={products?.thumbnail}
                            alt="no img"
                          />
                        </td>
                        <td>
                          <div style={{ fontSize: "25px" }}>
                            <button onClick={()=>handleDecrement(products)} style={{color:"red", fontWeight:"bolder", fontSize:"20px"}} className="btn">-</button>
                            {products.quantity}
                            <button onClick={()=>dispatch(incQuantity(products))} style={{color:"red", fontWeight:"bolder", fontSize:"20px"}} className="btn">+</button>
                          </div>
                        </td>
                        <td>${products.totalPrice}</td>
                        <td>
                          <button onClick={()=>dispatch(removeFromCart(products?.id))} className="btn">
                            <i
                              className="fa-solid fa-trash fa-xl"
                              style={{ color: "#dd0e0e" }}
                            ></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div>
                  <button onClick={()=>dispatch(emptyCart())} className="btn btn-warning me-3">Empty Cart</button>
                  <Link to={"/"} className="btn btn-success">
                    Shop more
                  </Link>
                </div>
              </Col>
              <Col lg={4}>
                <div className="shadow-lg bg-light p-3 rounded text-dark">
                  <h4>
                    Total Products: <span className="fw-bolder">{cart.map(item=>item.quantity)?.reduce((a,b)=>a+b)}</span>
                  </h4>
                  <h4>
                    Total Amount: <span className="fw-bolder">${cart.map(item=>item.totalPrice)?.reduce((a,b)=>a+b)}</span>
                  </h4>
                  <hr />
                  <div className="d-grid">
                    <button onClick={handleCheckOut} className="btn btn-warning">Checkout</button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center flex-column"
          style={{ height: "49svb", fontSize: "30px" }}
        >
          <img
            src="https://cdni.iconscout.com/illustration/free/thumb/free-empty-cart-4085814-3385483.png?f=webp"
            alt=""
            height={"300px"}
          />
          No items added to cart yet
        </div>
      )}
    </div>
  );
}

export default Cart;
