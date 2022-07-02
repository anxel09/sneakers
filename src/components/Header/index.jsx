import styles from './Header.module.scss'
import { Link } from "react-router-dom";

const Header = function(props){

    return(
        <header>
        <Link to={'/'}>
          <div className={styles.headerLeft}>
            <img width={40} height={40} src="img/logo.png" alt="logo" />
            <div className={styles.headerInfo}>
              <h3>REACT SNEAKERS</h3>
              <p>Магазин лучших кроссовок</p>
            </div>
          </div>
        </Link>

        <ul className={styles.headerRight}>
          <li onClick={props.onClickCart}>
            <img width={20} height={20} src="img/cart.svg" alt="" />
            <p className={styles.headerPrice}>{props.totalPrice} руб</p>
          </li>
          <li>
            <Link to={'/favorite'}><img width={20} height={20} src="img/heart.svg" alt="" /></Link>
          </li>
          <li>
            <img width={20} height={20} src="img/user.svg" alt="" />
          </li>
        </ul>
      </header>
    );
}

export default Header