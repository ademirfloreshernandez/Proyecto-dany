import { ColaMantenimiento } from '../clases/ColaMantenimiento';
import { useState, useEffect } from 'react';
import logo from '../assets/FixturnLOGO.png'; //logo

const miCola = new ColaMantenimiento();

function Saludo() {
  // Se calcula la hora justo al cargar el componente
  const [saludo] = useState(() => {
    const hora = new Date().getHours();
    if (hora >= 6 && hora < 12) {
      return 'Buenos días';
    } else if (hora >= 12 && hora < 20) {
      return 'Buenas tardes';
    } else {
      return 'Buenas noches';
    }
  })};

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
        <div> {/*solo para que todo el archivo tenga la fuente Poppins*/}
            <div> 
                <div className="items-center py-2 bg-[#004aad] flex"> {/*el "nav bar" segun*/}
                    <div><img className="ml-4 mt-2mb-2 bg-white size-10 block mx-auto rounded-full" src={logo} alt="Logo FixTurn" /></div> {/* Logo */}
                    <div><h2 className="font-bold uppercase text-white p-2 flex-none">FixTurn - Panel Principal</h2></div> 
                    <div><button className="ml-3 items-right border border-white rounded-3xl bg-none py-0.5 px-2 text-white hover:bg-white hover:text-[#004aad] hover:scale-105 transition-transform duration-150 ease-in-out" onClick={() => localStorage.setItem('sesion', false) || setSesion(false)}>Cerrar sesión</button></div>
                </div>
            </div>

            {/*layout de la página*/}
            <div>
                <div className="flex-col space-y-4 ml-4 mt-2.5">
                    <div className="text-[50px] font-bold text-[#000000] flex space-x-3"><p>Bienvenido de nuevo</p> <p className="uppercase font-thin text-[#004aad]">{localStorage.getItem('NoUsuario')}</p></div>
                        <div>
                            <h3 className="font-bold">Cola de Espera</h3>
                            <p>Pendientes: {miCola.elementos.length}</p>
                        
                            {miCola.elementos.length > 0 && (
                                <div className="border border-gray-300 px-2 py-2 rounded-md mb-2 hover:bg-gray-100">
                                    <p><strong>Atender ahora:</strong> {miCola.elementos[0]}</p>
                                    <button className="bg-blue-700 text-white py-1 px-4 rounded-md hover:bg-blue-800 hover:scale-105 transition-transform duration-150 ease-in-out"onClick={siguiente}>Realizado</button>
                                </div>
                            )}
                        </div>

                        <div>
                            <ul>
                                {miCola.elementos.slice(1).map((item, i) => (
                                <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div> 
                            <h3 className="font-bold">Servicios de mantenimiento a realizar</h3>

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
        </div>
        </>
        
    )
    
}