import * as React from 'react';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch'

export default function InputForm() {
    const [value, setValue] = useState({useImageUpload: true})
    return (
    <React.Fragment>
         <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 7, md: 3 } }}>
                <Typography variant="h5" gutterBottom>
                <Switch defaultChecked onChange={
                    (x)=>{setValue({useImageUpload: !value.useImageUpload})}}/>
                    {value.useImageUpload ? "Upload an Image" : "Enter a Recipe"}
                    </Typography>
                
                {value.useImageUpload ? 
                <Grid item xs={12}>
                    <Button
                    variant="contained"
                    component="label"
                    >
                    Upload Image
                    <input
                        type="file"
                        hidden
                    />
                    </Button>
                </Grid> :
                <TextField
                    required
                    id="recipe"
                    name="recipe"
                    label="Recipe Text"
                    fullWidth
                    variant="standard"
                />
                }    

                <Divider spacing={2}>Submit</Divider>

                <Grid item xs={12}>
                    <Button
                    variant="contained"
                    component="label"
                    >
                    Submit
                    <input
                        type="submit"
                        hidden
                    />
                    </Button>
                </Grid>

            </Paper>
        </Container>
    </React.Fragment>
  )
}