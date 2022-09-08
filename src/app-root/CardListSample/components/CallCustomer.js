import React, { Component } from "react";
import style from '../cardListSample.module.css';

export default class CallCustomer extends Component {
  state = {
    arrayInfo: [...this.props.rootArrayInfo],
    checkedList: new Set(),
    isAllChecked: false,
  }


  getIsAllChecked = () => {
    console.log('CallCustomer가 실행!')
    return this.state.isAllChecked;
  }

  /**
   * 고객사 정보 호출 함수
   * @param {string} sortTp 정렬구분 ('1': 이름순, '2': 등록순, '3': 수정순)
   * @param {boolean} isPaging 페이징 여부(true: 페이징 사용, false: 전체리스트)
   * @param {int} pagePerCnt 페이지당 보여줄 리스트 갯수
   * @param {int} curPage 현재 페이지번호
   * @returns 
   */
  getDataInfo = (sortTp, txtSearch, isPaging, pagePerCnt, curPage) => {
    // let { arrayInfo } = this.state;
    let arrayInfo = this.props.rootArrayInfo;
    let totCnt = 0;
    let tempArray = arrayInfo; //arrayCustomer
    let result = [];
    if (tempArray.length < 1) {
      return { totCnt: totCnt, array: result };
    }

    tempArray = tempArray.filter(value => value.groupNm.indexOf(txtSearch) > -1);
    totCnt = tempArray.length;
    tempArray.sort(function (a, b) {
      // 회사명 오름차순
      if (sortTp === '1') {
        if (a.groupNm > b.groupNm) return 1;
        if (a.groupNm < b.groupNm) return -1;
        if (a.groupNm = b.groupNm) return 0;
      } else if (sortTp === '2') {
        // 등록순 내림차순
        if (a.groupCd < b.groupCd) return 1;
        if (a.groupCd > b.groupCd) return -1;
        if (a.groupCd = b.groupCd) return 0;
      } else if (sortTp === '3') {
        // 수정순 오름차순
        if (a.groupCd > b.groupCd) return 1;
        if (a.groupCd < b.groupCd) return -1;
        if (a.groupCd = b.groupCd) return 0;
      } else {
        return 0;
      }
    })
    if (isPaging) {
      let intCurPage = parseInt(curPage || 0);
      let intPagePerCnt = parseInt(pagePerCnt || 0);
      let intStart = 0;
      if (intCurPage > 0) {
        intStart = (intCurPage - 1) * intPagePerCnt;
      } else {
        return { totCnt: 0, array: [] }
      }
      for (let i = 0; i < intPagePerCnt; i++) {
        let intIndex = intStart + i;
        if (intIndex < totCnt) {
          result.push(tempArray[intIndex]);
        } else {
          break;
        }
      }
    } else {
      result = tempArray;
    }
    return { totCnt: totCnt, array: result };
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.isTotalChk !== this.props.isTotalChk)
      this.isTotalChk();

    if (this.state.checkedList.size == this.props.rootArrayInfo.length)
      this.getIsAllChecked()
  }

  // 전체선택 시
  isTotalChk = () => {
    let isTotalChk = this.props.isTotalChk;
    let arrTmp = this.props.rootArrayInfo;
    let tmp = new Set();

    // root용
    let rTmp = [];
    // isTotalChk
    if (isTotalChk) {
      arrTmp.map(i => tmp.add(i.groupCd));
      this.setState({ checkedList: tmp, isAllChecked: true });

      // rootCheckedList 데이터 추가
      arrTmp.map(i => rTmp.push(i));
      this.props.setRootCheckedList(rTmp);
    } else {
      tmp.clear();
      this.setState({ checkedList: tmp, isAllChecked: false });
      this.props.setRootCheckedList([]);
    }
  }

  // 단건 선택 시
  setIsChecked = (groupCd, isChecked, data) => {
    let tmp = this.state.checkedList;

    // root용
    let rTmp = this.props.rootArrayInfo.filter(i => { return this.state.checkedList.has(i.groupCd) });

    console.log(rTmp)

    if (isChecked) {
      tmp.add(groupCd);
      rTmp.push(data);

      this.setState(
        { checkedList: tmp }
      )
      // this.props.setRootCheckedList(tmp)
    } else if (!isChecked && tmp.has(groupCd)) {
      tmp.delete(groupCd);
      rTmp = rTmp.filter(i => {
        return (
          i.groupCd != groupCd
        )
      })

      this.setState(
        { checkedList: tmp }
      )
    }
    this.props.setRootCheckedList(rTmp)
    // this.props.setOffTotalChk();
    // console.log(this.state.checkedList)

  }

  // 카드 선택하기
  setSelectedCard = (e) => {
    // console.log(e.target.dataset.key)
    this.props.setSelectedCard(e.target.dataset.key)
    console.log(this.props.selectedCard)
  }

  render() {
    let sortTp = this.props.sortTp;
    let txtSearch = this.props.txtSearch;
    let isPaging = this.props.isPaging;
    let pagePerCnt = this.props.pagePerCnt;
    let curPage = this.props.curPage;

    let isTotalChk = this.props.isTotalChk;

    return (
      <>
        {
          this.getDataInfo(sortTp, txtSearch, isPaging, pagePerCnt, curPage).array.map((e) => {
            return (
              <div
                key={e.groupCd}
                data-key={e.groupCd}
                onClick={e => this.setSelectedCard(e)}
                className={this.props.selectedCard == e.groupCd ? style.cardList__body__cards__checked : style.cardList__body__cards}>
                <div>
                  <input id={'chk' + e.groupCd} type='checkbox' onChange={
                    (item) => this.setIsChecked(e.groupCd, item.target.checked, e)
                  } checked={this.state.checkedList.has(e.groupCd) ? true : false} />
                  <LabelFor groupCd={e.groupCd} />
                  {e.groupNm}
                </div>

                <div>
                  <span>{e.totCnt}건</span>
                  <span>{e.amt}</span>
                </div>
              </div>
            )
          })
        }
      </>
    )
  }
}

export class LabelFor extends Component {

  render() {
    let groupCd = this.props.groupCd;

    return (
      <label htmlFor={'chk' + groupCd}>
        <svg focusable="false" viewBox="0 0 24 24" style={{ display: 'inline-block', fill: 'rgb(0, 0, 0)', height: '14px', width: '14px', position: 'absolute', left: '0px', top: '50%', margin: '-7px 0 0 0', cursor: 'pointer' }}>
          <polygon fill="#2A93F7" points="20.542,8.304 18.185,5.943 9.958,14.085 5.827,9.956 3.467,12.317 9.92,18.824 "></polygon>
        </svg>
      </label>
    )
  }

}