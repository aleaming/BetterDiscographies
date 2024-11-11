export const SAMPLE_MARKET_DATA = {
  prices: [29.99, 32.99, 27.50, 35.00, 30.00, 28.50, 33.00, 31.50, 29.00, 34.50],
  dates: Array.from({ length: 10 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (9 - i));
    return date.toISOString().split('T')[0];
  }),
  highestPrice: 35.00,
  lowestPrice: 27.50,
  averagePrice: 31.20,
  totalListings: 156,
  recentSales: [
    { price: 32.99, date: '2024-03-08', condition: 'Near Mint (NM)' },
    { price: 29.99, date: '2024-03-07', condition: 'Very Good Plus (VG+)' },
    { price: 27.50, date: '2024-03-06', condition: 'Very Good (VG)' },
    { price: 35.00, date: '2024-03-05', condition: 'Mint (M)' },
    { price: 30.00, date: '2024-03-04', condition: 'Near Mint (NM)' },
  ],
};