import React, { useEffect, useState, useContext } from "react";
import Select from "react-select";
import { gql, useQuery } from "@apollo/client";
import PedidoContext from "../../context/PedidoContext";
import Loading from "../Loading";

const OBTENER_CLIENTES_USUARIO = gql`
  query obtenerClientesVendedor {
    obtenerClientesVendedor {
      id
      nombre
      apellido
      empresa
      email
    }
  }
`;

const AsignarCliente = () => {
  const [cliente, setCliente] = useState([]);

  const pedidoContext = useContext(PedidoContext);
  const { agregarCliente } = pedidoContext;

  const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);

  useEffect(() => {
    agregarCliente(cliente);
  }, [cliente]);

  const seleccionarCliente = (clientes) => setCliente(clientes);

  if (loading) return <Loading />;

  const { obtenerClientesVendedor } = data;

  return (
    <div>
      <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">
        1. Asigna un cliente al pedido
      </p>
      <Select
        className="mt-3"
        options={obtenerClientesVendedor}
        onChange={(opcion) => seleccionarCliente(opcion)}
        getOptionValue={(clientes) => clientes.id}
        getOptionLabel={(clientes) => clientes.nombre}
        placeholder="Busque o Seleccione el cliente"
        noOptionsMessage={() => "No hay resultados"}
      />
    </div>
  );
};

export default AsignarCliente;
