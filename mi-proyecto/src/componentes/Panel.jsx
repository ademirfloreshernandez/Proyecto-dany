import { ColaMantenimiento } from '../clases/ColaMantenimiento';
import { useState } from 'react';
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
        <div className="font-[Poppins]">
            <div> 
                <div className="items-center py-2 bg-[#004aad] flex"> {/*el "nav bar" segun*/}
                    <div><img className="ml-4 mt-2mb-2 bg-white size-10 block mx-auto rounded-full" src={logo} alt="Logo FixTurn" /></div> {/* Logo */}
                    <div><h2 className="font-bold uppercase text-white p-2 flex-none">FixTurn - Panel Principal</h2></div> 
                    <div><button className="ml-3 items-right border border-white rounded-3xl bg-none py-0.5 px-2 text-white hover:bg-white hover:text-[#004aad] hover:scale-105 transition-transform duration-150 ease-in-out" onClick={() => setSesion(false)}>Cerrar sesión</button></div>
                </div>
            </div>

            <hr />
            <div className="ml-4 mt-2.5">
                <div> 
                    <h3 className="font-bold">Servicios de mantenimiento a realizar</h3>
                    <form onSubmit={guardar}>
                        <input 
                        type="text" 
                        value={texto} 
                        onChange={(e) => setTexto(e.target.value)} 
                        placeholder="Escribe el reporte"
                        />
                        <button type="submit">Agregar</button>
                    </form>
                </div>

            <div>
                <h3 className="font-bold">Cola de Espera</h3>
                <p>Pendientes: {miCola.elementos.length}</p>
            
                {miCola.elementos.length > 0 && (
                    <div>
                        <p><strong>Atender ahora:</strong> {miCola.elementos[0]}</p>
                        <button onClick={siguiente}>Marcar como completado</button>
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
        </div></>
        
    )
    
}