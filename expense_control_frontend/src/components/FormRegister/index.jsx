import  {useState} from 'react';
import { Box, TextField,Paper, Button, Typography, InputAdornment, IconButton,FormControl, InputLabel,OutlinedInput, Alert    } from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ExpenseControl from '../../services/ExpenseControl';



export default function FormRegister() {
  const [data, setData] = useState({
    login: '',
    password: '',
    confirmPassword: ''
  });
  const api= new ExpenseControl()
  const [alert, setAlert] = useState({type:'', message:''})
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    if(data.password !== data.confirmPassword){
      setAlert({type:'error', message:'Senhas não conferem'})
      return;
    }
    let resp= await api.CreateUser(data);
    if(resp.status === 200){
      setAlert({type:'success', message:'Usuario Criado!!'})
    }
    else{

      setAlert({type:'error', message:'Erro ao criar usuario'})
    }
  }

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Box sx={{display:'flex', alignItems:'center', justifyContent:'center'}}>
      <Paper
      elevation={3}
      sx={{padding:'2em', width:'50%'}}  
      >
        <Typography
        variant='h4'
        align='center'>
          Preencha as informações a seguir
        </Typography>

        <form>
          <TextField
            id="outlined-basic"
            label="Login"
            variant="outlined"
            value={data.login}
            onChange={(e) => setData({...data, login: e.target.value})}
            fullWidth
            margin="normal"
          />

         <FormControl
          sx={ {width: '100%', marginBottom:'7px'}}
         variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
          <OutlinedInput
            
            id="outlined-adornment-password"
            onChange={(e) => setData({...data, password: e.target.value})}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={()=> setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label="Senha"
          />
        </FormControl>

          <FormControl
          sx={ {width: '100%', marginBottom:'7px'}}
         variant="outlined">
          <InputLabel htmlFor="outlined-adornment-confirm-password">Confirma Senha</InputLabel>
          <OutlinedInput
            
            id="outlined-adornment-confirm-password"
            onChange={(e) => setData({...data, confirmPassword: e.target.value})}
            type={showConfirmPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={()=> setShowConfirmPassword(!showConfirmPassword)}
                  edge="end"
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label="Senha"
          />
        </FormControl>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            margin="normal"
            onClick={(e)=> handleSubmit(e)}
          >
            Registrar
          </Button>
          <Alert sx={{marginTop:'1em'}}
           severity={alert.type}>{alert.message}</Alert>
        </form>


      </Paper>
      
    </Box>
  );
}
