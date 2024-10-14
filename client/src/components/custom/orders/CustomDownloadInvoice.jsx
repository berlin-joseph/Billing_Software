import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "white",
    borderRadius: 8,
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    color: "#333",
  },
  section: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  invoiceDetails: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#555",
  },
  table: {
    width: "100%",
    marginBottom: 16,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
    borderBottom: "2px solid #ccc",
    paddingBottom: 8,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #ccc",
  },
  tableCell: {
    padding: 8,
    width: "20%",
    borderRight: "1px solid #ccc",
    fontSize: 14,
  },
  tableCells: {
    padding: 8,
    width: "30%",
    borderRight: "1px solid #ccc",
    fontSize: 14,
  },
  totalSection: {
    marginTop: 16,
    borderTop: "2px solid #ccc",
    paddingTop: 16,
    alignItems: "flex-end",
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  footer: {
    marginTop: 24,
    textAlign: "center",
    fontSize: 12,
    color: "#666",
  },
});

const Invoice = ({ invoiceData }) => {
  return (
    <PDFDownloadLink
      document={
        <Document>
          <Page size="A4" style={styles.container}>
            <Text style={styles.heading}>INVOICE</Text>
            {/* Remaining Invoice Content */}
            <View style={styles.section}>
              <View>
                <Text style={styles.invoiceDetails}>Billed To:</Text>
                <Text style={styles.invoiceDetails}>
                  Name: {invoiceData.user.user_name}
                </Text>
                <Text style={styles.invoiceDetails}>
                  Mobile: {invoiceData.user.user_mobile}
                </Text>
                {invoiceData.user.user_email && (
                  <Text style={styles.invoiceDetails}>
                    Email: {invoiceData.user.user_email}
                  </Text>
                )}
              </View>
              <View>
                <Text style={styles.invoiceDetails}>Invoice Details:</Text>
                <Text style={styles.invoiceDetails}>
                  Invoice Number: {invoiceData.invoice_number}
                </Text>
                <Text style={styles.invoiceDetails}>
                  Bill Date:{" "}
                  {new Date(invoiceData.invoice_date).toLocaleDateString()}
                </Text>
              </View>
            </View>
            {/* Order Summary */}
            <Text style={styles.invoiceDetails}>Order Summary</Text>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableCells}>Product Title</Text>
                <Text style={styles.tableCell}>Quantity</Text>
                <Text style={styles.tableCell}>Price</Text>
                <Text style={styles.tableCell}>Discount</Text>
                <Text style={styles.tableCell}>Total Price</Text>
              </View>
              {invoiceData.order_items.map((item, index) => {
                const unitPrice = item.product.product_price;
                const quantity = item.product_quantity;
                const discount = item.product_discount;
                const totalPrice =
                  (unitPrice * quantity * (100 - discount)) / 100;

                return (
                  <View style={styles.tableRow} key={index}>
                    <Text style={styles.tableCells}>
                      {item.product.product_title}
                    </Text>
                    <Text style={styles.tableCell}>{quantity}</Text>
                    <Text style={styles.tableCell}>Rs. {unitPrice}</Text>
                    <Text style={styles.tableCell}>{discount}%</Text>
                    <Text style={styles.tableCell}>Rs. {totalPrice}</Text>
                  </View>
                );
              })}
            </View>
            <View style={styles.totalSection}>
              <Text style={styles.invoiceDetails}>
                Subtotal: Rs. {invoiceData.total_price}
              </Text>
              <Text style={styles.invoiceDetails}>
                Payment Type: {invoiceData.payment_type}
              </Text>
            </View>
            <Text style={styles.footer}>Thank you for your purchase!</Text>
          </Page>
        </Document>
      }
      fileName={`invoice_${invoiceData.invoice_number}.pdf`}
      style={{
        textDecoration: "none",
        padding: 10,
        border: "1px solid #000",
        backgroundColor: "#f0f0f0",
        borderRadius: 5,
      }}
    >
      {({ loading }) =>
        loading ? "Preparing document..." : "Download Invoice"
      }
    </PDFDownloadLink>
  );
};

export default Invoice;
