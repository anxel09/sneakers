import { useState } from "react";

import styles from "./Card.module.scss";
const Card = function ({
  title,
  price,
  imageUrl,
  addInCart,
  onRemoveAdd,
  onAddInFavorite,
  isFavoriteIcon = false,
  onRemoveFavorite,
  favoriteList,
}) {
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false)

  function onClickAdd() {
    setIsAdded(!isAdded);
  }

  
  const item = {
    name:  title,
    price:  price,
    imageUrl:  imageUrl,
  };
  
  function onClickFavorite(){
    const arr = favoriteList.find(item =>item.imageUrl === imageUrl)
    if ( arr ){
      removeFavorite(item)
      setIsFavorite(false)
      return
    } 
    setIsFavorite(!isFavorite);
    isFavoriteIcon ? removeFavorite(item) : isFavorite ?  removeFavorite(item) :  onAddInFavorite(item);
  }

  function favoriteState(transmittedState){
    const arr = favoriteList.find(item =>item.imageUrl === imageUrl)
    if ( arr ){
      return "img/favorite-active.svg"
    } 
    return (transmittedState || isFavorite) ? "img/favorite-active.svg" : "img/favorite-inactive.svg"
  }

  function removeFavorite(item)
  {
    onRemoveFavorite(item)
  }

  return (
    <div className={styles.item} key={imageUrl}>
      <img
        className={styles.favorite}
        width={32}
        height={32}
        src={favoriteState(isFavoriteIcon)}
        alt="favorite"
        onClick={()=>{
          onClickFavorite()
          }
        }
      />
      <img width={133} height={112} src={ imageUrl} alt="sneakers" />
      <p className={styles.title}>{ title}</p>
      <div className={styles.contentPrice}>
        <div className={styles.contentPriceWrapper}>
          <p>ЦЕНА: </p>
          <h4 className={styles.price}>{ price} руб.</h4>
        </div>
        <button>
          <img
            onClick={() => {
              onClickAdd();

              return !isAdded ?  addInCart( item ) :  onRemoveAdd(item)
              
            }}
            width={32}
            height={32}
            className={styles.btnAdd}
            src={isAdded ? "img/btn-added.svg" : "img/btn-add.svg"}
            alt=""
          />
        </button>
      </div>
    </div>
  );
};

export default Card;
