using System.Security.Cryptography.X509Certificates;
using AutoMapper;
using ExpenseControl.Data.Dto;
using ExpenseControl.Data.UnitOfWork;
using ExpenseControl.Model;
using FluentResults;

namespace ExpenseControl.Services
{
    public class TransactionService(IMapper mapper, UnitOfWork unitOfWork){
        private IMapper _mapper= mapper;
        private UnitOfWork _unitOfWork= unitOfWork;

        public Result CreateTransaction(CreateTransactionDto dto){
            Result result;
            try{
                var listPerson= _unitOfWork.PersonRepository.GetAll();
                var person= listPerson.FirstOrDefault(p=> p.Id == dto.PersonId);
                if(person == null){
                    result= new Result().WithError(new Error("Pessoa não encontrada"));
                    return result;
                }
                if(dto.Type == 1 && person.Age < 18){
                    result= new Result().WithError(new Error("Menores de idade não podem ter Receitas"));
                    return result;
                }

                var transaction= _mapper.Map<TransactionModel>(dto);
                _unitOfWork.TransactionRepository.Add(transaction);
                _unitOfWork.Save();
                result = new Result().WithSuccess(new Success("Transação Criada"));
                return result;
            }catch(Exception e){
                result = new Result().WithError(new Error(e.Message));
                return result;
            }
        }

        public Result DeleteTransaction(int Id)  
        {
            Result result;
            try{
                var listTransaction= _unitOfWork.TransactionRepository.GetAll();
                var transaction= listTransaction.FirstOrDefault(t=> t.Id == Id);
                if(transaction == null){
                    result= new Result().WithError(new Error("Transação não encontrada"));
                    return result;
                }
                _unitOfWork.TransactionRepository.Delete(transaction);
                _unitOfWork.Save(); 
                result= new Result().WithSuccess(new Success("Pessoa deletada com sucesso"));
                return result;
            }catch(Exception e){
                result= new Result().WithError(new Error(e.Message));
                return result;
            }
        }
        public Result UpdateTransaction(UpdateTransactionDto dto, int Id){
            Result result;
            try{
                var listTransaction= _unitOfWork.TransactionRepository.GetAll();
                var transaction= listTransaction.FirstOrDefault(t=> t.Id == Id);
                if(transaction == null){
                    result= new Result().WithError(new Error("Transação não encontrada"));
                }
                var listPerson= _unitOfWork.PersonRepository.GetAll();
                var person= listPerson.FirstOrDefault(p=> p.Id == dto.PersonId);
                if(person == null){
                    result= new Result().WithError(new Error("Pessoa não encontrada"));
                }
                if(dto.Type == 1 && person.Age < 18){
                    result= new Result().WithError(new Error("Menores de idade não podem ter Receitas"));
                    return result;
                }

                _mapper.Map(dto, transaction);
                _unitOfWork.Save();
                result= new Result().WithSuccess(new Success("Transação atualizada"));
                return result;
            }catch(Exception e){
                result= new Result().WithError(new Error(e.Message));
                return result;
            }
            

        }
    }

}