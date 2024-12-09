using ExpenseControl.Data.Dto;
using ExpenseControl.Model;

namespace ExpenseControl.Profile
{
    public class PersonProfile : AutoMapper.Profile
    {
        public PersonProfile(){
            CreateMap<CreatePersonDto, PersonModel>();

            CreateMap<PersonModel,ReadPersonDto>()
            .ForMember(dto=> dto.Expenses, opt=> opt.MapFrom(
                src=> src.Transactions.Where(t=> t.Type == 0)))
            .ForMember(dto=> dto.Revenues, opt=> opt.MapFrom(
                src=> src.Transactions.Where(t=> t.Type == 1)));

            CreateMap<UpdatePersonDto, PersonModel>();
        }
    }
}