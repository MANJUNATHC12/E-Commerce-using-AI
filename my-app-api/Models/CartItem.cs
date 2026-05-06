using System.ComponentModel.DataAnnotations;

namespace my_app_api.Models
{
    public class CartItem
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public string Price { get; set; }
        public string Img { get; set; }
        public int Quantity { get; set; }
    }
}
