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
    return get_api(`/text/${book_id}/${vol}/start` );
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
  },

  saveScript: (panel) => {
    return new Promise((resolve, reject) => {
      const script = panel.metadata.script || panel.metadata.auto_script || '';

      request
        .post(`/manual/text/${panel.book_id}/${panel.volume}/update`)
        .send({ path: panel.path, script })
        .end((err, res) => {
          if(err) { reject(err); }
          else { resolve(res); }
        });
    });
  },

  saveCharacters: (panel) => {
    return new Promise((resolve, reject) => {
      const { path, book_id, volume, metadata: { characters, others } } = panel;

      request
        .post(`/manual/characters/${book_id}/${volume}/update`)
        .send({ path: path, characters, others: others })
        .end((err, res) => {
          if(err) { reject(err); }
          else { resolve(res); }
        });
    });
  },

  demo: (book_id, image) => {
    let formData = new FormData();
    formData.append('book', book_id);
    formData.append('image', image);

    return new Promise((resolve, reject) => {
      request
        .post('/detect')
        .send(formData)
        .end((err, res) => {
          if(err) { reject(err); }
          else { resolve(res); }
        });
    });

  }
}
