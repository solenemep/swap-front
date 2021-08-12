import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Nav from "./components/Nav"

const Dapp = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/pool"></Route>
        <Route exact path="/stats"></Route>
      </Switch>
    </Router>
  )
}
export default Dapp
