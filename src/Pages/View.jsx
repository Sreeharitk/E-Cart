import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addWishList } from "../Redux/Slices/wishlistSlice";
import { addToCart } from "../Redux/Slices/cartSlice";

function View() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const dispatch = useDispatch()  
  const wishList = useSelector(state=>state.wishListReducer)
  useEffect(() => {
    const allProducts = JSON.parse(sessionStorage.getItem("allProducts"));
    setProduct(allProducts?.find((item) => item.id == id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(wishList);

  const handleWishList = (product)=>{
    const existingProduct = wishList?.find(item=>item.id==product.id)
    if(existingProduct){
      alert("Product already in wishlist!")
    }else{
      dispatch(addWishList(product))
      alert("Product added to the wishlist!")
    }
  }

  return (
    <div style={{ paddingTop: "120px" }}>
      {product ? (
        <Container key={product.id}>
          <Row>
            <Col lg={6} md={6}>
              <div className="d-flex justify-content-center">
                <img
                  src={product?.thumbnail}
                  alt=""
                  style={{height:"400px", maxWidth:"100%"}}
                />
              </div>
            </Col>
            <Col lg={6} md={6}>
              <div className="d-flex flex-column">
                <span>PID: {product.id}</span>
                <h1>{product.title}</h1>
                <h4>$ {product.price}</h4>
                <p className="mt-5 mb-4" style={{textAlign:"justify"}}>{product.description}</p>
                <div>
                  <Button onClick={()=>handleWishList(product)} variant="success" className="me-2"><i className="fa-solid fa-heart me-2" style={{color:"#ce1c1c"}}></i>Add to Wishlist</Button>{' '}
                  <Button onClick={()=>dispatch(addToCart(product))} variant="warning"><i className="fa-solid fa-cart-shopping me-2"></i>Add to Cart</Button>{' '}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <div>
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "62svb" }}
          >
            <Spinner animation="border" variant="danger" className="me-2" />
            Loading
          </div>
        </div>
      )}
    </div>
  );
}

export default View;
