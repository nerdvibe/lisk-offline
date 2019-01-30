import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./styles/styles.scss";
import "./styles/bulma.scss";
import "./styles/forms.scss";
import "./styles/margins.scss";
import About from "./modules/About/About";
import Header from "./modules/header/Header";
import {Footer} from "./modules/footer/Footer";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckCircle,
  faExchangeAlt,
  faUnlockAlt,
  faKey,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import CreateTx from "./modules/createTx/CreateTx";

library.add(faCheckCircle, faExchangeAlt, faUnlockAlt, faKey, faEye, faEyeSlash);

export default function App() {
  return (
    <BrowserRouter>
      <section className="hero is-fullheight lines">
        <Header />
        <Switch>
          <Route exact path="/" component={About} />
          <Route exact path="/create-tx" component={CreateTx} />
        </Switch>
        <Footer />
      </section>
    </BrowserRouter>
  );
}
