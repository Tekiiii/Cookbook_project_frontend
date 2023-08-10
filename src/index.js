import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import ShowRecipes from './recipe/ShowRecipes';
import RecipeDetails from './recipe/RecipeDetails';
import RecipeEdit from './recipe/RecipeEdit';
import RecipeForm from './recipe/RecipeForm';
import ShowMyCookbook from './Cookbook/ShowMyCookbook';
import MyAllergens from './allergens/MyAllergens';
import ShowAllergens from './allergens/ShowAllergens';
import AllergenEdit from './allergens/AllergenEdit';
import { check_login } from './login_logic';
import Login from './Login';
import Error from './Error';
import ProtectedRouteAdmin from './ProtectedRouteAdmin';
import ProtectedRoute from './ProtectedRoute';
import ShowRegUsers from './regularuser/ShowRegUsers';
import RegUserForm from './regularuser/RegUserForm';
import ShowIngredients from './ingredients/ShowIngredients';
import RegUserDetails from './regularuser/RegUserDetails';
import RegUserEdit from './regularuser/RegUserEdit';
import ChefEdit from './chef/ChefEdit';
import ShowChefs from './chef/ShowChefs';
import ChefDetails from './chef/ChefDetails';
import ChefForm from './chef/ChefForm';
import IngredientDetails from './ingredients/IngredientDetails';
import IngredientForm from './ingredients/IngredientForm';

const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  children: [
    {
      path: '/',
      element: <Navigate to="/recipe" />,
    },
    {
      path: 'error',
      element: <Error />
    },
    {
      path: 'login',
      element: <Login />
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
        const user = check_login(['ROLE_ADMIN', 'ROLE_CHEF']);
        return fetch(`http://localhost:8080/project/recipe/${params.id}`, {
          method: 'GET',
          headers: {
            Authorization: user.token,
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
        console.log(params.id);
        console.log(params);
        return fetch(`http://localhost:8080/project/recipe/${params.id}`, {
          method: 'GET',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          }
        });
      }
    },
    {
      path: 'myCookbook',
      element: <ShowMyCookbook />
    },

    {
      path: 'myAllergens',
      element: <MyAllergens />
    },
    {
      path: 'allAllergens',
      element: <ShowAllergens />
    },
    {
      path: 'allergen_edit/:id',
      element: <AllergenEdit />,
      loader: async ({ params }) => {
        const user = check_login(['ROLE_ADMIN', 'ROLE_CHEF']);
        return fetch(`http://localhost:8080/project/allergens/${params.id}`, {
          method: 'GET',
          headers: {
            Authorization: user.token,
            "Accept": "application/json",
            "Content-Type": "application/json",
          }
        })
      },
    },
    {
      path: 'ingredients',
      element: <ShowIngredients />
    },
    {
      path: 'ingredients/ingredient_details/:id',
      element: <IngredientDetails/>,
      loader: async ({ params }) => {
        console.log(params.id);
        console.log(params);
        return fetch(`http://localhost:8080/project/ingredients/id/${params.id}`, {
          method: 'GET',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          }
        });
      }
    },
    {
      path: 'ingredients/newIngredient',
      element:<IngredientForm/>
    },
    {
      path: 'regularuser',
      element: <ShowRegUsers />
    },
    {
      path: "regularuser/newRegularUser",
      element: <RegUserForm />,
    },
    {
      path: 'regularuser/edit_regularuser/:id',
      element: <RegUserEdit />,
      loader: async ({ params }) => {
        const user = check_login('ROLE_ADMIN');
        return fetch(`http://localhost:8080/project/regularuser/${params.id}`, {
          method: 'GET',
          headers: {
            Authorization: user.token,
            "Accept": "application/json",
            "Content-Type": "application/json",
          }
        })
      },
    },
    {
      path: "regularuser/regularuser_details/:id",
      element: <RegUserDetails />
    },
    {
      path: 'chef',
      element: <ShowChefs />
    },
    {
      path: "chef/newChef",
      element: <ChefForm />,
    },
    {
      path: 'chef/edit_chef/:id',
      element: <ChefEdit />,
      loader: async ({ params }) => {
        const user = check_login('ROLE_ADMIN');
        return fetch(`http://localhost:8080/project/chef/${params.id}`, {
          method: 'GET',
          headers: {
            Authorization: user.token,
            "Accept": "application/json",
            "Content-Type": "application/json",
          }
        })
      },
    },
    {
      path: "chef/chef_details/:id",
      element: <ChefDetails />,
      loader: async ({ params }) => {
        const user = check_login('ROLE_ADMIN');
        // console.log(params.id);
        // console.log(params);
        return fetch(`http://localhost:8080/project/chef/${params.id}`, {
          method: 'GET',
          headers: {
            Authorization: user.token,
            "Accept": "application/json",
            "Content-Type": "application/json",
          }
        });
      }
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
