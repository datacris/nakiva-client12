import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { gql, useQuery } from "@apollo/client";
import Loading from "../Loading";
import PedidoContext from "../../context/PedidoContext";

const OBTENER_PRODUCTOS = gql`
  query obtenerProductos {
    obtenerProductos {
      id
      nombre
      existencia
      precio
      creado
    }
  }
`;

const AsignarProductos = () => {
  const [productos, setProductos] = useState([]);

  const pedidoContext = useContext(PedidoContext);
  const { agregarProducto } = pedidoContext;

  const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);

  useEffect(() => {
    agregarProducto(productos);
  }, [productos]);

  const seleccionarProducto = (producto) => setProductos(producto);

  if (loading) return <Loading />;

  const { obtenerProductos } = data;

  return (
    <div>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        2. Asigna productos al pedido
      </p>
      <Select
        className="mt-3"
        options={obtenerProductos}
        isMulti={true}
        onChange={(opcion) => seleccionarProducto(opcion)}
        getOptionValue={(opciones) => opciones.id}
        getOptionLabel={(opciones) =>
          `${opciones.nombre} - ${opciones.existencia} disponibles`
        }
        placeholder="Busque o Seleccione los productos"
        noOptionsMessage={() => "No hay resultados"}
      />
    </div>
  );
};

export default AsignarProductos;
