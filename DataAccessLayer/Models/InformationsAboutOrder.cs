using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Models
{
    public class InformationsAboutOrder
    {
        public string ClientName { get; set; }
        public string ClientAdress { get; set; }
        public string ClientPostCode { get; set; }
        public List<ProductsWithCount> OrderedProducts { get; set; } = new List<ProductsWithCount>();
        public decimal Discount { get; set; }
    }


    public class ProductsWithCount
    {
        public string Name { get; set; }
        public int OrderedCount { get; set; }
        public decimal Price { get; set; }
    }
}
