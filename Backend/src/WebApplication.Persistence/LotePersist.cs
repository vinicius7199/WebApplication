using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApplication.Domain;
using WebApplication.Persistence.Contexto;
using WebApplication.Persistence.Contratos;

namespace WebApplication.Persistence
{
    public class LotePersist : ILotePersist
    {
        private readonly DataContext _context;

        public LotePersist(DataContext context)
        {
            _context = context;
        }

        public async Task<Lote> GetLoteByIdsAsync(int eventoId, int id)
        {
            IQueryable<Lote> query = _context.Lotes;

            query = query.AsNoTracking()
                        .Where(lote => lote.EventoId == eventoId && lote.Id == id);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Lote[]> GetLotesByEventoIdAsync(int eventoId)
        {
            IQueryable<Lote> query = _context.Lotes;

            query = query.AsNoTracking()
                        .Where(lote => lote.EventoId == eventoId);

            return await query.ToArrayAsync();
        }
    }
}