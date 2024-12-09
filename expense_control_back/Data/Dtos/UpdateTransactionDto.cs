namespace ExpenseControl.Data.Dto
{
    
    public class UpdateTransactionDto{
        public string Name{get;set;}
        public string Description{get;set;}
        public decimal Value{get;set;}
        //0=Despesa
        //1=Receita 
        public int Type{get;set;}
        public int PersonId{get;set;}

        
    }
}