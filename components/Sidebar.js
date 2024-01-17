import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  const classCliente =
    ["/", "/nuevocliente"].includes(router.pathname) ||
    router.pathname.startsWith("/editarcliente")
      ? "bg-blue-800 p-3"
      : "p-2";

  const classProducto =
    ["/productos", "/nuevoproducto"].includes(router.pathname) ||
    router.pathname.startsWith("/editarproducto")
      ? "bg-blue-800 p-3"
      : "p-2";

  const classPedido =
    ["/pedidos", "/nuevopedido"].includes(router.pathname) ||
    router.pathname.startsWith("/editarpedido")
      ? "bg-blue-800 p-3"
      : "p-2";

  return (
    <aside className="bg-gray-800 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <div>
        <p className="text-white text-2xl font-black">CRM Clientes</p>
      </div>
      <nav className="mt-5 list-none">
        <li className={classCliente}>
          <Link href="/">
            <a className="text-white mb-2 block">Clientes</a>
          </Link>
        </li>
        <li className={classPedido}>
          <Link href="/pedidos">
            <a className="text-white mb-2 block">Pedidos</a>
          </Link>
        </li>
        <li className={classProducto}>
          <Link href="/productos">
            <a className="text-white mb-2 block">Productos</a>
          </Link>
        </li>
      </nav>
    </aside>
  );
};

export default Sidebar;
