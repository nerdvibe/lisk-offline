import React  from "react";
import "./styles/styles.scss";
import "./styles/bulma.scss";
import "./styles/forms.scss";
import "./styles/margins.scss";
import About from "./modules/About/About";
import Header from "./modules/header/Header";
import Footer from "./modules/footer/Footer";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckCircle, faExchangeAlt, faUnlockAlt, faKey } from "@fortawesome/free-solid-svg-icons";
import CreateTx from "./modules/createTx/CreateTx";

library.add(faCheckCircle, faExchangeAlt, faUnlockAlt, faKey);

export default function App() {
  return (
    <section className="hero is-fullheight lines">
      <Header />

      {/*<About />*/}
      <CreateTx/>

      <Footer />
    </section>
  );
}
