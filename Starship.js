class Starship {
  constructor (oData) {

  }

/*   static renderDetailTableRow (aData) {
    return `
    <table class="table caption-top">
    <thead>
      <tr>
      <th scope="col">Название</th>
      <th scope="col">Модель</th>
      <th scope="col">---</th>
      <th scope="col">Класс</th>
      <th scope="col">Релиз</th>
    </tr>
    </thead>
          ${aData.map(oData => {
            return `
            <tbody>
              <tr>
                <th>${oData.name}</th>
                <td>${oData.model}</td>
                <td>${oData.manufacturer}</td>
                <td>${oData.starship_class}</td>
                <td>${oData.max_atmosphering_speed}</td>
              </tr>
              </tbody> 
          `;
          }).join("")}
          </table>
    `;
    
  }
} */
  static renderDetailTableRow (aData) {
    return `
    <table class="table caption-top">
    <thead>
      <tr>
      <th scope="col">Название</th>
      <th scope="col">Модель</th>
      <th scope="col">Производитель</th>
      <th scope="col">Класс</th>
      <th scope="col">Релиз</th>
    </tr>
    </thead>
          ${aData.map(oData => {
            return `
            <tbody>
              <tr>
                <th>${oData.name}</th>
                <td>${oData.model}</td>
                <td>${oData.manufacturer}</td>
                <td>${oData.starship_class}</td>
                <td>${oData.max_atmosphering_speed}</td>
              </tr>
              </tbody> 
          `;
          }).join("")}
          </table>
    `;
    
  }
}