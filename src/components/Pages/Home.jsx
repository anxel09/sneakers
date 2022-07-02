import Header from "../Header";
import Drawer from "../Drawer";
import Card from "../Card";
import { useEffect, useState } from "react";




const Home = function ({
    setIsCart,
    isCart,
    changeInput,
    setChangeInput,
    onChangeSearch,
    filteredSearch,
    items,
    addInCart,
    removeFromCart,
    onAddInFavorite,
    onRemoveFavorite,
    favoriteList,
    cartItems,
    setCartItems,
    addState,
    setAddState,
}) {
  const [totalPrice, setTotalPrice] = useState(0)
  const [scrollY, setScrollY] = useState(false)

  useEffect(()=>{
      setTotalPrice(()=> cartItems.reduce((prev,cur) => prev+cur.price,0))
  },[cartItems])

  useEffect(()=>{
    scrollY ? (document.body.style.overflowY = 'hidden') : (document.body.style.overflowY = 'auto') 
  },[scrollY])

  return (
    <div className={'wrapper'}>
      <Header totalPrice={totalPrice} onClickCart={() => {
        setIsCart(true)
        setScrollY(true)
        }} />
      {isCart ? <Drawer
      onClickClose={() => {
        setIsCart(false)
        setScrollY(false)  
      }
      }
      cartItems ={cartItems}
      setCartItems = {(data)=>setCartItems(data)}
      removeFromCart ={(data)=>removeFromCart(data)}
      setAddState = {(state)=>setAddState(state)}
      addState = {addState}
      totalPrice ={totalPrice}
      /> : null}

      <div className="content" >
        <div className="content-top">
          <h1>
            {changeInput
              ? `Данные по запросу: '${changeInput}'`
              : "Все кроссовки"}
          </h1>
          <div className="search-block">
            <img src="img/search.svg" alt="search" />
            <img
              onClick={() => setChangeInput("")}
              className="remove-btn"
              src="img/btn-remove.svg"
              alt="remove"
            />
            <input
              onChange={onChangeSearch}
              value={changeInput}
              className="search"
              type="text"
              placeholder="Поиск..."
            />
          </div>
        </div>
        <div className="content-items">
          {filteredSearch(items).map((val, index) => {
            return (
              <Card
                key={val.imageUrl}
                title={val.name}
                price={val.price}
                imageUrl={val.imageUrl}
                addInCart={(obj) => addInCart(obj)}
                onRemoveAdd={(obj) => removeFromCart(obj)}
                onAddInFavorite={(item)=>onAddInFavorite(item)}
                onRemoveFavorite = {(obj) => onRemoveFavorite(obj)}
                favoriteList = {favoriteList}
                cartItems = {cartItems}
                addState = {addState}
                setAddState ={(state)=>setAddState(state)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
