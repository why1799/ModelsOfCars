using ModelsOfCars.Contracts.Configuration.Interfaces;

namespace ModelsOfCars.Contracts.Configuration
{
    public class DbConnectionConfig : IDbConnectionConfig
    {
        public string Host { get; set; }
        public int Port { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Database { get; set; }

        public override string ToString()
        {
            return $"Host={Host};Port={Port};Database={Database};Username={Username};Password={Password}";
        }
    }
}
