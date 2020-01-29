using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DataAccessLayer.Context;
using DataAccessLayer.Models;

namespace Paragon.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailsController : ControllerBase
    {
        private readonly OrderContext _context;

        public OrderDetailsController(OrderContext context)
        {
            _context = context;
        }

        // GET: api/OrderDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDetails>>> GetOrderDetails()
        {
            return await _context.OrderDetails.ToListAsync();
        }

        // GET: api/OrderDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<List<helperModel>>> GetOrderDetails(int id)
        {
            var orderDetails = await _context.OrderDetails.Where(item => item.IdOrder ==id).ToListAsync();
            if (orderDetails == null)
            {
                return NotFound();
            }
            var productIds = orderDetails.ToList().Select(t=>t.IdProduct);
            var orderIds = orderDetails.ToList().Select(t => t.IdOrder);
            var products = await _context.Products.Where(m => productIds.Contains(m.IdProduct)).ToListAsync();
            var order = await _context.Orders.FirstOrDefaultAsync(m => m.Id ==id);

            List<helperModel> helperModels = new List<helperModel>();

            foreach(OrderDetails x in orderDetails)
            {
                var product = products.FirstOrDefault(p => p.IdProduct == x.IdProduct);
                helperModel model = new helperModel
                {
                    IdOrder = order.Id,
                    IdProduct = product.IdProduct,
                    Adress = order.Adress,
                    ClientName = order.Name,
                    Count = x.Count,
                    Discount = x.Discount,
                    IdOrderDetails = x.IdOrderDetails,
                    OrderDate = order.OrderDate,
                    PostCode = order.PostCode,
                    ProductName = product.Name,
                    UnitPrice = x.UnitPrice
                };
                helperModels.Add(model);

               
            }
            // var products = await _context.Products
            //  var products

            if (orderDetails == null)
            {
                return NotFound();
            }

            return helperModels;
        }

        // PUT: api/OrderDetails/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrderDetails(int id, OrderDetails orderDetails)
        {
            if (id != orderDetails.IdOrderDetails)
            {
                return BadRequest();
            }

            _context.Entry(orderDetails).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderDetailsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/OrderDetails
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<OrderDetails>> PostOrderDetails(OrderDetails orderDetails)
        {
            _context.OrderDetails.Add(orderDetails);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrderDetails", new { id = orderDetails.IdOrderDetails }, orderDetails);
        }

        // DELETE: api/OrderDetails/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<OrderDetails>> DeleteOrderDetails(int id)
        {
            var orderDetails = await _context.OrderDetails.FindAsync(id);
            if (orderDetails == null)
            {
                return NotFound();
            }

            _context.OrderDetails.Remove(orderDetails);
            await _context.SaveChangesAsync();

            return orderDetails;
        }

        private bool OrderDetailsExists(int id)
        {
            return _context.OrderDetails.Any(e => e.IdOrderDetails == id);
        }
    }
}
