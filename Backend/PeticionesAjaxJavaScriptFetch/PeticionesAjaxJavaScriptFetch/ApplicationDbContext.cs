using Microsoft.EntityFrameworkCore;
using PeticionesAjaxJavaScriptFetch.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PeticionesAjaxJavaScriptFetch
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            :base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Estudiante>()
                .HasIndex(k => k.identificacion)
                .IsUnique();
        }

        public DbSet<Estudiante> Estudiante { get; set; }
    }
}
