using System;

namespace ModelsOfCars.Contracts
{
    public class Car
    {
        public Guid Id { get; set; }
        public Guid BrandId { get; set; }
        public string BrandName { get; set; }
        public string Model { get; set; }
        public DateTimeOffset CreationDate { get; set; }
        public Guid BodyTypeId { get; set; }
        public string BodyTypeName { get; set; }
        public int SeatsCount { get; set; }
        public string Url { get; set; }
        public byte[] Photo { get; set; }
    }
}
