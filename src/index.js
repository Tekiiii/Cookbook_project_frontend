import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './HomePage';
import ShowRecipes from './recipe/ShowRecipes';

const router = createBrowserRouter([{
  path:'/',
  element:<App/>,
  children : [
    {
      path:'homepage',
      element: <HomePage/>
    },
    // {
    //   path:'error',
    //   element: <Error/>
    // },
    // {
    //   path:'login',
    //   element:<Login/>
    // },
    {
      path: 'recipe',
      element: <ShowRecipes/>
    },
    // {
    //   path:'recipes/new_recipe',
    //   element:<ProtectedRouteAdmin><RecipeForm/></ProtectedRouteAdmin>
    // },
    // {
    //   path:'recipes/edit_recipe/:id',
    //   element:<ProtectedRouteAdmin><RecipeEdit/></ProtectedRouteAdmin>,
    //   loader: async ({ params }) => {
    //     const user = check_login(['ROLE_ADMIN']);
    //     return fetch(`http://localhost:8080/project/recipe/${params.id}`, {
    //       method: 'GET',
    //         headers: {
    //           Authorization : user.token,
    //           "Accept": "application/json",
    //           "Content-Type": "application/json",
    //         }
    //     })
    //   },
    // },
    // {
    //   path:'recipes/recipe_details/:id',
    //   element:<RecipeDetails/>,
    //   loader: async ({ params }) => {
    //     const user = check_login(['ROLE_ADMIN', 'ROLE_REGULAR_USER', 'ROLE_CHEF']);
    //     return fetch(`http://localhost:8080/project/recipe/${params.id}`, {
    //         method: 'GET',
    //         headers: {
    //           Authorization : user.token,
    //           "Accept": "application/json",
    //           "Content-Type": "application/json",
    //         }
    //       });
    //   }
    // }
  ]
}
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
