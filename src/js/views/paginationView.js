import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const ele = e.target.closest('.btn--inline');
      const goTo = +ele.dataset.goto;
      handler(goTo);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // page 1, and there are other pages

    if (curPage === 1 && numPages > 1) {
      return this._nextPage(curPage);
    }

    // last page
    if (curPage === numPages && numPages > 1) {
      return this._prevPage(curPage);
    }
    // other page

    if (curPage < numPages) {
      return `${this._prevPage(curPage)} ${this._nextPage(curPage)}`;
    }

    // page 1, and there are no other pages
    return '';
  }

  _nextPage(page) {
    return `
    <button class="btn--inline pagination__btn--next" data-goto=${page + 1}>
            <span>Page ${page + 1}</span>
            <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>
`;
  }

  _prevPage(page) {
    return `
    <button class="btn--inline pagination__btn--prev" data-goto=${page - 1}>
            <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${page - 1}</span>
  </button>
`;
  }
}

export default new PaginationView();
