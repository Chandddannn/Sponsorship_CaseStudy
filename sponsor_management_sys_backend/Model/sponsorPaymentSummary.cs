namespace sponsor_management_sys_backend.Model
{
    public class SponsorPaymentSummary
    {
        public int SponsorId { get; set; }
        public string SponsorName { get; set; }
        public string IndustryType { get; set; }
        public string ContactEmail { get; set; }
        public string Phone { get; set; }
        public decimal TotalPayments { get; set; }
        public int NumberOfPayments { get; set; }
        public string LatestPaymentDate { get; set; }  // Nullable to handle cases where no payments have been made


        public void SetLatestPaymentDate(DateTime? date)
        {
            LatestPaymentDate = date?.ToString("yyyy-MM-dd");
        }
    }
}
