import { BrowserRouter as Router } from 'react-router-dom';
import "./App.css";
import React from 'react';

import Header from "./header";
import Footer from "./footer";
import CssBaseline from '@material-ui/core/CssBaseline';

import Reisplannen from './Reisplannen';

const urlDB = `http://localhost:3001/holidays`;

class App extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      loading: false,
      alldata: [],
      singleReisplan: {
        naam: "",
        omschrijving: "",
        land: "",
        vertrekdatum: "",
        terugkomstdatum: "",
        hotels: {
          naam: "",
          prijs: "",
        }
      }
    };
    this.getReisplannen = this.getReisplannen.bind(this);
    this.getReisplan = this.getReisplan.bind(this);
    this.createReisplan = this.createReisplan.bind(this);
    this.updateReisplan = this.updateReisplan.bind(this);
    this.deleteReisplan = this.deleteReisplan.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  getReisplannen() {
    this.setState({ loading: true }, () => {
      fetch(urlDB)
        .then(res => res.json())
        .then(result =>
          this.setState({
            loading: false,
            alldata: result
          })
        )
        .catch(console.log);
    });
  }

  handleChange(event) {
    var naam = this.state.singleReisplan.naam;
    var omschrijving = this.state.singleReisplan.omschrijving;
    var land = this.state.singleReisplan.land;
    var vertrekdatum = this.state.singleReisplan.vertrekdatum;
    var terugkomstdatum = this.state.singleReisplan.terugkomstdatum;
    if (event.target.name === "naam") naam = event.target.value;
    if (event.target.name === "omschrijving") omschrijving = event.target.value;
    if (event.target.name === "land") land = event.target.value;
    if (event.target.name === "vertrekdatum") vertrekdatum = event.target.value;
    if (event.target.name === "terugkomstdatum") terugkomstdatum = event.target.value;

console.log("handleChange", event.target.name);

    this.setState({
      singleReisplan: {
        naam: naam,
        omschrijving: omschrijving,
        land: land,
        vertrekdatum: vertrekdatum,
        terugkomstdatum: terugkomstdatum,
      }
    });
  }

  createReisplan() {
    console.log("test");
    fetch(urlDB, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.singleReisplan)
    }).then(
      this.setState({
        singleReisplan: {
          naam: "",
          omschrijving: "",
          land: "",
          vertrekdatum: "",
          terugkomstdatum: "",
        }
      })
    );
    this.getReisplannen();
  }

  getReisplan(event, id) {
    this.setState(
      {
        singleReisplan: {
          naam: "Bezig ...",
          omschrijving: "Bezig ...",
        }
      },
      () => {
        fetch(`${urlDB}/${id}`)
          .then(res => res.json())
          .then(result => {
            this.setState({
              singleReisplan: {
                naam: result.naam,
                omschrijving: result.omschrijving ? result.omschrijving : "",
                land: result.land,
                vertrekdatum: result.vertrekdatum,
                terugkomstdatum: result.terugkomstdatum,
              }
            });
          });
      }
    );
  }

  updateReisplan(event, id) {
    fetch(`${urlDB}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.singleReisplan)
    })
      .then(res => res.json());
      this.getReisplannen();
  }

  deleteReisplan(event, id) {
    fetch(`${urlDB}/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(result => {
        this.setState({
          singleReisplan: {
            naam: "",
            omschrijving: "",
            land: "",
            vertrekdatum: "",
            terugkomstdatum: "",
          }
        });
        this.getReisplannen();
      });
  }

    render() {
    return (
      <Router>
      <CssBaseline />
        <Header />
      <main>     
      { this.state.loading ? '<span>Bezig met laden...</span>' : '' }
        <Reisplannen
          alldata = { this.state.alldata }
          singleReisplan = { this.state.singleReisplan }
          getReisplannen = { this.getReisplannen }
          getReisplan = { this.getReisplan }
          createReisplan = { this.createReisplan }
          updateReisplan = { this.updateReisplan }
          deleteReisplan = { this.deleteReisplan }
          handleChange = { this.handleChange }
        />
      </main>
      <Footer />
    </Router>

  );
    }
}

export default App;
