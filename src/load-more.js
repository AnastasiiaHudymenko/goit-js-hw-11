export default class BtnLoadMore {
  constructor({ classBtn, hidden = false }) {
    this.refs = this.getRefs(classBtn);
    hidden && this.hide();
  }

  getRefs(classBtn) {
    const refs = {
      btnLoadMore: document.querySelector(`${classBtn}`),
    };
    return refs;
  }

  hide() {
    this.refs.btnLoadMore.classList.add('is-hidden');
  }

  show() {
    this.refs.btnLoadMore.classList.remove('is-hidden');
  }
}
