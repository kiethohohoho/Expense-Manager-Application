import {memo} from 'react'
import style from './header.module.scss'

function Header() {
  return (
    <header className={style.header}>
      <h1>Simple Expense Manager Application</h1>
    </header>
  );
}

export default memo(Header)
