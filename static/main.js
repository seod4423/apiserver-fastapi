const form = document.querySelector('#main-form')
const input = document.querySelector('#memo-input')
const ul = document.querySelector('ul')

const deleteMemo = (e) => {
    const id = e.target.dataset.id
    fetch(`/memos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            ul.innerHTML = '';
            getMemos();
        })
        .catch((error) => {
        });
}

const updateMemo = (e) => {
    const id = e.target.dataset.id
    const content = prompt('수정할 내용')
    fetch(`/memos/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'memo_id': id, 'memo_content': content }),
    })
        .then((response) => response.json())
        .then((data) => {
            ul.innerHTML = '';
            getMemos();
        })
        .catch((error) => {
        });
}

const sendMemo = (e) => {
    e.preventDefault();

    const data = {
        'memo_id': String(new Date),
        'memo_content': input.value,
    }

    fetch('/memos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            ul.innerHTML = '';
            getMemos();
        })
        .catch((error) => {
        });
}

const getMemos = async () => {
    const data = await fetch('/memos', {
        headers: {
            'Content-Type': 'applicaton/json',
        }
    }).then(
        res => res.json()
    )

    data.forEach(element => {
        const li = document.createElement('li')
        const updateBtn = document.createElement('button')
        const deleteBtn = document.createElement('button')
        li.innerHTML = `[id:${element["memo_id"]}][content:${element["memo_content"]}]`
        li.appendChild(updateBtn)
        li.appendChild(deleteBtn)
        updateBtn.addEventListener('click', updateMemo)
        updateBtn.innerText = '수정'
        updateBtn.dataset.id = element['memo_id']
        deleteBtn.addEventListener('click', deleteMemo)
        deleteBtn.innerText = '삭제'
        deleteBtn.dataset.id = element['memo_id']
        ul.appendChild(li)
    });
}

const app = () => {
    form.addEventListener('submit', sendMemo)
    getMemos();
}

app();