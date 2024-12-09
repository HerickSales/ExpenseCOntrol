import React, { useEffect, useState } from "react";
import { Container, Button,Box, Paper, Typography, Divider} from "@mui/material";
import Header from "../../components/Header";
import ExpenseControl from "../../services/ExpenseControl";

import { useLocation, useNavigate } from "react-router-dom";
import { ArrowBack, ArrowForward, Calculate,  } from "@mui/icons-material";

export default function Home(){
    const location= useLocation();
    const person= location.state?.person;
    const navigate= useNavigate();
    const api= new ExpenseControl();
    const [people, setPeople]= useState([]);
    let balanceList= [];
    let GeneralBalance={
      revenue: 0,
      expense: 0,
      balance: 0
    }
    const loadPeople= async()=>{
        const data= await api.GetUserPeople(person.userId);
        let people= data.metadata.People;
        if(people){
          setPeople(data.metadata.People);
        }
    }


    

    useEffect(()=>{
        if(!person){
            navigate("/");
        }
        loadPeople();
    });
    
    return(
      
      <Box>
          <Header navigate={navigate} person={person}/>

          <Container sx={{marginTop:'40px'}}>

            {people.map((p, index)=>{
              let totals={
                revenue: p.revenues?.reduce((acc, cur)=> acc+cur.value, 0) || 0,
                expense: p.expenses?.reduce((acc, cur)=> acc+cur.value, 0) || 0,
              }
              totals.balance= totals.revenue-totals.expense;
              GeneralBalance.balance+= totals.balance;
              GeneralBalance.revenue+= totals.revenue;
              GeneralBalance.expense+= totals.expense;


              totals.saldo= totals.revenue-totals.expense;
              balanceList.push(totals);
              return(
                <Paper key={index} style={{padding:  20, marginTop: 10}}>
                <Typography variant="h4" >{p.name}:</Typography>
                <Box sx={{display:'flex', flexDirection:{md:'row', xs:'column'}, justifyContent:'space-around', marginBottom:'40px'}}>
                  <Box sx={{padding:2}}>
                    <Typography variant="h4" sx={{color:'Green'}}>Receitas:</Typography>
                    <Box  sx={{display:'flex', flexDirection:'column', gap:'20px', padding:3, border:'1px solid red', borderRadius:5}}>
                    {p.revenues?.map((r, index)=>(
                          <Typography key={index} variant="h5" sx={{color:'green'}} >{r.name} - R$ {r.value}</Typography>
                        
                        ))}
                    {p.revenues?.length===0 && <Typography>Nenhuma Receita Cadastrada</Typography>}
                        </Box>
                  </Box>
                    <Divider/>  
                  <Box sx={{padding:2}}>
                    <Typography variant="h4" sx={{color:'Red', marginBottom:1}}>Despesas:</Typography>
                    <Box  sx={{display:'flex', flexDirection:'column', gap:'20px', padding:3, border:'1px solid red', borderRadius:5}}>
                    {p.expenses?.map((e, index)=>(
                          <Typography key={index}  variant="h5" sx={{color:'red'}} >{e.name} - R$ {e.value}</Typography>
                        ))}
                    {p.expenses?.length===0 && <Typography>Nenhuma Despesa Cadastrada</Typography>}
                        </Box>
                  </Box>
                </Box>
                <Divider/>
                <Typography variant="h3" >totais:</Typography>
                <Typography variant="h6" sx={{color:'green'}} >total de Receitas: R$ {totals. revenue}</Typography>
                <Typography variant="h6" sx={{color:'red'}} >total de Despesas: R$ {totals.expense}</Typography>
                {totals.balance>=0 && <Typography variant="h6" sx={{color:'green'}}>Saldo: R$ {totals.balance}</Typography>}
                {totals.balance<0 && <Typography variant="h6" sx={{color:'red'}}>Saldo: R$ {totals.balance}</Typography>}
              </Paper>
              )
            })}
            <Paper style={{padding:  10, marginTop: 10}}>
            <Typography variant="h3">Saldo Geral:</Typography>
            <Typography variant="h4" sx={{color:'green'}}>Total de Receitas: R$ {GeneralBalance.revenue}</Typography>
            <Typography variant="h4" sx={{color:'red'}}>Total de Despesas: R$ {GeneralBalance.expense}</Typography>
            {GeneralBalance.balance>=0 && <Typography variant="h4" sx={{color:'green'}}>Saldo: R$ {GeneralBalance.balance}</Typography>}
            {GeneralBalance.balance<0 && <Typography variant="h4" sx={{color:'red'}}>Saldo: R$ {GeneralBalance.balance}</Typography>}              
            </Paper>
          </Container>
      </Box>
       
        

        );
    }

