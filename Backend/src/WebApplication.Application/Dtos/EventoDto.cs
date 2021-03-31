using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebApplication.Application.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }
        public string Local { get; set; }
        public string DataEvento { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório."),
        StringLength(50, MinimumLength = 3, ErrorMessage = "O campo {0} deve ter no mínimo 4 caracteres e no máximo 50")]
        public string Tema { get; set; }

        [Display(Name = "Quantidade de pessoas"),
         Range(1, 120000, ErrorMessage = "O campo {0} deve ser maior que 1 e menor que 120.000")]
        public int QtdPessoas { get; set; }

        [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$",
            ErrorMessage = "O campo {0} é invalido. A imagem precisa ser (gif, jpeg, bmp ou png)")]
        public string ImagemURL { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório."),
         Phone(ErrorMessage = "O campo {0} é invalido.")]
        public string Telefone { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório."),
        Display(Name = "E-mail"),
        EmailAddress(ErrorMessage = "O {0} deve ser válido.")]
        public string Email { get; set; }
        public IEnumerable<LoteDto> Lotes { get; set; }
        public IEnumerable<RedeSocialDto> RedesSociais { get; set; }
        public IEnumerable<PalestranteDto> Palestrantes { get; set; }
    }
}
