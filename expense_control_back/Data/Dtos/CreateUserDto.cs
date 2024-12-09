using System.ComponentModel.DataAnnotations;

namespace ExpenseControl.Data.Dto
{
    public class CreateUserDto{
        public required string Login{get;set;}
        [MinLength(6, ErrorMessage = "A senha deve ter no mínimo 6 caracteres")]
        public required string Password{get;set;}

        [Compare("Password", ErrorMessage = "As senhas não conferem")]
         public required string ConfirmPassword{get;set;}

         
    }
}