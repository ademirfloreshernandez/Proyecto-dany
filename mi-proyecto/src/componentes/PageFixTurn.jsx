import { useState } from 'react';
import { ColaMantenimiento } from '../clases/ColaMantenimiento';
import logo from '../assets/FixturnLOGO.png';
const miCola = new ColaMantenimiento();

export function PageFixTurn() {
  const [actualizar, setActualizar] = useState(0);
  const [texto, setTexto] = useState('');
  const [sesion, setSesion] = useState(false);

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

  if (sesion === false) {
    return (
      <div className="font-[Poppins] text-center">
        <img className="size-20 block mx-auto" src={logo} alt="Logo FixTurn" />
        <h2 className="font-bold">FixTurn</h2>
        <p>Login de Jefe</p>
        <button className="rounded-3xl bg-blue-700 py-1 px-4 text-white hover:bg-blue-800 hover:scale-105 transition-transform duration-150 ease-in-out" onClick={() => setSesion(true)}>Entrar</button>
      </div>
    );
  }

  return (
    <div className="font-[Poppins]">
      <h2>FixTurn - Panel del Jefe</h2>
      <button className="rounded-3xl bg-red-500 py-1 px-4 text-white hover:bg-red-600 hover:scale-105 transition-transform duration-150 ease-in-out" onClick={() => setSesion(false)}>Cerrar sesión</button>

      <hr />

      <h3>Nueva Solicitud</h3>
      <form onSubmit={guardar}>
        <input 
          type="text" 
          value={texto} 
          onChange={(e) => setTexto(e.target.value)} 
          placeholder="Escribe el reporte"
        />
        <button type="submit">Agregar</button>
      </form>

      <h3>Cola de Espera</h3>
      <p>Pendientes: {miCola.elementos.length}</p>
      
      {miCola.elementos.length > 0 && (
        <div>
          <p><strong>Atender ahora:</strong> {miCola.elementos[0]}</p>
          <button onClick={siguiente}>Marcar como completado</button>
        </div>
      )}

      <ul>
        {miCola.elementos.slice(1).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <hr />

      <h3>Completados</h3>
      <ul>
        {miCola.completados.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      {miCola.completados.length > 0 && (
        <button onClick={borrarHistorial}>Limpiar completados</button>
      )}
    </div>
  );
}

//hola