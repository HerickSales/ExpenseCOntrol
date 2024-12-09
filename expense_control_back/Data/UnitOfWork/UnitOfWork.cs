
using ExpenseControl.Data.Context;
using ExpenseControl.Data.Repository;
using ExpenseControl.Model;

namespace ExpenseControl.Data.UnitOfWork
{
    public  class UnitOfWork( ExpenseControlContext context) {
        private readonly ExpenseControlContext context = context;
            
        public Repository<UserModel> UserRepository{get;}= new Repository<UserModel>(context);
        public Repository<PersonModel> PersonRepository{get;}= new Repository<PersonModel>(context);
        public Repository<TransactionModel> TransactionRepository{get;}=new Repository<TransactionModel>(context);


        public void Save(){
            context.SaveChanges();
        }
    }


}