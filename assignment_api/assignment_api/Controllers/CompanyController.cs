using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace assignment_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<Company>>> getCompanies()
        {
            return new List<Company>
            {
                new Company
                {
                    Id = 1,
                    Name = "Test",
                    Address = "Test"
                }
            };
        }
    }
}
