import { BrowserRouter as Router } from 'react-router-dom';
import "./App.css";
import React from 'react';

import Header from "./header";
import Footer from "./footer";
import CssBaseline from '@material-ui/core/CssBaseline';

import Reisplannen from './Reisplannen';

function App() {

    return (
      <Router>
      <CssBaseline />
        <Header />
      <main>
        <Reisplannen />
      </main>
      <Footer />
    </Router>

  );
}

export default App;
