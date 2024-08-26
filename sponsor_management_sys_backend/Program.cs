using Npgsql;
using sponsor_management_sys_backend.DAO;

namespace sponsor_management_sys_backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Get the connection string from configuration
            var connectionString = builder.Configuration.GetConnectionString("PostgresDB");

            // Register NpgsqlConnection
            builder.Services.AddScoped<NpgsqlConnection>(provider => new NpgsqlConnection(connectionString));

            // Register ISponsorDao with the appropriate constructor parameter
            builder.Services.AddScoped<ISponsorDao>(provider => new SponsorDaoImp(connectionString));

            // Add services to the container.
            builder.Services.AddControllers();

            // CORS configuration
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    builder =>
                    {
                        builder.AllowAnyOrigin()  // Allows all origins. Use specific origins in production.
                               .AllowAnyMethod()
                               .AllowAnyHeader();
                    });
            });


            // Swagger configuration
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("AllowAll");  // Apply CORS policy

            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
    }
}
