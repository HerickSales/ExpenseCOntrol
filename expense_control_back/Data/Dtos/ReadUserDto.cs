namespace ExpenseControl.Data.Dto
{
    public  class ReadUserDto{
        public string Login {get;set;}
        public int Id {get;set;}
        public  virtual ICollection<ReadPersonDto> People{get;set;}
    }
}