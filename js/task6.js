const start = document.querySelector('.start-game');
const container = document.querySelector('#container');
start.addEventListener('click', ticTacToe);

function ticTacToe() {
  function createTable() {
    container.innerHTML = "";
    let table = document.createElement('table');
    table.setAttribute('id', 'grid');

    function createCaption() {
      const caption = document.createElement('caption');
      caption.appendChild(document.createTextNode('The Game: X or 0'));
      return caption;
    }

    function createTbody() {
      let tBody = document.createElement('tbody');
      for (let i = 0; i < 3; i++) {
        let row = document.createElement('tr');
        for (let j = 0; j < 3; j++) {
          let cell = document.createElement('td');
          cell.setAttribute('class', 'emptyCell');
          row.appendChild(cell);
        }
        tBody.appendChild(row);
      }
      return tBody;
    }
    table.appendChild(createCaption());
    table.appendChild(createTbody());
    container.appendChild(table);
    return table;
  }
  createTable();
  const table = document.querySelector('#grid');

  function createXO() {
    const x = document.createElement('img');
    const btnContainer = document.createElement('div');
    btnContainer.setAttribute('class', 'button-container');
    x.setAttribute('src', 'img/x.svg');
    x.setAttribute('id', 'x');
    const o = document.createElement('img');
    o.setAttribute('src', 'img/o.svg');
    o.setAttribute('id', 'o');
    btnContainer.appendChild(x);
    btnContainer.appendChild(o);
    container.appendChild(btnContainer);
    x.style.background = 'none';
    o.style.background = 'none';
    x.addEventListener('click', setElement(x));
    o.addEventListener('click', setElement(o));
  }

  function setElement(el) {
    let choosenEl = el.getAttribute('id');
    let currentCell = null;
    el.addEventListener('mousedown', copyAndMove);

    function copyAndMove(event) {
      event.preventDefault();
      let elClone = el.cloneNode(true);
      elClone.removeAttribute('id');
      let shiftX = event.clientX - el.getBoundingClientRect().left;
      let shiftY = event.clientY - el.getBoundingClientRect().top;
      elClone.style.position = 'absolute';
      elClone.style.zIndex = 1000;
      container.append(elClone);
      moveAt(event.pageX, event.pageY);

      function moveAt(pageX, pageY) {
        elClone.style.left = pageX - shiftX + 'px';
        elClone.style.top = pageY - shiftY + 'px';
      }

      function onMouseMove(event) {
        event.preventDefault();
        moveAt(event.pageX, event.pageY);
        elClone.hidden = true;
        let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
        elClone.hidden = false;
        if (!elemBelow) return;
        let cellBelow = elemBelow.closest('.emptyCell');
        if (currentCell != cellBelow) {
          if (currentCell) {
            leaveCell(currentCell);
          }
          currentCell = cellBelow;
          if (currentCell) {
            highlightCell(currentCell);
          }
        }
      }
      document.addEventListener('mousemove', onMouseMove);

      function highlightCell(elem) {
        elem.style.background = 'pink';
      }
      elClone.addEventListener('mouseup', addElementToGrid);

      function addElementToGrid(event) {
        document.removeEventListener('mousemove', onMouseMove);
        event.preventDefault();
        if (currentCell) {
          console.log(currentCell);
          currentCell.appendChild(elClone);
          currentCell.setAttribute('class', `${choosenEl}`);
          elClone.removeEventListener('mouseup', addElementToGrid);
          currentCell.style.background = 'none';
          elClone.style = '';
          elClone.style.position = 'relative';
          if (choosenEl === 'x') {
            document.querySelector('#x').setAttribute('class', 'hidden');
            document.querySelector('#o').removeAttribute('class');
            console.log(choosenEl);
          } else {
            document.querySelector('#o').setAttribute('class', 'hidden');
            document.querySelector('#x').removeAttribute('class');
            console.log(choosenEl);
          }
        } else {
          elClone.remove();
        }
      }

      function leaveCell(elem) {
        elem.style.background = 'none';
      }
    }
  }
  createXO();
}