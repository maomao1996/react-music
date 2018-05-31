import {createStore} from "redux"
import reducer from './reducers'

//创建store
const store = createStore(reducer);

export default store
