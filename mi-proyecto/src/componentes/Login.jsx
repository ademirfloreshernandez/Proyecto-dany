<meta name="viewport" content="width=device-width, initial-scale=1.0" />
import { useState } from 'react';
import logo from '../assets/FixturnLOGO.png';
import Panel from './Panel';

export function PageFixTurn() {
  const [sesion, setSesion] = useState(() => { 
    return localStorage.getItem('sesion') === 'true'; // Función hecha con apoyo de IA, mantiene la sesión aunque se cierre o recargue la página.
  });

  if (sesion === false) {
    return (
      <div className="mt-55 font-[Poppins] text-center">
        <img className="size-20 block mx-auto" src={logo} alt="Logo FixTurn" />
        <h2 className="font-bold">FixTurn</h2>
        <p>Login de Jefe</p>
        <button onClick={() => setSesion(true)} className="mt-2 rounded-3xl bg-blue-700 py-1 px-4 text-white hover:bg-blue-800 hover:scale-105 transition-transform duration-150 ease-in-out">Entrar</button>
      </div>
    );
  } else if (sesion === true) {
    return (
    <Panel setSesion={setSesion} />
    )
  }
}

//hola