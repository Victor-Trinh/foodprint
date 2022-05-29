import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

export default function CategorySelect(name) {
    console.log(name)
    const [food, setFood] = useState("")
    

    const handleChange = (event) => {
        setFood(event.target.value);
      };

    function handleSubmit(event){
        event.preventDefault();
        console.log('Food: ', food);

        // to backend
        const endpoint = "http://127.0.0.1:3000/todb/"
        fetch(endpoint, {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(food)
        })
    }

    return (
    <React.Fragment>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 7, md: 3 } }}>
                <form onSubmit={handleSubmit}>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{name.name}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={food}
                    label="Food"
                    onChange={handleChange}
                >
                    <MenuItem value={"beef"}>Beef</MenuItem>
                    <MenuItem value={"chicken"}>Chicken</MenuItem>
                    <MenuItem value={"vegetables"}>Vegetables</MenuItem>
                    <MenuItem value={"potato"}>Potato</MenuItem>
                    <MenuItem value={"grapes"}>Grapes</MenuItem>
                    <MenuItem value={"banana"}>Banana</MenuItem>
                </Select>
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
                </FormControl>
                </form>
            </Paper>
        </Container>
    </React.Fragment>
  )
}