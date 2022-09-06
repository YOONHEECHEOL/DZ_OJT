import React, { Component } from 'react';
import style from '../cardListSample.module.css';

export default class CardListBody extends Component {

  render() {

    return (
      <div className={style.cardList__body}>
        {this.props.children}
      </div>
    )
  }

}