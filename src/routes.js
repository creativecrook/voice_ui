/*!

=========================================================
* Argon Dashboard React - v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
// import Maps from "views/examples/Maps.js";
// import Register from "views/examples/Register.js";
// import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Products from "views/examples/Products";
import AddNewProduct from "views/examples/AddNewProduct";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "layers",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/settings",
    name: "Settings",
    icon: "settings",
    component: Icons,
    layout: "/admin"
  },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  //   layout: "/admin"
  // },
  {
    path: "/profile",
    name: "Manage Profile",
    icon: "manage_accounts",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/products",
    name: "Products",
    icon: "inventory_2",
    component: Products,
    layout: "/admin"
  },
  {
    path: "/addproduct",
    name: "Add Product",
    icon: "inventory_2",
    component: AddNewProduct,
    layout: "/admin"
  },
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "ni ni-key-25 text-info",
  //   component: Login,
  //   layout: "/auth"
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: Register,
  //   layout: "/auth"
  // }
];
export default routes;
