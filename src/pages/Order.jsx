import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pizza from '../Images/pizza.jpg';
import burger from '../Images/burger.jpg';
import dose from '../Images/dosa.jpg';
import anna from '../Images/anna.jpeg';
import chapathi from '../Images/chapathi.jpeg';
import chikko from '../Images/chikko.jpeg';
import chocolate from '../Images/chocolate.jpeg';
import friedrice from '../Images/freid rice.jpg';
import frenchfries from '../Images/french fries.jpg';
import gobi from '../Images/gobi.jpg';
import idli from '../Images/idli.jpeg';
import kiwi from '../Images/kiwi.jpeg';
import maggie from '../Images/maggie.jpg';
import momos from '../Images/momos.jpg';
import noodles from '../Images/noodles.jpg';
import orange from '../Images/orange.jpeg';
import oreo from '../Images/oreo.jpg';
import palav from '../Images/PALAV.jpg';
import panipuri from '../Images/pani puri.jpg';
import parotta from '../Images/parotta.jpeg';
import pasta from '../Images/pasta.jpg';
import poliogre from '../Images/poliogre.jpg';
import pome from '../Images/pome.jpeg';
import puri from '../Images/puri.jpg';
import samosa from '../Images/samosa.jpg';
import strawberry from '../Images/strawberry.jpeg';

const OrderPage = () => {
  const [foodItems] = useState([
  {
    id: 1,
    name: 'DOSA',
    description: 'Crispy dosa served with chutney and sambar.',
    price: 80,
    category: 'breakfast',
    image: dose,
  },
  {
    id: 2,
    name: 'PIZZA',
    description: 'Delicious cheese pizza with a crispy crust.',
    price: 250,
    category: 'snacks',
    image: pizza,
  },
  {
    id: 3,
    name: 'BURGER',
    description: 'Juicy chicken burger with lettuce and sauce.',
    price: 120,
    category: 'snacks',
    image: burger,
  },
  {
    id: 4,
    name: 'ANNA RICE',
    description: 'Traditional rice meal served with vegetables.',
    price: 100,
    category: 'lunch',
    image: anna,
  },
  {
    id: 5,
    name: 'CHAPATHI',
    description: 'Soft chapathis with curry and pickle.',
    price: 90,
    category: 'lunch',
    image: chapathi,
  },
  {
    id: 6,
    name: 'CHIKKO SHAKE',
    description: 'Refreshing chikku milkshake with ice cream.',
    price: 70,
    category: 'milkshakes',
    image: chikko,
  },
  {
    id: 7,
    name: 'CHOCOLATE SHAKE',
    description: 'Creamy chocolate milkshake topped with syrup.',
    price: 80,
    category: 'milkshakes',
    image: chocolate,
  },
  {
    id: 8,
    name: 'FRIED RICE',
    description: 'Veg fried rice with spicy flavors.',
    price: 110,
    category: 'snacks',
    image: friedrice,
  },
  {
    id: 9,
    name: 'FRENCH FRIES',
    description: 'Crispy golden french fries.',
    price: 60,
    category: 'snacks',
    image: frenchfries,
  },
  {
    id: 10,
    name: 'GOBI MANCHURIAN',
    description: 'Spicy gobi manchurian with tangy sauce.',
    price: 100,
    category: 'snacks',
    image: gobi,
  },
  {
    id: 11,
    name: 'IDLI',
    description: 'Steamed idlis with chutney and sambar.',
    price: 50,
    category: 'breakfast',
    image: idli,
  },
  {
    id: 12,
    name: 'KIWI SHAKE',
    description: 'Fresh kiwi milkshake full of vitamins.',
    price: 85,
    category: 'milkshakes',
    image: kiwi,
  },
  {
    id: 13,
    name: 'MAGGIE',
    description: 'Instant noodles with masala twist.',
    price: 45,
    category: 'snacks',
    image: maggie,
  },
  {
    id: 14,
    name: 'MOMOS',
    description: 'Steamed momos with spicy dip.',
    price: 90,
    category: 'snacks',
    image: momos,
  },
  {
    id: 15,
    name: 'NOODLES',
    description: 'Hakka noodles with veggies and sauce.',
    price: 100,
    category: 'lunch',
    image: noodles,
  },
  {
    id: 16,
    name: 'ORANGE SHAKE',
    description: 'Cool orange milkshake with pulp.',
    price: 75,
    category: 'milkshakes',
    image: orange,
  },
  {
    id: 17,
    name: 'OREO SHAKE',
    description: 'Milkshake blended with Oreo cookies.',
    price: 90,
    category: 'milkshakes',
    image: oreo,
  },
  {
    id: 18,
    name: 'PALAV',
    description: 'Spicy palav rice with raita.',
    price: 85,
    category: 'lunch',
    image: palav,
  },
  {
    id: 19,
    name: 'PANI PURI',
    description: 'Crispy puris filled with spicy tangy water.',
    price: 40,
    category: 'snacks',
    image: panipuri,
  },
  {
    id: 20,
    name: 'PAROTTA',
    description: 'Layered parotta served with kurma.',
    price: 70,
    category: 'lunch',
    image: parotta,
  },
  {
    id: 21,
    name: 'PASTA',
    description: 'Creamy white sauce pasta.',
    price: 130,
    category: 'snacks',
    image: pasta,
  },
  {
    id: 22,
    name: 'POLIOGRE',
    description: 'Tangy tamarind rice with groundnuts.',
    price: 60,
    category: 'lunch',
    image: poliogre,
  },
  {
    id: 23,
    name: 'POME SHAKE',
    description: 'Refreshing pomegranate milkshake.',
    price: 90,
    category: 'milkshakes',
    image: pome,
  },
  {
    id: 24,
    name: 'PURI',
    description: 'Puffed puris with potato curry.',
    price: 75,
    category: 'breakfast',
    image: puri,
  },
  {
    id: 25,
    name: 'SAMOSA',
    description: 'Fried samosas stuffed with spicy potato.',
    price: 25,
    category: 'snacks',
    image: samosa,
  },
  {
    id: 26,
    name: 'STRAWBERRY SHAKE',
    description: 'Chilled strawberry milkshake.',
    price: 85,
    category: 'milkshakes',
    image: strawberry,
  },
]);


  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const filteredItems = foodItems.filter(item =>
    (categoryFilter === 'all' || item.category === categoryFilter) &&
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/cart`);
      setCartItems(res.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (item) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/cart`, {
        name: item.name,
        price: item.price,
        quantity: 1,
      });
      alert(`${item.name} added to cart`);
      fetchCart();
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item');
    }
  };

  const placeOrder = async () => {
  try {
    await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/order`, { items: cartItems });
    setOrderSuccess(true);
    setCartItems([]);
    setTimeout(() => setOrderSuccess(false), 3000);
  } catch (error) {
    console.error('Error placing order:', error);
    alert('Failed to place order');
  }
};


  return (
    <div className="container">
      <style>{`
        body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f4f7f6;
  color: #2c3e50;
}

.container {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 240px;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  flex-shrink: 0;
}

.sidebar h2,
.sidebar a {
  color: #ecf0f1;
  text-decoration: none;
  display: block;
  padding: 10px 0;
  font-weight: 500;
}

.sidebar a:hover {
  background-color: #ecf0f1;
  color: #2c3e50;
  border-radius: 4px;
  padding-left: 12px;
}

.main {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
}

.top-bar input {
  padding: 10px;
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.top-bar button {
  padding: 10px 16px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.top-bar button:hover {
  background-color: #219150;
}

.category-buttons {
  margin-bottom: 20px;
}

.category-buttons button {
  margin-right: 10px;
  padding: 8px 14px;
  border: none;
  background-color: #3498db;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.category-buttons button:hover {
  background-color: #2980b9;
}

.items {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.item {
  background: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 200px;
  padding: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;
}

.item:hover {
  transform: translateY(-4px);
}

.item img {
  width: 100%;
  height: 130px;
  object-fit: cover;
  border-radius: 6px;
}

.item h4,
.item p {
  margin: 6px 0;
}

.item .price {
  font-weight: bold;
  color: #2c3e50;
  margin: 10px 0;
}

.item button {
  background-color: #e67e22;
  color: white;
  border: none;
  padding: 10px;
  width: 100%;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.item button:hover {
  background-color: #d35400;
}

/* Cart Modal */
.cart-modal {
  position: fixed;
  top: 80px;
  right: 30px;
  width: 300px;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  padding: 20px;
  border-radius: 10px;
  z-index: 1000;
}

.cart-modal h3 {
  margin-top: 0;
  margin-bottom: 12px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 6px;
  font-size: 18px;
}

.cart-modal ul {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 250px;
  overflow-y: auto;
}

.cart-modal li {
  padding: 6px 0;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}

.cart-modal .total {
  font-weight: bold;
  margin-top: 10px;
  text-align: right;
}

.cart-modal .place-order {
  margin-top: 15px;
  background-color: #2ecc71;
  color: white;
  border: none;
  padding: 10px 16px;
  width: 100%;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.cart-modal .place-order:hover {
  background-color: #27ae60;
}

.cart-modal .clear-cart {
  margin-top: 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
  width: 100%;
}

.cart-modal .clear-cart:hover {
  background-color: #c0392b;
}

.success {
  background: #dff0d8;
  color: #3c763d;
  padding: 12px;
  border-radius: 6px;
  margin-top: 12px;
  font-size: 14px;
}

      `}</style>

      <div className="sidebar">
        <h2>Menu</h2>
        <a href="/order">Dashboard</a>
        <a href="/feedback">Feedback</a>
        <a href="/login">Logout</a>
      </div>

      <div className="main">
        <div className="top-bar">
          <input
            type="text"
            placeholder="Search food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={() => setShowCart(!showCart)}>
            View Cart ({cartItems.length})
          </button>
        </div>

        <div className="category-buttons">
          {['all', 'breakfast', 'lunch', 'snacks', 'milkshakes'].map(category => (
            <button key={category} onClick={() => setCategoryFilter(category)}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="items">
  {filteredItems.map(item => (
    <div className="item" key={item.id}>
      <img src={item.image} alt={item.name} />
      <h4>{item.name}</h4>
      <p>{item.description}</p>
      <div className="price">₹{item.price}</div>
      <button onClick={() => addToCart(item)}>Add to Cart</button>
    </div>
  ))}
</div>

        {showCart && (
  <div className="cart-modal">
    <h3>Cart Items</h3>
    <ul>
      {cartItems.map((item, index) => (
        <li key={index}>
          {item.name} - ₹{item.price} x {item.quantity}
        </li>
      ))}
    </ul>

    {/* Total price (optional but useful) */}
    <div className="total">
      Total: ₹{cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
    </div>

    {/* Updated buttons with new class names */}
    <button className="place-order" onClick={placeOrder}>Place Order</button>
    <button className="clear-cart" onClick={() => setShowCart(false)}>Close</button>

    {orderSuccess && (
      <div className="success">✅ Order placed successfully!</div>
    )}
  </div>
)}
    </div>
    </div>
  );
};

export default OrderPage;
