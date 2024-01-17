import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import Link from "next/link";

const OBTENER_PRODUCTO = gql`
  query obtenerProducto($id: ID!) {
    obtenerProducto(id: $id) {
      id
      nombre
      existencia
      precio
    }
  }
`;

const ACTUALIZAR_PRODUCTO = gql`
  mutation actualizarProducto($id: ID!, $input: ProductoInput) {
    actualizarProducto(id: $id, input: $input) {
      id
      nombre
      existencia
      precio
    }
  }
`;

const EditarProducto = () => {
  // obtener el parametro ID de la url
  const router = useRouter();
  const {
    query: { id },
  } = router;

  // consulta para obtener el producto
  const { data, loading, error } = useQuery(OBTENER_PRODUCTO, {
    variables: {
      id,
    },
  });

  // consulta para actualizar el producto
  const [actualizarProducto] = useMutation(ACTUALIZAR_PRODUCTO);

  const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre del producto es obligatorio"),
    existencia: Yup.number()
      .typeError("La existencia debe ser un valor numérico")
      .required("La existencia del es obligatorio")
      .min(0, "La existencia no puede ser inferior a cero"),
    precio: Yup.number()
      .typeError("El precio debe ser un valor numérico")
      .required("El precio del producto es obligatorio")
      .min(0, "El precio no puede ser inferior a cero"),
  });

  if (loading) return "Cargando...";

  const { obtenerProducto } = data;

  // Modificar cliente en la DB
  const actualizarInfoProducto = async (values) => {
    const { nombre, existencia, precio, id } = values;
    try {
      const { data } = await actualizarProducto({
        variables: {
          id,
          input: {
            nombre,
            existencia: Number(existencia),
            precio: Number(precio)
          },
        },
      });
      Swal.fire("Actualizado", "Producto actualizado correctamente!", "success");
      router.push("/productos");
    } catch (error) {
      console.log("Error==> ", error);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">
      <Link href="/productos">
          <a className="text-gray-700 text-2xl font-light mb-2 mr-2 ">
            {`Productos / `}
          </a>
        </Link>Editar Producto</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={obtenerProducto}
            onSubmit={(values) => {
              console.log(values);
              actualizarInfoProducto(values);
            }}
          >
            {(props) => {
              return (
                <form
                  className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                  onSubmit={props.handleSubmit}
                >
                  {/* ------------------------------------------------------- */}
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="nombre"
                    >
                      Nombre
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="nombre"
                      type="text"
                      placeholder="Nombre Cliente"
                      value={props.values.nombre}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>
                  {props.touched.nombre && props.errors.nombre ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.nombre}</p>
                    </div>
                  ) : null}
                  {/* ------------------------------------------------------- */}
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="existencia"
                    >
                      Existencia
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="existencia"
                      type="text"
                      placeholder="Existencia del producto"
                      value={props.values.existencia}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>
                  {props.touched.existencia && props.errors.existencia ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.existencia}</p>
                    </div>
                  ) : null}
                  {/* ------------------------------------------------------- */}
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="precio"
                    >
                      Precio
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="precio"
                      type="text"
                      placeholder="Precio del producto"
                      value={props.values.precio}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                  </div>
                  {props.touched.precio && props.errors.precio ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                      <p className="font-bold">Error</p>
                      <p>{props.errors.precio}</p>
                    </div>
                  ) : null}
                  {/* ------------------------------------------------------- */}

                  {/* ------------------------------------------------------- */}
                  <input
                    type="submit"
                    className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                    value="Actualizar Producto"
                  />
                  {/* ------------------------------------------------------- */}
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Layout>
  );
};

export default EditarProducto;
