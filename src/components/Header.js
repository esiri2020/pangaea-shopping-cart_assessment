import React from 'react'

export default function Header(props) {
  const show = (e) => {
    e.preventDefault()
    props.show(true)
  }
    return (
        <header className="block row center french" >
        <div>
          <div >
            <h1>LUMEN</h1>
          </div>
        </div>
        <div>
          <a href="#" className="nav-link" onClick={e => show(e)}>
            Cart{' '}
            {props.countCartItems ? (
              <button className="badge">{props.countCartItems}</button>
            ) : (
              ''
            )}
          </a>{' '}
          <a href="#"className="nav-link"> Account</a>
        </div>
      </header>
    )
}
