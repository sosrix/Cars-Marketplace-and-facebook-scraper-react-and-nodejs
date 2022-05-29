import "./App.css";
import Navbar from "./NavBar";
import HomeBody from "./HomeBody";
import Product from "./Product";
import Footer from "./footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <HomeBody />
          </Route>
          <Route exact path="/Product/:idpage">
            <Product />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
