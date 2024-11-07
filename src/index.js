import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Importing the CSS file

const pizzaData = [
    {
        name: "Focaccia",
        ingredients: "Bread with Italian olive oil and rosemary",
        price: 6,
        photoName: "pizzas/focaccia.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Margherita",
        ingredients: "Tomato and mozzarella",
        price: 10,
        photoName: "pizzas/margherita.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Spinaci",
        ingredients: "Tomato, mozzarella, spinach, and ricotta cheese",
        price: 12,
        photoName: "pizzas/spinaci.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Funghi",
        ingredients: "Tomato, mozzarella, mushrooms, and onion",
        price: 12,
        photoName: "pizzas/funghi.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Salamino",
        ingredients: "Tomato, mozzarella, and pepperoni",
        price: 15,
        photoName: "pizzas/salamino.jpg",
        soldOut: true,
    },
    {
        name: "Pizza Prosciutto",
        ingredients: "Tomato, mozzarella, ham, arugula, and burrata cheese",
        price: 18,
        photoName: "pizzas/prosciutto.jpg",
        soldOut: false,
    },
];

function App() {
    const currentHour = new Date().getHours();
    const isOpen = currentHour >= 10 && currentHour < 22;

    const [searchTerm, setSearchTerm] = useState('');
    const [favourites, setFavourites] = useState([]);

    const filteredPizzas = pizzaData.filter(
        pizza => pizza.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 pizza.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleFavourite = (pizza) => {
        setFavourites(prev => {
            const newFavourites = [...prev];
            const pizzaIndex = newFavourites.indexOf(pizza);
            if (pizzaIndex > -1) {
                newFavourites.splice(pizzaIndex, 1); // Remove pizza from favourites
            } else {
                newFavourites.push(pizza); // Add pizza to favourites
            }
            return newFavourites;
        });
    };

    return (
        <div className="container">
            <Header isOpen={isOpen} />
            <SearchBar setSearchTerm={setSearchTerm} />
            <Menu pizzas={filteredPizzas} toggleFavourite={toggleFavourite} favourites={favourites} />
            <Footer isOpen={isOpen} />
        </div>
    );
}

function Header({ isOpen }) {
    return (
        <header className="header">
            <h1>Faith Pizza Co.</h1>
            {isOpen && <p className="tagline">Authentic Italian cuisine, all from our stone oven</p>}
        </header>
    );
}

function SearchBar({ setSearchTerm }) {
    return (
        <section className="search">
            <input
                type="text"
                placeholder="Search pizzas..."
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </section>
    );
}

function Menu({ pizzas, toggleFavourite, favourites }) {
    return (
        <section className="menu">
            <h2>Our Menu</h2>
            <ul className="pizzas">
                {pizzas.map((pizza, index) => (
                    <Pizza
                        key={index}
                        pizza={pizza}
                        toggleFavourite={toggleFavourite}
                        isFavourite={favourites.includes(pizza)}
                    />
                ))}
            </ul>
        </section>
    );
}

function Pizza({ pizza, toggleFavourite, isFavourite }) {
    return (
        <li className={`pizza ${pizza.soldOut ? 'sold-out' : ''}`}>
            <img src={pizza.photoName} alt={`${pizza.name} pizza`} />
            <div>
                <h3>{pizza.name}</h3>
                <p>{pizza.ingredients}</p>
                <span>{pizza.soldOut ? "Sold Out" : `$${pizza.price}`}</span>
                <button
                    className={`fav-btn ${isFavourite ? 'favourited' : ''}`}
                    onClick={() => toggleFavourite(pizza)}
                >
                    {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
                </button>
            </div>
        </li>
    );
}

function Footer({ isOpen }) {
    return (
        <footer className="footer">
            <p>{isOpen ? "We’re currently open" : "Sorry, we're closed"}</p>
            {isOpen && <OrderButton />}
        </footer>
    );
}

function OrderButton() {
    return (
        <div className="order">
            <button className="btn">Order</button>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
