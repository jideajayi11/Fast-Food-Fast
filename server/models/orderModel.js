const orderModel = [
  {
    id: 1,
    userId: 3,
    food: {
      id: 8,
      description: 'Chicken & Chips',
      imageURL: 'chickenChips.jpg',
      price: 500
    },
    quantity: 4,
    orderStatus: 'pending',
    date: '2018-09-01'
  },
  {
    id: 2,
    userId: 5,
    food: {
      id: 18,
      description: 'Fried Rice & Chicken',
      imageURL: 'friedRiceChicken.jpg',
      price: 1200
    },
    quantity: 2,
    orderStatus: 'completed',
    date: '2018-07-21'
  },
  {
    id: 3,
    userId: 6,
    food: {
      id: 2,
      description: 'Chicken & Chips',
      imageURL: 'chickenChips.jpg',
      price: 2500
    },
    quantity: 1,
    orderStatus: 'declined',
    date: '2018-05-16'
  },
];
export default orderModel;