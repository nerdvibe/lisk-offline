import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./styles/styles.scss";
import "./styles/bulma.scss";
import "./styles/forms.scss";
import "./styles/margins.scss";
import About from "./modules/About/About";
import { Header } from "./modules/header/Header";
import { Footer } from "./modules/footer/Footer";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckCircle,
  faExchangeAlt,
  faUnlockAlt,
  faKey,
  faEye,
  faEyeSlash,
  faMagic,
  faQuestionCircle,
  faPrint,
  faSyncAlt,
  faCaretDown,
  faCaretRight,
  faCog,
  faFlask,
  faExclamation,
  faUserTie,
  faTimesCircle,
  faStar,
  faNetworkWired
} from "@fortawesome/free-solid-svg-icons";
import CreateTx from "./modules/createTx/CreateTx";
import CreateWallet from "./modules/createWallet/CreateWallet";
import WalletAccess from "./modules/walletAccess/WalletAccess";
import { CastVotes } from "./modules/castVotes/CastVotes";

library.add(
  faCheckCircle,
  faExchangeAlt,
  faUnlockAlt,
  faKey,
  faEye,
  faEyeSlash,
  faMagic,
  faQuestionCircle,
  faPrint,
  faSyncAlt,
  faCaretDown,
  faCaretRight,
  faCog,
  faExclamation,
  faUserTie,
  faTimesCircle,
  faStar,
  faNetworkWired,
  faFlask
);

export default function App() {
  const [disableValidation, setDisableValidation] = useState<boolean>(false);
  const [network, setNetwork] = useState<"Testnet" | "Mainnet">("Mainnet");

  return (
    <BrowserRouter>
      <section className="hero is-fullheight lines">
        <Header
          setDisableValidation={setDisableValidation}
          disableValidation={disableValidation}
          network={network}
          setNetwork={setNetwork}
        />
        <Switch>
          <Route
            exact
            path="/create-tx"
            component={() => <CreateTx disableValidation={disableValidation} />}
          />
          <Route exact path="/create-wallet" component={CreateWallet} />
          <Route
            exact
            path="/access-wallet"
            render={() => (
              <WalletAccess disableValidation={disableValidation} />
            )}
          />
          <Route
            exact
            path="/cast-votes"
            render={() => <CastVotes network={network} />}
          />
          <Route exact path="/" component={About} />
          <Route component={About} />
        </Switch>
        <Footer />
      </section>
    </BrowserRouter>
  );
}
