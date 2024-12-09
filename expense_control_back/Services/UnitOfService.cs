using AutoMapper;
using ExpenseControl.Data.UnitOfWork;

namespace ExpenseControl.Services
{
    public class UnitOfService{
        public UserService UserService{get;}
        public PersonService PersonService{get;}
        public TransactionService TransactionService{get;}
        private IMapper _mapper;
        private UnitOfWork _unitOfWork;

        public UnitOfService(IMapper map, UnitOfWork unit){
            _mapper= map;
            _unitOfWork= unit;
            this.UserService= new UserService(_mapper, _unitOfWork);
            this.PersonService= new PersonService(_mapper, _unitOfWork);
            this.TransactionService = new TransactionService(_mapper, _unitOfWork);
            
        }

   
    }
}