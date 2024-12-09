using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExpenseControl.Model

{
    public class UserModel
    {
        [Key]
        public int Id {get;set;}
        [Required]
        public string Login { get; set; }
        [Required]
        public string Password { get; set; }
        public virtual   ICollection<PersonModel>? People{get;set;}
    }
}