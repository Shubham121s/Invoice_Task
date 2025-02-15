import numberToWords from 'number-to-words';

function ItemDetails({ items }) {

  // Calculate totals
  const totals = items.reduce(
    (acc, item) => {
      const netAmount = (item.unitPrice * item.quantity) - item.discount;
      const taxAmount = netAmount * (item.taxRate / 100);
      const total = netAmount + taxAmount;

      acc.netAmount += netAmount;
      acc.taxAmount += taxAmount;
      acc.total += total;

      return acc;
    },
    { netAmount: 0, taxAmount: 0, total: 0 }
  );

  return (
    <div className="item-details">
      <h5>Items</h5>
      <table>
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Description</th>
            <th>Unit Price</th>
            <th>Quantity</th>
            <th>Discount</th>
            <th>Tax Rate</th>
            <th>Net Amount</th>
            <th>Tax Amount</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            const netAmount = (item.unitPrice * item.quantity) - item.discount;
            const taxAmount = netAmount * (item.taxRate / 100);
            const total = netAmount + taxAmount;

            return (
              <tr key={item.id || index}> {/* Assuming item has a unique 'id' */}
                <td>{index + 1}</td> {/* Serial Number */}
                <td>{item.description}</td>
                <td>{item.unitPrice.toFixed(2)}</td>
                <td>{item.quantity}</td>
                <td>{item.discount.toFixed(2)}</td>
                <td>{item.taxRate}%</td>
                <td>{netAmount.toFixed(2)}</td>
                <td>{taxAmount.toFixed(2)}</td>
                <td>{total.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="totals">
        <h5>Summary</h5>
        <table>
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Net Amount</th>
              <th>Tax Amount</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr key="totals-row"> {/* Unique key for totals row */}
              <td>1</td> {/* Serial Number for Totals */}
              <td>{totals.netAmount.toFixed(2)}</td>
              <td>{totals.taxAmount.toFixed(2)}</td>
              <td>{totals.total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <p>(in words): {numberToWords.toWords(totals.total)}</p>
      </div>
    </div>
  );
}

export default ItemDetails;
