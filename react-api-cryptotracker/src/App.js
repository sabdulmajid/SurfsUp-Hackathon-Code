import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';


function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(()=>{
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&order=market_cap_desc&per_page=10000&page=1&sparkline=false")
    .then(response => {
      setCoins(response.data);

    }).catch(error => alert("Error! Something wrong with code!"))
  }, []);

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase()) // Used to make sure that the search is not case sensitive.
    )

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Crypto Tracker</h1>
        <form>
          <input type="text" placeholder="Search" className="coin-input" onChange={handleChange}/>  
        </form>      
    </div>
      
      
      {filteredCoins.map(coin => {
        return ( 
          <Coin 
            key={coin.id} 
            name={coin.name} 
            image={coin.image}
            symbol={coin.symbol}
            volume={coin.total_volume}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            marketcap={coin.market_cap}
          />
        );
      })}

    </div>
  );
}

export default App;
