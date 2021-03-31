using AutoMapper;
using WebApplication.Domain;
using WebApplication.Application.Dtos;

namespace WebApplication.Application.Helpers
{
    public class ApplicationProfile : Profile
    {
            

        public ApplicationProfile()
        {
            CreateMap<Evento, EventoDto>().ReverseMap();
            CreateMap<Lote, LoteDto>().ReverseMap();
            CreateMap<RedeSocial, RedeSocialDto>().ReverseMap();
            CreateMap<Palestrante, PalestranteDto>().ReverseMap();
        }
    }
}
