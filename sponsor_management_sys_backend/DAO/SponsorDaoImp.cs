using System.Data;
using Npgsql;
using sponsor_management_sys_backend.Model;
using sponsor_management_sys_backend.DAO;
using System.Threading.Tasks;
using System.Runtime.InteropServices;

namespace sponsor_management_sys_backend.DAO
{
    public class SponsorDaoImp : ISponsorDao
    {
        private readonly string _connectionString;

        public SponsorDaoImp(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async Task<bool> IsContractValid(int contractId)
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                var command = new NpgsqlCommand(
                    "SELECT COUNT(*) FROM sponsor_manage_sys.contracts c " +
                    "JOIN sponsor_manage_sys.matches m ON c.match_id = m.match_id " +
                    "WHERE c.contract_id = @contractId AND m.match_date IS NOT NULL",
                    connection);
                command.Parameters.AddWithValue("@contractId", contractId);

                var result = (long)await command.ExecuteScalarAsync();
                return result > 0;
            }
        }

        public async Task<int> AddPayment(payments payment)
        {
            using (var connection = new NpgsqlConnection(_connectionString))
            {
                await connection.OpenAsync();

                if (!await IsContractValid(payment.contract_id))
                {
                    throw new InvalidOperationException("the contract id is not valid");
                }

                var command = new NpgsqlCommand(@"
                INSERT INTO sponsor_manage_sys.payments (payment_date, amount_paid, contract_id, payment_status) 
                VALUES (@payment_date, @amount_paid, @contract_id, @payment_status) 
                RETURNING payment_id", connection);

                command.Parameters.AddWithValue("@payment_date", payment.payment_date);
                command.Parameters.AddWithValue("@amount_paid", payment.amount_paid);
                command.Parameters.AddWithValue("@contract_id", payment.contract_id);
                command.Parameters.AddWithValue("@payment_status", payment.payment_status);

                var paymentId = (int)await command.ExecuteScalarAsync();
                return paymentId;
            }
        }

        public async Task<IEnumerable<SponsorPaymentSummary>> GetSponsorPaymentSummaries()
        {
            var summaries = new List<SponsorPaymentSummary>();

            using var connection = new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();

            string query = @"
                select 
                    s.sponsor_id,
                    s.sponsor_name,
                    s.industry_type,
                    s.contact_email,
                    s.phone,
                    coalesce(SUM(p.amount_paid), 0) as total_payments,
                    count(p.payment_id) as number_of_payments,
                    max(p.payment_date) as latest_payment_date
                from 
                    sponsor_manage_sys.sponsors s
                left join 
                    sponsor_manage_sys.contracts c on s.sponsor_id = c.sponsor_id
                left join 
                    sponsor_manage_sys.payments p on c.contract_id = p.contract_id
                group by 
                    s.sponsor_id, s.sponsor_name, s.industry_type, s.contact_email, s.phone
                order by 
                    s.sponsor_name";

            using var command = new NpgsqlCommand(query, connection);
            using var reader = await command.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                var summary = new SponsorPaymentSummary
                { 
                    SponsorId = reader.GetInt32(0),
                    SponsorName = reader.GetString(1),
                    IndustryType = reader.GetString(2),
                    ContactEmail = reader.GetString(3),
                    Phone = reader.GetString(4),
                    TotalPayments = reader.GetDecimal(5),
                    NumberOfPayments = reader.GetInt32(6)
                };
                summary.SetLatestPaymentDate(reader.IsDBNull(7) ? (DateTime?)null : reader.GetDateTime(7));

                summaries.Add(summary);

            }

            return summaries;
        }

        public async Task<IEnumerable<MatchPaymentSummary>> GetMatchPaymentSummaries()
        {
            var summaries = new List<MatchPaymentSummary>();

            using var connection = new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();

            string query = @"
                select 
                    m.match_id,
                    m.match_name,
                    m.match_date,
                    m.location,
                    COALESCE(SUM(p.amount_paid), 0) as total_payments
                from 
                    sponsor_manage_sys.matches m
                left join 
                    sponsor_manage_sys.contracts c on m.match_id = c.match_id
                left join 
                    sponsor_manage_sys.payments p on c.contract_id = p.contract_id
                group by 
                    m.match_id, m.match_name, m.match_date, m.location
                order by 
                    m.match_date;";

            using var command = new NpgsqlCommand(query, connection);
            using var reader = await command.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                var summary = new MatchPaymentSummary
                {
                    MatchId = reader.GetInt32(0),
                    MatchName = reader.GetString(1),
                    Location = reader.GetString(3),
                    TotalPayments = reader.GetDecimal(4)
                };

                // Set the date formatted as a string
                summary.SetMatchDate(reader.GetDateTime(2));

                summaries.Add(summary);
            }

            return summaries;
        }


        public async Task<IEnumerable<SponsorMatchCount>> GetSponsorMatchCountsAsync(int year)
        {
            var sponsorMatchCounts = new List<SponsorMatchCount>();

            using var connection = new NpgsqlConnection(_connectionString);
            await connection.OpenAsync();

            string query = @"
                select 
                    s.sponsor_id,
                    s.sponsor_name,
                    s.industry_type,
                    s.contact_email,
                    s.phone,
                    count(distinct c.match_id) as match_count
                from 
                    sponsor_manage_sys.sponsors s
                join 
                    sponsor_manage_sys.contracts c on s.sponsor_id = c.sponsor_id
                join 
                    sponsor_manage_sys.matches m on c.match_id = m.match_id
                where 
                    extract(year from m.match_date) = @year
                group by 
                    s.sponsor_id, s.sponsor_name, s.industry_type, s.contact_email, s.phone
                order by 
                    s.sponsor_name;";

            using var command = new NpgsqlCommand(query, connection);
            command.Parameters.AddWithValue("@year", year);

            using var reader = await command.ExecuteReaderAsync();

            while (await reader.ReadAsync())
            {
                sponsorMatchCounts.Add(new SponsorMatchCount
                {
                    SponsorId = reader.GetInt32(0),
                    SponsorName = reader.GetString(1),
                    IndustryType = reader.GetString(2),
                    ContactEmail = reader.GetString(3),
                    Phone = reader.GetString(4),
                    MatchCount = reader.GetInt32(5)
                });
            }

            return sponsorMatchCounts;
        }
    }
}


