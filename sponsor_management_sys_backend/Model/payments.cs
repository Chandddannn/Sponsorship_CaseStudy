namespace sponsor_management_sys_backend.Model
{
    public class payments
    {
        public int payment_id { get; set; }
        public DateTime payment_date { get; set; }
        public decimal amount_paid { get; set; }
        public int contract_id { get; set; }
        public string payment_status { get; set; } 
    }
}
