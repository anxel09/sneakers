import Header from "../Header";
import Card from "../Card";

const Favorite = function ({
  favoriteList,
  addInCart,
  removeFromCart,
//   onAddInFavorite,
  cartItems,
  onRemoveFavorite,
})
{

function onAddInFavorite(item){
    console.log(item)
}

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <h1>Избранные </h1>
        <div className="content-items">
          {favoriteList.map((val) => {
            return (
              <Card
                key={val.imageUrl}
                title={val.name}
                price={val.price}
                imageUrl={val.imageUrl}
                addInCart={(obj)=>console.log(obj)}
                onRemoveAdd={(obj) => removeFromCart(obj)}
                onAddInFavorite={(item) => onAddInFavorite(item)}
                isFavoriteIcon = {true}
                onRemoveFavorite = {(obj) => onRemoveFavorite(obj)}
                favoriteList = {favoriteList}
                cartItems = {cartItems}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Favorite;
