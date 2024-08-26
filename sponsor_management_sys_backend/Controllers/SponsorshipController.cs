using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using sponsor_management_sys_backend.DAO;
using sponsor_management_sys_backend.Model;
using System.Threading.Tasks;

namespace sponsor_management_sys_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SponsorshipController : ControllerBase
    {
        private readonly ISponsorDao _sponsorDao;

        public SponsorshipController(ISponsorDao sponsorDao)
        {
            _sponsorDao = sponsorDao;
        }

        [HttpPost("add-payment")]
        public async Task<IActionResult> AddPayment([FromBody] payments payment)
        {
            DateTime dateValue = DateTime.Now.Date; // Get only the date part
            DateTime paymentDate = payment.payment_date.Date; // Get only the date part of payment_date

            if (paymentDate == dateValue)
            {
                return BadRequest("payment_date is required.");
            }

            if (payment.amount_paid <= 0)
            {
                return BadRequest("amount must be greater than zero");
            }

            // Validate payment_status before inserting
            var validStatuses = new List<string> { "Pending", "Completed", "Failed" }; // Example valid statuses
            if (!validStatuses.Contains(payment.payment_status))
            {
                return BadRequest("Invalid payment status.");
            }

            try
            {
                var payment_id = await _sponsorDao.AddPayment(payment);
                return CreatedAtAction(nameof(AddPayment), new { id = payment_id }, payment);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server error {ex.Message}");
            }
        }

        [HttpGet("sponsor-payment-summary")]
        public async Task<ActionResult<IEnumerable<SponsorPaymentSummary>>> GetSponsorPaymentSummaries()
        {
            try
            {
                var summaries = await _sponsorDao.GetSponsorPaymentSummaries();
                return Ok(summaries);
            }
            catch (Exception ex)
            {
                // Handle any errors that occur during the database operation
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("match-payment-summary")]
        public async Task<ActionResult<IEnumerable<MatchPaymentSummary>>> GetMatchPaymentSummaries()
        {
            try
            {
                var summaries = await _sponsorDao.GetMatchPaymentSummaries();
                return Ok(summaries);
            }
            catch (Exception ex)
            {
                // Handle any errors that occur during the database operation
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("match-counts")]
        public async Task<ActionResult<IEnumerable<SponsorMatchCount>>> GetSponsorMatchCounts([FromQuery] int year)
        {
            if (year <= 0)
            {
                return BadRequest("Invalid year parameter.");
            }

            try
            {
                var sponsorMatchCounts = await _sponsorDao.GetSponsorMatchCountsAsync(year);
                return Ok(sponsorMatchCounts);
            }
            catch (Exception ex)
            {
                // Handle any errors that occur during the database operation
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
