namespace assignment_api
{
    public class Vacancy
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; } = string.Empty;
        public int? CompanyId { get; set; }
        public Company Company { get; set; }
    }
}
