import { useEffect,useState } from "react";
import styles from "./Drawer.module.scss";
import axios from "axios";
import Info from "../Info";
const Drawer = function ({
   onClickClose,
   setCartItems,
   cartItems,
   addState = true,
   setAddState,
   totalPrice,
  }) {

    const [orderCount, setOrderCount] = useState(0)
    const [isOrder, setIsOrder] = useState(false)

  useEffect(() => {
    axios
      .get("https://62b9cbe5ff109cd1dc9b5328.mockapi.io/cart")
      .then((resp) => setCartItems(resp.data));
  },[]);

  async function makeOrder(){
    try{
      const {data} = await axios.post('https://62b9cbe5ff109cd1dc9b5328.mockapi.io/order',{items: cartItems})
      for (let i = 0; i < cartItems.length; i++) {
        const element = cartItems[i];
        await axios.delete(`https://62b9cbe5ff109cd1dc9b5328.mockapi.io/cart/${element.id}`)
        function delay(ms){
          setTimeout(()=>true,ms)
        }
        setOrderCount(data.id)
        setIsOrder(true)
        delay(1000)
      }
      
      setCartItems([])

    }catch(error){
      alert('Не удалось совершить покупку :(')
    }
  }


  async function deleteItem(id) {
    setAddState(false)
      await axios.delete(
        `https://62b9cbe5ff109cd1dc9b5328.mockapi.io/cart/${id}`
      );
      setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className={styles.overlay} >
      <div className={styles.drawer}>
        <h3>
          Корзина{" "}
          <img onClick={()=>{onClickClose();setIsOrder(false)}} src="img/btn-remove.svg" alt="remove" />
        </h3>
        {cartItems.length > 0 ? (
          <div>
            <div className={styles.drawerItems}>
              {cartItems.map((item) => {
                return (
                  <div key={item.id} className={styles.drawerItem}>
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
                      onClick={() => deleteItem(item.id)}
                      className={styles.btnRemove}
                      width={32}
                      height={32}
                      src="img/btn-remove.svg"
                      alt="remove"
                    />
                  </div>
                );
              })}
            </div>
            <div className={styles.drawerFooter}>
              <div className={styles.finally}>
                <p>Итого:</p>
                <span></span>
                <h5 className={styles.finallyPrice}>{totalPrice} руб.</h5>
              </div>
              <div className={styles.tax}>
                <p>Налог 5%</p>
                <span></span>
                <h5 className={styles.taxPrice}>{(totalPrice * 1.05).toFixed(2)} руб.</h5>
              </div>
              <button className={styles.makeOrder} onClick={makeOrder}>
                <p>Оформить заказ</p>
                <img src="img/arrow-right.svg" alt="arrow" />
              </button>
            </div>
          </div>
        ) : (
          <>
            <Info
            title={ isOrder ? "Заказ оформлен!" :"Корзина Пустая"}
            description={ isOrder ? `Ваш заказ #${orderCount} скоро будет передан курьерской доставке` :"Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
            image={ isOrder ? 'img/order.jpg':'img/cart_empty.png'}
            />
            <button className={styles.backAway} onClick={()=>{onClickClose();setIsOrder(false)}}>Вернуться назад</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Drawer;
