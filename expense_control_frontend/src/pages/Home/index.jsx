
import React, { useEffect, useState } from "react";
import { Container,Box, Paper, Typography, FormControl, FormLabel,Alert, FormControlLabel, RadioGroup, Radio, TextField, Button, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from "../../components/Header";
import ResponsiveDialog from "../../components/Dialog";

import ExpenseControl from "../../services/ExpenseControl";
import { useLocation, useNavigate } from "react-router-dom";



export default function Home(){
    const location= useLocation();
    const personId= location.state?.person.id;
    const [person,setPerson]= useState();
    const navigate= useNavigate();
    const api= new ExpenseControl();
    const [openDialog, setOpenDialog]= useState(false);
    const [alert,setAlert]= useState({type:'', message:''});


    const [selectedTransaction, setSelectedTransaction]= useState({
      id: null,
      name: '',
      value: '',
      description:'',
      type: 0, //0despesa ou 1receita
    })
    const showAlert= (type, message) => {
      setAlert({type: type, message: message});
      setTimeout(()=>{
        setAlert({type:'', message:''});
      }, 4000);
    }
    

    const loadPerson= async()=>{
      let response= await api.GetPersonById(personId);
      if(response.status===200){
        let respJson= await response.json();
        setPerson(respJson[0].metadata.person);
      }
    }

    const createTransaction = async() => {
      selectedTransaction.personId= person.id;
      let response= await api.CreateTransaction(selectedTransaction);
      let respJson= await response.json();
      if(response.status===200){
        loadPerson();
        showAlert('success', respJson.message);
        setSelectedTransaction({
          name: '',
          value: '',
          description:'',
          type: 0, 
        })
        return
      }
      showAlert('error', respJson.message);
    }

    const deleteTransaction = async() => {
      setOpenDialog(false);
      let response= await api.DeleteTransaction(selectedTransaction);
      setSelectedTransaction({
        id:null,
        name: '',
        value: '',
        description:'',
        type: 0, 
      })
      let respJson= await response.json();
      if(response.status===200){
        showAlert('success', respJson.message);
        loadPerson();

        return;
        
      }
      showAlert('error', respJson.message);
  }

  const updateTransaction = async() => {
    selectedTransaction.personId= person.id;
    let response= await api.UpdateTransaction(selectedTransaction);
    let respJson= await response.json();
    if(response.status===200){
      showAlert('success', respJson.message);
     loadPerson();
      setSelectedTransaction({
        id: null,
        name: '',
        value: '',
        description:'',
        type: 0, 
     })
     return;
  }
  showAlert('error', respJson.message);
} 
useEffect(()=>{
  if(!personId){
    navigate('/');
    return;
  }
  loadPerson();
})


    return(
      
      <Box>
         <Header navigate={navigate} person={person} />

         <Box>
          <Container
              sx={{marginTop: 2, padding: 1}}
          >
            <Paper    sx={{padding: 3}}>
              <Typography variant="h4" component="h1" align="center">
                Preencha as informações para cadastrar nova Transação
              </Typography>
              <Box
            
              >
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">Tipo de Transação</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    value={selectedTransaction.type}
                    onChange={(e) => setSelectedTransaction({...selectedTransaction ,  type: e.target.value})}
                  >
                    <FormControlLabel value="0" control={<Radio />} label="Despesa" />
                    <FormControlLabel value="1" control={<Radio />} label="Receita" />
                  </RadioGroup>
              </FormControl>

              <TextField
                id="outlined-basic"
                label="Nome"
                variant="outlined"
                value={selectedTransaction.name}
                onChange={(e) => setSelectedTransaction({...selectedTransaction, name: e.target.value})}
                margin="normal"
                fullWidth
              />
               <TextField
                id="outlined-basic"
                label="Valor"
                variant="outlined"
                value={selectedTransaction.value}
                onChange={(e) => setSelectedTransaction({...selectedTransaction, value: e.target.value})}
                type= "number"
                fullWidth
                margin="normal"
              />
               <TextField
                id="outlined-basic"
                label="Descrição"
                variant="outlined"
                value={selectedTransaction.description}
                onChange={(e) => setSelectedTransaction({...selectedTransaction, description: e.target.value})}
                fullWidth
                margin="normal"
              />
              <Button onClick={()=>selectedTransaction.id? updateTransaction(): createTransaction()}
               variant="contained">{selectedTransaction.id? 'Atualizar': 'Criar'}</Button>
              </Box>
              <Alert sx={{marginTop:'1em'}}
           severity={alert.type}>{alert.message}</Alert>
            </Paper>

          <Container>
            <Box>
              <Typography variant="h4" component="h2" align="center" sx={{marginTop:'30px'}}>
                Receitas
              </Typography>

              {person?.revenues?.map((revenue, index) => (
                <Paper key={index} sx={{padding: 2, marginTop: 2, display:'flex', justifyContent:'space-around', flexDirection:{md:'row', xs:'column'}}}>
                  <Box>
                  <Typography variant="h4" >
                    {revenue.name} R${parseFloat(revenue.value).toFixed(2).replace('.', ',')}
                  </Typography>
                  <Typography variant="h5" >
                    {revenue.description}
                  </Typography>
                  </Box>
                  <Box sx={{display:'flex',flexDirection:'column', gap:'15px'}}>
                    <Button
                      onClick={() => {
                        setSelectedTransaction(revenue);
                        setOpenDialog(true);
                      }}
                     variant="contained" endIcon={<DeleteIcon/>} >Excluir</Button>
                     
                    <Button
                      onClick={() => {
                        setSelectedTransaction(revenue);
                        window.scrollTo({ top: 0, behavior: 'smooth' }); 
                      }}
                    variant="contained" endIcon={<EditIcon/>} >Editar</Button>
                  </Box>
                </Paper>              
              ))}
            </Box>
            <Box>
              <Typography variant="h4" component="h2" align="center"  sx={{marginTop:'30px'}}>
                Despesas
              </Typography>
              {person?.expenses?.map((expense, index) => (
                <Paper key={index} sx={{padding: 2, marginTop: 2, display:'flex', justifyContent:'space-around', flexDirection:{md:'row', xs:'column'} }}>
                  <Box>
                  <Typography variant="h4" >
                    {expense.name} R${parseFloat(expense.value).toFixed(2).replace('.', ',')}
                  </Typography>
                  <Typography variant="h5" >
                    {expense.description}
                  </Typography>
                  </Box>
                  <Box sx={{display:'flex', flexDirection:'column', gap:'15px'}}>
                    <Button
                      onClick={() => {
                        setSelectedTransaction(expense);
                        setOpenDialog(true);
                      }}
                      variant="contained" endIcon={<DeleteIcon/>} >Excluir</Button>
                    <Button
                      onClick={() => {
                        setSelectedTransaction(expense);
                        window.scrollTo({ top: 0, behavior: 'smooth' }); 

                      }}
                    variant="contained" endIcon={<EditIcon/>} >Editar</Button>
                  </Box>
                </Paper>              
              ))}
            </Box>
          </Container>

          </Container>
         </Box>
         <ResponsiveDialog openDialog={openDialog} setOpenDialog={setOpenDialog} title='Deletar' text='Deseja realmente deletar?' action={()=>{deleteTransaction()}}/>
      </Box>
        );
    }