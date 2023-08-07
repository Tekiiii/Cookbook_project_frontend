import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
//import HomePage from './HomePage';
import ShowRecipes from './recipe/ShowRecipes';
import RecipeDetails from './recipe/RecipeDetails';
import RecipeEdit from './recipe/RecipeEdit';
import RecipeForm from './recipe/RecipeForm';
import ShowMyCookbook from './Cookbook/ShowMyCookbook';
import MyAllergens from './allergens/MyAllergens';
import { check_login } from './login_logic';
import Login from './Login';

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  children: [
    {
      path: '/',
      element: <Navigate to="/recipe" />,
    },

    // {
    //   path:'error',
    //   element: <Error/>
    //},
    {
      path:'login',
      element:<Login/>
    },
    {
      path: 'recipe',
      element: <ShowRecipes />
    },
    {
      path: 'recipe/new_recipe',
      element: <RecipeForm />
    },
    {
      path: 'recipe/edit_recipe/:id',
      element: <RecipeEdit />,
      loader: async ({ params }) => {
        const user = check_login(['ROLE_ADMIN']);
        return fetch(`http://localhost:8080/project/recipe/${params.id}`, {
          method: 'GET',
          headers: {
            Authorization : user.token,
            "Accept": "application/json",
            "Content-Type": "application/json",
          }
        })
      },
    },
    {
      path: 'recipe/recipe_details/:id',
      element: <RecipeDetails />,
      loader: async ({ params }) => {
        const user = check_login(['ROLE_ADMIN', 'ROLE_REGULAR_USER', 'ROLE_CHEF']);
        return fetch(`http://localhost:8080/project/recipe/${params.id}`, {
          method: 'GET',
          headers: {
            Authorization : user.token,
            "Accept": "application/json",
            "Content-Type": "application/json",
          }
        });
      }
    },
    {
      path:'myCookbook',
      element:<ShowMyCookbook/>
    },

    {
      path: 'myAllergens',
      element: <MyAllergens />
    },
  ]
}
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
