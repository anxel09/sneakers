import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./components/Pages/Home";
import Favorite from "./components/Pages/Favorite";
import { useState, useEffect } from "react";
import axios from "axios";
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
  const [changeInput, setChangeInput] = useState("");
  const [itemCartId, SetItemCartId] = useState(1);
  const [favoriteId, SetFavoriteId] = useState(1);
  const [favoriteList, setFavoriteList] = useState([])
  const [addState, setAddState] = useState([])

  useEffect(() => {
    axios
      .get("https://62b9cbe5ff109cd1dc9b5328.mockapi.io/items")
      .then((resp) => setItems(resp.data));
    axios.get("https://62b9cbe5ff109cd1dc9b5328.mockapi.io/favorite")
      .then((resp)=> setFavoriteList(resp.data))
      axios.get('https://62b9cbe5ff109cd1dc9b5328.mockapi.io/cart')
        .then(resp => setCartItems(resp.data))
  }, []);

  // useEffect(()=>{
  //   console.log(favoriteList)
  // },[favoriteList])

  async function addInCart(obj) {
    try{
      obj.id = itemCartId;
      const { data } = await axios.post(
        "https://62b9cbe5ff109cd1dc9b5328.mockapi.io/cart",
        obj
        );
      SetItemCartId(itemCartId + 1);
      setCartItems((prev) => [...prev, data]);

    }catch(err){
      alert('Не удалось добавить')
    }
  }

  async function removeFromCart(obj) {
    try{
      const id = cartItems.filter((item) => item.imageUrl === obj.imageUrl)[0].id;
      await axios.delete(
        `https://62b9cbe5ff109cd1dc9b5328.mockapi.io/cart/${id}`
      );
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    }catch(error){
      console.log(cartItems.filter((item) => item.imageUrl === obj.imageUrl))
    }
  }

  function onChangeSearch(event) {
    setChangeInput(event.target.value);
  }

  function filteredSearch(arr) {
    return arr.filter((item) =>
      item.name.toLowerCase().includes(changeInput.toLowerCase())
    );
  }

  async function onAddInFavorite(item){
    item.id = favoriteId
    const {data} = await axios.post('https://62b9cbe5ff109cd1dc9b5328.mockapi.io/favorite',item)
    setFavoriteList((prev) => [...prev,data])
    SetFavoriteId(favoriteId+1)
  }

  async function onRemoveFavorite(obj){
    const id = favoriteList.filter((item) => item.imageUrl === obj.imageUrl)[0].id;
    await axios.delete(
      `https://62b9cbe5ff109cd1dc9b5328.mockapi.io/favorite/${id}`
      );
      setFavoriteList((prev) => prev.filter((item) => item.id !== id));

  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setIsCart={setIsCart}
              isCart={isCart}
              changeInput={changeInput}
              setChangeInput={setChangeInput}
              onChangeSearch={onChangeSearch}
              filteredSearch={filteredSearch}
              items={items}
              addInCart={addInCart}
              removeFromCart={removeFromCart}
              onAddInFavorite={(item)=> onAddInFavorite(item)}
              onRemoveFavorite = {(obj) => onRemoveFavorite(obj)}
              favoriteList = {favoriteList}
              cartItems = {cartItems}
              setCartItems ={(data)=>setCartItems(data)}
              addState ={addState}
              setAddState = {(state)=>setAddState(state)}
            />
          }
        >
        </Route>
        <Route path="/favorite" element={<Favorite
          favoriteList = {favoriteList}
          addInCart={addInCart}
          cartItems ={cartItems}
          removeFromCart={(obj)=>removeFromCart(obj)}
          onAddInFavorite={(item)=> onAddInFavorite(item)}
          onRemoveFavorite = {(obj) => onRemoveFavorite(obj)}
        />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
