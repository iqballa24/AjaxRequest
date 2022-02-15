function main() {

    const BASE_URL = "https://books-api.dicoding.dev/";

    const getBook = () => {
        // tuliskan kode di sini!
        const xhr = new XMLHttpRequest();

        xhr.onload = function(){
            const responseJson = JSON.parse(this.responseText);
            // console.log(this.responseText);
            if(responseJson.error){
                showResponseMessage(responseJson.message);
            }else{
                renderAllBooks(responseJson.books);
            }
        }
        xhr.onerror = function(){
            showResponseMessage();
        }
        xhr.open("GET", `${BASE_URL}list`);
        xhr.send();
    };


    const insertBook = (book) => {
        // tuliskan kode di sini!
        const xhr = new XMLHttpRequest();

        xhr.onload = function(){
            const responseJson = JSON.parse(this.responseText);
            showResponseMessage(responseJson.message);
            getBook();
        }
        xhr.onerror = function(){
            showResponseMessage();
        }
        xhr.open("POST", `${BASE_URL}add`);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("X-Auth-Token", "12345");
        xhr.send(JSON.stringify(book));
    };

    const updateBook = (book) => {
        // tuliskan kode di sini!
        const xhr = new XMLHttpRequest();
        xhr.onload = function(){
            const responseJson = JSON.parse(this.responseText);
            showResponseMessage(responseJson.message);
            getBook();
        }
        xhr.onerror = function(){
            showResponseMessage();
        }
        xhr.open("PUT", `${BASE_URL}edit/${book.id}`);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("X-Auth-Token", "12345");
        xhr.send(JSON.stringify(book));
    };

    const removeBook = (bookId) => {
        // tuliskan kode di sini!
        const xhr = new XMLHttpRequest();
        xhr.onload = function(){
            const responseJson = JSON.parse(this.responseText);
            showResponseMessage(responseJson.message);
            getBook();
        };
        xhr.onerror = function(){
            showResponseMessage();
        }
        xhr.open("DELETE", `${BASE_URL}delete/${bookId}`);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("X-Auth-Token", "12345");
        xhr.send(JSON.stringify(bookId));
    };






    /*
        jangan ubah kode di bawah ini ya!
    */

    const renderAllBooks = (books) => {
        const listBookElement = document.querySelector("#listBook");
        listBookElement.innerHTML = "";

        books.forEach(book => {
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

        const buttons = document.querySelectorAll(".button-delete");
        buttons.forEach(button => {
            button.addEventListener("click", event => {
                const bookId = event.target.id;
                const isConfirm = confirm('Apakah anda yakin data akan dihapus');
                isConfirm ? removeBook(bookId) : alert('Data batal dihapus');
            })
        })

        const btnUpdate = document.querySelectorAll('.button-update');
        btnUpdate.forEach(button =>{
            button.addEventListener('click', event =>{
                const bookId = event.target.id;
                const bookTitle = button.dataset.title;
                const bookAuthor = button.dataset.author;

                document.getElementById('inputBookId').value = bookId;
                document.getElementById('inputBookTitle').value = bookTitle;
                document.getElementById('inputBookAuthor').value = bookAuthor;
            })
        });
    };

    const showResponseMessage = (message = "Check your internet connection") => {
        alert(message);
    };

    document.addEventListener("DOMContentLoaded", () => {

        const inputBookId = document.querySelector("#inputBookId");
        const inputBookTitle = document.querySelector("#inputBookTitle");
        const inputBookAuthor = document.querySelector("#inputBookAuthor");
        const buttonSave = document.querySelector("#buttonSave");
        const buttonUpdate = document.querySelector("#buttonUpdate");
        const buttonReset = document.querySelector("#buttonReset");

        buttonSave.addEventListener("click", function () {
            const book = {
                id: Number.parseInt(inputBookId.value),
                title: inputBookTitle.value,
                author: inputBookAuthor.value
            };
            insertBook(book)
        });

        buttonUpdate.addEventListener("click", function () {
            const book = {
                id: Number.parseInt(inputBookId.value),
                title: inputBookTitle.value,
                author: inputBookAuthor.value
            };

            updateBook(book)
        });

        buttonReset.addEventListener("click", function(){
            inputBookId.value = "";
            inputBookTitle.value = "";
            inputBookAuthor.value = "";
        });
        getBook();
    });
}

export default main;