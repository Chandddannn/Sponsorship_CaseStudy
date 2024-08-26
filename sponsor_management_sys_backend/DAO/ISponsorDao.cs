using sponsor_management_sys_backend.Model;
using System.Threading.Tasks;
namespace sponsor_management_sys_backend.DAO
{
    public interface ISponsorDao
    {
        Task<bool> IsContractValid(int contractId);
        Task<int> AddPayment(payments payment);

        Task<IEnumerable<SponsorPaymentSummary>> GetSponsorPaymentSummaries();

        Task<IEnumerable<MatchPaymentSummary>> GetMatchPaymentSummaries();

        Task<IEnumerable<SponsorMatchCount>> GetSponsorMatchCountsAsync(int year);
    }
}
