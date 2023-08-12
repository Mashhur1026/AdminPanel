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
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProductData();
  }, [orders]);

  const hendleClik = async (id: string) => {
    try {
      await axios.delete(`deletecard?cardId=${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="btext">Buyurtmalar</h1>
      {orders.length > 0 ? (
        <>
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
                      <td>Isimi</td>
                      <td>Familiyasi</td>
                      <td>Tel</td>
                    </tr>
                  </thead>
                  <tbody className="mt">
                    {order.userInfo.map((item, index) => {
                      return (
                        <>
                          <tr key={index}>
                            <td>{item.userName}</td>
                            <td>{item.sureName}</td>
                            <td>{item.phoneNumber}</td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
                <table>
                  {order.userInfo.map((item, index) => {
                    return (
                      <>
                        <thead>
                          <tr>
                            <td>Xabar</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr key={index}>
                            <td className="talabB">{item.message}</td>
                          </tr>
                        </tbody>
                      </>
                    );
                  })}
                </table>
                <div className="btn-c">
                  <button
                    onClick={() => hendleClik(order._id)}
                    className="ochrish"
                  >
                    O'chirish
                  </button>
                </div>
              </section>
            </div>
          ))}
        </>
      ) : (
        <div className="buyurtma">
          <h1>Buyurtmalar mavjud emas</h1>
        </div>
      )}
    </>
  );
}

export default Orders;
