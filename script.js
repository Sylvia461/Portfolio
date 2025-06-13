// Local storage note saver
function saveNote() {
  const noteInput = document.getElementById('noteInput');
  const savedNotes = document.getElementById('savedNotes');

  const note = noteInput.value;
  if (note) {
    addNoteToDOM(note);
    
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));

    noteInput.value = '';
  }
}

function addNoteToDOM(noteText) {
  const savedNotes = document.getElementById('savedNotes');

  const noteDiv = document.createElement('div');
  noteDiv.className = 'note';
  noteDiv.textContent = noteText;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.style.marginLeft = '10px';
  deleteBtn.onclick = function () {
    savedNotes.removeChild(noteDiv);

    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(n => n !== noteText);
    localStorage.setItem('notes', JSON.stringify(notes));
  };

  noteDiv.appendChild(deleteBtn);
  savedNotes.appendChild(noteDiv);
}

// Product List
const products = [
  { name: 'LipLiner', type: 'Makeup', price: 200, img:'lipliner.jpg' },
  { name: 'Lipstick', type: 'Makeup', price: 250, img: 'lipstick.jpg' },
  { name: 'Eyeshadow', type: 'Makeup', price: 450, img: 'eyeshadow.jpg' },
  { name: 'Foundation', type: 'Makeup', price: 450, img: 'foundation.jpg' },
  { name: 'Moistuizer', type: 'Skincare', price: 450, img: 'moisturizer.jpg' },
  { name: 'Sunscreen', type: 'Skincare', price: 450, img: 'sunscreen.jpg' },
  { name: 'Salicyclic serum', type: 'Skincare', price: 990, img: 'salicyclic serum.jpg' },
  { name: 'Pixi Blush', type: 'Makeup', price: 690, img: 'blush.jpg' },
  { name: 'Loreal Paris Mascara', type: 'Makeup', price: 560, img: 'mascara.png' },
  { name: 'Lakme eyeliner', type: 'Makeup', price: 399, img: 'eyeliner.png' }
];

function displayProducts(productArray) {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';
  productArray.forEach(p => {
    productList.innerHTML += `
      <div class="product-item">
        <img src="${p.img}" alt="${p.name}" />
        <h4>${p.name}</h4>
        <p>₹${p.price}</p>
      </div>
    `;
  });
}

document.getElementById('sort').addEventListener('change', function () {
  const val = this.value;
  let sorted = [...products];

  if (val === 'price-low') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (val === 'price-high') {
    sorted.sort((a, b) => b.price - a.price);
  } else if (val === 'type-makeup') {
    sorted = sorted.filter(p => p.type === 'Makeup');
  } else if (val === 'type-skincare') {
    sorted = sorted.filter(p => p.type === 'Skincare');
  }

  displayProducts(sorted);
});

window.onload = () => {
  displayProducts(products);

  const saved = JSON.parse(localStorage.getItem('notes'));
  if (saved) {
    saved.forEach(note => {
      addNoteToDOM(note);
    });
  }
};