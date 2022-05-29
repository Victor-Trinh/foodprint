import '../App.css';
import InputForm from '../components/InputForm.js'
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import CategorySelect from '../components/CategorySelect';
import AnalyzeSubmit from '../components/AnalyzeSubmit';

function SelectMenus() {
    const data = sessionStorage.getItem('ingredients');
    const ingredients = JSON.parse(data).food_list;
    console.log('Ingredients: ', ingredients);

    var rows = [];
    for (var i = 0; i < ingredients.length; i++){
        rows.push(<CategorySelect name={ingredients[i]} />);
    }

    return <div>
          <AppBar position="static">
              <Typography variant="h6" color="inherit" component="div">
                FoodPrint
                </Typography>
          </AppBar>
        {rows}
        <AnalyzeSubmit />
    </div>
    
  }
  
  export default SelectMenus;