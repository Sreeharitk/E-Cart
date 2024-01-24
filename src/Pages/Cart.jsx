import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

function Cart() {
  const cart = useSelector((state) => state.cartReducer);

  return (
    <div style={{ marginTop: "100px" }}>
      {cart?.length > 0 ? (
        <div style={{marginBottom:"284px"}}>
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
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {cart.map((products, index) => (
                      <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{products?.title}</td>
                        <td><img width={"80px"} height={"80px"} src={products?.thumbnail} alt="no img" /></td>
                        <td><div style={{fontSize:"25px"}}>{products.quantity}</div></td>
                        <td>${products.totalPrice}</td>
                        <td><button className="btn"><i className="fa-solid fa-trash fa-xl" style={{color:"#dd0e0e"}}></i></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Col>
              <Col lg={4}></Col>
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
