import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
//import { DefaultLayout } from "./layouts";

// Route Views
/*import ComponentsOverview from "./views/ComponentsOverview";
import Pedidos from "./views/Pedidos";
import AltaPedido from "./views/AltaPedido";
import Pedido from "./views/Pedido";
import AgregarItemEnPedido from "./views/AgregarItemEnPedido";
import Productos from "./views/Productos";
import AltaProducto from "./views/AltaProducto";
*/import Login from "./Loginn";
//import Producto from "./views/Producto";


export default [
 /* {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/login" />
  },
  {
    path: "/producto/:identificador",
    layout: DefaultLayout,
    component: Producto
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/pedidos",
    layout: DefaultLayout,
    component: Pedidos
  },
  {
    path: "/pedido/:numeroPedido",
    layout: DefaultLayout,
    component: Pedido
  },
  {
    path: "/nuevo-pedido",
    layout: DefaultLayout,
    component: AltaPedido
  },
  {
    path: "/agregar-item-en-pedido/:numeroPedido",
    layout: DefaultLayout,
    component: AgregarItemEnPedido
  },
  {
    path: "/productos",
    layout: DefaultLayout,
    component: Productos
  },
  {
    path: "/nuevo-producto",
    layout: DefaultLayout,
    component: AltaProducto
  },*/
  {
    path: "/login",
    component: Login
  },
];