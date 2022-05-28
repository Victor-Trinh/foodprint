import logo from './logo.svg';
import './App.css';
import InputForm from './components/InputForm.js'
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';

function App() {
  return <div>
        <AppBar position="static">
            <Typography variant="h6" color="inherit" component="div">
              FoodPrint
              </Typography>
        </AppBar>
      <InputForm/>

  </div>
  
}

export default App;
