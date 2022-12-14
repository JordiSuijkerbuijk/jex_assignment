using assignment_api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace assignment_api.Controllers
{
    public class VacancyController : Controller
    {

        private readonly DataContext _context;

        public VacancyController(DataContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<List<Vacancy>>> getVacancies()
        {
            return Ok(await _context.Vacancy.ToListAsync());
        }


        [HttpPost]
        public async Task<ActionResult<List<Vacancy>>> CreateVacancy(Vacancy vacancy)
        {
            _context.Vacancy.Add(vacancy);
            await _context.SaveChangesAsync();

            return Ok(await _context.Vacancy.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Vacancy>>> UpdateVacancy(Vacancy vacancy)
        {
            var vanacyInDb = await _context.Vacancy.FindAsync(vacancy.Id);

            if (vanacyInDb == null)
            {
                return BadRequest("Vacancy not found");
            }

            vanacyInDb.Title = vacancy.Title;
            vanacyInDb.Description = vacancy.Description;

            await _context.SaveChangesAsync();

            return Ok(await _context.Vacancy.ToListAsync());
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<List<Vacancy>>> DeleteVacancy(int id)
        {
            var vanacyInDb = await _context.Vacancy.FindAsync(id);

            if (vanacyInDb == null)
            {
                return BadRequest("Vacancy not found");
            }

            _context.Vacancy.Remove(vanacyInDb);
            await _context.SaveChangesAsync();

            return Ok(await _context.Vacancy.ToListAsync());
        }
    }
}
