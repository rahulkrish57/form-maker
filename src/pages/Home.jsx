import React from "react";
import NewHome from "../components/home/NewHome";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
const Home = () => {
  const loader = useSelector((state) => state.loader.value);
  return (
    <Container>
      <NewHome />
    </Container>
  );
};

export default Home;
