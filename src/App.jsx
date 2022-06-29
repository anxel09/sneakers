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
  const [itemId, setId] = useState(1);

  useEffect(() => {
    axios
      .get("https://62b9cbe5ff109cd1dc9b5328.mockapi.io/items")
      .then((resp) => setItems(resp.data));
  }, []);

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  async function addInCart(obj) {
    obj.id = itemId;
    const { data } = await axios.post(
      "https://62b9cbe5ff109cd1dc9b5328.mockapi.io/cart",
      obj
    );
    setId(itemId + 1);
    setCartItems((prev) => [...prev, data]);
  }

  async function removeFromCart(obj) {
    const id = cartItems.filter((item) => item.imageUrl === obj.imageUrl)[0].id;
    await axios.delete(
      `https://62b9cbe5ff109cd1dc9b5328.mockapi.io/cart/${id}`
    );
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  function onChangeSearch(event) {
    setChangeInput(event.target.value);
  }

  function filteredSearch(arr) {
    return arr.filter((item) =>
      item.name.toLowerCase().includes(changeInput.toLowerCase())
    );
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
            />
          }
        >
          {" "}
        </Route>
        <Route path="/favorite" element={<Favorite />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
