using assignment_api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace assignment_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VacancyController : Controller
    {

        private readonly DataContext _context;

        public VacancyController(DataContext context)
        {
            _context = context;
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<List<Vacancy>>> getVacancies(int id)
        {
            var vacancyList = await _context.Vacancy.Include(x => x.Company).Where(x => x.Company.CompanyId == id).ToListAsync();

            if (vacancyList != null) {
                return Ok(vacancyList);
            }

            return BadRequest();
        }


        [HttpPost]
        public async Task<ActionResult<List<Vacancy>>> CreateVacancy(Vacancy vacancy)
        {
            var company = await _context.Company.SingleOrDefaultAsync(c => c.CompanyId == vacancy.Company.CompanyId);

            if (company != null)
            {
                vacancy.Company = company;
                _context.Vacancy.Add(vacancy);
                await _context.SaveChangesAsync();

                return Ok(await _context.Vacancy.Include(x => x.Company).Where(x => x.Company.CompanyId == company.CompanyId).ToListAsync());
            }

            return BadRequest();
        }

        [HttpPut]
        public async Task<ActionResult<List<Vacancy>>> UpdateVacancy(Vacancy vacancy)
        {
            var vanacyInDb = await _context.Vacancy.Include(x => x.Company).SingleOrDefaultAsync(item => item.Id == vacancy.Id);

            if (vanacyInDb == null)
            {
                return BadRequest("Vacancy not found");
            }

            vanacyInDb.Title = vacancy.Title;
            vanacyInDb.Description = vacancy.Description;
            await _context.SaveChangesAsync();

            return Ok(await _context.Vacancy.Include(x => x.Company).Where(x => x.Company.CompanyId == vacancy.Company.CompanyId).ToListAsync());
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<List<Vacancy>>> DeleteVacancy(int id)
        {
            var vanacyInDb = await _context.Vacancy.Include(x => x.Company).SingleOrDefaultAsync(item => item.Id == id);

            if (vanacyInDb == null)
            {
                return BadRequest("Vacancy not found");
            }

            _context.Vacancy.Remove(vanacyInDb);
            await _context.SaveChangesAsync();

            return Ok(await _context.Vacancy.Include(x => x.Company).Where(x => x.Company.CompanyId == vanacyInDb.Company.CompanyId).ToListAsync());
        }
    }
}
