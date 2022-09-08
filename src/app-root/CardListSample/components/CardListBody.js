import React, { Component } from 'react';
import style from '../cardListSample.module.css';

export default class CardListBody extends Component {

  state = {
    size: this.props.size
  }

  componentDidMount() {

  }

  render() {

    return (
      <div className={style.cardList__body} style={{ height: this.props.size + 'px' }}>
        {this.props.children}
      </div>
    )
  }

}