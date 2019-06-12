export class Order {
  _id: number;
  consumer_id: number;
  product_id: number;
  quantity: number;
  date: string;
  consumerName: string = '';
  productName: string = '';
}
