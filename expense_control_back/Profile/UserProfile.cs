using ExpenseControl.Data.Dto;
using ExpenseControl.Model;
using ExpenseControl.Utils;

namespace ExpenseControl.Profile
{
    public class UserProfile : AutoMapper.Profile
    {
        public UserProfile(){
            CreateMap<CreateUserDto, UserModel>().ForMember(dest=> dest.Password, opt=> opt.MapFrom(src=> Hasher.Hash(src.Password)));

            CreateMap<UserModel,ReadUserDto>();
        }
    }
}