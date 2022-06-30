import Header from "../Header";
import Drawer from "../Drawer";
import Card from "../Card";




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
}) {

  return (
    <div className="wrapper">
      <Header onClickCart={() => setIsCart(true)} />
      {isCart ? <Drawer onClickClose={() => setIsCart(false)} /> : null}

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
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
