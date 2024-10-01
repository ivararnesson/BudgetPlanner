namespace BudgetPlanner.API.Models
{
    public class Expenses
    {
        public int Id { get; set; }
        public int PersonId { get; set; }
        public decimal Amount { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
