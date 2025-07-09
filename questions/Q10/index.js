const myList = document.getElementById('myList');
const addItemBtn = document.getElementById('addItemBtn');
const removeItemBtn = document.getElementById('removeItemBtn');
const itemInput = document.getElementById('itemInput');

addItemBtn.addEventListener('click', () => {
    const itemText = itemInput.value.trim();
    if (itemText !== '') {
        const newItem = document.createElement('li');
        newItem.textContent = itemText;
        newItem.id = `item${myList.children.length}`;
        myList.appendChild(newItem);
        itemInput.value = '';
    }
});

removeItemBtn.addEventListener('click', () => {
    if (myList.lastElementChild) {
        myList.removeChild(myList.lastElementChild);
    }
});