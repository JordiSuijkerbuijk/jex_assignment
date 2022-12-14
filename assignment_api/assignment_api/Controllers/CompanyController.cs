using assignment_api.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace assignment_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly DataContext _context;

        public CompanyController(DataContext context) 
        { 
            _context = context; 
        }

        [HttpGet]
        public async Task<ActionResult<List<Company>>> getCompanies()
        {
            return Ok(await _context.Company.ToListAsync());
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Company>> getCompany(int id)
        {
            try
            {
                var result = await _context.Company.FindAsync(id);

                if (result == null) return NotFound();

                return result;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }


        [HttpPost]
        public async Task<ActionResult<List<Company>>> CreateCompany(Company company)
        {
            _context.Company.Add(company);
            await _context.SaveChangesAsync();

            return Ok(await _context.Company.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Company>>> UpdateCompany(Company company)
        {
            var heroInDb = await _context.Company.FindAsync(company.Id);

            if (heroInDb== null)
            {
                return BadRequest("Company not found");
            }

            heroInDb.Name = company.Name;
            heroInDb.Address = company.Address; 

            await _context.SaveChangesAsync();

            return Ok(await _context.Company.ToListAsync());
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<List<Company>>> DeleteCompany(int id)
        {
            var heroInDb = await _context.Company.FindAsync(id);

            if (heroInDb == null)
            {
                return BadRequest("Company not found");
            }

            _context.Company.Remove(heroInDb);
            await _context.SaveChangesAsync();

            return Ok(await _context.Company.ToListAsync());
        }
    }
}
