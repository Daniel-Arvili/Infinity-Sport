import React from "react";
import { Address, Product } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CartItemFromOrder {
  orderId: number;
  productId: number;
  quantity: number;
  product: Product;
}

interface OrdersTypes {
  id: number;
  userId: string | null;
  addressId: string | null;
  createdAt: Date;
  status: String;
  totalPrice: number;
  paymentMethod: string | null;
  guestName: string | null;
  address: Address | null;
  products: CartItemFromOrder[];
}

interface OrdersPageProps {
  orderDetails: OrdersTypes[];
}
export default function OrdersPage({ orderDetails }: OrdersPageProps) {
  const totalSum = orderDetails.reduce(
    (acc, order) => acc + order.totalPrice,
    0
  );
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-center text-2xl md:text-3xl text-naivyBlue dark:text-glowGreen">
        My Orders
      </h1>
      <div className="flex flex-col w-full md:w-[85%] shadow-xl dark:shadow-lg dark:shadow-gray-700 p-2 sm:p-4 rounded-lg">
        <Table className="text-xxxs sm:text-xs">
          <TableCaption>
            <div className="flex flex-col items-center">
              <p>A list of your recent orders</p>
              <div className="flex flex-row justify-between w-full text-naivyBlue dark:text-glowGreen mt-1">
                <p>Total Orders - {orderDetails.length}</p>
                <p>Total Price - {totalSum.toFixed(2)}</p>
              </div>
            </div>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-naivyBlue dark:text-glowGreen">
                ID
              </TableHead>
              <TableHead className="text-naivyBlue dark:text-glowGreen">
                Status
              </TableHead>
              <TableHead className="text-naivyBlue dark:text-glowGreen">
                Payment Method
              </TableHead>
              <TableHead className="text-naivyBlue dark:text-glowGreen">
                Price
              </TableHead>
              <TableHead className="text-naivyBlue dark:text-glowGreen">
                Created
              </TableHead>
              <TableHead className="text-naivyBlue dark:text-glowGreen">
                Address
              </TableHead>
              <TableHead className="text-naivyBlue dark:text-glowGreen">
                Products
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderDetails.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.paymentMethod || "N/A"}</TableCell>
                <TableCell>${order.totalPrice}</TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  {order.address
                    ? `${order.address.street} ${order.address.homeNumber}, ${order.address.apartmentNumber}, ${order.address.city}, ${order.address.state}`
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <ul>
                    {order.products.map((product) => (
                      <li key={product.productId}>
                        {product.product.name} - Qty: {product.quantity}
                      </li>
                    ))}
                  </ul>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
      </div>
    </div>
  );
}
