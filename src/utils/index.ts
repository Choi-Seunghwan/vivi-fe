import stringJson from '@/data/string.json';

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
