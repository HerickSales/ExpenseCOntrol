import  {useState} from 'react';
import { Box, TextField,Paper, Button, Typography, InputAdornment, IconButton, FormControl, InputLabel,OutlinedInput, Alert   } from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import ExpenseControl from '../../services/ExpenseControl';

export default function FormLogin() {

  const [data, setData] = useState({
    login: '',
    password: ''
  });

  const api= new ExpenseControl()
  const nav= useNavigate()
  const [alert, setAlert] = useState({type:'', message:''})
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    let resp= await api.Login(data);
    if(resp.status === 200){
      setAlert({type:'success', message:'Login efetuado com sucesso!'})
      let userId= await resp.json().then(data=> data.metadata.User.id);

      nav('/accounts', {state:{userId: userId}})
    }
    else{
      setAlert({type:'error', message:'Usuário ou senha inválidos!'})
    }

  }

  const [showPassword, setShowPassword] = useState(false);
  return (
    <Box>
      <Paper
      elevation={3}
      sx={{padding:'2em'}}  
      >
        <Typography
        variant='h3'
        align='center'>
          Faça seu Login
        </Typography>

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
          value={data.password}
          onChange={(e) => setData({...data, password: e.target.value})}
            id="outlined-adornment-password"
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
          <Button
            variant="contained"
            color="primary"
            fullWidth
            margin="normal"
            onClick={handleSubmit}
          >
            Entrar
          </Button>
          <Alert sx={{marginTop:'1em'}}
           severity={alert.type}>{alert.message}</Alert>


      </Paper>
      
    </Box>
  );
}