import { Card, CardHeader, CardActions, Tooltip, IconButton, CardMedia } from '@mui/material'
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { useContext } from 'react';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';

const ShowRegUser = ({ regularuser, onDelete }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const deleteRegularuser = async () => {
    const u = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await fetch(`http://localhost:8080/project/regularuser/${regularuser.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": u.token,
        },
      });

      if (response.ok) {
        console.log('Regular user deleted!');
        onDelete(regularuser.id);
      } else {
        console.log('Error!');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return <Card sx={{ marginBottom: 3, marginRight: 5, marginLeft: 5 }} variant="outlined">
    <CardMedia
      sx={{ height: 140 }}
      image="https://cdn.cancer.ca/-/media/images/stock-images/recipes-main-banner-generic.png?rev=4a884cb602214bb3bc1ce51b84ef8a5f&cx=0.5&cy=0.5&cw=1200&ch=630&hash=B3798D04B58C0F94406103D32F09B1C5"
    />
    <CardHeader sx={{ textAlign: 'center', backgroundColor: 'skyblue' }} title={`${regularuser.name} ${regularuser.lastname}`} >  </CardHeader>
    {/* <CardContent>ID: {regularuser.id}</CardContent>
    <CardContent>Allergens: {regularuser.allergens.id}</CardContent>
    <CardContent>My Cookbook: {regularuser.myCookBook.id}</CardContent>
    <CardContent>e-Mail: <i>{regularuser.email}</i></CardContent> */}
    <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
      <Tooltip title="Info">
        <IconButton
          aria-label="info"
          onClick={() => navigate(`regularuser_details/${regularuser.id}`)}
        >
          <InfoIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Edit" >
        <IconButton aria-label="edit" onClick={() => navigate(`edit_regularuser/${regularuser.id}`)}>
          <EditIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete">
        <IconButton aria-label="delete" onClick={deleteRegularuser}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </CardActions>
  </Card>


};


export default ShowRegUser;