export function Historial({ completados, onLimpiar, onVolver }) {

    function confirmar(){
        confirm("¿Estás seguro de que deseas limpiar el historial?") && onLimpiar();
    }
    return(
    <main className="p-4">
        {/* Botón para regresar al panel principal */}
        <>
            
            <div className="text-[50px] font-bold text-[#000000] flex space-x-3">
                <p>Bienvenido de nuevo</p> 
                <p className="uppercase font-thin text-[#004aad]">{localStorage.getItem('NoUsuario')}</p>
            </div>
            
             <button onClick={onVolver} className="bg-blue-100 text-blue-700 font-semibold py-2 px-4 rounded-xl hover:bg-blue-200 transition-colors">
                     Volver a servicios
                </button>


            <h1 className="text-center font-bold text-gray-800">
               Historial de tareas   
            </h1>

            {/* Botón para limpiar el historial */}
            {completados.length > 0 && (
                <div className="mt-4">
                    <button 
                        onClick={confirmar}
                        className="bg-red-100 text-red-700 font-semibold py-1.5 px-4 rounded-xl hover:bg-red-200 transition-colors hover:scale-105 transition-transform duration-150 ease-in-out"
                    >
                        Limpiar completados
                    </button>
                </div>
            )}

            {/* Para el listado de tareas completadas */}
            <div className="mt-4">
                {completados.length === 0 ? (
                    <>
                    <img className="mt-10 w-100 h-auto mx-auto my-auto block" src="./src/assets/nadaPorAqui.png" alt="Nada aqui" />
                    <div className="text-center block text-gray-500 italic">Nada por aquí, termina algunas tareas</div>
                    <button onClick={onVolver} className="mx-auto block text-gray-500 hover:text-[#004aad] font-semibold hover:underline mt-4 hover:scale-1.10 transition-transform duration-150 ease-in-out">
                     Volver a servicios
                    </button>
                    </>
                ) : (
                    <ul>
                        {completados.map((item, i) => (
                            <li className="flex felx-col border border-gray-300 px-3 py-2 rounded-md mb-2 bg-white shadow-sm" key={i}>
                                {item}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    </main>
    );
}