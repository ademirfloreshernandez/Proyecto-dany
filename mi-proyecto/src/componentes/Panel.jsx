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
        <main className="w-full h-screen bg-[#ffffff] static top-0"> 
            {/* 1. La barra de navegación superior que se queda fija */}
            <section className="bg-[#004aad] text-white h-16"> 
                <div className="flex">
                    <div><img className="ml-4 mt-2 mb-2 bg-white size-10 rounded-full" src={logo} alt="Logo FixTurn" /></div>
                    <div><h2 className="font-bold uppercase text-white m-4">FixTurn - Panel Principal</h2></div>
                    <div><button className="m-4 border border-white rounded-3xl bg-none py-0.5 px-2 text-white hover:bg-white hover:text-[#004aad] hover:scale-105 transition-transform duration-150 ease-in-out" onClick={() => localStorage.setItem('sesion', false) || setSesion(false)}>Cerrar sesión</button></div>
                </div>
            </section>

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
                    <div className="flex-col ml-4 mt-2.5">
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
                                Historial de servicios
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

                        <section class="grid grid-cols-2 gap-4 border border-gray-300 py-2">
                            {/* Cola de espera y pendientes */}
                            <section class="ml-2 flex-col mr-2 grid-span-3 ...">
                                <h3 className="font-bold">Cola de Espera</h3>
                                <p>Pendientes: {miCola.elementos.length}</p>
                                <strong>Atender ahora:</strong>
                                
                                {miCola.elementos.length === 0 ? (
                                    <p className="text-gray-500 italic">No hay tareas pendientes.</p>
                                ) : (
                                    <ul class="grid grid-cols-20 gap-1 border border-gray-300 pl-2 py-2 rounded-md mb-2 font-bold shadow-sm">
                                        <p class="col-start-1 col-end-18">{miCola.elementos[0]}</p>
                                        <button className="col-start-19 col-end-20 bg-red-700 text-white rounded-md hover:bg-red-800 hover:scale-105 transition-transform duration-150 ease-in-out">x</button>
                                        <li className="col-start-1 col-end-18 text-gray-500 font-light mb-1">Descripcion del problema jeje</li>
                                        <button className="col-start-19 col-end-20 bg-blue-700 text-white rounded-md hover:bg-blue-800 hover:scale-105 transition-transform duration-150 ease-in-out" onClick={siguiente}>✓</button>
                                        
                                    </ul>
                                )}
                                
                            </section>

                            <section className="border border-gray-300 px-2 py-2 mr-2 rounded-md mb-2 font-bold shadow-sm"> 
                                <p className="font-bold">Siguientes en la cola:</p>
                                <ul>
                                    {miCola.elementos.length < 2 ? (
                                        <div className="flex flex-col items-center justify-center">  
                                            <img className="w-40 h-auto my-auto block" src="./src/assets/nadaPorAqui2.png" alt="Nada aqui" />
                                            <p className="text-gray-500 italic">No hay tareas pendientes.</p>
                                        </div>
                                    ) : (
                                        <>
                                            {miCola.elementos.length > 1 && (
                                                <ul>
                                                    {miCola.elementos.slice(1).map((item, i) => (
                                                        <ul className="flex flex-col border border-gray-300 px-3 py-2 rounded-md mb-2 bg-white shadow-sm hover:bg-gray-100">
                                                            <li key={i}>{item}</li>
                                                            <li className="text-gray-500 font-light">Descripcion del problema jeje</li>
                                                        </ul>
                                                    ))}
                                                </ul>
                                            )}
                                        </>
                                    )}
                                </ul>
                            </section>
                        </section>
                    </div>
                </div>
            )}

        </main>
        </>
    )
}