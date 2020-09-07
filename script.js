const wrapper = document.querySelector('.wrapper-result');
const input_search = document.querySelector('#input_search');
const form = document.querySelector('form');

//listener searchbar
form.addEventListener('submit', (e) => {
    e.preventDefault();
    movie = input_search.value;
    getData(movie)
})

//function execute by listener
async function getData(movie) {
    wrapper.innerHTML = '<h2 class="mt-5">Loading ...</h2>'
    const rep = await fetch('http://localhost:5000/search/'+movie);
    const movies_list = await rep.json();
    displayData(movies_list);
}

//function execute after get the data
function displayData(movies_list) {
    wrapper.innerHTML = ''
    movies_list.map((ele,i) => {
        wrapper.innerHTML += `
            <div class="card text-dark bg-light shadow-lg m-4" style="max-width: 18rem;">
                <div class="card-header bg-info">${ele.title}</div>
                <div class="card-body">
                    <p class="card-title">Info : ${ele.author}</p>
                    <p class="card-text">Genre : ${ele.genre}</p>
                    <p class="card-text">Note : ${ele.note}</p>
                </div>
            </div>
            `
    })
    
}