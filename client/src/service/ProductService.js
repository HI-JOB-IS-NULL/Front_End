export class ProductService {
  getProductsWithOrdersSmall() {
    return fetch("data/products-orders-small.json")
      .then((res) => res.json())
      .then((d) => d.orders.content);
  }
}
