using AutoMapper;
using ExpenseControl.Data.Dto;
using ExpenseControl.Data.UnitOfWork;
using ExpenseControl.Model;
using ExpenseControl.Utils;
using FluentResults;

namespace ExpenseControl.Services
{
    public class UserService(IMapper mapper, UnitOfWork unitOfWork){
        private IMapper _mapper= mapper;
        private UnitOfWork _unitOfWork= unitOfWork;

        public Result Register(CreateUserDto dto){

            Result result;
            try{
                var user= _mapper.Map<UserModel>(dto);
                _unitOfWork.UserRepository.Add(user);
                _unitOfWork.Save();
                result = new Result().WithSuccess(new Success("Usuario Criado"));
                return result;
            }catch(Exception e){
                result = new Result().WithError(new Error(e.Message));
                return result;
            }
        }
        public Result Login(LoginUserDto dto){
            Result result;
            try{    
                var users = _unitOfWork.UserRepository.GetAll();
                var user= users.Find(u=> u.Login== dto.Login);
                if(user == null){
                    result = new Result().WithError(new Error("Usuario ou senha incorretos"));
                    return result;
                }
                if(Hasher.VerifyHash(dto.Password, user.Password)){
                    result = new Result().WithSuccess(new Success("Login feito com sucesso")
                    .WithMetadata("User",_mapper.Map<ReadUserDto>(user)));
                    return result;
                }
                result = new Result().WithError(new Error("Usuario ou senha incorretos"));
                return result;                
            }catch(Exception e){
                  result = new Result().WithError(new Error(e.Message));
                  return result;
            }
        }
        public Result GetPeople(int id){
            Result result;
            try{
                var listUser= _unitOfWork.UserRepository.GetAll();
                var user= listUser.FirstOrDefault(e=> e.Id== id);
                if(user != null){
                    List<ReadPersonDto> readPeople= _mapper.Map<List<ReadPersonDto>>(user.People);
                    result= new Result().WithSuccess(new Success("Sucesso").WithMetadata("People", readPeople));
                    return result;
                }
                result= new Result().WithError(new Error("Erro ao encontrar Pessoas"));
                return result;
            }catch(Exception e){
                result= new Result().WithError(new Error(e.Message));
                return result;
            }
        }
    }

}