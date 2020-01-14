import React from 'react';
import logo from './assets/images/logo.svg';
import './assets/css/App.css';
import './assets/css/styles.css';

// importar component
import Micomponent from './components/Micomponent';
import Peliculas from './components/Peliculas';
import Header from './components/Header';
import Slider from './components/Slider';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />

      <Slider />

 
      <div className="center">
        <section id="content">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <section className="componentes">

            <Micomponent />
            <Peliculas />

          </section>
        </section>

        <Sidebar />

       

      </div>

      <div class="clearfix"></div>

      <Footer />

    </div>
  );
}

export default App;
