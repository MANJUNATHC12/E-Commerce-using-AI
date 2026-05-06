using Microsoft.EntityFrameworkCore;
using my_app_api.Data; // ✅ your DbContext namespace

var builder = WebApplication.CreateBuilder(args);

// ✅ CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// ✅ ADD THIS (MOST IMPORTANT FIX)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddControllers();

var app = builder.Build();

// ✅ CORS
app.UseCors("AllowReact");

app.MapControllers();

app.Run();