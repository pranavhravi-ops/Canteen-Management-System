import React, { useState } from 'react';
import '../CSS/order.css'; // Assuming you have this file created for styles
import { Link } from 'react-router-dom';
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

const foodItemsData = [
  {
    id: 1,
    name: 'DOSA',
    description: 'Crispy dosa served with chutney and sambar.',
    price: 80,
    image: dose,
  },
  {
    id: 2,
    name: 'PIZZA',
    description: 'Delicious cheese pizza with a crispy crust.',
    price: 250,
    
    image: pizza,
  },
  {
    id: 3,
    name: 'BURGER',
    description: 'Juicy chicken burger with lettuce and sauce.',
    price: 120,
    
    image: burger,
  },
  {
    id: 4,
    name: 'ANNA RICE',
    description: 'Traditional rice meal served with vegetables.',
    price: 100,
   
    image: anna,
  },
  {
    id: 5,
    name: 'CHAPATHI',
    description: 'Soft chapathis with curry and pickle.',
    price: 90,
  
    image: chapathi,
  },
  {
    id: 6,
    name: 'CHIKKO SHAKE',
    description: 'Refreshing chikku milkshake with ice cream.',
    price: 70,

    image: chikko,
  },
  {
    id: 7,
    name: 'CHOCOLATE SHAKE',
    description: 'Creamy chocolate milkshake topped with syrup.',
    price: 80,
    
    image: chocolate,
  },
  {
    id: 8,
    name: 'FRIED RICE',
    description: 'Veg fried rice with spicy flavors.',
    price: 110,
 
    image: friedrice,
  },
  {
    id: 9,
    name: 'FRENCH FRIES',
    description: 'Crispy golden french fries.',
    price: 60,
    
    image: frenchfries,
  },
  {
    id: 10,
    name: 'GOBI MANCHURIAN',
    description: 'Spicy gobi manchurian with tangy sauce.',
    price: 100,
  
    image: gobi,
  },
  {
    id: 11,
    name: 'IDLI',
    description: 'Steamed idlis with chutney and sambar.',
    price: 50,
   
    image: idli,
  },
  {
    id: 12,
    name: 'KIWI SHAKE',
    description: 'Fresh kiwi milkshake full of vitamins.',
    price: 85,
    
    image: kiwi,
  },
  {
    id: 13,
    name: 'MAGGIE',
    description: 'Instant noodles with masala twist.',
    price: 45,
    
    image: maggie,
  },
  {
    id: 14,
    name: 'MOMOS',
    description: 'Steamed momos with spicy dip.',
    price: 90,
   
    image: momos,
  },
  {
    id: 15,
    name: 'NOODLES',
    description: 'Hakka noodles with veggies and sauce.',
    price: 100,

    image: noodles,
  },
  {
    id: 16,
    name: 'ORANGE SHAKE',
    description: 'Cool orange milkshake with pulp.',
    price: 75,
    
    image: orange,
  },
  {
    id: 17,
    name: 'OREO SHAKE',
    description: 'Milkshake blended with Oreo cookies.',
    price: 90,
  
    image: oreo,
  },
  {
    id: 18,
    name: 'PALAV',
    description: 'Spicy palav rice with raita.',
    price: 85,
  
    image: palav,
  },
  {
    id: 19,
    name: 'PANI PURI',
    description: 'Crispy puris filled with spicy tangy water.',
    price: 40,

    image: panipuri,
  },
  {
    id: 20,
    name: 'PAROTTA',
    description: 'Layered parotta served with kurma.',
    price: 70,
  
    image: parotta,
  },
  {
    id: 21,
    name: 'PASTA',
    description: 'Creamy white sauce pasta.',
    price: 130,
  
    image: pasta,
  },
  {
    id: 22,
    name: 'POLIOGRE',
    description: 'Tangy tamarind rice with groundnuts.',
    price: 60,
    
    image: poliogre,
  },
  {
    id: 23,
    name: 'POME SHAKE',
    description: 'Refreshing pomegranate milkshake.',
    price: 90,
 
    image: pome,
  },
  {
    id: 24,
    name: 'PURI',
    description: 'Puffed puris with potato curry.',
    price: 75,
   
    image: puri,
  },
  {
    id: 25,
    name: 'SAMOSA',
    description: 'Fried samosas stuffed with spicy potato.',
    price: 25,
    image: samosa,
  },
  {
    id: 26,
    name: 'STRAWBERRY SHAKE',
    description: 'Chilled strawberry milkshake.',
    price: 85,
    image: strawberry,
  },
  // Add rest of the items similarly
];

function OrderPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [foodItems, setFoodItems] = useState(
    foodItemsData.map(item => ({ ...item, available: true }))
  );

  const handleToggleAvailability = index => {
    const updatedItems = [...foodItems];
    updatedItems[index].available = !updatedItems[index].available;
    setFoodItems(updatedItems);
  };

  const handleSearch = () => {
    return foodItems.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <>
    <style>{`
          body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            
            margin: 0;
            padding: 0;
            display: flex;
        }
        .sidebar {
            height: 100%;
            width: 240px;
            position: fixed;
            top: 0;
            left: 0;
            background-color: #2c3e50;
            padding-top: 20px;
            box-shadow: 2px 0 5px rgba(0,0,0,0.1);
        }
        .sidebar a {
            padding: 15px 20px;
            text-decoration: none;
            font-size: 18px;
            color: #ecf0f1;
            display: block;
            transition: color 0.3s ease, background-color 0.3s ease;
        }
        .sidebar a:hover {
            color: #2c3e50;
            background-color: #ecf0f1;
        }
    
        .content {
            margin-left: 260px;
            flex-grow: 1
            margin-top:50px;
        }
        h1 {
          font-family: 'Arial', sans-serif; 
            font-size: 36px; 
            font-weight: bold; 
            color: #333333; 
            text-align: center; 
            margin-top: 20px;
            margin-bottom: 20px; 
            line-height: 1.5; 
            text-transform: uppercase; 
            letter-spacing: 2px; 
            text-shadow: 2px 2px 4px #aaaaaa;
            background-color: #f0d6d6; 
            padding: 10px; 
          }


        .top-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        .search-bar {
            display: flex;
            align-items: center;
            flex-grow: 1;
            margin-top:20px;
        }
        .search-bar input[type="text"] {
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            width: 100%;
        }
        .search-bar button {
            padding: 10px;
            background-color: #4CAF50;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-left: 10px;
        }
        .search-bar button:hover {
            background-color: #45a049;
        }
        .view-cart {
            padding: 10px 20px;
            background-color: #007BFF;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            text-decoration: none;
            font-size: 16px;
            margin-left: 20px;
        }
        .view-cart:hover {
            background-color: #0056b3;
        }
        .category-buttons {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
        }
        .category-buttons button {
            padding: 10px 20px;
            background-color: #4CAF50;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin: 0 10px;
            font-size: 16px;
        }
        .category-buttons button:hover {
            background-color: #45a049;
        }
        .items {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
        }
        .item {
            display: flex;
            background: #fff;
            padding: 10px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 450px;
            align-items: center;
        }
        .item img {
            width: 150px;
            height: 150px;
            border-radius: 10px;
            margin-right: 20px;
        }
        .item-details {
            flex-grow: 1;
        }
        .item h4 {
            margin: 0;
            font-size: 18px;
        }
        .item p {
            margin: 10px 0;
            color: #666;
        }
        .item .price {
            font-weight: bold;
            margin-bottom: 10px;
        }
        .item input {
            width: 50px;
            padding: 5px;
            margin-right: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        .item button {
            padding: 10px;
            background-color: #4CAF50;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .item button:hover {
            background-color: #45a049;
        }

    </style>

      `}</style>


    <div className="sidebar">
  <Link to="/dashboard">Dashboard</Link>
  <Link to="/customer">Customer</Link>
  <Link to="/vieworder">Food Section</Link>
  <Link to="/viewfeedback">Feedbacks</Link>
  <Link to="/login">Logout</Link>
</div>
    <div className='content'>
      <div className="top-bar">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for food items..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      <section className="items">
        {handleSearch().map((item, index) => (
          <div
            key={item.id}
            className={`item ${!item.available ? 'unavailable' : ''}`}
          >
            <img src={item.image} alt={item.name} />
            <div className="item-details">
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <div className="price">
                ₹
                <input
                  type="number"
                  className="price-input"
                  value={item.price}
                  readOnly
                />
              </div>
              <button
                className="availability-toggle"
                onClick={() => handleToggleAvailability(index)}
              >
                {item.available ? 'Mark as Not Available' : 'Mark as Available'}
              </button>
            </div>
          </div>
        ))}
      </section>

      <button style={{ marginTop: '20px' }}>
        <a href="dashdemo.html" style={{ color: '#fff', textDecoration: 'none' }}>Back to Home</a>
      </button>
    </div>
    </>
  );
}

export default OrderPage;
