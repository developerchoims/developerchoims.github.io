import { atom } from 'recoil';

// board 게시글 등록 state
export const boardPostState = atom({
  key: 'boardPostState',
  default: [],
});

// boardNo 임시 자동 생성기
export const nextBoardNoState  = atom({
  key: 'nextBoardNoState ',
  default: 1,
});

export const boardCateState = atom({
  key: 'boardCateState',
  default:[],
});

 // Category 토글에 사용됨
export const BoardDetailcategoryState = atom({
  key : 'BoardDetailcategory',
  default :
  [
    { name: '일상', value: '1101' },
    { name: '날씨', value: '1104' },
  ],
})

export const BoardVotecategoryState = atom({
  key : 'BoardVotecategory',
  default :
  ({ name: '투표', value: '1103' }),
})

export const BoardShortscategoryState = atom({
  key : 'BoardShortcategory',
  default :
  ( { name: '쇼츠', value: '1102' }),
})

export const BoardInterestCategoryState = atom({
  key : 'BoardInterestCategory',
  default :
  [
    { name: '게임', value: '1201' },
    { name: '방송', value: '1202' },
    { name: '취미', value: '1203' },
    { name: '기타', value: '1204' },
  ],
}) 

export const BoardJMTCategoryState = atom({
  key : 'BoardJMTCategory',
  default :
  [
    { name: '맛집', value: '2101' },
    { name: '혼밥', value: '2102' },
    { name: '혼술', value: '2103' },
    { name: '분위기', value: '2104' },
  ],
})
export const BoardFashionCategoryState = atom({
  key : 'BoardFashionCategory',
  default : 
  [
    { name: '캐주얼', value: '2201' },
    { name: '포멀', value: '2202' },
    { name: '스트릿', value: '2203' },
    { name: '걸리시', value: '2204' },
  ],
}) 
export const BoardLocalCategoryState = atom({
  key : 'BoardLocalCategory',
  default :
  [
    { name: '복지', value: '2301' },
    { name: '교육', value: '2302' },
    { name: '대여', value: '2303' },
    { name: '의료', value: '2304' },
  ],
}) 




//로그인 정보
export const loginUserState = atom({
  key : 'loginUserState',
  default : {},
})
//boardVs 정보
export const boardVsState = atom({
  key: 'boardVs',
  default : {
    userNo : '',
    boardTitle : '',
    boardKeyword : '',
    boardContent:'',
    boardOptionLeft : '',
    boardOptionRight: '',
    boardCateNo : '',
    boardExpireDate : '',
    choiceLeft:0,
    choiceRight:0,
    boardWriteDate:''
  }
})
//boardVs 정보
export const boardShState = atom({
  key: 'boardSh',
  default : {
    userNo : '',
    boardTitle : '',
    boardKeyword : '',
    boardContent:'',
    boardWriteDate:''
  }
})
//share 정보
export const shareState = atom({
  key: 'share',
  default : {
    userNo : '',
    boardTitle : '',
    boardKeyword : '',
    boardContent:'',
    boardWriteDate:''
  }
})

//bestList 정보
export const bestListState = atom({
  key: 'bestList',
  default : []
})
//shortsList 정보
export const shortsListState = atom({
  key: 'shortsList',
  default : []
})
//vsList 정보
export const vsListState = atom({
  key: 'vsList',
  default : []
})
//localList 정보
export const localListState = atom({
  key: 'localList',
  default : []
})


//board Editting 정보
export const edittingState = atom({
  key: 'boardEdit',
  default : {
    userNo : '',
    boardTitle : '',
    boardKeyword : '',
    boardContent:'',
    boardCateNo : '',
    boardWriteDate:'',
    boardImgNo:''
  }
})