export default (page: number, totalPages: number, totalVisible: number) => ({
  page: page,
  totalPages: totalPages,
  totalVisible: totalVisible,

  get items(): (string | number)[] {
    if (totalVisible === 0 || this.totalPages === 0) {
      return [];
    }

    const maxLength = Math.min(Math.max(0, this.totalVisible) || this.totalPages, this.totalPages);

    if (this.totalPages <= maxLength) {
      return this.range(1, this.totalPages);
    }

    const even = maxLength % 2 === 0 ? 1 : 0;
    const left = Math.floor(maxLength / 2);
    const right = this.totalPages - left + 1 + even;

    if (this.page > left && this.page < right) {
      const firstItem = 1;
      const lastItem = this.totalPages;
      const start = this.page - left + 2;
      const end = this.page + left - 2 - even;
      const secondItem = start - 1 === firstItem + 1 ? 2 : "...";
      const beforeLastItem = end + 1 === lastItem - 1 ? end + 1 : "...";

      return [1, secondItem, ...this.range(start, end), beforeLastItem, this.totalPages];
    } else if (this.page === left) {
      const end = this.page + left - 1 - even;
      return [...this.range(1, end), "...", this.totalPages];
    } else if (this.page === right) {
      const start = this.page - left + 1;
      return [1, "...", ...this.range(start, this.totalPages)];
    } else {
      return [...this.range(1, left), "...", ...this.range(right, this.totalPages)];
    }
  },

  range(from: number, to: number) {
    const range = [];

    from = from > 0 ? from : 1;

    for (let i = from; i <= to; i++) {
      range.push(i);
    }

    return range;
  },
});