using Microsoft.EntityFrameworkCore;
using TripApi.Models;


string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        builder =>
        {
            builder.WithOrigins(
                "https://localhost:5098", "*")
                    .AllowAnyHeader()
                    .AllowAnyMethod();
        });
});
builder.Services.AddControllers();
builder.Services.AddDbContext<TripContext>(opt =>
    opt.UseInMemoryDatabase("TripList"));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(MyAllowSpecificOrigins);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// app.MapGet("/", () => "Hello World!");

// app.MapGet("/trips", async(TripDb db) => await db.Trips.ToListAsync());

// app.MapPost("/pizzas", async(PizzaDb db, Pizza pizza) => {
//     await db.Pizzas.AddAsync(pizza);
//     await db.SaveChangesAsync();
//     return Results.Created($"/pizzas/{pizza.Id}", pizza);
// });

// app.MapPut("/pizzas/{id}", async (PizzaDb db, Pizza updatePizza, int id) =>
// {
//   var pizzaItem = await db.Pizzas.FindAsync(id);
//   if (pizzaItem is null) return Results.NotFound();
//   pizzaItem.Name = updatePizza.Name;
//   pizzaItem.Description = updatePizza.Description;
//   await db.SaveChangesAsync();
//   return Results.NoContent();
// });

// app.MapDelete("/pizzas/{id}", async (PizzaDb db, int id) =>
// {
//   var todo = await db.Pizzas.FindAsync(id);
//   if (todo is null)
//   {
//     return Results.NotFound();
//   }
//   db.Pizzas.Remove(todo);
//   await db.SaveChangesAsync();
//   return Results.Ok();
// });

app.Run();
