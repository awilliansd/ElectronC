using System;
using ElectronCgi.DotNet;

namespace core
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello DOTNET!");
            var connection = new ConnectionBuilder()
                .WithLogging()
                .Build();
            
            connection.On<string, string>("greeting", name => "Hello " + name + " NET");
            
            connection.Listen(); 
        }
    }
}
