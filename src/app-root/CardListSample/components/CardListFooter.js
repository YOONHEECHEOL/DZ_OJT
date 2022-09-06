import React, { Component } from "react";
import style from '../cardListSample.module.css';

export default class CardListFooter extends Component {

  refGroupCd = React.createRef();
  refGroupNm = React.createRef();
  refTotCnt = React.createRef();
  refAmt = React.createRef();

  setAddCard = (upDown) => {
    let data = {
      groupCd: this.refGroupCd.current.value,
      groupNm: this.refGroupNm.current.value,
      totCnt: this.refTotCnt.current.value,
      amt: this.refAmt.current.value
    }

    this.props.setRootArrayInfo(data, upDown);

    // 초기화
    this.refGroupCd.current.value = '';
    this.refGroupNm.current.value = '';
    this.refTotCnt.current.value = '';
    this.refAmt.current.value = '';
  }

  render() {
    let rootCheckedList = this.props.rootCheckedList;
    let rootArrayInfo = this.props.rootArrayInfo;

    return (
      <div className={style.cardList__footer}>
        <h2 className={style.title} >OJT 2차 과제 카드리스트 만들기</h2>
        <div>
          <h3>체크된 인덱스 값</h3>
          {rootCheckedList.map((i) => { return i.groupCd + ', ' })}</div>
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
        {/* 카드리스트 추가 */}
        <div>
          <h3>카드리스트 추가</h3>
          <div>
            <label>groupCd</label><input type={'text'} placeholder={'C' + (rootArrayInfo.length + 1)} ref={this.refGroupCd} /><br />
            <label>groupNm</label><input type={'text'} ref={this.refGroupNm} /><br />
            <label>totCnt</label><input type={'text'} ref={this.refTotCnt} /><br />
            <label>amt</label><input type={'text'} ref={this.refAmt} /><br />
          </div>
          <div>
            <button onClick={e => this.setAddCard('up')}>상단추가</button>
            <button onClick={e => this.setAddCard('down')}>하단추가</button>
          </div>
        </div>
        {/* 현재 선택된 카드의 인덱스가 몇번째인지 조회 */}
        <div>
          {
            rootArrayInfo.map((item, index) => {
              return item.groupCd == this.props.selectedCard ? '선택된 카드의 인덱스는 전체' + (rootArrayInfo.length) + '개 중' + (index + 1) + '번째 카드입니다.' : '';
            })
          }
        </div>
        {/* 카드리스트 수정 기능 */}
        <div>
          <h3>카드리스트 수정</h3>
        </div>
        {/* 카드리스트 삭제 기능 */}
        <div>
          <h3>카드리스트 삭제</h3>
          <button>체크된 카드 삭제하기</button>
        </div>
        {/* 카드리스트 조회 기능 */}
        <div>
          <h3>카드리스트 조회</h3>
          <h4>현재 보여주고 있는 전체 카드리스트</h4>
          <div>
            {
              this.props.rootArrayInfo.map(i => i.groupCd)
            }
          </div>

          <h4>수정된 카드리스트</h4>
          <div>

          </div>

          <h4>추가된 카드리스트</h4>
          <div>
            {
              this.props.rootAddedList.map(i => i.groupCd)
            }
          </div>
          <h4>삭제된 카드리스트</h4>
        </div>
      </div>
    )
  }

}