import * as React from 'react';
import { useNavigate } from "react-router-dom";
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
    const [image, setImage] = useState({useImageUpload: true})
    const [recipe, setRecipe] = useState("")
    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        console.log('Image: ', image);
        console.log('Recipe: ', recipe);
        const data = {
            source_img : image,
            recipe_text : recipe
        };

        // to backend
        const endpoint = "http://127.0.0.1:3000/extract/"
        fetch(endpoint, {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(data)
        }).then(response=>response.json()).then(data=>{
            console.log(`ingredients: ${data.food_list}`) 
            sessionStorage.setItem('ingredients', JSON.stringify(data))
        })

        navigate('/SelectMenus')
    }
    
    return (
    <React.Fragment>
         <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 7, md: 3 } }}>
                <Typography variant="h5" gutterBottom>
                <Switch defaultChecked onChange={
                    (x)=>{setImage({useImageUpload: !image.useImageUpload})}}/>
                    {image.useImageUpload ? "Upload an Image" : "Enter a Recipe"}
                    </Typography>
                
                <form onSubmit={handleSubmit}>
                    {image.useImageUpload ? 
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
                        value = {recipe}
                        onInput = {e=>setRecipe(e.target.value)}
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
                </form>
            </Paper>
        </Container>
    </React.Fragment>
  )
}