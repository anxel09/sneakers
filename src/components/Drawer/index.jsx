import { useEffect, useState } from 'react';
import styles from './Drawer.module.scss'
import axios from "axios";
const Drawer = function ({onClickClose}) {
  const [cartItems,setCartItems] = useState([])
  useEffect(()=>{
    axios.get('https://62b9cbe5ff109cd1dc9b5328.mockapi.io/cart').then(resp => setCartItems(resp.data))
  },[])

  function deleteItem(id){
    axios.delete(`https://62b9cbe5ff109cd1dc9b5328.mockapi.io/cart/${id}`)
    setCartItems(prev => prev.filter(item => item.id !== id) )
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.drawer}>
        <h3>
          Корзина <img onClick={onClickClose} src="img/btn-remove.svg" alt="remove" />
        </h3>
        <div className= {styles.drawerItems}>
          {
            cartItems.map((item)=>{
              return(
              <div key={item.id} className= {styles.drawerItem}>
              <img
                width={70}
                height={70}
                src={item.imageUrl}
                alt="sneakers"
                className={styles.drawerImg}
              />
              <div className={styles.drawerDesc}>
                <p>{item.name}</p>
                <h4 className={styles.drawerPrice}>{item.price}</h4>
              </div>
              <img
                onClick={() =>deleteItem(item.id)}
                className={styles.btnRemove}
                width={32}
                height={32}
                src="img/btn-remove.svg"
                alt="remove"
              />
            </div>
              )
            })
          }
        </div>
        <div className= {styles.drawerFooter}>
          <div className={styles.finally}>
            <p>Итого:</p>
            <span></span>
            <h5 className={styles.finallyPrice}>21498 руб.</h5>
          </div>
          <div className={styles.tax}>
            <p>Налог 5%</p>
            <span></span>
            <h5 className={styles.taxPrice}>214928 руб.</h5>
          </div>
          <button className={styles.makeOrder}>
            <p>Оформить заказ</p>
            <img src="img/arrow-right.svg" alt="arrow" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
