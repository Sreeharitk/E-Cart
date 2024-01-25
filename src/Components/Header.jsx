// import { useEffect, useState } from "react"
import { Nav, Container, Navbar, Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchByProduct } from "../Redux/Slices/productSlice";

// eslint-disable-next-line react/prop-types
function Header({insideHome}) {
  const wishList = useSelector((state) => state.wishListReducer);
  const cartList = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch()
  // const [wishListCount, setWishListCount] = useState(0)

  // useEffect(()=>{
  //   setWishListCount(wishList?.length)
  // },[wishList])

  return (
    <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
      <Container className="cont">
        <Navbar.Brand>
          <Link
            to={"/"}
            style={{ textDecoration: "none", color: "black", fontSize: "25px" }}
          >
            <i className="fa-solid fa-truck me-2"></i>E-Cart
          </Link>
        </Navbar.Brand>
        {insideHome&&<div style={{display:"flex", width:"70%", justifyContent:"center"}}>
          <Nav.Link>
            <input
             style={{width:"120%",boxShadow:`rgba(0, 0, 0, 0.35)0px 5px 15px`}}
              type="text"
              className="form-control"
              placeholder="Search here.."
              onChange={(e)=>dispatch(searchByProduct(e.target.value.toLowerCase()))}
            ></input>
          </Nav.Link>
        </div>}
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-dark" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={"/wishlist"}
              >
                <i
                  className="fa-solid fa-heart me-2"
                  style={{ color: "#ce1c1c" }}
                ></i>
                Wishlist{" "}
                <Badge className="bg-dark text-center">
                  {wishList?.length}
                </Badge>
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={"/cart"}
              >
                <i className="fa-solid fa-cart-shopping me-2"></i>Cart{" "}
                <Badge className="bg-dark">{cartList?.length}</Badge>
              </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
