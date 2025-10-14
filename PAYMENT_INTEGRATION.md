# Payment Integration Guide - Peach Payments & PayFast

## 🍑 Peach Payments Integration (Recommended for SA)

### Step 1: Account Setup
1. Visit [peachpayments.com](https://peachpayments.com)
2. Sign up for merchant account
3. Complete verification process
4. Get your API credentials

### Step 2: Integration Code
Replace the placeholder button in your cart with:

```javascript
const handlePeachPayment = async () => {
  const paymentData = {
    amount: getTotalPrice() * 100, // Amount in cents
    currency: 'ZAR',
    reference: `PL-${Date.now()}`,
    customer: {
      email: 'customer@email.com', // Get from form
      phone: '0628989645'
    },
    items: cart.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price * 100
    }))
  };

  // Initialize Peach Payments
  const payment = new PeachPayments({
    publicKey: 'YOUR_PUBLIC_KEY',
    environment: 'sandbox' // Change to 'production' when live
  });

  try {
    const result = await payment.createPayment(paymentData);
    if (result.success) {
      // Payment successful
      alert('Payment successful! Order confirmed.');
      setCart([]);
      setCartOpen(false);
    }
  } catch (error) {
    alert('Payment failed. Please try again.');
  }
};
```

### Step 3: Add Payment Form
```javascript
const PaymentForm = () => {
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    phone: '',
    name: ''
  });

  return (
    <div className="space-y-4">
      <input
        type="email"
        placeholder="Email address"
        value={customerInfo.email}
        onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
        className="w-full p-3 border rounded"
      />
      <input
        type="tel"
        placeholder="Phone number"
        value={customerInfo.phone}
        onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
        className="w-full p-3 border rounded"
      />
      <button
        onClick={handlePeachPayment}
        className="w-full luxury-gradient text-white py-3 font-semibold"
      >
        Pay R{getTotalPrice()}.00 with Peach Payments
      </button>
    </div>
  );
};
```

## 💰 PayFast Integration (Alternative)

### Step 1: PayFast Setup
1. Visit [payfast.co.za](https://payfast.co.za)
2. Create merchant account
3. Get merchant credentials
4. Set up payment methods

### Step 2: PayFast Integration
```javascript
const handlePayFastPayment = () => {
  const paymentData = {
    merchant_id: 'YOUR_MERCHANT_ID',
    merchant_key: 'YOUR_MERCHANT_KEY',
    amount: getTotalPrice().toFixed(2),
    item_name: 'Perpetual Linger Fragrances',
    item_description: cart.map(item => `${item.name} (${item.quantity}x)`).join(', '),
    return_url: 'https://yoursite.com/payment-success',
    cancel_url: 'https://yoursite.com/payment-cancelled',
    notify_url: 'https://yoursite.com/payment-notify'
  };

  // Create form and submit to PayFast
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://sandbox.payfast.co.za/eng/process'; // Use production URL when live

  Object.keys(paymentData).forEach(key => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = paymentData[key];
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
};
```

## 🔒 Security Considerations

### For Peach Payments:
- Use HTTPS only
- Validate on server-side
- Store credentials securely
- Use sandbox for testing

### For PayFast:
- Implement signature validation
- Use ITN (Instant Transaction Notification)
- Validate payment amounts
- Handle failed payments gracefully

## 📱 Mobile Payment Optimization

### Responsive Design:
- Touch-friendly payment buttons
- Mobile-optimized forms
- Fast loading payment pages
- Clear error messages

### Payment Methods:
- Credit/Debit cards
- Instant EFT
- Mobile payments
- Bank transfers

## 🧪 Testing Process

### Sandbox Testing:
1. Use test credentials
2. Test all payment scenarios
3. Verify order processing
4. Test mobile payments
5. Check email notifications

### Test Cards (Peach Payments):
- Visa: 4111 1111 1111 1111
- Mastercard: 5555 5555 5555 4444
- CVV: Any 3 digits
- Expiry: Any future date

## 🚀 Going Live

### Pre-Launch Checklist:
- [ ] Switch to production credentials
- [ ] Test with real small amounts
- [ ] Set up SSL certificate
- [ ] Configure webhooks
- [ ] Test order fulfillment
- [ ] Set up payment notifications

### Post-Launch Monitoring:
- Monitor payment success rates
- Track failed payments
- Review transaction logs
- Customer payment feedback
- Regular security updates

## 📊 Payment Analytics

### Track These Metrics:
- Conversion rates
- Payment method preferences
- Failed payment reasons
- Average order values
- Customer payment patterns

### Tools to Use:
- Google Analytics
- Payment gateway dashboards
- Custom tracking scripts
- Customer feedback forms

---

**Important**: Always test thoroughly in sandbox mode before going live with real payments!
