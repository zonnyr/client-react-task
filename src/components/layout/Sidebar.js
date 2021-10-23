import React from 'react';
import NuevoProyecto from '../proyectos/NuevoProyecto';
import ListadoProyectos from '../proyectos/ListadoProyectos';
import Busqueda from '../proyectos/Busqueda';

const Sidebar = () => {
    return ( 
        <aside>
            <h1>Lumen <span className="color-text-gray">- React</span></h1>

            <NuevoProyecto/>

            <Busqueda/>

            <div className="proyectos">
                <h2>Tus Proyectos</h2>

                <ListadoProyectos/>
            </div>


        </aside>
     );
}
 
export default Sidebar;