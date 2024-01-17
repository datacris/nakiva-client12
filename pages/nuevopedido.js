import React, { useContext, useState } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import AsignarCliente from "../components/pedidos/AsignarCliente";
import AsignarProductos from "../components/pedidos/AsignarProductos";
import ResumenPedido from "../components/pedidos/ResumenPedido";
import PedidoContext from "../context/PedidoContext";
import Total from "../components/pedidos/Total";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const NUEVO_PEDIDO = gql`
  mutation nuevoPedido($input: PedidoInput) {
    nuevoPedido(input: $input) {
      id
    }
  }
`;
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

const NuevoPedido = () => {
  const router = useRouter();
  const [mensaje, setMensaje] = useState(null);
  const pedidoContext = useContext(PedidoContext);
  const { cliente, productos, total } = pedidoContext;

  const [nuevoPedido] = useMutation(NUEVO_PEDIDO, {
    update(cache, {data: {nuevoPedido}}){
      const {obtenerPedidosVendedor} = cache.readQuery({
        query: OBTENER_PEDIDOS
      });
      cache.writeQuery({
        query: OBTENER_PEDIDOS,
        data: {
          obtenerPedidosVendedor: [...obtenerPedidosVendedor, nuevoPedido]
        }
      })
    }
  });

  const validarPedido = () => {
    return !productos.every((producto) => producto.cantidad > 0) ||
      total === 0 ||
      cliente.length === 0
      ? "opacity-50 cursor-not-allowed"
      : "";
  };

  const crearNuevoPedido = async () => {
    const { id } = cliente;
    // depurando productos segun base de datos
    // remover lo no deseado
    const productosPedido = productos.map(
      ({ __typename, existencia, creado, ...producto }) => producto
    );
    console.log(productosPedido);
    try {
      const obj={
        variables: {
          input: {
            cliente: id,
            total,
            pedido: productosPedido,
          },
        },
      }
      console.log(obj)
      const data = await nuevoPedido({
        variables: {
          input: {
            cliente: id,
            total,
            pedido: productosPedido,
          },
        },
      });
      router.push("/pedidos");
      Swal.fire("Corecto", "El pedido se registro correctamente", "success");
    } catch (error) {
      console.log(error);
      setMensaje(error.message.replace("GraphQL error ", ""));
      setTimeout(() => {
        setMensaje(null);
      }, 3000);
    }
  };

  const mostrarMensaje = () => {
    return (
      <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
        <p>{mensaje}</p>
      </div>
    );
  };

  return (
    <Layout>
      <h1 className="flex text-2xl text-gray-800 font-light">
        <Link href="/pedidos">
          <a className="text-gray-700 text-2xl font-light mb-2 mr-2 ">
            {`Pedidos / `}{" "}
          </a>
        </Link>
        Crear Nuevo Pedido
      </h1>
      {mensaje && mostrarMensaje()}
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <AsignarCliente />
          <AsignarProductos />
          <ResumenPedido />
          <Total />
          <button
            type="button"
            className={` bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bole hover:bg-gray-900 ${validarPedido()}`}
            onClick={crearNuevoPedido}
          >
            Registrar Pedido
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default NuevoPedido;
