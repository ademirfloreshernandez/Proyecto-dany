import { ColaMantenimiento } from '../clases/ColaMantenimiento';
import { useState, useEffect } from 'react';
import logo from '../assets/FixturnLOGO.png'; //logo
import { Historial } from './Historial';

const miCola = new ColaMantenimiento();

export default function Panel({ setSesion }) {
    
    const [actualizar, setActualizar] = useState(0);
    const [texto, setTexto] = useState('');
    const [descripcion, setDesctripcion] = useState('');
    const [Ubicacion, setUbicacion]=useState('');
    const [vistaHistorial, setVistaHistorial] = useState(false);

    const[Error, setError] = useState(false);

    //esta parte sive para que ya la cola se quede guardada, este pedacito de useEffect es el complicadito

    useEffect(() => {
        const elementosGuardados = JSON.parse(localStorage.getItem('cola') || '[]'); //obtiene el item de cola desde memoria o el arreglo vacio
        const completadosGuardados = JSON.parse(localStorage.getItem('completados') || '[]'); //lo mismo, esto es para los arreglos de por hacer y completados
        miCola.elementos = Array.isArray(elementosGuardados) ? elementosGuardados : [];       //ternarios para que si detecte si son arrays
        miCola.completados = Array.isArray(completadosGuardados) ? completadosGuardados : []; //sinceramente no se muy bien que hace aun pero esto regresa arreglos vacios
        setActualizar((valor) => valor + 1); //solo para actualizar el state usando de parametro valor y solo suma 1. es como el setActualizar + 1, nd del otro mundo
    }, []);

    function persistirDatos() { //esta funcion solo guarda localmente los arreglos hechos en el js de clases
        localStorage.setItem('cola', JSON.stringify(miCola.elementos));
        localStorage.setItem('completados', JSON.stringify(miCola.completados));
    }

    function guardar(e) {
        e.preventDefault();
        if (texto === '' || descripcion === '' || Ubicacion === '') {
            setError("Vacios");
            return;
        } else if (!['a', 'b', 'c', 'd', 'admin', 'biblioteca'].includes(Ubicacion.toLowerCase())) {
            setError("OpcionNoDisp")
            return;
        } else {
        miCola.agregar({
            nombre: texto,
            desc: descripcion,
            ubic: Ubicacion
        });
        persistirDatos(); //solo llamamos esta funcion en cada linea para que siempre se guarden
        setTexto('');
        setDesctripcion('')
        setUbicacion('')
        setError(null)
        setActualizar(actualizar + 1);
        }}

    function siguiente() {
        miCola.atender();
        persistirDatos(); //aqui igual
        setActualizar(actualizar + 1);
    }

    function eliminar(){
        miCola.quitar();
        persistirDatos(); //aqui tmb
        setActualizar(actualizar+1)
    }

    function borrarHistorial() {
        miCola.limpiar();
        persistirDatos(); //y aqui, unicamente llama para decir "aca igual guarda eh"
        setActualizar(actualizar + 1);
    }

    return (
        <>
        <main className="w-full h-screen bg-[#ffffff] static top-0"> 
            {/* 1. La barra de navegación superior se queda fija */}
            <header className="bg-[#004aad] text-white h-16"> 
                <nav className="flex justify-between items-center px-4 h-full">
                    <div className="flex items-center">
                        <img className="ml-4 mt-2 mb-2 bg-white size-10 rounded-full" src={logo} alt="Logo FixTurn" />
                        <h2 className="font-bold uppercase text-white m-4">FixTurn - Panel Principal</h2>
                    </div>
                    
                    {/* Botón de Historial en el Navbar */}
                    <div className="flex items-center space-x-2">
                        <button 
                            onClick={() => setVistaHistorial(!vistaHistorial)}
                            className="m-4 border border-white rounded-3xl bg-none py-0.5 px-2 text-white hover:bg-white hover:text-[#004aad] hover:scale-105 transition-transform duration-150 ease-in-out"
                        >
                            Historial de servicios
                        </button>
                        <button className="m-4 border border-white rounded-3xl bg-none py-0.5 px-2 text-white hover:bg-white hover:text-[#004aad] hover:scale-105 transition-transform duration-150 ease-in-out" onClick={() => localStorage.setItem('sesion', false) || setSesion(false)}>Cerrar sesión</button>
                    </div>
                </nav>
            </header>

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

                        <section className="grid grid-cols-2 rows-2 gap-4 border border-gray-300 py-2 h-[500px]">
                            
                            {/* Formulario de nuevas tareas */}
                        <section class="col-start-2 row-start-1 row-end-2"> 
                            <h1 className="font-bold">AGREGAR TAREA</h1>

                            <form className="flex flex-col" onSubmit={guardar}>
                                <input 
                                className="border border-gray-400 px-2 py-1 rounded-md mb-2 hover:bg-gray-100 mr-3 col-start-1 col-end-2"
                                type="text" z
                                value={texto} 
                                onChange={(e) => setTexto(e.target.value)} 
                                placeholder="Escribe el reporte"
                                />

                                <input 
                                className="border border-gray-400 px-2 py-1 rounded-md mb-2 hover:bg-gray-100 mr-3"
                                type="text" 
                                value={descripcion} 
                                onChange={(e) => setDesctripcion(e.target.value)} 
                                placeholder="Añade una descripcion"
                                />

                                 <input 
                                className="border border-gray-400 px-2 py-1 rounded-md mb-2 hover:bg-gray-100 mr-3"
                                type="option" 
                                value={Ubicacion} 
                                onChange={(e) => setUbicacion(e.target.value)} 
                                placeholder="Ubicacion (A, B, C, D, Biblioteca, Admin)"
                                />

                                <button type="submit" className="mr-3 bg-blue-700 text-white py-1 px-4 rounded-md hover:bg-blue-800 hover:scale-101 transition-transform duration-150 ease-in-out">
                                    +
                                </button>
                                {Error==="Vacios" && <p className="text-red-300 mt-1">No pueden haber campos vacíos</p>}
                                {Error==="OpcionNoDisp" && <p className="text-red-300 mt-1">Solo puedes escribir las ubicaciones mostradas!</p>}
                            </form>
                            
                        </section>
                            
                            {/* Cola de espera y pendientes */}
                            <section className="ml-2 flex-col mr-2 grid-span-3 ...">
                                <h3 className="font-bold">Cola de Espera</h3>
                                <p>Pendientes: {miCola.elementos.length}</p>
                                <strong>Atender ahora:</strong>
                                
                                {miCola.elementos.length === 0 ? (
                                    <p className="text-gray-500 italic">No hay tareas pendientes.</p>
                                ) : (
                                    <ul className="grid grid-cols-20 gap-1 border border-gray-300 pl-2 py-2 rounded-md mb-2 shadow-sm">
                                        <div className="col-start-1 grid-col-2 gap-2 col-end-18 flex flex-none">
                                            <p className="font-bold max-w-[250px] overflow-x-auto pr-1"> {miCola.elementos[0].nombre}</p>
                                            <p className="font-light text-blue-700">Edificio: {miCola.elementos[0].ubic}</p>
                                        </div>
                                        <button className="col-start-19 col-end-20 bg-red-700 text-white rounded-md hover:bg-red-800 hover:scale-105 transition-transform duration-150 ease-in-out" onClick={eliminar}>x</button>
                                        <li className="col-start-1 col-end-18 text-gray-500 font-light mb-1">{miCola.elementos[0].desc}</li>
                                        <button className="col-start-19 col-end-20 bg-[#7BD260] text-white rounded-md hover:bg-[#46A12B] hover:scale-105 transition-transform duration-150 ease-in-out" onClick={siguiente}>✓</button>
                                    </ul>
                                )}
                                
                            </section>

                            <section className="row-start-2 border border-gray-300 px-2 py-2 mr-2 rounded-md mb-2 shadow-sm max-h-[300px] overflow-y-auto pr-2"> 
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
                                                        <ul key={i} className="border border-gray-300 px-3 py-2 rounded-md mb-2 bg-white shadow-sm hover:bg-gray-100">
                                                            <div className="flex gap-2">
                                                                <li className="font-bold">{item.nombre}</li>
                                                                <p className="font-light text-[#004aad]">Edificio: {miCola.elementos[0].ubic}</p>
                                                            </div>  
                                                            <li className="text-gray-500 font-light">{item.desc}</li>
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