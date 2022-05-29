import { useState, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import "bootstrap/dist/css/bootstrap.min.css";

const Product = () => {
  const [data, setData] = useState("");
  const { idpage } = useParams();
  const [itemImg, setItemImg] = useState("00000000000000");

  const getAllData = () => {
    axios
      .get("http://localhost:3001/get")
      .then((response) => {
        const found = response.data.filter((x) => x.id == idpage);
        const productFound = found[0];
        const imgID = productFound.ProductID.slice(42);
        setData(productFound);
        setItemImg(`${imgID}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div className="productPage">
      <Row xs={1} md={2} className="productRow">
        <Col>
          <Card
            border="secondary"
            key={data.id}
            className="productCard"
            bg={"dark"}
            text={"white"}
          >
            <Card.Img
              variant="right"
              src={require(`./images/${itemImg}.jpg`)}
            />
            <Card.Footer>
              <small className="text-muted">
                Last updated {moment(data.TimeStamp).fromNow()}
              </small>
            </Card.Footer>
          </Card>
        </Col>
        <Col>
          <Card
            border="secondary"
            key={data.id}
            className="productCard"
            bg={"dark"}
            text={"white"}
          >
            <Card.Footer>
              <small className="text-muted">Grab The Car!</small>
            </Card.Footer>

            <Card.Body>
              <Card.Title>
                {data.ProductTitle}{" "}
                <p class="card-price">{data.ProductPrice}</p>
              </Card.Title>
              <Card.Footer>
                {data
                  ? data.ProductDescr.replace(
                      "See More",
                      "~[hidden informations]"
                    )
                  : data.ProductDescr}
              </Card.Footer>
            </Card.Body>

            <Card.Body>
              <a href={`${data.ProductID}`} target="_blank">
                <Button variant="secondary">See More informations</Button>
              </a>{" "}
              <a href={`${data.ProductID}`} target="_blank">
                <Button variant="success">Message the seller</Button>
              </a>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">
                Last updated {moment(data.TimeStamp).fromNow()}
              </small>
              {" - "}
              <small className="text-location">{data.ProductLocation}</small>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Product;
