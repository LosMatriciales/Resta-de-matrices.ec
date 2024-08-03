function createMatrix(id, size) {
    let matrix = document.getElementById(id);
    matrix.innerHTML = '';
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let input = document.createElement('input');
            input.type = 'number';
            input.value = Math.floor(Math.random() * 20) - 10; // Rango de -10 a 9
            input.addEventListener('input', validateInput);
            matrix.appendChild(input);
        }
        matrix.appendChild(document.createElement('br'));
    }
}

function validateInput(event) {
    let value = event.target.value;
    if (value === '' || isNaN(value)) {
        event.target.classList.add('invalid');
    } else {
        event.target.classList.remove('invalid');
    }
}

function getMatrixValues(id, size) {
    let inputs = document.getElementById(id).getElementsByTagName('input');
    let matrix = [];
    for (let i = 0; i < size; i++) {
        matrix[i] = [];
        for (let j = 0; j < size; j++) {
            let value = inputs[i * size + j].value;
            matrix[i][j] = value === '' ? 0 : parseInt(value);
        }
    }
    return matrix;
}

function subtract(size) {
    let matrix1 = getMatrixValues(`matrix${size}x${size}_1`, size);
    let matrix2 = getMatrixValues(`matrix${size}x${size}_2`, size);
    let result = [];
    for (let i = 0; i < size; i++) {
        result[i] = [];
        for (let j = 0; j < size; j++) {
            result[i][j] = matrix1[i][j] - matrix2[i][j];
        }
    }
    displayResult(result, size);
}

function displayResult(matrix, size) {
    let resultDiv = document.getElementById(`result${size}x${size}`);
    resultDiv.innerHTML = `<h4>Resultado de la resta ${size}x${size}:</h4>`;
    let table = document.createElement('table');
    table.style.borderCollapse = 'collapse'; // Para que las celdas se vean como una sola tabla
    table.style.width = '100%'; // Ajusta el ancho de la tabla

    for (let row of matrix) {
        let tr = document.createElement('tr');
        for (let cell of row) {
            let td = document.createElement('td');
            td.textContent = cell;
            td.style.border = '1px solid black'; // Añade borde a las celdas
            td.style.padding = '5px'; // Espaciado dentro de las celdas
            td.style.textAlign = 'center'; // Centra el texto en las celdas
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    resultDiv.appendChild(table);
}

function resetMatrices() {
    createMatrix('matrix2x2_1', 2);
    createMatrix('matrix2x2_2', 2);
    createMatrix('matrix3x3_1', 3);
    createMatrix('matrix3x3_2', 3);
    document.getElementById('result2x2').innerHTML = '';
    document.getElementById('result3x3').innerHTML = '';
}

// Inicializar matrices
window.onload = function() {
    resetMatrices();
    document.querySelectorAll('button').forEach(button => {
        if (button.textContent.includes('Restar')) {
            button.addEventListener('click', function() {
                let size = this.textContent.includes('2x2') ? 2 : 3;
                subtract(size);
            });
        }
    });
    document.body.insertAdjacentHTML('beforeend', '<button id="resetBtn" style="position: fixed; bottom: 20px; right: 20px;">Reiniciar Matrices</button>');
    document.getElementById('resetBtn').addEventListener('click', resetMatrices);
};
