import { useEffect, useState } from "react";
import { listOrders } from "../../features/orders/api";
import type { Order } from "../../features/orders/types";
import { getErrorMessage } from "../../shared/api/getErrorMessage";
import { AlertMessage } from "../../shared/components/AlertMessage";
import { DashboardPage } from "../../shared/components/DashboardPage";
import { PageHeader } from "../../shared/components/PageHeader";

function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    listOrders()
      .then((result) => {
        if (isActive) setOrders(result);
      })
      .catch((error) => {
        if (isActive) {
          setError(getErrorMessage(error, "Cannot load orders"));
        }
      })
      .finally(() => {
        if (isActive) setIsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <DashboardPage>
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <PageHeader title="Orders" />
        <AlertMessage message={error} />
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Total</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{order.name}</td>
                  <td>{order.email}</td>
                  <td>{Number(order.total).toFixed(2)}</td>
                  <td>{new Date(order.created_at).toLocaleString()}</td>
                </tr>
              ))}
              {!isLoading && !error && orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-4">
                    No orders found
                  </td>
                </tr>
              ) : null}
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-4">
                    Loading orders...
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </main>
    </DashboardPage>
  );
}

export default OrderList;
