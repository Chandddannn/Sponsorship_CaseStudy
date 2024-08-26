namespace sponsor_management_sys_backend.Model
{
    public class SponsorMatchCount
    {
        public int SponsorId { get; set; }
        public string SponsorName { get; set; }
        public string IndustryType { get; set; }
        public string ContactEmail { get; set; }
        public string Phone { get; set; }
        public int MatchCount { get; set; }
    }
}
