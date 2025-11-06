export default function OrdersTable() {
  const orders = [
    {
      id: "ORD-1001",
      date: "2025-10-01",
      total: "$1,250.00",
      payment: "Online",
      status: "Delivered",
    },
    {
      id: "ORD-1002",
      date: "2025-10-05",
      total: "$780.00",
      payment: "COD",
      status: "Pending",
    },
    {
      id: "ORD-1003",
      date: "2025-10-07",
      total: "$1,999.00",
      payment: "Online",
      status: "Cancelled",
    },
    {
      id: "ORD-1004",
      date: "2025-10-10",
      total: "$550.00",
      payment: "Online",
      status: "Delivered",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered":
        return (
          <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
            Delivered
          </span>
        );
      case "Pending":
        return (
          <span className="px-3 py-1 text-sm font-medium text-yellow-700 bg-yellow-100 rounded-full">
            Pending
          </span>
        );
      case "Cancelled":
        return (
          <span className="px-3 py-1 text-sm font-medium text-red-700 bg-red-100 rounded-full">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full">
            Unknown
          </span>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
        My Orders
      </h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">Order ID</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Total</th>
              <th className="py-3 px-4 text-left">Payment</th>
              <th className="py-3 px-4 text-center">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="py-3 px-4 font-medium text-gray-800">
                  {order.id}
                </td>
                <td className="py-3 px-4 text-gray-600">{order.date}</td>
                <td className="py-3 px-4 text-gray-600">{order.total}</td>
                <td className="py-3 px-4 text-gray-600">{order.payment}</td>
                <td className="py-3 px-4 text-center">
                  {getStatusBadge(order.status)}
                </td>
                <td className="py-3 px-4 text-center space-x-2">
                  <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                    View
                  </button>
                  <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                    Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
