import { ColaMantenimiento } from '../clases/ColaMantenimiento';
import { useState, useEffect } from 'react';
import logo from '../assets/FixturnLOGO.png'; //logo
import { Historial } from './Historial';

const miCola = new ColaMantenimiento();

export default function Panel({ setSesion }) {
    
    const [actualizar, setActualizar] = useState(0);
    const [texto, setTexto] = useState('');
    const [vistaHistorial, setVistaHistorial] = useState(false);

    function guardar(e) {
        e.preventDefault();
        if (texto === '') return;
        
        miCola.agregar(texto);
        setTexto('');
        setActualizar(actualizar + 1);
    }

    function siguiente() {
        miCola.atender();
        setActualizar(actualizar + 1);
    }

    function borrarHistorial() {
        miCola.limpiar();
        setActualizar(actualizar + 1);
    }

    return (
        <>
        <div> 
            {/* 1. La barra de navegación superior que se queda fija */}
            <div> 
                <div className="items-center py-2 bg-[#004aad] flex">
                    <div><img className="ml-4 mt-2 mb-2 bg-white size-10 block mx-auto rounded-full" src={logo} alt="Logo FixTurn" /></div>
                    <div><h2 className="font-bold uppercase text-white p-2 flex-none">FixTurn - Panel Principal</h2></div> 
                    <div><button className="ml-3 items-right border border-white rounded-3xl bg-none py-0.5 px-2 text-white hover:bg-white hover:text-[#004aad] hover:scale-105 transition-transform duration-150 ease-in-out" onClick={() => localStorage.setItem('sesion', false) || setSesion(false)}>Cerrar sesión</button></div>
                </div>
            </div>

            {/* 2. EL INTERRUPTOR DE VISTAS */}
            {vistaHistorial ? (
                /* Si vistaHistorial es verdadero, muestra el componente independiente Historial */
                <Historial 
                    completados={miCola.completados} 
                    onLimpiar={borrarHistorial} 
                    onVolver={() => setVistaHistorial(false)} 
                />
            ) : (
                /* Si es falso, muestra tu panel normal de tareas */
                <div>
                    <div className="flex-col space-y-4 ml-4 mt-2.5">
                        <div className="text-[50px] font-bold text-[#000000] flex space-x-3">
                            <p>Bienvenido de nuevo</p> 
                            <p className="uppercase font-thin text-[#004aad]">{localStorage.getItem('NoUsuario')}</p>
                        </div>
                            
                        {/* Botón para ir al Historial */}
                        <div>
                            <button 
                                onClick={() => setVistaHistorial(true)}
                                className="bg-blue-100 text-blue-700 font-semibold py-2 px-4 rounded-xl hover:bg-blue-200 transition-colors"
                            >
                                Ver Historial / Realizado
                            </button>
                        </div>

                        {/* Formulario de nuevas tareas */}
                        <div> 
                            <h1 className="font-bold">Servicios de mantenimiento a realizar</h1>

                            <form onSubmit={guardar}>
                                <input 
                                className="border border-gray-400 px-2 py-1 rounded-md mb-2 hover:bg-gray-100 mr-3"
                                type="text" 
                                value={texto} 
                                onChange={(e) => setTexto(e.target.value)} 
                                placeholder="Escribe el reporte"
                                />
                                <button type="submit" className="bg-blue-700 text-white py-1 px-4 rounded-md hover:bg-blue-800 hover:scale-105 transition-transform duration-150 ease-in-out">
                                    +
                                </button>
                            </form>
                        </div>

                        {/* Cola de espera y pendientes */}
                        <section className="flex-col justify-center mr-auto">
                            <h3 className="font-bold">Cola de Espera</h3>
                            <p>Pendientes: {miCola.elementos.length}</p>
                            <strong>Atender ahora:</strong>
                            
                            {miCola.elementos.length > 0 && (
                                <ul className="border border-gray-300 px-2 py-2 rounded-md mb-2 hover:bg-gray-100 font-bold">
                                    <p>{miCola.elementos[0]}</p>
                                    <button className="bg-blue-700 text-white py-1 px-4 rounded-md hover:bg-blue-800 hover:scale-105 transition-transform duration-150 ease-in-out" onClick={siguiente}>Realizado</button>
                                </ul>
                            )}
                        </section>

                        <div> 
                            <p className="font-bold">Siguientes en la cola:</p>
                            <ul>
                                {miCola.elementos.slice(1).map((item, i) => (
                                <li className="border border-gray-300 px-2 py-2 rounded-md mb-2 hover:bg-gray-100" key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

        </div>
        </>
    )
}