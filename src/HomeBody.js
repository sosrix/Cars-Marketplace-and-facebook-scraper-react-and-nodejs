import axios from "axios";
import { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import moment from "moment";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Masonry from "react-masonry-component";
import { Link } from "react-router-dom";

const HomeBody = () => {
  const [data, setData] = useState("");
  const [BackState, setBackState] = useState("");

  const getAllData = () => {
    axios
      .get("http://localhost:3001/get")
      .then((response) => {
        setData(response.data);
        setBackState(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleSearch(e) {
    const dataFound = BackState.filter((BackState) =>
      BackState.ProductTitle.toLowerCase().includes(
        e.target.value.toLowerCase()
      )
    ).map((data) => data);
    if (e.target.value.length > 0) {
      setData(dataFound);
    } else if (e.target.value === "") {
      setData(BackState);
    } else {
      getAllData();
    }
  }

  useEffect(() => {
    getAllData();
    return () => {
      setData("");
      setBackState("");
    };
  }, []);

  return (
    <div className="HomeBody">
      <p className="frontmessage">
        Find the perfect car for yourself Today. Cars in all Categories are
        available for sale. Find your Dream Car Today and drive away with
        confidence. Call Now. Order Now. More than +3000 car added daily.
      </p>
      <div class="search">
        <input
          type="text"
          class="searchTerm"
          onChange={(e) => handleSearch(e)}
          placeholder="What are you looking for?"
        />
      </div>

      <Masonry>
        {data ? (
          data
            .slice(-80)
            .reverse()
            .map((data) => {
              return (
                <Col md={4} lg={3} key={data.id}>
                  <Card
                    border="secondary"
                    className="Card"
                    bg={"dark"}
                    text={"white"}
                  >
                    <div className="imgcontainer">
                      <Link to={`/Product/${data.id}`}>
                        <Card.Img variant="top" src={data.ProductImg} />
                      </Link>
                      <p className="top-left">{data.ProductTitle}</p>
                      <p className="bottom-right">{data.ProductPrice}</p>
                    </div>

                    <Card.Footer>
                      <small className="text-muted">
                        Last updated {moment(data.TimeStamp).fromNow()}
                      </small>
                      <small className="text-location">
                        [{data.ProductLocation}]
                      </small>
                    </Card.Footer>
                  </Card>
                </Col>
              );
            })
        ) : (
          <h3>No data yet</h3>
        )}
      </Masonry>
    </div>
  );
};

export default HomeBody;
