import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, ListItem, CardActions, Tooltip, IconButton } from '@mui/material'
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { UserContext } from '../App';
import { useContext } from 'react';

const ShowIngredient = ({ingredient}) => {
    const { user, login, logout } = useContext(UserContext);
    const navigate = useNavigate();
  
    const deleteIngredient = async ({ingredient, onDelete}) => {
      const user = localStorage.getItem("user");
      if (user) {
      const u = JSON.parse(user);
      let response = await fetch(`http://localhost:8080/project/ingredients/${ingredient.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": u.token,
        },
      });
      if (response.ok) {
        let d = await response.json();
        console.log('Regular user deleted!');
        onDelete(ingredient.id);
      } 
    }
    };
  
    return <Card sx={{ marginBottom: 3, marginRight: 5, marginLeft: 5 }} variant="outlined">
      <CardHeader sx={{ textAlign: 'center', backgroundColor: 'skyblue' }} title={`${ingredient.name}`} > </CardHeader>
      <CardContent>ID: {ingredient.id}</CardContent>
      <CardContent>Unit: {ingredient.unit}</CardContent>
      <CardContent>Amount: {ingredient.amount}</CardContent>
      <CardContent>Calories: {ingredient.calories}</CardContent>
      <CardContent>Carbs: {ingredient.carbs}</CardContent>
      <CardContent>Fats: {ingredient.fats}</CardContent>
      <CardContent>Sugars: {ingredient.sugars}</CardContent>
      <CardContent>Proteins: {ingredient.proteins}</CardContent>
      <CardContent>Saturated fats: {ingredient.saturatedFats}</CardContent>
      <CardContent> {ingredient.allergen ? (
        <>
          Allergen: {ingredient.allergen.icon} {ingredient.allergen.name}
        </>
      ) : (
      'No allergen')}
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
       
        
        
      </CardActions>
    </Card>
};

export default ShowIngredient;