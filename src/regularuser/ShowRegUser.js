import { Card, CardHeader, CardContent, ListItem, CardActions, Tooltip, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { UserContext } from '../App';
import { useContext } from 'react';


const ShowRegUser = ({ regularUser, onDelete }) => {
  const { user, login, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const deleteRegularUser = async () => {
    const user = localStorage.getItem("user");
    if (user) {
    const u = JSON.parse(user);
    let response = await fetch(`http://localhost:8080/project/regularuser/${regularUser.id}`, {
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
      onDelete(regularUser.id);
    } else {
      console.log('Error!');
    }
  }
  };

  return <Card sx={{ marginBottom: 3, marginRight: 5, marginLeft: 5 }} variant="outlined">
    <CardHeader sx={{ textAlign: 'center', backgroundColor: 'skyblue' }} title={`${regularUser.name} ${regularUser.lastname}`} >  </CardHeader>
    <CardContent>ID: {regularUser.id}</CardContent>
    <CardContent>Allergens: {regularUser.allergens.id}</CardContent>
    <CardContent>My Cookbook: {regularUser.myCookBook.id}</CardContent>
    <CardContent>e-Mail: <i>{regularUser.email}</i></CardContent>
    <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
      <Tooltip title="Info">
        <IconButton
          aria-label="info"
          onClick={() => navigate(`regularuser_details/${regularUser.id}`)}
        >
          <InfoIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Edit" >
        <IconButton  aria-label="edit" onClick={() => navigate(`edit_regularuser/${regularUser.id}`)}>
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete">
        <IconButton aria-label="delete" onClick={deleteRegularUser}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </CardActions>
  </Card>


};


export default ShowRegUser;