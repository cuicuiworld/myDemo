/**
 * Created by Administrator on 2017/8/31 0031.
 */
const STORAGE_KEY = 'todos-vuejs';
export default {
  fetch() {
    return JSON.parse(window.localStorage.getItem(STORAGE_KEY || '[]'));
  },
  save(items) {
    return window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
}
