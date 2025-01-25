//this file is the database context, the main class that coordinates Entity Framework (the Microsoft.EntityFrameworkCore.DbContext class) functionality for a data model
using Microsoft.EntityFrameworkCore;

namespace TripApi.Models;

public class TripContext : DbContext
{
    public TripContext(DbContextOptions<TripContext> options)
        : base(options)
        {

        }

        public DbSet<TripItem> TripItems { get; set; } = null!;
}

//in line 14, DbSet<TripItem> represents a collection of entities of type TripItem (the object in the model). it is used by the entitiy framework to query and save instances of TripItem to the database. each DbSet maps to a table in the database (TripItems)
//the null! snytax sppresses nullable reference type warnings. EF Core intializes DbSet properties automatically at runtime, so they will never actually be null during the apps operation. the compiler might generate a warning bc the property is not explcitly initialized in the constructor or elsewhere. this null! ignores these warnings, because the property will be initialized by the framework.
//DbSet properties reperesent collections of entities (an object, one row in the TripItem table) that are mapped to database tables. they are gateways for performing CRUD operations on the database through the EF Core context