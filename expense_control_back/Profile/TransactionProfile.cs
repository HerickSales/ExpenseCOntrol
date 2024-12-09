using ExpenseControl.Data.Dto;
using ExpenseControl.Model;

namespace ExpenseControl.Profile
{
    public class TransactionProfile : AutoMapper.Profile
    {
        public TransactionProfile(){
            CreateMap<CreateTransactionDto, TransactionModel>();
            CreateMap<TransactionModel,ReadTransactionDto>();
            CreateMap<UpdateTransactionDto, TransactionModel>();
        }
    }
}