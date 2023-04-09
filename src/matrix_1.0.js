import React, { Component } from 'react';

class matrix extends Component {
    constructor(props) {
        super(props);
        this.state = {
          matrix: [
            [false, false, false, false],
            [false, false, false, false],
            [false, false, false, false],
            [false, false, false, false]
          ],
          selectedRows: []
        };
      }
    
      resources = ['Áreas', 'Currículos', 'Editoriales', 'Paquetes'];
    
      handleCheckboxChange = (event, rowIndex, colIndex) => {
        const { matrix } = this.state;
        matrix[rowIndex][colIndex] = event.target.checked;
        this.setState({ matrix });
      }
    
      handleHeaderCheckboxChange = (event, colIndex) => {
        const { matrix } = this.state;
        const newMatrix = matrix.map((row) => {
          row[colIndex] = event.target.checked;
          return row;
        });
        this.setState({ matrix: newMatrix });
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
    
      render() {
        return (
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={this.state.selectedRows.length === 3}
                    onChange={(event) => {
                      const { matrix } = this.state;
                      const newMatrix = matrix.map((row) => row.map(() => event.target.checked));
                      const newSelectedRows = event.target.checked ? [0, 1, 2] : [];
                      this.setState({ matrix: newMatrix, selectedRows: newSelectedRows });
                    }}
                  />
                  Recursos
                </th>
                <th>
                  <input
                    type="checkbox"
                    checked={this.state.matrix.every((row) => row[0] === true)}
                    onChange={(event) => this.handleHeaderCheckboxChange(event, 0)}
                  />
                  Read
                </th>
                <th>
                  <input
                    type="checkbox"
                    checked={this.state.matrix.every((row) => row[1] === true)}
                    onChange={(event) => this.handleHeaderCheckboxChange(event, 1)}
                  />
                  Create
                </th>
                <th>
                  <input
                    type="checkbox"
                    checked={this.state.matrix.every((row) => row[2] === true)}
                    onChange={(event) => this.handleHeaderCheckboxChange(event, 2)}
                  />
                  Update
                </th>
                <th>
                  <input
                    type="checkbox"
                    checked={this.state.matrix.every((row) => row[3] === true)}
                    onChange={(event) => this.handleHeaderCheckboxChange(event, 3)}
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
                      checked={this.state.matrix[rowIndex].every((col) => col === true)}
                      onChange={(event) => this.handleRowCheckboxChange(event, rowIndex)}
                    />
                    {resource}
                  </td>
                  {this.state.matrix[rowIndex].map((isChecked, colIndex) => (
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
        );
      }
    }

export default matrix;