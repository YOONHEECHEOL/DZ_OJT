import React, { Component } from 'react';

export default class CardListSample extends Component {

  render() {
    return (
      <>
        <h2>OJT 1차 과제 카드리스트 만들기</h2>
        <div>
          <CardListHeader />
          <CardListBody />
        </div>
      </>
    )
  }

}

export class CardListHeader extends Component {

  render() {
    return (
      <div>
        <form>
          <input placeholder='그룹명으로 검색하세요.' />
          <button>검색</button>
        </form>
        <input id='totalCheck' type='checkbox' />
        <label for='totalCheck'>전체검색</label>
        <button>이름순</button>
      </div>
    )
  }

}

export class CardListBody extends Component {

  render() {
    return (
      <div>
        CardListBody
      </div>
    )
  }

}