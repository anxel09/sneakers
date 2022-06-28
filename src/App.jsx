import axios from "axios";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    axios.get("https://62b9cbe5ff109cd1dc9b5328.mockapi.io/items")
      .then(resp => setItems(resp.data))
  }, []);

  // function addInCart(obj) {
  //     axios.get('https://62b9cbe5ff109cd1dc9b5328.mockapi.io/cart').then(resp =>{
  //       if(!resp.data.filter(item => item.imageUrl === obj.imageUrl).length > 0){
  //         axios.post('https://62b9cbe5ff109cd1dc9b5328.mockapi.io/cart',obj);
  //         setCartItems([...resp.data,obj])
  //       }
  //     })
  // }

  function addInCart(obj) {
    axios.post('https://62b9cbe5ff109cd1dc9b5328.mockapi.io/cart',obj)
    // .then(() =>axios.get('https://62b9cbe5ff109cd1dc9b5328.mockapi.io/cart').then(resp =>setCartItems(resp.data)))
  }

  function removeFromCart(obj){
      axios.get('https://62b9cbe5ff109cd1dc9b5328.mockapi.io/cart').then(resp => {
        let id = resp.data.filter(item => item.imageUrl === obj.imageUrl)[0].id
      axios.delete(`https://62b9cbe5ff109cd1dc9b5328.mockapi.io/cart/${id}`)
    }
  )
}
  // function removeFromCart(obj){
  //   console.log(cartItems)
  //     let id =cartItems.filter(item =>item.imageUrl == obj.imageUrl)[0].id
  //     console.log(id)
  //     axios.delete(`https://62b9cbe5ff109cd1dc9b5328.mockapi.io/cart/${id}`)
  //   }
 


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
