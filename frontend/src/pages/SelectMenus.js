import '../App.css';
import InputForm from '../components/InputForm.js'
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import CategorySelect from '../components/CategorySelect';

function SelectMenus() {
    return <div>
          <AppBar position="static">
              <Typography variant="h6" color="inherit" component="div">
                FoodPrint
                </Typography>
          </AppBar>
        <CategorySelect/>
    </div>
    
  }
  
  export default SelectMenus;