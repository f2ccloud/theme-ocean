import axios from "axios";

export default () => ({
  loading: false,
  isSearch: false,
  keys: "",
  searchData: {},
  init() {
    this.searchData = {};
    this.isSearch = false;
  },
  get keywords() {
    if (this.loading || this.keys == "") {
      this.keyClear
      return;
    }
    this.loading = true;
    axios
      .get("/apis/api.halo.run/v1alpha1/indices/post", {
        params: {
          limit: 20,
          keyword: this.keys,
          highlightPreTag: "<b style='background-color:#D8EAFD;color:#1077D1'>",
          highlightPostTag: "</b>",
        },
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      })
      .then((res) => {
        this.loading = false;
        this.searchData = res.data;
        this.isSearch = true;
      })
      .catch(() => {
        this.isSearch = false;
        this.loading = false;
      });
  },
  get keyClear() {
    this.keys = "";
    this.searchData = {};
    this.isSearch = false;
    return;
  },
});
