import request from 'superagent';

function get_api(url) {
  return new Promise((resolve, reject) => {
    request
      .get(url)
      .end((err, res) => {
        if(err) { reject(err); }
        else { resolve(res); }
      });
  });
}

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

  textDetect: (book_id, vol) => {
    return get_api(`/text/${book_id}/${vol}` );
  },

  faceDetect: (book_id, vol) => {
    return get_api(`/faces/${book_id}/${vol}` );
  },

  fetch: (id) => {
    return new Promise((resolve, reject) => {
      request.get(`/log/${id}`)
        .end((err, res) => {
          if(err) { reject(err); }
          else { resolve(res); }
        });
    });
  },

  learn: (id, tags) => {
    return new Promise((resolve, reject) => {
      request
        .post(`/learn/${id}/start`)
        .send({ tags })
        .end((err, res) => {
          if(err) { reject(err); }
          else { resolve(res); }
        });
    })
  },

  infer: (book_id, vol) => {
    return get_api(`/characters/${book_id}/${vol}` );
  }
}
