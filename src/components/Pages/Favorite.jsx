import Header from "../Header";
import Card from "../Card";
import Info from "../Info";
import { useEffect, useState } from "react";

const Favorite = function ({
  favoriteList,
  addInCart,
  removeFromCart,
  cartItems,
  onRemoveFavorite,
})
{

// function onAddInFavorite(item){
//     console.log(item)
// }

const [totalPrice, setTotalPrice] = useState(0)

useEffect(()=>{
    setTotalPrice(()=> cartItems.reduce((prev,cur) => prev+cur.price,0))
},[cartItems])


  return (
    <div className="wrapper">
      <Header totalPrice={totalPrice}/>
      <div className="content">
        <h1>Избранные </h1>
        <div className="content-items">

          {favoriteList.length ? favoriteList.map((val) => {
            return (
              <Card
                key={val.imageUrl}
                title={val.name}
                price={val.price}
                imageUrl={val.imageUrl}
                addInCart={addInCart}
                onRemoveAdd={(obj) => removeFromCart(obj)}
                // onAddInFavorite={(item) => onAddInFavorite(item)}
                isFavoriteIcon = {true}
                onRemoveFavorite = {(obj) => onRemoveFavorite(obj)}
                favoriteList = {favoriteList}
                cartItems = {cartItems}
              />
            );
          }): 
          <div className='sadness'>
            <Info
              title={'Закладок нет :('}
              description={'Вы ничего не добавляли в закладки'}
              image={'img/sadness.png'}
            />
          </div>
            
          }
        </div>
      </div>
    </div>
  );
};

export default Favorite;
