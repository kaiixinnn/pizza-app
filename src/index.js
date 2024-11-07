import React from 'react';
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

    return (
        <div className="container">
            <Header isOpen={isOpen} />
            <Menu pizzas={pizzaData} />
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

function Menu({ pizzas }) {
    return (
        <section className="menu">
            <h2>Our Menu</h2>
            <ul className="pizzas">
                {pizzas.map((pizza, index) => (
                    <Pizza
                        key={index}
                        name={pizza.name}
                        ingredients={pizza.ingredients}
                        price={pizza.price}
                        photoName={pizza.photoName}
                        soldOut={pizza.soldOut}
                    />
                ))}
            </ul>
        </section>
    );
}

function Pizza({ name, ingredients, price, photoName, soldOut }) {
    return (
        <li className={`pizza ${soldOut ? 'sold-out' : ''}`}>
            <img src={photoName} alt={`${name} pizza`} />
            <div>
                <h3>{name}</h3>
                <p>{ingredients}</p>
                <span>{soldOut ? "Sold Out" : `$${price}`}</span>
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
        <div className = "order">
        <button className="btn">Order</button>
        </div>
    
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
