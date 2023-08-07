import { Box, Typography } from "@mui/material";

const Error = () => {
    return <Box sx={{textAlign:'center'}}>
        <Typography className="typo" sx={{marginBottom:'30px', fontSize:'20px', color:'#E01E9B', textAlign:'center'}}>
                Niste ovlašćeni da vidite zaštićenu stranicu! <br />
                Molimo Vas, ulogujte se.
        </Typography>
    </Box> 
}

export default Error;