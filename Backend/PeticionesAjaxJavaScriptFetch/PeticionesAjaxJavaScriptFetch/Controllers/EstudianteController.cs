using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PeticionesAjaxJavaScriptFetch.Models;
using PeticionesAjaxJavaScriptFetch.ModelsView;

namespace PeticionesAjaxJavaScriptFetch.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstudianteController : ControllerBase
    {
        private readonly ApplicationDbContext db;

        public EstudianteController(ApplicationDbContext db)
        {
            this.db = db;
        }

        [HttpGet("[action]")]

        public async Task<IEnumerable<EstudianteModelGet>> ListarEstudiantes()
        {
            List<Estudiante> estudiantes = await db.Estudiante.ToListAsync();
            return estudiantes.Select(k => new EstudianteModelGet
            {
                id_estudiante = k.id_estudiante,
                nombre_completo = k.nombre_completo,
                identificacion = k.identificacion,
                carrera = k.carrera,
                semestre = k.semestre
            });
        }

        [HttpGet("[action]/{id}")]

        public async Task<ActionResult<EstudianteModelGet>> MostrarEstudiante(int id)
        {
            Estudiante estudiante = await db.Estudiante
                .Where(k => k.id_estudiante == id)
                .FirstOrDefaultAsync();
            if(estudiante == null)
            {
                return NotFound();
            }
            return new EstudianteModelGet
            {
                id_estudiante = estudiante.id_estudiante,
                nombre_completo = estudiante.nombre_completo,
                identificacion = estudiante.identificacion,
                carrera = estudiante.carrera,
                semestre = estudiante.semestre
            };
        }

        [HttpPost("[action]")]

        public async Task<ActionResult<EstudianteModelPost>> 
            CrearEstudiante([FromBody] EstudianteModelPost model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Estudiante estudiante = new Estudiante();
            estudiante.nombre_completo = model.nombre_completo;
            estudiante.identificacion = model.identificacion;
            estudiante.carrera = model.carrera;
            estudiante.semestre = model.semestre;

            await db.Estudiante.AddAsync(estudiante);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPut("[action]/{id}")]

        public async Task<ActionResult<EstudianteModelPost>> 
            ActualizarEstudiante([FromBody] EstudianteModelPost model, int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Estudiante estudiante = await db.Estudiante
                .Where(k => k.id_estudiante == id)
                .FirstOrDefaultAsync();

            estudiante.nombre_completo = model.nombre_completo;
            estudiante.identificacion = model.identificacion;
            estudiante.carrera = model.carrera;
            estudiante.semestre = model.semestre;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpDelete("[action]/{id}")]

        public async Task<ActionResult<Estudiante>> 
            EliminarEstudiante(int id)
        {
            Estudiante estudiante = await db.Estudiante
                .Where(k => k.id_estudiante == id)
                .FirstOrDefaultAsync();
            if (estudiante == null)
            {
                return NotFound();
            }

            db.Estudiante.Remove(estudiante);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest();
            }

            return NoContent();
        }
    }
}