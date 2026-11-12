import { ColaMantenimiento } from '../clases/ColaMantenimiento';
import { useState, useEffect } from 'react';
import logo from '../assets/FixturnLOGO.png'; //logo

const miCola = new ColaMantenimiento();

export default function Panel({ setSesion }) {
    
    const [actualizar, setActualizar] = useState(0);
    const [texto, setTexto] = useState('');

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
            <div className="py-2 bg-[#004aad] flex"> {/*el "nav bar" segun*/}
                <div className="flex items-center mr-20">
                    <img className="ml-4 mt-2mb-2 bg-white size-10 block rounded-full" src={logo} alt="Logo FixTurn" /> {/* Logo */}
                    <h2 className="font-bold uppercase text-white p-2">FixTurn - Panel Principal</h2>   
                </div>    
                    
                <div className="flex items-center mx-auto">
                    <button className="ml-3 border border-white rounded-3xl bg-none py-0.5 px-2 text-white hover:bg-white hover:text-[#004aad] hover:scale-105 transition-transform duration-150 ease-in-out" onClick={borrarHistorial}>Inicio</button>
                    <button className="ml-3 border border-white rounded-3xl bg-none py-0.5 px-2 text-white hover:bg-white hover:text-[#004aad] hover:scale-105 transition-transform duration-150 ease-in-out" onClick={borrarHistorial}>Agregar</button>
                </div>
                <button className="ml-auto items-center border border-white rounded-3xl bg-none py-0.2 px-2 text-white hover:bg-white hover:text-[#004aad] hover:scale-105 transition-transform duration-150 ease-in-out" onClick={() => localStorage.setItem('sesion', false) || setSesion(false)}>Cerrar sesión </button>
            </div>

            {/*layout de la página*/}
            <div>
                <div className="flex-col space-y-4 ml-4 mt-2.5">
                    <div>
                        <span className="text-[50px] font-bold text-[#000000] flex space-x-3">
                            <p>Bienvenido de nuevo</p> <p className="uppercase font-thin text-[#004aad]">{localStorage.getItem('NoUsuario')}</p>
                        </span>
              
                        <span className="flex items-center mt-1 mb-2 space-x-2">
                            {miCola.elementos.length === 0 ? (
                                <p className="text-[#000000] font-light">No hay mantenimientos pendientes</p>
                            ) : (
                                <>
                                    <p className="font-light">Mantenimientos pendientes ahora mismo: </p>
                                    <p className="text-[#004aad]">{miCola.elementos.length}</p>
                                </>
                            )}
                        </span>
                    
                    </div>
                        
                        
                        <div> 
                            
                            <span className="flex items-center mt-1 mb-2 space-x-2">
                                <button className="border border-[#004aad] rounded-3xl bg-none py-0.5 px-2 text-[#004aad] hover:bg-[#004aad] hover:text-[white] hover:scale-105 transition-transform duration-150 ease-in-out" onClick={borrarHistorial}>Atender</button>
                                <button className="border border-[#004aad] rounded-3xl bg-none py-0.5 px-2 text-[#004aad] hover:bg-[#004aad] hover:text-[white] hover:scale-105 transition-transform duration-150 ease-in-out" onClick={borrarHistorial}>Historial</button>
                            </span>
                            

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
                        <div>
                            <strong>Atender ahora:</strong>
                            {miCola.elementos.length > 0 && (
                                <ul className="flex-col border border-gray-300 px-2 py-2 rounded-md mb-2 hover:bg-gray-100 mr-200 font-bold">
                                    <p> {miCola.elementos[0]}</p>
                                    <button className="bg-blue-700 text-white py-1 px-4 rounded-md hover:bg-blue-800 hover:scale-105 transition-transform duration-150 ease-in-out"onClick={siguiente}>Realizado</button>
                                </ul>
                            )}
                        </div>

                        <div> <p className="font-bold">Siguientes en la cola:</p>
                            <ul >
                                {miCola.elementos.slice(1).map((item, i) => (
                                <li className="border border-gray-300 px-2 py-2 rounded-md mb-2 hover:bg-gray-100 mr-200" key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>

                    
                    <hr />

                    <div>
                        <h3>Completados</h3>
                        <ul>
                            {miCola.completados.map((item, i) => (
                            <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <hr />
                    <div>
                        {miCola.completados.length > 0 && (
                            <button onClick={borrarHistorial}>Limpiar completados</button>
                        )}
                    </div>
        
                </div>
            </div>
        </>
        
    )
    
}