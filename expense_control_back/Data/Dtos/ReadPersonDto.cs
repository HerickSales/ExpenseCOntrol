using System.Transactions;
using ExpenseControl.Model;

namespace ExpenseControl.Data.Dto
{
    public class ReadPersonDto{
        public int Id {get;set;}
        public int UserId{get;set;}
        public string Name{get;set;}
        public int Age{get;set;}
        public ICollection<ReadTransactionDto>?  Revenues{get;set;}
        public ICollection<ReadTransactionDto>? Expenses{get;set;}
    }
}