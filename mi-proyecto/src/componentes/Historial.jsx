export function Historial({ completados, onLimpiar, onVolver }) {
    return(
    <div className="p-4">
        {/* Botón para regresar al panel principal */}
        <div className="mb-4">
            
            <div className="text-[50px] font-bold text-[#000000] flex space-x-3">
                <p>Bienvenido de nuevo</p> 
                <p className="uppercase font-thin text-[#004aad]">{localStorage.getItem('NoUsuario')}</p>
            </div>
            
             <button onClick={onVolver} className="bg-blue-100 text-blue-700 font-semibold py-2 px-4 rounded-xl hover:bg-blue-200 transition-colors">
                     Volver a Tareas
                </button>
            </div>

            <h1 className="font-bold text-gray-800">
               Historial de tareas   
            </h1>

            {/* Para el listado de tareas completadas */}
            <div className="mt-4">
                {completados.length === 0 ? (
                    <p className="text-gray-500 italic">Nada por aquí, termina algunas tareas.</p>
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

            {/* Botón para limpiar el historial */}
            {completados.length > 0 && (
                <div className="mt-4">
                    <button 
                        onClick={onLimpiar}
                        className="bg-red-100 text-red-700 font-semibold py-1.5 px-4 rounded-xl hover:bg-red-200 transition-colors hover:scale-105 transition-transform duration-150 ease-in-out"
                    >
                        Limpiar completados
                    </button>
                </div>
            )}
        </div>
    );
}