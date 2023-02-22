import mainJson from '@/data/string.main.json';
import chatJson from '@/data/string.chat.json';
import roomJson from '@/data/string.room.json';

const stringJson = Object.assign({}, mainJson, chatJson, roomJson);

class Toast {
  private vNode: any = null;

  setToastNode = vNode => {
    this.vNode = vNode;
  };

  showToast = text => {
    this.vNode?.showToast(text);
  };
}

export const toast = new Toast();

export const parseStr = (key: string) => {
  return stringJson[key] || String(key);
};
