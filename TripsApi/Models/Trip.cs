namespace TripApi.Models; //a namespace is the parent of a group of classes, it is a way to organize classes. it allows a user to use these classes in different components of the project

public class TripItem //a class is a reference type. here an object is assigned to it, and the variable TripItem holds a reference to the location of the object
{
    public long Id { get; set; } //get and set are autoimplemented properties. When compiled, the "complier automatically generates a private backing field to store the vaue of the property. allows you to read the value and assign the value"
    public string? Name { get; set; } // the ? indicates that the value can be null
    public required string Location { get; set; }
    public DateOnly Start_Date { get; set; }
    public DateOnly End_Date { get; set; }
}