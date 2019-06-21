using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PeticionesAjaxJavaScriptFetch.ModelsView
{
    public class EstudianteModelGet
    {
        [Required]
        public int id_estudiante { get; set; }

        [Required]
        [MaxLength(65)]
        public string nombre_completo { get; set; }

        [Required]
        [MaxLength(15)]
        public string identificacion { get; set; }

        [Required]
        [MaxLength(65)]
        public string carrera { get; set; }

        [Required]
        public int semestre { get; set; }
    }
}
