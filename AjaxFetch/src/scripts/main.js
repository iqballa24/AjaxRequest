/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable no-nested-ternary */
/* eslint linebreak-style: ["error", "windows"] */
function main() {
  const BASE_URL = 'https://books-api.dicoding.dev/';

  const getBook = () => {
    fetch(`${BASE_URL}list`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': '12345',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        renderAllBooks(responseJson.books);
      })
      .catch((err) => {
        showResponseMessage(err);
      });
  };

  const insertBook = (book) => {
    fetch(`${BASE_URL}add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': '12345',
      },
      body: JSON.stringify(book),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        showResponseMessage(responseJson.message);
        getBook();
      })
      .catch((err) => {
        showResponseMessage(err);
      });
  };

  const updateBook = (book) => {
    fetch(`${BASE_URL}edit/${book.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': '12345',
      },
      body: JSON.stringify(book),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        showResponseMessage(responseJson.message);
        getBook();
      })
      .catch((err) => {
        showResponseMessage(err);
      });
  };

  const removeBook = (bookId) => {
    fetch(`${BASE_URL}delete/${bookId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': '12345',
      },
      body: JSON.stringify(bookId),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        showResponseMessage(responseJson.message);
        getBook();
      })
      .catch((err) => {
        showResponseMessage(err);
      });
  };

  const renderAllBooks = (books) => {
    const listBookElement = document.querySelector('#listBook');
    listBookElement.innerHTML = '';

    books.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));

    books.forEach((book) => {
      listBookElement.innerHTML += `
                <div class="col-lg-4 col-md-6 col-sm-12" style="margin-top: 12px;">
                    <div class="card" id="card">
                        <div class="card-body">
                            <h5>(${book.id}) ${book.title}</h5>
                            <p>${book.author}</p>
                            <button type="button" class="btn btn-danger button-delete" id="${book.id}">Hapus</button>
                            <button type="button" class="btn btn-warning button-update" id="${book.id}" data-title="${book.title}" data-author="${book.author}">Update</button>
                        </div>
                    </div>
                </div>
            `;
    });

    const buttons = document.querySelectorAll('.button-delete');
    buttons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const bookId = event.target.id;
        const isConfirm = confirm('Apakah anda yakin data akan dihapus');
        isConfirm ? removeBook(bookId) : alert('Data batal dihapus');
      });
    });

    const btnUpdate = document.querySelectorAll('.button-update');
    btnUpdate.forEach((button) => {
      button.addEventListener('click', (event) => {
        const bookId = event.target.id;
        const bookTitle = button.dataset.title;
        const bookAuthor = button.dataset.author;

        document.getElementById('inputBookId').value = bookId;
        document.getElementById('inputBookTitle').value = bookTitle;
        document.getElementById('inputBookAuthor').value = bookAuthor;
      });
    });
  };

  const showResponseMessage = (
    message = 'Check your internet connection',
  ) => {
    alert(message);
  };

  document.addEventListener('DOMContentLoaded', () => {
    const inputBookId = document.querySelector('#inputBookId');
    const inputBookTitle = document.querySelector('#inputBookTitle');
    const inputBookAuthor = document.querySelector('#inputBookAuthor');
    const buttonSave = document.querySelector('#buttonSave');
    const buttonUpdate = document.querySelector('#buttonUpdate');
    const buttonReset = document.querySelector('#buttonReset');

    buttonSave.addEventListener('click', () => {
      const book = {
        id: Number.parseInt(inputBookId.value, 10),
        title: inputBookTitle.value,
        author: inputBookAuthor.value,
      };
      insertBook(book);
    });

    buttonUpdate.addEventListener('click', () => {
      const book = {
        id: Number.parseInt(inputBookId.value, 10),
        title: inputBookTitle.value,
        author: inputBookAuthor.value,
      };

      updateBook(book);
    });

    buttonReset.addEventListener('click', () => {
      inputBookId.value = '';
      inputBookTitle.value = '';
      inputBookAuthor.value = '';
    });
    getBook();
  });
}

export default main;
