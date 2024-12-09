using ExpenseControl.Data.Context;
using ExpenseControl.Data.UnitOfWork;
using ExpenseControl.Services;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);
Env.Load();
builder.Configuration.AddEnvironmentVariables();



builder.Configuration.AddEnvironmentVariables();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();


builder.Services.AddDbContext<ExpenseControlContext>(options =>
options.UseLazyLoadingProxies().UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
new MySqlServerVersion(new Version(8,0,39))));
builder.Services.AddScoped<UnitOfWork>();

builder.Services.AddScoped<UnitOfService>();
builder.Services.AddHttpClient();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalHost",
        policy => policy.WithOrigins("http://localhost:5173") //  o endereçodo frontend
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AllowLocalHost");
app.UseHttpsRedirection();
app.MapControllers();


app.Run();
