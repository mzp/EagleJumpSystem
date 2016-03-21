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
  }
}
