import React, { Component } from "react";
import style from './cardListSample.module.css';

export default class CallCustomer extends Component {
  state = {
    arrayInfo: [
      { groupCd: 'C1', groupNm: '전체', totCnt: '1435', amt: '95674000' },
      { groupCd: 'C2', groupNm: '영업그룹', totCnt: '357', amt: '16778233' },
      { groupCd: 'C3', groupNm: '컨설팅그룹', totCnt: '252', amt: '16778233' },
      { groupCd: 'C4', groupNm: '기타', totCnt: '164', amt: '10953315' },
      { groupCd: 'C5', groupNm: '유지보수그룹', totCnt: '164', amt: '10952362' },
      { groupCd: 'C6', groupNm: '개발그룹', totCnt: '136', amt: '9075428' },
      { groupCd: 'C7', groupNm: '경영관리그룹', totCnt: '104', amt: '6960670' }
    ]
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
    let { arrayInfo } = this.state;
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

  render() {
    let sortTp = this.props.sortTp;
    let txtSearch = this.props.txtSearch;
    let isPaging = this.props.isPaging;
    let pagePerCnt = this.props.pagePerCnt;
    let curPage = this.props.curPage;

    return (
      <>
        {
          // console.log(this.getDataInfo(sortTp, txtSearch, isPaging, pagePerCnt, curPage))
          this.getDataInfo(sortTp, txtSearch, isPaging, pagePerCnt, curPage).array.map((e) => {
            return (
              <div key={e.groupCd} className={style.cardList__body__cards}>
                <div>
                  <input id={'chk' + e.groupCd} type='checkbox' />
                  <label htmlFor={'chk' + e.groupCd}>
                    <svg focusable="false" viewBox="0 0 24 24" style={{ display: 'inline-block', fill: 'rgb(0, 0, 0)', height: '14px', width: '14px', position: 'absolute', left: '0px', top: '50%', margin: '-7px 0 0 0', cursor: 'pointer' }}>
                      {/* <path fill="#B5B4B4" d="M22.285,1.715V22.22H1.725V1.715H22.285 M24,0H0.01v23.935H24V0L24,0z"></path> */}
                      <polygon fill="#2A93F7" points="20.542,8.304 18.185,5.943 9.958,14.085 5.827,9.956 3.467,12.317 9.92,18.824 "></polygon>
                    </svg>
                  </label>
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