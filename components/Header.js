import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

const OBTENER_USUARIO = gql`
  query obtenerUsuario {
    obtenerUsuario {
      id
      nombre
      apellido
    }
  }
`;

const Header = () => {
  const router = useRouter();
  // Query apollo
  const { data, loading, client } = useQuery(OBTENER_USUARIO);
  // retrorno tempranos si aun no hay respuesta de la consulta

  useEffect(() => {
    if (!loading && !data?.obtenerUsuario) {
      router.push("/login");
    }
  }, [loading, data, router]);

  if (loading) return null;

  const { nombre, apellido } = data?.obtenerUsuario || {};
  
  const cerrarSesion = () => {
    localStorage.removeItem("token");
    client.clearStore();
    router.push("/login");
  };

  return (
    <div className="flex justify-between mb-6">
      <p>
        Hola: {nombre} {apellido}
      </p>
      <button
        className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow-md"
        type="button"
        onClick={() => cerrarSesion()}
      >
        Cerrar Sesion
      </button>
    </div>
  );
};

export default Header;
