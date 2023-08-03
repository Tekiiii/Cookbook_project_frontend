import { produce } from "immer";
import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
} from "@mui/material";

const RecipeEdit = () => {
    const recipe = useLoaderData();
    const [updatedRecipe, setUpdatedRecipe] = useState(recipe);
    const [recipeError, setRecipeError] = useState("");
    const navigate = useNavigate();
}

const update = async () => {
    const user = localStorage.getItem("user");
    if (user) {
        const u = JSON.parse(user);
        let response = await fetch(
            `http://localhost:8080/project/recipe/updateRecipe/${updatedRecipe.ID}`,
            {
                method: "PUT",
                headers: {
                    Authorization: u.token,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedRecipe),
            }
        );
        console.log(response);
        if (response.ok) {
            let d = await response.json();
            console.log(JSON.stringify(d));
            alert("Successfully updated recipe");
            navigate("/recipes");
        } else {
            console.log("Failed updating recipe");
        }
    }
};
return;

export default RecipeEdit;