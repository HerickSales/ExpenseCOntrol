namespace ExpenseControl.Data.Dto
{
    public class ReadTransactionDto{
        public int Id{get;set;}
        public string name{get;set;}
        public string Description{get;set;}
        public decimal Value {get;set;}
        public string Type{get;set;}
    }
}