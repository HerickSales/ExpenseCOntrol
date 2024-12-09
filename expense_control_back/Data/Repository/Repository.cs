



using System.Linq.Expressions;
using ExpenseControl.Data.Context;

namespace ExpenseControl.Data.Repository
{
    public class Repository<T>
    (ExpenseControlContext context) where T: class
    {
        private readonly ExpenseControlContext context = context;

        public List<T> Get (int pageNumber, int pageSize){
            return [.. context.Set<T>().Skip((pageNumber-1)*pageSize).Take(pageSize)];
        }

        public List<T> GetAll(){
            return [.. context.Set<T>()];
        }
        public void Delete(T item){
            context.Remove(item);
        }
        //public void CascadeDelete(T item){}
        public void Add(T item){
            context.Add(item);
        }
   

    }
}