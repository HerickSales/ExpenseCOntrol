using AutoMapper;
using ExpenseControl.Data.Dto;
using ExpenseControl.Data.UnitOfWork;
using ExpenseControl.Model;
using FluentResults;

namespace ExpenseControl.Services
{
    public class PersonService(IMapper mapper, UnitOfWork unitOfWork)
    {
        private IMapper _mapper = mapper;
        private UnitOfWork _unitOfWork = unitOfWork;

        public Result CreatePerson(CreatePersonDto dto)
        {
            Result result;
            try
            {
                var person = _mapper.Map<PersonModel>(dto);
                _unitOfWork.PersonRepository.Add(person);
                _unitOfWork.Save();
                result = new Result().WithSuccess(new Success("Pessoa Criada"));
                return result;
            }
            catch (Exception e)
            {
                result = new Result().WithError(new Error(e.Message));
                return result;
            }
        }

        public Result DeletePerson(int Id)
        {
            Result result;
            try
            {
                var people = _unitOfWork.PersonRepository.GetAll();
                var person = people.FirstOrDefault(p => p.Id == Id);
                if (person == null)
                {
                    result = new Result().WithError(new Error("Pessoa não encontrada"));
                    return result;
                }
                _unitOfWork.PersonRepository.Delete(person);
                _unitOfWork.Save();
                result = new Result().WithSuccess(new Success("Pessoa deletada com sucesso"));
                return result;
            }
            catch (Exception e)
            {
                result = new Result().WithError(new Error(e.Message));
                return result;
            }
        }
        public Result UpdatePerson(UpdatePersonDto dto, int Id)
        {
            Result result;
            try
            {
                var people = _unitOfWork.PersonRepository.GetAll();
                var person = people.FirstOrDefault(p => p.Id == Id);
                if (person == null)
                {
                    result = new Result().WithError(new Error("Pessoa não encontrada"));
                    return result;
                }
                _mapper.Map(dto, person);
                _unitOfWork.Save();
                result = new Result().WithSuccess(new Success("Pessoa atualizada com sucesso"));
                return result;
            }
            catch (Exception e)
            {
                result = new Result().WithError(new Error(e.Message));
                return result;
            }

        }

        public Result GetPersonById(int Id){
            Result result;
            try
            {
                var people = _unitOfWork.PersonRepository.GetAll();
                var person = people.FirstOrDefault(p => p.Id == Id);
                var personDto= _mapper.Map<ReadPersonDto>(person);
                if (person == null)
                {
                    result = new Result().WithError(new Error("Pessoa não encontrada"));
                    return result;
                }
                result= new Result().WithSuccess(new Success("Pessoa encontrada").WithMetadata("person", personDto));
                return result;
           
            }
            catch (Exception e)
            {
                result = new Result().WithError(new Error(e.Message));
                return result;
            }
        }
       
        
    }

}