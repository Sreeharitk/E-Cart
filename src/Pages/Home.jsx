import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../Redux/Slices/productSlice";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const { allProducts, loading } = useSelector(
    (state) => state.productReducer
  );

  useEffect(() => {
    dispatch(fetchProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ paddingTop: "100px"}}>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{height:"50svb"}}>
          <Spinner animation="border" variant="danger" className="me-2" />
          Loading
        </div>
      ) : (
        <Container>
          <Row>
            {allProducts?.length > 0 &&
              allProducts.map((products, index) => (
                <Col key={index} sm={12} md={6} lg={4} xl={3} className="mb-3" style={{boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px;"}}>
                  <Card className="bg-light text-dark" style={{ width: "18rem" }}>
                    <Card.Img variant="top" height="300px" src={products?.thumbnail} />
                    <Card.Body>
                      <Card.Title>{products?.title.slice(0,20)}...</Card.Title>
                      <div className="d-flex justify-content-center mt-3"><Link to={`/view/${products?.id}`} variant="primary" className="btn btn-primary">View More</Link></div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Container>
      )}
    </div>
  );
}

export default Home;
