import React from "react";

const CustomInvoice = ({ invoiceDataa, onClose }) => {
  const invoiceData = invoiceDataa;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">INVOICE</h1>

      <div className=" flex justify-between">
        <div>
          <h2 className="text-lg font-semibold mb-1">Billed To:</h2>
          <p>
            <strong>Name:</strong> {invoiceData.user.user_name}
          </p>
          <p>
            <strong>Mobile:</strong> {invoiceData.user.user_mobile}
          </p>
          {invoiceData.user.user_email && (
            <p>
              <strong>Email:</strong> {invoiceData.user.user_email}
            </p>
          )}
        </div>

        <div className="mb-4">
          <p>
            <strong>Invoice Number:</strong> {invoiceData.invoice_number}
          </p>
          <p>
            <strong>Invoice Date:</strong>{" "}
            {new Date(invoiceData.invoice_date).toLocaleDateString()}
          </p>
        </div>
      </div>

      <h2 className="text-lg font-semibold mt-6 mb-2">Order Summary</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="text-left py-2 px-4 border-b">Product Title</th>
            <th className="text-left py-2 px-4 border-b">Description</th>
            <th className="text-left py-2 px-4 border-b">Quantity</th>
            <th className="text-left py-2 px-4 border-b">Unit Price (₨)</th>
            <th className="text-left py-2 px-4 border-b">Discount (%)</th>
            <th className="text-left py-2 px-4 border-b">Total Price (₨)</th>
          </tr>
        </thead>
        <tbody>
          {invoiceData?.order_items?.map((item, index) => {
            const unitPrice = item?.product?.product_price;
            const quantity = item?.product_quantity;
            const discount = item?.product_discount;

            const totalPrice = (unitPrice * quantity * (100 - discount)) / 100;

            return (
              <tr
                key={index}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="py-3 px-4">{item?.product?.product_title}</td>
                <td className="py-3 px-4">
                  {item?.product?.product_description}
                </td>
                <td className="py-3 px-4">{quantity}</td>
                <td className="py-3 px-4">₨ {unitPrice}</td>
                <td className="py-3 px-4">{discount}</td>
                <td className="py-3 px-4">₨ {totalPrice}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-4 border-t pt-4 flex flex-col items-end">
        <p className="font-semibold">Subtotal: ₨ {invoiceData.total_price}</p>
        <p className="font-semibold">
          Payment Type: {invoiceData.payment_type}
        </p>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">Thank you for your purchase!</p>
      </div>
    </div>
  );
};

export default CustomInvoice;
