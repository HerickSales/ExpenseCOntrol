using System.ComponentModel.DataAnnotations;

namespace ExpenseControl.Data.Dto
{
    public class LoginUserDto{
        public required string Login{get;set;}
        public required string Password{get;set;}
    }
}