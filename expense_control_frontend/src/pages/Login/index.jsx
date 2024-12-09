import  { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import  FormLogin  from "../../components/FormLogin";


import FormRegister from "../../components/FormRegister";
export default function Login(){
    const [isLogin, setIsLogin] = useState(true);
    

    
    const loginPage = (
        <Box sx={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', height: '100vh', gap:'30px'}}>
                <FormLogin/>
                <Typography variant="h5">Ainda nao possui conta?</Typography>
                <Button variant="contained" onClick={() => setIsLogin(false)}>
                    Registrar-se
                </Button>
            </Box> 
    )

    const registerPage = (
        <Box sx={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center', height: '100vh', gap:'30px'}}>
        <FormRegister onSubmit={() => onSubmit()}
        />
        <Typography variant="h5">Faça seu login </Typography>
        <Button variant="contained" onClick={() => setIsLogin(true)} >
   
            Ir para Login
        </Button>
    </Box> 

    )


    return(
        <Box>
            {isLogin ? loginPage : registerPage}
        </Box>
    )
}   