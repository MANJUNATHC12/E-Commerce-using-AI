using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using my_app_api.Data;
using my_app_api.Models;

namespace my_app_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
            Console.WriteLine(_context.Database.GetDbConnection().Database);
        }


        // REGISTER
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // 👈 this will show exact error
            }


            /*if (string.IsNullOrWhiteSpace(model.Name) ||
                string.IsNullOrWhiteSpace(model.Email) ||
               string.IsNullOrWhiteSpace(model.Phonenumber) ||
           string.IsNullOrWhiteSpace(model.Password))
            {
                return BadRequest(new { message = "All fields are mandatory" });
            }


            if (string.IsNullOrWhiteSpace(model.Name))
            {
                return BadRequest(
                    new
                    {
                        message = "Name is required12345"
                    });
            }

            if (string.IsNullOrWhiteSpace(model.Email))
            {
                return BadRequest(
                    new
                    {
                        message = "Email is required"
                    });
            }

            if (string.)
            {
                return BadRequest(
                    new
                    {
                        message = "phonenumber is required"
                    });
            }

            if (string.IsNullOrWhiteSpace(model.Password))
            {
                return BadRequest(
                    new
                    {
                        message = "Password is required"
                    });
            }*/



            var existingUser = _context.Users
                        .FirstOrDefault(u => u.Email == model.Email);

            if (existingUser != null)
            {
                return BadRequest(new { message = "Email already exists" });
            }

            var user = new User
            {
                Name = model.Name,
                Email = model.Email,
                PhoneNumber = model.Phonenumber,
                Password = model.Password
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(user);
        }
        // LOGIN
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto login)
        {
            var user = _context.Users
                .FirstOrDefault(u => u.Email == login.Email && u.Password == login.Password);

            if (user == null)
                return Unauthorized("Invalid credentials");

            //return Ok("Login successful");

            return Ok(new
            {
                name = user.Name,
                email = user.Email,
                phoneNumber = user.PhoneNumber
            });
        }

        // FORGOT PASSWORD
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto model)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == model.Email);
            if (user == null)
            {
                return BadRequest(new { message = "Email not found" });
            }

            user.Password = model.NewPassword;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Password updated successfully" });
        }
    }
}