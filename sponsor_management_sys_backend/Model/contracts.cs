namespace sponsor_management_sys_backend.Model
{
    public class contracts
    {
        public int contract_id { get; set; }
        public int sponsor_id { get; set; }
        public int match_id { get; set; }
        public DateTime contract_date { get; set; }
        public decimal contract_value { get; set; }
    }
}
