using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace ExpenseControl.Model
{
    public class TransactionModel
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public decimal Value { get; set; }
        //0=DESPESA 
        //1=RECEITA
        [Required]
        public int Type { get; set; }
        [Required]
        [ForeignKey("PersonId")]
        public int PersonId { get; set;}
        public virtual PersonModel Person{get;set;}
    }
}