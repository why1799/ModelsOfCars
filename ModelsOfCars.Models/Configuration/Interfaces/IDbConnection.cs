namespace ModelsOfCars.Contracts.Configuration.Interfaces
{
    public interface IDbConnectionConfig
    {
        string Database { get; set; }
        string Host { get; set; }
        string Password { get; set; }
        int Port { get; set; }
        string Username { get; set; }

        string ToString();
    }
}