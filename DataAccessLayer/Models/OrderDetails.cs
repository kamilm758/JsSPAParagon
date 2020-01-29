using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DataAccessLayer.Models
{
    public class OrderDetails
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IdOrderDetails { get; set; }
        public int IdOrder { get; set; }
        public int IdProduct { get; set; }
        public decimal UnitPrice { get; set; }
        public int Count { get; set; }
        public decimal Discount { get; set; }
    }

    public class helperModel
    {   
        public int IdOrderDetails { get; set; }
        public int IdOrder { get; set; }
        public int IdProduct { get; set; }
        public string ProductName { get; set; }
        public decimal UnitPrice { get; set; }
        public int Count { get; set; }
        public decimal Discount { get; set; }
        public string ClientName { get; set; }
        public string Adress { get; set; }
        public string PostCode { get; set; }
        public DateTime OrderDate { get; set; }
    }
}
