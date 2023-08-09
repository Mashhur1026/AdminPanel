import { useEffect, useState } from "react";
import axios from "../../api/axios";
import "./orders.css";

interface CardItem {
  images: string[];
  name: string;
  price: number;
  quantity: number;
  size: string[];
  _id: string;
}

interface UserInfo {
  message: string;
  phoneNumber: string;
  sureName: string;
  userName: string;
  _id: string;
}

interface Order {
  cardItems: CardItem[];
  totalPrice: string;
  userInfo: UserInfo[];
  _id: string;
}

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  async function getProductData() {
    try {
      const response = await axios.get("/getcard");
      console.log("Fetched data:", response.data);
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <>
      <h1 className="btext">Buyurtmalar</h1>
      {orders.map((order) => (
        <div className="border" key={order._id}>
          <section id="orders">
            <table width="100%">
              <thead>
                <tr>
                  <td>Rasm</td>
                  <td>Razmer</td>
                  <td>Narx</td>
                  <td>Miqdor</td>
                  <td>Total</td>
                </tr>
              </thead>
              <tbody>
                {order.cardItems.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <img src={item.images[0]} />
                      </td>
                      <td>{item.size[0]}</td>
                      <td>{item.price} UZS</td>
                      <td>{item.quantity}</td>
                      <td>{order.totalPrice} UZS</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
          <section id="orders">
            <table width="100%">
              <thead>
                <tr>
                  <td>B: Isimi</td>
                  <td>B: Familiyasi</td>
                  <td>B: Tel</td>
                  <td>B: Talabi</td>
                </tr>
              </thead>
              <tbody className="mt">
                {order.userInfo.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.userName}</td>
                      <td>{item.sureName}</td>
                      <td>{item.phoneNumber}</td>
                      <td>{item.message}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        </div>
      ))}
    </>
  );
}

export default Orders;
