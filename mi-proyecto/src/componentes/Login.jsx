<meta name="viewport" content="width=device-width, initial-scale=1.0" />
import { useState } from 'react';
import logo from '../assets/FixturnLOGO.png';
import Panel from './Panel';
//no destruir si no registro explota
import Registro from './Registro';

export function Logeo() {
  const [sesion, setSesion] = useState(() => {
    return localStorage.getItem('sesion') === 'true'; // Función hecha con apoyo de IA, mantiene la sesión aunque se cierre o recargue la página.
  });

 
  //intentando hacer sistema de login - md85wzta con tutorial de yt
  const[NoUsuario, setNoUsuario] = useState('');
  const[Contraseña, setContraseña] = useState('');
  const[Error, setError] = useState(false);

  const[registro, setRegistro] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (NoUsuario === '' || Contraseña === '') {
      setError(true);
      return;
    } else {
      setError(false);
      setSesion(true);
      setRegistro(false);
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
        <p className="mb-2">Bienvenido de nuevo</p>
    
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
              <button onClick={handleSubmit} className="mt-2 rounded-3xl bg-blue-700 py-1 px-4 text-white hover:bg-blue-800 hover:scale-105 transition-transform duration-150 ease-in-out">Entrar</button>
        </form>
        {Error && <p className="text-red-500 mt-2">Por favor, ingresa un nombre de usuario y una contraseña.</p>}

            {/* Texto inferior de registro */}
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-800 font-medium">¿Nuevo por aquí?</p>
            <span className="text-[#0052B4] font-bold cursor-pointer hover:underline hover:scale-105 transition-transform duration-100 ease-in-out mt-1 block" onClick={() => setRegistro(true)}>Registro</span>
          </div>
      </div>
      </>
    );
  } else if (sesion === true) {
    return (
    <Panel setSesion={setSesion} />
    )
  }
//no destruir si no registro explota
   if (registro === true) {
  return <Registro setRegistro={setRegistro} />;
}
}
