

namespace ExpenseControl.Utils
{
    public class Hasher
    {
        public static string Hash(string password)
        {
            Console.WriteLine("Hashing password");

            var hashed= BCrypt.Net.BCrypt.HashPassword(password);
            Console.WriteLine("Password hashed");
              Console.WriteLine(hashed.ToString());
            return hashed;
        }
    
        public static bool VerifyHash(string password, string hash)
        {
            Console.WriteLine("Verifying password");
            var result= BCrypt.Net.BCrypt.Verify(password, hash);
            Console.WriteLine("Password verified");
            return result;
        }
    }
}