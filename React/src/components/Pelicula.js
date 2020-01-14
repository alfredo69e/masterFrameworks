import React, { Component } from 'react';

class Pelicula extends Component {
    render() {

        const { titulo, image } = this.props.peliculas;

        return (
            <article className="article-item">
                <div className="img-wrap">
                    <img src={image} alt={titulo} />
                </div>

                <h2>{titulo}</h2>
                <span class="date">
                    hace 5 minutos
        </span>

                <a href="">Leer mas</a>

                <div class="clearfix"></div>
            </article>

        )
    }
}

export default Pelicula;