import React, { createContext, useReducer } from "react";

const initialState = {
  popular: [],
  related: [],
  searched: [],
  selected: {},
  term: "",
};

// reducer関数は、2つの値をとり、一つの値を返す
// 引数には state と action は受け取れるようにする。(入力値)
const reducer = (state, action) => {
  console.log("state", state);
  console.log("action", action.payload.term);

  // actionに含まれるtypeで処理を分岐
  switch (action.type) {
    case "SET_POPULAR":
      return { ...state, popular: action.payload.popular };

    case "SET_RELATED":
      return { ...state, related: action.payload.related };

    case "SET_SELECTED":
      // initialStateの中に複数のstateが含まれる場合は、必ずスプレット構文を使ってstateを追加してから更新を行う。
      // reducerでのstateの更新ではstateが上書きされてしまうため、selectedのみを更新したい場合に、stateを展開せずに行ってしまうとpopularのデータが消えてしまう
      return { ...state, selected: action.payload.selected };

    case "SET_SEARCHED":
      return { ...state, searched: action.payload.searched };

    case "SET_TERM":
      // 1回目: state: ''
      // 1回目: term : 'music'
      // 2回目: state: 'music'
      // 2回目: term : 'video'
      // 上の結果から分かる通り、termには入力フォームに入力した値がinputされると入る。
      // stateは一つ前に入力された値が入るようになっている。
      return { ...state, term: action.payload.term };

    default:
      return state;
  }
};

// storeには、stateとdispatchの初期値を渡す
export const Store = createContext({
  globalState: initialState,
  setGlobalState: () => null,
});

//　① propsでchildrenノードを受け取る
export const StoreProvider = ({ children }) => {
  // reducer と initialState を渡して state(globalState) と dispatch(setGlobalState) 関数を生成
  const [globalState, setGlobalState] = useReducer(reducer, initialState);

  // ProviderでChildノードをアップしていく
  // Providerは上のStoreオブジェクトで生成されているのでこれを呼び出す。
  // valueをセットすることで、childノードとして渡される consumer component でvalue値を参照することができる
  return (
    <Store.Provider value={{ globalState, setGlobalState }}>
      {children}
    </Store.Provider>
  );
};
