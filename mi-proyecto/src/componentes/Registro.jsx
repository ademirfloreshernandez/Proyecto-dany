
import { useState } from 'react';
import logo from '../assets/FixturnLOGO.png';
import Panel from './Panel';

export default function Logeo({setRegistro}) {
  const [sesion, setSesion] = useState(() => {
    return localStorage.getItem('sesion') === 'true';
  });

  const [NoUsuario, setNoUsuario] = useState('');
  const [contraseña1, setContraseña1] = useState('');
  const [Contraseña, setContraseña] = useState('');
  const [Error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (NoUsuario.length < 3) {
      setError("Min3Car");
      return;
    }
    else if (contraseña1 !== Contraseña) {
      setError("NoCoinciden");
      return;
    }
    else if (contraseña1.length < 4) {
      setError("Min4Car");
      return;
    }
    else {
      setError(false);

      // ACTUALIZAR DATOS DEL USUARIO
      localStorage.setItem('NoUsuario', NoUsuario);
      localStorage.setItem('Contraseña', contraseña1);

      // Guardar estado de sesión
      localStorage.setItem('sesion', 'true');

      setSesion(true);
      setRegistro(false);
    }
  };

  return (
    <>
      <div className="mt-55 font-[Poppins] text-center mx-auto my-auto">
        <img className="size-20 block mx-auto" src={logo} alt="Logo FixTurn" />
        <h2 className="font-bold">FixTurn</h2>
        <p className="mb-2">Te damos la bienvenida, por favor registrese</p>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-3 w-85 mx-auto">

          <input
            className="border border-gray-400 px-2 py-1 rounded-md mb-2 hover:bg-gray-100"
            type="text"
            value={NoUsuario}
            onChange={(e) => setNoUsuario(e.target.value)}
            placeholder="Nombre de usuario"
          />

          <input
            className="border border-gray-400 px-2 py-1 rounded-md mb-2 hover:bg-gray-100"
            type="password"
            value={contraseña1}
            onChange={(e) => setContraseña1(e.target.value)}
            placeholder="Cree una contraseña"
          />

          <input
            className="border border-gray-400 px-2 py-1 rounded-md mb-2 hover:bg-gray-100"
            type="password"
            value={Contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            placeholder="Confirmar contraseña"
          />

          <button
            type="submit"
            className="mt-2 rounded-3xl bg-blue-700 py-1 px-4 text-white hover:bg-blue-800 hover:scale-105 transition-transform duration-150 ease-in-out"
          >
            Entrar
          </button>
        </form>

        {Error === "NoCoinciden" && <p className="text-red-500 mt-2">Las contraseñas no coinciden</p>}
        {Error === "Min4Car" && <p className="text-red-500 mt-2">La contraseña debe tener al menos 4 caracteres</p>}
        {Error === "Min3Car" && <p className="text-red-500 mt-2">El nombre de usuario debe tener al menos 3 caracteres</p>}

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-800 font-medium">¿Tienes una cuenta?</p>
          <span
            className="text-[#0052B4] font-bold cursor-pointer hover:underline hover:scale-105 transition-transform duration-100 ease-in-out mt-1 block"
            onClick={() => {
              setRegistro(false);
              setSesion(false);
            }}
          >
            Iniciar sesión
          </span>
        </div>
      </div>

      <div>
        <button
          className="ml-3 items-right border border-white rounded-3xl bg-none py-0.5 px-2 text-white hover:bg-white hover:text-[#004aad] hover:scale-105 transition-transform duration-150 ease-in-out"
          onClick={() => {
            localStorage.setItem('sesion', 'false');
            setSesion(false);
            setRegistro(false);
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </>
  );
}
