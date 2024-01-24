import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishList } from "../Redux/Slices/wishlistSlice";
import { addToCart } from "../Redux/Slices/cartSlice";

function Wishlist() {
  //get whishlist from store
  const wishlist = useSelector((state) => state.wishListReducer);
  const dispatch = useDispatch()

  const handleCart = (products)=>{
    dispatch(removeFromWishList(products.id))
    dispatch(addToCart(products))
  }

  return (
    <div style={{ marginTop: "100px" }}>
      <Container>
        <Row>
          {wishlist?.length > 0 ? (
            wishlist?.map((products) => (
              <Col key={products?.id} sm={12} md={6} lg={4} xl={3} className="mt-3">
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={products?.thumbnail} height={"300px"} />
                  <Card.Body>
                    <Card.Title>{products?.title.slice(0,20)}...</Card.Title>
                    <div style={{display:"flex", justifyContent:"space-between"}}>
                      <Button onClick={()=>dispatch(removeFromWishList(products.id))} variant="white"><i className="fa-solid fa-heart-circle-minus fa-xl" style={{color: "red"}}></i></Button>
                      <Button onClick={()=>handleCart(products)} variant="white"><i className="fa-solid fa-cart-plus fa-xl" style={{color: "yellow"}}></i></Button>{' '}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <div>
              <div
                className="d-flex justify-content-center align-items-center flex-column"
                style={{ height: "49svb", fontSize:"30px"}}
              >
                <img src="https://cdni.iconscout.com/illustration/free/thumb/free-empty-cart-4085814-3385483.png?f=webp" alt="" height={"300px"}/>
                No items added to wishlist yet
              </div>
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default Wishlist;
