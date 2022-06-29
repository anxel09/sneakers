import axios from "axios";
import { useEffect, useState } from "react";
import { Route,Routes,BrowserRouter } from "react-router-dom";
import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
// const arr = [
//   {
//     "name": "Мужские Кроссовки Nike Air Max 270",
//     "price": 12999,
//     "imageUrl": "img/Nike Air Max.png"
//   },
//   {
//     "name": "Мужские Кроссовки Nike Blazer Mid Suede",
//     "price": 33444,
//     "imageUrl": "img/Nike Blaze Mid Suede.jpg"
//   },
//   {
//     "name": "Мужские Кроссовки Nike Blazer Mid Suede",
//     "price": 8499,
//     "imageUrl": "img/image 5.jpg"
//   },
//   {
//     "name": "Мужские Кроссовки Nike Blazer Mid Suede",
//     "price": 8499,
//     "imageUrl": "img/Nike Blazer Mid Suede.jpg"
//   },
//   {
//     "name": "Кроссовки Puma X Aka Boku Future Rider",
//     "price": 15188,
//     "imageUrl": "img/Puma X Aka Boku Future Rider.jpg"
//   },
// ];

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCart, setIsCart] = useState(false);
  const [changeInput, setChangeInput] = useState('');
  const [itemId,setId] = useState(1);

  useEffect(() => {
    axios.get("https://62b9cbe5ff109cd1dc9b5328.mockapi.io/items")
      .then(resp => setItems(resp.data))
  }, []);

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);


  async function addInCart(obj) {
    obj.id = itemId
    const {data} = await axios.post('https://62b9cbe5ff109cd1dc9b5328.mockapi.io/cart',obj)
    setId(itemId+1)
    setCartItems(prev => [...prev,data])
    }
  
  async function removeFromCart(obj){
      const id = cartItems.filter(item =>item.imageUrl === obj.imageUrl)[0].id
      await axios.delete(`https://62b9cbe5ff109cd1dc9b5328.mockapi.io/cart/${id}`)
      setCartItems(prev => prev.filter(item=> item.id !== id))
    }
 
  function onChangeSearch(event){
    setChangeInput(event.target.value)
  }

  function filteredSearch(arr){
    return arr.filter((item) =>item.name.toLowerCase().includes(changeInput.toLowerCase()))
  }

  return (
    <div className="wrapper">
      <Header onClickCart={() => setIsCart(true)} />
      {isCart ? (
        <Drawer onClickClose={() => setIsCart(false)} />
      ) : null}
      <BrowserRouter>
      
        <Routes>

          <Route path="/test" element='qwe'>
          </Route>

        </Routes>

      </BrowserRouter>
      
      <div className="content">
        <div className="content-top">
          <h1>{changeInput ? `Данные по запросу: '${changeInput}'`: 'Все кроссовки'}</h1>
          <div className="search-block">
            <img src="img/search.svg" alt="search" />
            <img onClick={()=>setChangeInput('')} className="remove-btn" src="img/btn-remove.svg" alt="remove" />
            <input onChange={onChangeSearch} value={changeInput} className="search" type="text" placeholder="Поиск..." />
          </div>
        </div>
        <div className="content-items">
          {filteredSearch(items)
          .map((val,index) => {
            return (
              <Card
                key = {val.imageUrl}
                title={val.name}
                price={val.price}
                imageUrl={val.imageUrl}
                // onClickFavorite={() => console.log("Добавили в избранное")}
                onClickAdd={(obj) => addInCart(obj)}
                onRemoveAdd={(obj) => removeFromCart(obj)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
