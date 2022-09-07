import React, { Component } from "react";
import style from '../cardListSample.module.css';

export default class CardListFooter extends Component {

  // 카드 추가용 ref
  refGroupCd = React.createRef();
  refGroupNm = React.createRef();
  refTotCnt = React.createRef();
  refAmt = React.createRef();
  // 카드 수정용 ref
  refSelectedCardGroupCd = React.createRef();
  refSelectedCardGroupNm = React.createRef();
  refSelectedCardTotCnt = React.createRef();
  refSelectedCardAmt = React.createRef();

  // 크기수정용
  refSize = React.createRef();

  state = {
    menu: '1'
  }

  // 카드 추가하기
  setAddCard = (upDown) => {
    let groupCd = this.refGroupCd.current.value;
    let groupNm = this.refGroupNm.current.value;
    let totCnt = this.refTotCnt.current.value;
    let amt = this.refAmt.current.value;


    // 중복검사
    let cdArr = new Set();

    this.props.rootArrayInfo.map(i => {
      return cdArr.add(i.groupCd)
    })

    if (cdArr.has(groupCd))
      return alert('중복 groupCd!');

    if (groupCd.length == 0 || groupNm.length == 0 || totCnt.length == 0 || amt.length == 0)
      return alert('빈 항목 존재!')

    let data = {
      groupCd: groupCd,
      groupNm: groupNm,
      totCnt: totCnt,
      amt: amt
    }

    this.props.setRootArrayInfo(data, upDown);

    // 초기화
    this.refGroupCd.current.value = '';
    this.refGroupNm.current.value = '';
    this.refTotCnt.current.value = '';
    this.refAmt.current.value = '';
  }

  // 카드 수정하기
  setUpdateSelectedCard = () => {
    let data = {
      groupCd: this.refSelectedCardGroupCd.current.innerText,
      groupNm: this.refSelectedCardGroupNm.current.value,
      totCnt: this.refSelectedCardTotCnt.current.value,
      amt: this.refSelectedCardAmt.current.value
    }

    this.props.setUpdateSelectedCard(data);
  }

  // 메뉴변경
  setChangeMenu = (e) => {
    this.setState({ menu: e.target.dataset.menu });
  }

  // 중복체크용 함수
  getCdArr = (arr) => {
    let cdArr = new Set();
    arr.map(i => {
      return cdArr.add(i.groupCd)
    })
    return cdArr;
  }

  setSize = () => {
    let v = this.refSize.current.value;

    console.log(v)
    this.props.setSize(v);
  }

  render() {
    let rootCheckedList = this.props.rootCheckedList;
    let rootArrayInfo = this.props.rootArrayInfo;

    let { menu } = this.state;

    return (
      <div className={style.cardList__footer}>
        <h2 className={style.title} >OJT 2차 과제 카드리스트 만들기</h2>
        <div>
          <button data-menu='1' onClick={e => this.setChangeMenu(e)}>체크된 인덱스/데이터</button>
          <button data-menu='2' onClick={e => this.setChangeMenu(e)}>카드리스트 추가</button>
          <button data-menu='3' onClick={e => this.setChangeMenu(e)}>선택된 카드 조회/수정</button>
          <button data-menu='4' onClick={e => this.setChangeMenu(e)}>카드리스트 삭제</button>
          <button data-menu='5' onClick={e => this.setChangeMenu(e)}>카드리스트 조회</button>
          <button data-menu='6' onClick={e => this.setChangeMenu(e)}>크기수정</button>
        </div>

        {
          menu == '1' ?
            <>
              <div>
                <h3>체크된 인덱스 값</h3>
                {rootCheckedList.map((i) => { return i.groupCd + ', ' })}
              </div>

              <div>
                <h3>체크된 데이터 값</h3>
                {
                  rootCheckedList.map((i) => {
                    return (
                      <div key={i.groupCd}>{'{'} groupCd:{i.groupCd}, groupNm:{i.groupNm}, totCnt:{i.totCnt}, amt:{i.amt} {'},'}</div>
                    )
                  })
                }
              </div>
            </>
            : undefined
        }

        {
          menu == '2' ?
            <div>
              <h3>카드리스트 추가</h3>
              <div className={style.boxs}>
                <div>* 공백은 입력하실 수 없습니다.</div>
                <div><label>groupCd</label><input type={'text'} ref={this.refGroupCd} /></div>
                <div><label>groupNm</label><input type={'text'} ref={this.refGroupNm} /></div>
                <div><label>totCnt</label><input type={'number'} ref={this.refTotCnt} /></div>
                <div><label>amt</label><input type={'number'} ref={this.refAmt} /></div>
              </div>
              <div>
                <button onClick={e => this.setAddCard('up')}>상단추가</button>
                <button onClick={e => this.setAddCard('down')}>하단추가</button>
              </div>
            </div>
            : undefined
        }

        {
          menu == '3' ?
            <>
              <div>
                <h3>선택된 카드</h3>
                {
                  rootArrayInfo.map((item, index) => {
                    return item.groupCd == this.props.selectedCard ? '선택된 카드의 인덱스는 전체' + (rootArrayInfo.length) + '개 중' + (index + 1) + '번째 카드입니다.' : '';
                  })
                }
              </div>
              <div>
                <h3>카드리스트 수정</h3>
                {
                  rootArrayInfo.map(i => {
                    if (this.props.selectedCard == i.groupCd) {
                      return (
                        <div key={i.groupCd}>
                          <span ref={this.refSelectedCardGroupCd}>{i.groupCd}</span><br />
                          <input defaultValue={i.groupNm} ref={this.refSelectedCardGroupNm} /><br />
                          <input defaultValue={i.totCnt} ref={this.refSelectedCardTotCnt} /><br />
                          <input defaultValue={i.amt} ref={this.refSelectedCardAmt} /><br />
                          <button onClick={this.setUpdateSelectedCard}>수정하기</button>
                        </div>
                      )
                    }
                  })
                }
              </div>
            </>
            : undefined
        }


        {
          menu == '4' ?
            <div>
              <h3>카드리스트 삭제</h3>
              <button onClick={this.props.setDeleteCheckedCards}>체크된 카드 삭제하기</button>
            </div>
            : undefined
        }

        {
          menu == '5' ?
            <>
              <div>
                <h3>카드리스트 조회</h3>
                <h4>전체 카드리스트(현재)</h4>
                <div>
                  {
                    this.props.rootArrayInfo.map(i => <span>{i.groupCd}, </span>)
                  }
                </div>

                <h4>수정된 카드리스트</h4>
                <div>
                  {
                    this.props.rootUpdatedList.map((i, index) => {
                      return (
                        <div key={i.groupCd + new Date().toLocaleString + index}>
                          <span>{
                            this.getCdArr(this.props.rootDeletedList).has(i.groupCd) ?
                              i.groupCd + '(Deleted)'
                              : i.groupCd
                          }</span>
                          <UpdateContent update={i} />
                        </div>
                      )
                    })
                  }
                </div>

                <h4>추가된 카드리스트</h4>
                <div>
                  {
                    this.props.rootAddedList.map(i => {
                      return (this.getCdArr(this.props.rootDeletedList).has(i.groupCd) ?
                        <span key={i.groupCd}>{i.groupCd}(Deleted), </span> :
                        <span key={i.groupCd}>{i.groupCd}, </span>);
                    })
                  }
                </div>
                <h4>삭제된 카드리스트</h4>
                <div>
                  {
                    this.props.rootDeletedList.map(i => {
                      return <span key={i.groupCd}>{i.groupCd}, </span>
                    })
                  }
                </div>
              </div>
            </>
            : undefined
        }

        {
          menu == '6' ?
            <div>
              <h3>크기수정</h3>
              <input type={'number'} ref={this.refSize} />
              <button onClick={this.setSize}>크기변경</button>
            </div>
            : undefined
        }

      </div>
    )
  }

}

export class UpdateContent extends Component {

  // 중복체크용 함수
  getCdArr = (arr) => {
    let cdArr = new Set();
    arr.map(i => {
      return cdArr.add(i.groupCd)
    })
    return cdArr;
  }

  render() {
    let data = this.props.update;
    return (
      <div>
        {
          data.update.map(i => {
            return (
              <div key={i.date}>
                <span>{i.date}</span>
                <span>{i.after.groupNm}</span>
                <span>{i.after.totCnt}</span>
                <span>{i.after.amt}</span>
              </div>
            )
          })
        }
      </div>
    )
  }

}