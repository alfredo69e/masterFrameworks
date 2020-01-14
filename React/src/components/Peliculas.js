import React, { Component } from 'react';
import Pelicula from './Pelicula';

class Peliculas extends Component {

    state = {
        peliculas: [
            { titulo: `Batman vs Superman`, image: `https://as.com/ocio/imagenes/2016/04/10/cine/1460272862_892134_1460273063_noticia_grande.jpg`},
            { titulo: `Gran Torino`, image: `https://www.marquid.com/wp-content/uploads/2015/05/gran-torino.jpg` },
            { titulo: `Looper`, image: `https://pics.filmaffinity.com/Looper-874353819-large.jpg` }
        ],
        nombre: `Alfredo Echeverria`
    }


    render() {
        return (
            <div id="content" className="peliculas" >
                <h2 className="subheader"> Peliculas </h2>
                <p> Seleccion de las peliculas favoritas de { this.state.nombre } </p>

                <div id="articles" className="peliculas">

                {
                    this.state.peliculas.map((peliculas, i) => {
                        return(
                           <Pelicula key={i} peliculas={peliculas} />
                        )
                    })
                }

                </div>



            </div>
        );
    }
}

export default Peliculas;