import { useState } from "react";

import styles from "./Card.module.scss";
const Card = function (props) {
  const [isAdded, setIsAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false)

  function onClickAdd() {
    setIsAdded(!isAdded);
  }

  function onClickFavorite(){
    setIsFavorite(!isFavorite)
  }

  return (
    <div className={styles.item} key={props.imageUrl}>
      <img
        className={styles.favorite}
        width={32}
        height={32}
        src={isFavorite ?"img/favorite-active.svg" : "img/favorite-inactive.svg"}
        alt="favorite"
        onClick={onClickFavorite}
      />
      <img width={133} height={112} src={props.imageUrl} alt="sneakers" />
      <p className={styles.title}>{props.title}</p>
      <div className={styles.contentPrice}>
        <div className={styles.contentPriceWrapper}>
          <p>ЦЕНА: </p>
          <h4 className={styles.price}>{props.price} руб.</h4>
        </div>
        <button>
          <img
            onClick={() => {
              onClickAdd();
              const item = {
                name: props.title,
                price: props.price,
                imageUrl: props.imageUrl,
              };
              return !isAdded ? props.onClickAdd( item ) : props.onRemoveAdd(item)
              
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
