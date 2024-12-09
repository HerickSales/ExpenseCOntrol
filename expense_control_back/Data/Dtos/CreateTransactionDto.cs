namespace ExpenseControl.Data.Dto
{
    public class CreateTransactionDto{

        public string Name{get;set;}
        public required string Description{get;set;}
        public required decimal Value{get;set;}
        //0=Despesa
        //1=Receita
        public required int Type{get;set;}
        public required int PersonId{get;set;}
    }
}