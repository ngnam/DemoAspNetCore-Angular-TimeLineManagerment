using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeLineManager.Data.Models;

namespace TimeLineManager.Data
{
    public class DatabaseDbContext : DbContext
    {
        #region Constructor
        public DatabaseDbContext(): base()
        {

        }
        public DatabaseDbContext(DbContextOptions options): base(options)
        {

        }
        #endregion

        #region Method
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Map table names
            modelBuilder.Entity<Coupon>(entity => {
                entity.ToTable("Coupons");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.Status).HasMaxLength(10);
                entity.Property(e => e.Title).HasMaxLength(500);
                entity.Property(e => e.Thumbnail).HasMaxLength(500);
            });
            modelBuilder.Entity<Link>(entity => {
                entity.ToTable("Links");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.Url).HasMaxLength(500);
                entity.Property(e => e.Title).HasMaxLength(500);
                entity.Property(e => e.Desc).HasMaxLength(500);
                entity.Property(e => e.Thumbnail).HasMaxLength(500);
            });
            modelBuilder.Entity<Sticker>(entity => {
                entity.ToTable("Stickers");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.Url).HasMaxLength(500);
            });
            modelBuilder.Entity<Survey>(entity => {
                entity.ToTable("Surveys");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.Status).HasMaxLength(10);
                entity.Property(e => e.Title).HasMaxLength(500);
                entity.Property(e => e.Thumbnail).HasMaxLength(500);
            });
            modelBuilder.Entity<Post>(entity =>
            {
                entity.ToTable("Posts");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.Type).IsRequired().HasMaxLength(10);
                entity.Property(e => e.Status).IsRequired().HasMaxLength(10);
                entity.Property(e => e.Images).HasColumnType("text");
                entity.Property(e => e.Video).HasColumnType("text");
                entity.Property(e => e.Sticker).HasColumnType("text");
                entity.Property(e => e.Coupon).HasColumnType("text");
                entity.Property(e => e.Link).HasColumnType("text");
                entity.Property(e => e.Survey).HasColumnType("text");
            });

        }
        #endregion

        #region Properties
        public DbSet<Coupon> Coupons { get; set; }
        public DbSet<Link> Links { get; set; }
        public DbSet<Sticker> Stickers { get; set; }
        public DbSet<Survey> Surveys { get; set; }
        public DbSet<Post> Posts { get; set; }
        #endregion
    }
}
