using Microsoft.EntityFrameworkCore;
using my_app_api.Models;
using System.Collections.Generic;

namespace my_app_api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
    }
}