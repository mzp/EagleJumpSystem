import request from 'superagent';

export default {
  saveBook: (book) => {
    return new Promise((resolve, reject) => {
      request
        .post('/books/save')
        .send(book)
        .end((err, res) => {
          if(err) { reject(err); }
          else { resolve(res); }
        });
    })
  },

  upload: (book_id, volume, images) => {
    let formData = new FormData();
    formData.append('volume', volume);
    for (var i = 0, image; image = images[i]; ++i) {
      formData.append('images', image);
    }
    return new Promise((resolve, reject) => {
      request
        .post(`/upload/${book_id}/create` )
        .send(formData)
        .end((err, res) => {
          if(err) { reject(err); }
          else { resolve(res); }
        });
    });
  },

  fetch: (id) => {
    return new Promise((resolve, reject) => {
      request.get(`/log/${id}`)
        .end((err, res) => {
          if(err) { reject(err); }
          else { resolve(res); }
        });
    });
  }
}
