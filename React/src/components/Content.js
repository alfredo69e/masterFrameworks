import React, { Component } from 'react';
import Micomponent from './Micomponent';

class Content extends Component {
    render() {
        return (
            <section id="content">
                <h2 className="subheader">Ultimos articulos</h2>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <section className="componentes">

                    <Micomponent />

                </section>
            </section>
        );
    }
}

export default Content;