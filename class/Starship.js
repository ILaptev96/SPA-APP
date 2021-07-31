class Starship {
  constructor(oData) {
    this.name = oData.name
    this.model = oData.model
    this.manufacturer = oData.manufacturer
    this.cost_in_credits = oData.cost_in_credits
    this.length = oData.length
    this.max_atmosphering_speed = oData.max_atmosphering_speed
    this.crew = oData.crew
    this.passengers = oData.passengers
    this.cargo_capacity = oData.cargo_capacity
    this.consumables = oData.consumables
    this.hyperdrive_rating = oData.hyperdrive_rating
    this.MGLT = oData.MGLT
    this.starship_class = oData.starship_class

    this.pilotsUrls = oData.pilots
    this.filmsUrls = oData.films

    this.filmsData = []
    this.pilotsData = []
  }

  getFilms() {
    let aPromises = this.filmsUrls.map((sUrl) => {
      let oPromise = new Promise((resolve, reject) => {
        $.ajax({
          url: sUrl,
          success: (Response) => {
            resolve(Response)
          },
          error: (oError) => {
            reject(oError)
          }
        })
      })

      return oPromise
    })
    return Promise.all(aPromises).then((aData) => {
      this.filmsData = aData
    })
  }

  getPilots() {
    let aPromises = this.pilotsUrls.map(function (sUrl) {
      let oPromise = new Promise((resolve, reject) => {
        $.ajax({
          url: sUrl,
          success: (oResponse) => {
            resolve(oResponse)
          },
          error: (oError) => {
            reject(oError)
          }
        })
      })

      return oPromise
    })
    return Promise.all(aPromises).then((aData) => {
      this.pilotsData = aData
    })
  }

 
  static renderDetailTableRow(aData) {
    if (aData.length > 0) {
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
  
            ${
        aData.map(oData => {
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
        }).join("")

        }
            </table>
      `;

    } else {
      return `<span>Результатов не найдено ¯\_(ツ)_/¯</span>`
    }
  }

  
  renderTableRow() {
    return `
    <tr id="${this.index}" onclick="fnHandlePress(event)">
    <th>${this.name}</th>
    <td>${this.model}</td>
    <td>${this.manufacturer}</td>
    <td>${this.length}</td>
    <td>${this.max_atmosphering_speed}</td>
    <td>${this.crew}</td>
    <td>${this.passengers}</td>
    <td>${this.cargo_capacity}</td>
    <td>${this.consumables}</td>
    <td>${this.hyperdrive_rating}</td>
    <td>${this.MGLT}</td>
    <td>${this.starship_class}</td>
    </tr>
    `
}

  static renderTable(aStarship) {
    let html = `
    <table class="table table-dark table-striped table-hover custom-table shadow">
        <thead>
            <tr>
                <th scope="col">Назване</th>
                <th scope="col">Модель</th>
                <th scope="col">Производитель</th>
                <th scope="col">Длина</th>
                <th scope="col">Скорость</th>
                <th scope="col">Стоимость</th>
                <th scope="col">Пассажиры</th>
                <th scope="col">Грузоподъемность</th>
                <th scope="col">Расходные</th>
                <th scope="col">Рейтинг</th>
                <th scope="col">MGLT</th>
                <th scope="col">Класс</th>


            </tr>
        </thead>
        <tbody>
        ${aStarship.map(oStarship => oStarship.renderTableRow()).join('')}
        </tbody>
    </table>
    `
    document.querySelector('.list').innerHTML = html
  }

}