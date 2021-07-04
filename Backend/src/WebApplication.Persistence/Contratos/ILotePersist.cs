using System.Threading.Tasks;
using WebApplication.Domain;

namespace WebApplication.Persistence.Contratos
{
    public interface ILotePersist
    { 
        Task<Lote[]> GetLotesByEventoIdAsync(int eventoId);
        Task<Lote> GetLoteByIdsAsync(int eventoId, int id);
    }
}