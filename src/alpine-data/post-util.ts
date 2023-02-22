import axios from "axios";

export default (postId: any,likeNum: string) => ({
  postId: postId,
  likeNum: likeNum,
  loading: false,
  liked: false,
  get upvote() {
    this.init()
    if (this.loading || this.liked) return;

    this.loading = true;
    axios.post(
      '/apis/api.halo.run/v1alpha1/trackers/upvote', 
      {
          group: "content.halo.run",
          plural: "posts",
          name: this.postId,
      },
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }
    ).then(() => {
      this.liked = true;
      this.loading = false;
      localStorage.setItem("likeNum:" + this.postId, String(Number(this.likeNum) + 1))
      this.likeNum = String(Number(this.likeNum) + 1)
      }).catch(() =>  {
        this.loading = false;
      });
  },
  get downvote() {
    if (this.loading || !this.liked) return;

    this.loading = true;
    axios.post(
      '/apis/api.halo.run/v1alpha1/trackers/downvote',
      {
        group: "content.halo.run",
        plural: "posts",
        name: this.postId,
      },
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }
    ).then(() => {
      let num = Number(this.likeNum) - 1
      this.likeNum = String(num < 0 ? 0 : num)
      localStorage.removeItem("likeNum:" + this.postId)
      this.loading = false;
      this.liked = !this.liked
    }).catch(() =>  {
      this.loading = false;
    });
  },
  init() {
    if(this.likeNumExists(this.postId) !== null && Number(this.likeNumExists(this.postId)) > 0){
      this.liked = true
    }
    return this.liked
  },
  likeNumExists(id: any) {
    return localStorage.getItem("likeNum:" + id);
  },

});

