import logo from '../logo.svg';
import '../App.css';
import InputForm from '../components/InputForm.js'
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import CategorySelect from '../components/CategorySelect';

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

// const Home = () => {
//   return <h1>Home</h1>;
// };

// export default Home;

