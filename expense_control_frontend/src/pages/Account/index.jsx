import { Box, Container, Typography,Avatar, IconButton, TextField, Button } from '@mui/material';
import { AddCircle, Delete, Edit } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ExpenseControl from '../../services/ExpenseControl';
import ResponsiveDialog from '../../components/Dialog';
import BasicModal from '../../components/modal';


export default function Account(){
    const location= useLocation();
    const userId= location.state?.userId;
    const nav= useNavigate();
    const api= new ExpenseControl();
    const [people,setPeople]= useState([]);
    const [openDialog, setOpenDialog]= useState(false);
    const [openModal, setOpenModal]= useState(false);
    const [selectedPerson, setSelectedPerson]= useState({name:'', age:0});

    const childModal= (
         <Box>
                <TextField 
                id="outlined-basic"
                label={'Nome'}
                variant="outlined"
                value={selectedPerson.name}
                onChange={(e) => setSelectedPerson({...selectedPerson, name: e.target.value})}
                fullWidth
                margin="normal"
                />
                <TextField 
                    id="outlined-basic"
                    label={'Idade'}
                    variant="outlined"
                    value={selectedPerson.age}
                    onChange={(e) => setSelectedPerson({...selectedPerson, age: e.target.value})}
                    fullWidth
                    type='number'
                    margin="normal"
                />
                <Button onClick={(()=>selectedPerson.id?editPerson():createPerson())}  variant="contained">{selectedPerson.id? "Atualizar": "Criar"}</Button>
        </Box>
        
    )

    const deletePerson= async()=>{
        let response= await api.DeletePerson(selectedPerson.id);
        if(response.status===200){
            setOpenDialog(false);
            loadPeople();
        }
    }

    const editPerson= async()=>{
        let response= await api.UpdatePerson(selectedPerson);
        if(response.status===200){
            setOpenModal(false);
            loadPeople();
        }
    }
    const createPerson= async()=>{
        selectedPerson.userId= userId;
        console.log(selectedPerson)
        let response= await api.CreatePerson(selectedPerson);
        if(response.status===200){
            setOpenModal(false);
            loadPeople();
        }
    }
    


    useEffect(()=>{
        if(!userId){
            nav('/');
        }
    },[userId, nav])

    useEffect   (()=>{
        loadPeople();
})

    const loadPeople= async()=>{
        let response= await api.GetUserPeople(userId);
        console.log
        setPeople(response.metadata.People);
    }


    return(

        <Container
  sx={{
   
    display:'flex',
    minHeight:'100vh',
    flexDirection:'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',    
  }}
>
    <Typography variant='h2' sx={{textAlign:'center'}}> Quem irá utilizar o sistema?</Typography>
    <Container
    sx={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:{ sm:'row', xs:'column'} }}
    >
        {people.map((person)=>(
            <Box key={person.id} sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'125px',height:'200px'}}>
                <IconButton
                onClick={()=>{nav('/home', {state:{person: person}})}}
                sx={{width:'100px', height:'100px'}}>
                    <Avatar sx={{width:'100%', height:'100%', objectFit:'cover'}} >{person.name[0]}</Avatar>
                </IconButton>
                <Typography>{person.name}</Typography>
                <Box>
                <IconButton
                onClick={()=>{
                
                    setOpenDialog(true);
                    setSelectedPerson(person);
                }}
                >
                  <Delete/>
                </IconButton>
                <IconButton
                onClick={()=>{
                    setSelectedPerson(person);
                    setOpenModal(true);
                }}
                >
                    <Edit/>
                </IconButton>
                </Box>
            </Box>
        ))}

        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', width:'125px',height:'200px'}}>
            <IconButton sx={{width:'100px', height:'100px'}}
            onClick={()=>{
                setSelectedPerson({name:'', age:0});
                setOpenModal(true);
            }}
            >
                <AddCircle sx={{width:'100%', height:'100%', objectFit:'cover'}}/>
            </IconButton>
            <Typography>Adicionar</Typography>
        </Box>  
        <ResponsiveDialog openDialog={openDialog} setOpenDialog={setOpenDialog} title='Deletar' text='Deseja realmente deletar?' action={()=>{deletePerson()}}/>
        <BasicModal open={openModal} setOpen={setOpenModal} child={childModal}/>
    </Container>
</Container>

    )
    
}