import React from "react";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import Link from "next/link";
import Pedido from "../components/pedidos/Pedido";
import { gql, useQuery } from "@apollo/client";

const OBTENER_PEDIDOS = gql`
  query obtenerPedidosVendedor {
    obtenerPedidosVendedor {
      id
      pedido {
        id
        cantidad
        nombre
      }
      cliente {
        id
        nombre 
        apellido
        email
        telefono
      }
      vendedor
      total
      estado
    }
  }
`;
const Pedidos = () => {
  const { data, loading, error } = useQuery(OBTENER_PEDIDOS);

  if (loading) return <Loading />;

  const { obtenerPedidosVendedor } = data;

  return (
    <>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Pedidos</h1>
        <Link href="/nuevopedido">
          <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-grat-800 mb-3 uppercase font-bold">
            Nuevo Pedido
          </a>
        </Link>
        {obtenerPedidosVendedor.length === 0 ? (
          <p className="mt-5 text-center text-2xl">No hay pedidos</p>
        ) : (
          obtenerPedidosVendedor.map((pedido) => (
            <Pedido key={pedido.id} pedido={pedido} />
          ))
        )}
      </Layout>
    </>
  );
};

export default Pedidos;
