import React, { Component } from 'react';

class Matrix extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matrix: [
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false]
      ],
      selectedRows: [],
      headerCheckState: [false, false, false, false]
    };
  }

  resources = ['Áreas', 'Currículos', 'Editoriales', 'Paquetes'];
  

  handleCheckboxChange = (event, rowIndex, colIndex) => {
    const { matrix } = this.state;
    matrix[rowIndex][colIndex] = event.target.checked;
    this.setState({ matrix });    
  }

  handleHeaderCheckboxChange = (event, colIndex) => {
    const { matrix, headerCheckState } = this.state;
    const newMatrix = matrix.map((row) => {
      row[colIndex] = event.target.checked;
      return row;
    });
    const newHeaderCheckState = headerCheckState.slice();
    newHeaderCheckState[colIndex] = event.target.checked;
    this.setState({ matrix: newMatrix, headerCheckState: newHeaderCheckState });
  }

  handleRowCheckboxChange = (event, rowIndex) => {
    const { matrix, selectedRows } = this.state;
    const row = matrix[rowIndex];
    const allChecked = row.every((col) => col === true);
    const newSelectedRows = selectedRows.slice();
    if (event.target.checked) {
      matrix[rowIndex] = row.map(() => true);
      if (!allChecked) {
        newSelectedRows.push(rowIndex);
      }
    } else {
      matrix[rowIndex] = row.map(() => false);
      if (allChecked) {
        const index = newSelectedRows.indexOf(rowIndex);
        newSelectedRows.splice(index, 1);
      }
    }
    this.setState({ matrix, selectedRows: newSelectedRows });
  }

  handleSendClick = () => {
    const selectedCheckboxes = [];
    const resources_name = ['areas', 'curriculos', 'editoriales', 'paquetes'];
    const scopes_name = ['read', 'create', 'update', 'delete'];

    // Obtener todas las filas de la tabla
    const tableRows = document.querySelectorAll('table tbody tr');

    // Iterar por cada fila de la tabla
    tableRows.forEach((row, rowIndex) => {
      // Obtener todas las celdas de la fila, excepto la primera (que es la selección de todas)
      const cells = row.querySelectorAll('td:not(:first-child)');
      
      // Iterar por cada celda de la fila
      cells.forEach((cell, cellIndex) => {
        // Obtener el checkbox dentro de la celda
        const checkbox = cell.querySelector('input[type=checkbox]');
        
        // Si el checkbox está seleccionado, añadir su información a selectedCheckboxes
        if (checkbox.checked) {
          selectedCheckboxes.push({
            resource: resources_name[rowIndex],
            scope: scopes_name[cellIndex],
            checked: checkbox.value
          });
        }
      });
    });

    // usar la información de los checkbox seleccionados en la consola
    console.log(selectedCheckboxes);
  }

  render() {
    const { matrix } = this.state;
  
    return (
      <div>
      <table>
        <thead>
          <tr>
            <th>
              Recursos
            </th>
            <th>
              <input
                type="checkbox"
                checked={matrix.every((row) => row[0] === true)}
                onChange={(event) => this.handleHeaderCheckboxChange(event, 0)}
                ref={(input) => {
                  if (input) {
                    input.indeterminate = matrix.length > 0 &&
                    matrix.some((row) => row[0] === true) &&
                    matrix.some((row) => row[0] === false);
                  }
                }}
              />
              Read
            </th>
            <th>
              <input
                type="checkbox"
                checked={matrix.every((row) => row[1] === true)}
                onChange={(event) => this.handleHeaderCheckboxChange(event, 1)}
                ref={(input) => {
                  if (input) {
                    input.indeterminate = matrix.length > 0 &&
                    matrix.some((row) => row[1] === true) &&
                    matrix.some((row) => row[1] === false);
                  }
                }}
              />
              Create
            </th>
            <th>
              <input
                type="checkbox"
                checked={matrix.every((row) => row[2] === true)}
                onChange={(event) => this.handleHeaderCheckboxChange(event, 2)}
                ref={(input) => {
                  if (input) {
                    input.indeterminate = matrix.length > 0 &&
                    matrix.some((row) => row[2] === true) &&
                    matrix.some((row) => row[2] === false);
                  }
                }}
              />
              Update
            </th>
            <th>
              <input
                type="checkbox"
                checked={matrix.every((row) => row[3] === true)}
                onChange={(event) => this.handleHeaderCheckboxChange(event, 3)}
                ref={(input) => {
                  if (input) {
                    input.indeterminate = matrix.length > 0 &&
                    matrix.some((row) => row[3] === true) &&
                    matrix.some((row) => row[3] === false);
                  }
                }}
              />
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {this.resources.map((resource, rowIndex) => (
            <tr key={rowIndex}>
              <td>
                <input
                  type="checkbox"
                  checked={matrix[rowIndex].every((col) => col === true)}
                  onChange={(event) => this.handleRowCheckboxChange(event, rowIndex)}
                  ref={(input) => {
                    if (input) {
                      const isIndeterminate = matrix[rowIndex].some((col) => col === true) &&
                        matrix[rowIndex].some((col) => col === false);
                      input.indeterminate = isIndeterminate;
                    }
                  }}
                />
                {resource}
              </td>
              {matrix[rowIndex].map((isChecked, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(event) => this.handleCheckboxChange(event, rowIndex, colIndex)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={this.handleSendClick}>SEND</button>
      </div>
    );
  }
}

export default Matrix;