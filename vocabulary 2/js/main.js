const addButton = document.getElementById('add-word-btn'),
    inputEng = document.getElementById('eng'),
    inputRus = document.getElementById('rus'),
    inputs = document.getElementsByClassName('input'),
    table = document.getElementById('table');

let words;
let btnDelete;

localStorage.length < 1 ? words = [] : words = JSON.parse(localStorage.getItem('words'))

const addWordToTable = index => {
    table.innerHTML  += `
    <tr class = 'tr'>
        <td class = "eng-word">${words[index].english}</td>
        <td class = "rus-word">${words[index].russian}</td>
        <td>
            <button class = 'btn-delete'></button>
        </td>
    </tr>
    
    `
}

words.forEach((element,i) => {
    addWordToTable(i);
});

addButton.addEventListener('click', () => {
    if (inputEng.value.length < 1 ||
        inputRus.value.length < 1 ||
        !isNaN(inputEng.value) ||
        !isNaN(inputRus.value)
    ) {
        for (let key of inputs) {
            key.classList.add('error')
        }
    } else {
        for (let key of inputs) {
            key.classList.remove('error')
        }
        words.push(new CreateWord(inputEng.value,inputRus.value))
        localStorage.setItem('words',JSON.stringify(words))
        addWordToTable(words.length-1)
        inputEng.value = null
        inputRus.value = null
    }
    
})

function CreateWord(english, russian){
    this.english = english,
    this.russian = russian;
}

const deleteButton = e => {
    // console.log(e.target)
    const rowIndex = e.target.parentNode.parentNode.rowIndex
    e.target.parentNode.parentNode.parentNode.remove()
    words.splice(rowIndex,1)
    localStorage.removeItem('words')
    localStorage.setItem('words',JSON.stringify(words))
}

const addEventDelete = () => {
    if(words.length > 0) {
        btnDelete = document.querySelectorAll('.btn-delete');
        for(let btn of btnDelete){
            btn.addEventListener('click',e => {
                deleteButton(e)
            })
        }
    }
}

addEventDelete()