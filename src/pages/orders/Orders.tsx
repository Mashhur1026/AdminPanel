import { array } from "../../date";
import "./orders.css";

function Orders() {
  return (
    <>
      <h1 className="btext">Buyurtmalar</h1>
      <div className="border">
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
              <tr key={array[0].id}>
                <td>
                  <img src={array[0].img[0]} alt="" />
                </td>
                <td>{array[0].sizes[0]}</td>
                <td>${array[0].price}</td>
                <td>{array[0].quantity}</td>
                <td>{array[0].price}</td>
              </tr>
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
              <tr key={array[0].id}>
                <td>Mashhur</td>
                <td>Yuldoshev</td>
                <td>+998909513269</td>
                <td>
                  Tezroq olb <br /> kelib bering
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}

export default Orders;
