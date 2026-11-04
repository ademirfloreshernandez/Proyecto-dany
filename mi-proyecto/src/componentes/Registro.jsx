<meta name="viewport" content="width=device-width, initial-scale=1.0" />
import { useState } from 'react';
import logo from '../assets/FixturnLOGO.png';
import Panel from './Panel';

export function Logeo({setRegistro}) {
  const [sesion, setSesion] = useState(() => {
    return localStorage.getItem('sesion') === 'true'; // Función hecha con apoyo de IA, mantiene la sesión aunque se cierre o recargue la página.
  });

  //intentando hacer sistema de login - md85wzta con tutorial de yt
  const[NoUsuario, setNoUsuario] = useState('');
  const[contraseña1, setContraseña1] = useState('');
  const[Contraseña, setContraseña] = useState('');
  const[Error, setError] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Contraseña === '' && contraseña1 === '') {
      setError(true);
      return;
    } else {
      setError(false);
      setSesion(true);
      localStorage.setItem('sesion', 'true'); // Guardar el estado de la sesión en localStorage
      localStorage.setItem('NoUsuario', NoUsuario); // Guardar el nombre de usuario en localStorage
    }
  }

  if (sesion === false && registro === false) {
    return (
      <>
      <div className="mt-55 font-[Poppins] text-center mx-auto my-auto">
        <img className="size-20 block mx-auto" src={logo} alt="Logo FixTurn" />
        <h2 className="font-bold">FixTurn</h2>
        <p className="mb-2">Te damos la bienvenida, por favor registrese</p>
    
        <form className="flex flex-col space-y-3 w-85 mx-auto">
          
          <input className="border border-gray-400 px-2 py-1 rounded-md mb-2 hover:bg-gray-100"
              type="text"
              value={NoUsuario}
              onChange={(e) => setNoUsuario(e.target.value)}
              placeholder="Nombre de usuario"                    
            />
            
            <input className="border border-gray-400 px-2 py-1 rounded-md mb-2 hover:bg-gray-100"
              type="text"
              value={contraseña1}
              onChange={(e) => setContraseña1(e.target.value)}
                placeholder="Cree una contraseña"
            />

        
          <input
             className="border border-gray-400 px-2 py-1 rounded-md mb-2 hover:bg-gray-100"
             type="text"
             value={Contraseña}
             onChange={(e) => setContraseña(e.target.value)}
             placeholder="Confirmar contraseña"
            />

            <button onClick={handleSubmit} className="mt-2 rounded-3xl bg-blue-700 py-1 px-4 text-white hover:bg-blue-800 hover:scale-105 transition-transform duration-150 ease-in-out">Entrar</button>
        </form>
        {Error && <p className="text-red-500 mt-2">las contraseñas no coinciden</p>}

            {/* Texto inferior de login */}
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-800 font-medium">¿Tienes una cuenta?</p>
            <span className="text-[#0052B4] font-bold cursor-pointer hover:underline hover:scale-105 transition-transform duration-100 ease-in-out mt-1 block" onClick={() => setRegistro(false) && setSesion(false)}>Iniciar sesión</span>
          </div>
      </div>
      </>
    );
  } else if (sesion === true) {
    return (
    <Panel setSesion={setSesion} />
    )
  }
}