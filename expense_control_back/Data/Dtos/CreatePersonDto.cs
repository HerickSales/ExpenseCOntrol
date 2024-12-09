namespace ExpenseControl.Data.Dto
{
    public class CreatePersonDto{
        public required string Name{get;set;}
        public required int Age{get;set;}

        public required int UserId{get;set;}
    }
}
