import { Subject } from 'rxjs'

// The Main Subject/Stream to be listened on.
export const searchSubscribe = new Subject()
export const clearSubscribe = new Subject()

export const publishSearch = (data) => searchSubscribe.next(data)

export const publishClear = (data) => clearSubscribe.next(data)



const eventBus = {
    on(event, callback) {
      document.addEventListener(event, (e) => callback(e.detail));
    },
    dispatch(event, data) {
      document.dispatchEvent(new CustomEvent(event, { detail: data }));
    },
    remove(event, callback) {
      console.log('remove');
      document.removeEventListener(event, callback);
    },
  };
  
  export default eventBus;