namespace sponsor_management_sys_backend.Model
{
    public class MatchPaymentSummary
    {
        public int MatchId { get; set; }
        public string MatchName { get; set; }
        public string MatchDate { get; set; }  // Changed to string
        public string Location { get; set; }
        public decimal TotalPayments { get; set; }

        // Method to set the match date as a formatted string
        public void SetMatchDate(DateTime date)
        {
            MatchDate = date.ToString("yyyy-MM-dd");
        }
    }
}
