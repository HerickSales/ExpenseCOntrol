using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Transactions;

namespace ExpenseControl.Model
{
    public class PersonModel
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int Age { get; set; }

        [ForeignKey("UserId")]
        public int UserId {get;set;}
        public virtual UserModel User{get;set;}
        public virtual ICollection<TransactionModel>? Transactions { get; set; }
    }
}