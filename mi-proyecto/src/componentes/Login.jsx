
import { useState } from 'react';
import logo from '../assets/FixturnLOGO.png';
import Panel from './Panel';
import Registro from './Registro';

export function Logeo() {
  const [sesion, setSesion] = useState(() => {
    return localStorage.getItem('sesion') === 'true';
  });

  const [NoUsuario, setNoUsuario] = useState('');
  const [Contraseña, setContraseña] = useState('');
  const [Error, setError] = useState(false);
  const [registro, setRegistro] = useState(false);
  const [mostrarContraseña, setMostrarContraseña] = useState(false);

  
const handleSubmit = (e) => {
  e.preventDefault();

  if (NoUsuario.trim() === '' || Contraseña.trim() === '') {
    setError("CamposVacios");
    return;
  } else if (NoUsuario.trim().length < 3) {
    setError("Min3Cara");
    return;
  } else if (Contraseña.length < 4) {
    setError("Min4Car");
    return;
  }

  // Obtener los datos guardados durante el registro
  const usuarioGuardado = localStorage.getItem('NoUsuario');
  const contraseñaGuardada = localStorage.getItem('Contraseña');

  // Comparar los datos ingresados con los registrados
  if (
    NoUsuario.trim() !== usuarioGuardado ||
    Contraseña !== contraseñaGuardada ||
    usuarioGuardado === null ||
    contraseñaGuardada === null
  ) {
    setError("CredencialesIncorrectas");
    return;
  }

  // Iniciar sesión
  setError(false);
  setSesion(true);
  setRegistro(false);

  localStorage.setItem('sesion', 'true');
};

  if (sesion === false && registro === false) {
    return (
      <>
        <div className="mt-55 font-[Poppins] text-center mx-auto my-auto">
          <img
            className="size-20 block mx-auto"
            src={logo}
            alt="Logo FixTurn"
          />

          <h2 className="font-bold">FixTurn</h2>
          <p className="mb-2">Bienvenido de nuevo</p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-3 w-85 mx-auto"
          >
            <input
              className="border border-gray-400 px-2 py-1 rounded-md mb-2 hover:bg-gray-100"
              type="text"
              value={NoUsuario}
              onChange={(e) => setNoUsuario(e.target.value)}
              placeholder="Nombre de usuario"
            />

            <div className="flex items-center gap-2">
              <input
                className="border border-gray-400 px-2 py-1 rounded-md mb-2 hover:bg-gray-100 flex-1 min-w-0"
                type={mostrarContraseña ? "text" : "password"}
                value={Contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                placeholder="Contraseña"
              />

              <button
                type="button"
                onClick={() => setMostrarContraseña(!mostrarContraseña)}
                className="text-blue-700 text-sm hover:underline"
              >
                {mostrarContraseña ? "Ocultar" : "Mostrar"}
              </button>
            </div>

            <button
              type="submit"
              className="mt-2 rounded-3xl bg-blue-700 py-1 px-4 text-white hover:bg-blue-800 hover:scale-105 transition-transform duration-150 ease-in-out"
            >
              Entrar
            </button>
          </form>

          {Error === "CamposVacios" && (
            <p className="text-red-500 mt-2">
              No pueden haber campos vacíos
            </p>
          )}

          {Error === "Min4Car" && (
            <p className="text-red-500 mt-2">
              La contraseña debe tener al menos 4 caracteres
            </p>
          )}

          {Error === "Min3Cara" && (
            <p className="text-red-500 mt-2">
              El nombre de usuario debe tener al menos 3 caracteres
            </p>
          )}

          {Error === "CredencialesIncorrectas" && (
            <p className="text-red-500 mt-2">
              Usuario o contraseña incorrectos
            </p>
          )}

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-800 font-medium">
              ¿Nuevo por aquí?
            </p>

            <span
              className="text-[#0052B4] font-bold cursor-pointer hover:underline hover:scale-105 transition-transform duration-100 ease-in-out mt-1 block"
              onClick={() => setRegistro(true)}
            >
              Registro
            </span>
          </div>
        </div>
      </>
    );
  } else if (sesion === true) {
    return <Panel setSesion={setSesion} />;
  }

  if (registro === true) {
    return <Registro setRegistro={setRegistro} />;
  }
}
