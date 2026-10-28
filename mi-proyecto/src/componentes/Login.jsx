<meta name="viewport" content="width=device-width, initial-scale=1.0" />
import { useState } from 'react';
import logo from '../assets/FixturnLOGO.png';
import Panel from './Panel';

export function PageFixTurn() {
  const [sesion, setSesion] = useState(() => { 
    return localStorage.getItem('sesion') === 'true'; // Función hecha con apoyo de IA, mantiene la sesión aunque se cierre o recargue la página.
  });

  //intentando hacer sistema de login - md85wzta con tutorial de yt
  const[NoUsuario, setNoUsuario] = useState('');
  const[Contraseña, setContraseña] = useState('');

  function guardar(e) {
        e.preventDefault();
        if (NoUsuario === ''){alert('Por favor, ingrese su nombre de usuario');} return;
        if (Contraseña === ''){alert('Por favor, ingrese su contraseña');} return;
    }

  if (sesion === false) {
    return (
      <div className="mt-55 font-[Poppins] text-center mx-auto my-auto">
        <img className="size-20 block mx-auto" src={logo} alt="Logo FixTurn" />
        <h2 className="font-bold">FixTurn</h2>
        <p className="mb-2">Bienvenido de nuevo</p>
        
        {/* Formulario de inicio de sesión */}
        <form className="flex flex-col space-y-3 w-85 mx-auto">
          <input className="border border-gray-400 px-2 py-1 rounded-md mb-2 hover:bg-gray-100"
              type="text" 
              value={NoUsuario} 
              onChange={(e) => setNoUsuario(e.target.value)} 
              placeholder="Nombre de usuario"
            />
          <input 
             className="border border-gray-400 px-2 py-1 rounded-md mb-2 hover:bg-gray-100"
             type="text" 
             value={Contraseña} 
             onChange={(e) => setContraseña(e.target.value)} 
             placeholder="Contraseña"
            />
              <button onClick={() => setSesion(true)} className="mt-2 rounded-3xl bg-blue-700 py-1 px-4 text-white hover:bg-blue-800 hover:scale-105 transition-transform duration-150 ease-in-out">Entrar</button>
        </form>
      </div>
    );
  } else if (sesion === true) {
    return (
    <Panel setSesion={setSesion} />
    )
  }
}