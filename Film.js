class Film {
  constructor (oData) {

  }

    static renderDetailTableRow (aData) {
        return `
        <table class="table caption-top">
        <thead>
          <tr>
          <th scope="col">Название</th>
          <th scope="col">Эпизорд</th>
          <th scope="col">Директор</th>
          <th scope="col">Продюсер</th>
          <th scope="col">Релиз</th>
        </tr>
        </thead>
              ${aData.map(oData => {
                return `
                <tbody>
                  <tr>
                    <th>${oData.title}</th>
                    <td>${oData.episode_id}</td>
                    <td>${oData.director}</td>
                    <td>${oData.producer}</td>
                    <td>${oData.release_date}</td>
                  </tr>
                  </tbody> 
              `;
              }).join("")}
              </table>
        `;
       
      }
}
