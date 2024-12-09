using Microsoft.EntityFrameworkCore;
using ExpenseControl.Model;

namespace ExpenseControl.Data.Context
{
    public class ExpenseControlContext : DbContext
    {
           public ExpenseControlContext(DbContextOptions<ExpenseControlContext> options):base(options)
           {}
            
        
        public DbSet<UserModel> Users { get; set; }
        public DbSet<PersonModel> Person { get; set; }
        public DbSet<TransactionModel> Transactions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {   
            //Relacionamento user->person
            modelBuilder.Entity<UserModel>()
            .HasMany(u=> u.People)
            .WithOne(p=> p.User)
            .HasForeignKey(p=> p.UserId);


            //Relacionamento Person -> transaction

            modelBuilder.Entity<PersonModel>()
            .HasMany(p=> p.Transactions)
            .WithOne(t=> t.Person)
            .HasForeignKey(t=> t.PersonId);

            modelBuilder.Entity<TransactionModel>()
            .Property(t=> t.Value).HasPrecision(10,2);  
        }
    }
}
