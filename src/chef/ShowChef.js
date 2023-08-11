import { Card, CardHeader, CardContent, ListItem, CardActions, Tooltip, IconButton, CardMedia } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { UserContext } from '../App';
import { useContext } from 'react';


const ShowChef = ({ chef, onDelete }) => {
  const { user, login, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const deleteChef = async () => {
    const user = localStorage.getItem("user");
    if (user) {
    const u = JSON.parse(user);
    let response = await fetch(`http://localhost:8080/project/chef/${chef.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": u.token,
      },
    });
    if (response.ok) {
      let d = await response.json();
      console.log('Chef deleted!');
      onDelete(chef.id);
    } else {
      console.log('Error!');
    }
  }
  };

  return <Card sx={{ marginBottom: 3, marginRight: 5, marginLeft: 5 }} variant="outlined">
    <CardMedia
                    sx={{ height: 200 }}
                    image="https://www.shutterstock.com/shutterstock/photos/1435160735/display_1500/stock-vector-kitchen-chef-design-logo-template-1435160735.jpg"
                />
    <CardHeader sx={{textAlign: 'center', backgroundColor: 'white' }}  title={`${chef.name} ${chef.lastname}`} >  </CardHeader>
    {/* <CardContent>ID: {chef.id}</CardContent> */}
    {user && user.role === "ROLE_REGULAR_USER" ? (
     <CardContent>Recipes: {chef.recipes.id}</CardContent> ) : <></>}
    {/*<CardContent>My Cookbook: {regularUser.myCookBook.id}</CardContent> */}
    {/* <CardContent>e-Mail: <i>{chef.email}</i></CardContent> */}
    <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
      <Tooltip title="Info">
        <IconButton
          aria-label="info"
          onClick={() => navigate(`chef_details/${chef.id}`)}
        >
          <InfoIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Edit" >
        <IconButton  aria-label="edit" onClick={() => navigate(`edit_chef/${chef.id}`)}>
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete">
        <IconButton aria-label="delete" onClick={deleteChef}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </CardActions>
  </Card>


};


export default ShowChef;