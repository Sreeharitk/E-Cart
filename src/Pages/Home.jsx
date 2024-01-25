import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, nextPage, prevPage } from "../Redux/Slices/productSlice";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../Components/Header";

function Home() {
  const dispatch = useDispatch();
  const { allProducts, loading, productsPerPage, currentPage } = useSelector(
    (state) => state.productReducer
  );
  const totalPage = Math.ceil(allProducts?.length/productsPerPage)
  const lastProductIndex = currentPage * productsPerPage
  const firstProductIndex = lastProductIndex - productsPerPage
  const visibleProducts = allProducts?.slice(firstProductIndex, lastProductIndex)

  useEffect(() => {
    dispatch(fetchProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handlePrevPage = ()=>{
    if(currentPage!=1){
      dispatch(prevPage())
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    }
  }

  const handleNextPage = ()=>{
    if(currentPage!=totalPage){
      dispatch(nextPage())
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
    }
  }

  return (
    <>
      <Header insideHome />
      <div style={{ paddingTop: "100px" }}>
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "50svb" }}
          >
            <Spinner animation="border" variant="danger" className="me-2" />
            Loading
          </div>
        ) : (
          <Container>
            <Row>
              {allProducts?.length > 0 ? (
                visibleProducts.map((products, index) => (
                  <Col
                    key={index}
                    sm={12}
                    md={6}
                    lg={4}
                    xl={3}
                    className="mb-3"
                    style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px;" }}
                  >
                    <Card
                      className="bg-light text-dark"
                      style={{ width: "18rem" }}
                    >
                      <Card.Img
                        variant="top"
                        height="300px"
                        src={products?.thumbnail}
                      />
                      <Card.Body>
                        <Card.Title>
                          {products?.title.slice(0, 20)}...
                        </Card.Title>
                        <div className="d-flex justify-content-center mt-3">
                          <Link
                            to={`/view/${products?.id}`}
                            variant="primary"
                            className="btn btn-primary"
                          >
                            View More
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
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
                  Product not found
                </div>
              )}
            </Row>
            <div className="d-flex justify-content-center mt-3">
                <span onClick={handlePrevPage} style={{cursor:"pointer"}}><i className="fa-solid fa-backward fa-lg" style={{color: "white"}}></i></span>
                <span className="mx-3">{currentPage} of {totalPage}</span>
                <span onClick={handleNextPage} style={{cursor:"pointer"}}><i className="fa-solid fa-forward fa-lg" style={{color: "white"}}></i></span>
            </div>
          </Container>
        )}
      </div>
    </>
  );
}

export default Home;
