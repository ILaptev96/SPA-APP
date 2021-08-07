class Actor {


    constructor(oData, index) {
        this.index = index
        this.name = oData.name
        this.height = oData.height
        this.mass = oData.mass
        this.hair_color = oData.hair_color
        this.skin_color = oData.skin_color
        this.eye_color = oData.eye_color
        this.birth_year = oData.birth_year
        this.gender = oData.gender
        this.homeworldUrl = oData.homeworld
        this.homeworldData = []
        this.starshipsUrls = oData.starships
        this.starshipsData = []
        this.filmsUrls = oData.films
        this.filmsData = []
        this.html


        this.getHomeworld()
        /* 
         this.getFilms()
         this.getStarships()*/
        // this.renderDetail()

    }

    setProperty(sProperty, sValue) {
        this[sProperty] = sValue
    }
    getProperty(sProperty) {
        return this[sProperty]
    }
    getHomeworld() {
        return $.ajax({
            url: this.homeworldUrl,
            async: false,
            success: (Response) => {
                this.homeworldData = Response
            }
        })
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

    getStarships() {
        let aPromises = this.starshipsUrls.map(function (sUrl) {
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
        });
        return Promise.all(aPromises).then((aData) => {
            this.starshipsData = aData

              aData.forEach((oStarships) => {
                if(!oModel.starships.find((obj) => obj.name == oStarships.name)) {
                    oModel.starships.push(new Starship(oStarships, parseInt(oStarships.url.match(/\d+/)[0])))
                  } 
              }) 
        })
    }


    renderDetail() {

        if (!Actor.HTML) Actor.HTML = document.querySelector("#actor-detail").innerHTML
        let sTemplate = Actor.HTML


        //Заполняем шаблон
        Object.keys(this).forEach((sKey) => {
            sTemplate = sTemplate.replace('$' + `{${sKey}}`, this[sKey])
        })
        Object.keys(this.homeworldData).forEach((sKey) => {
            sTemplate = sTemplate.replace('$' + `{homeworld.${sKey}}`, this.homeworldData[sKey])
        })
        sTemplate = sTemplate.replace("${filmsList}", Film.renderDetailTableRow(this.filmsData))
        sTemplate = sTemplate.replace("${starshipsList}", Starship.renderDetailTableRow(this.starshipsData))

        //Показываем шаблон
        document.querySelector("#actor-detail").innerHTML = sTemplate
        Actor.hideOrShow()

    }

    static hideOrShow() {
        /*      document.querySelector(".list").classList.toggle('d-none')
             document.querySelector("#actor-detail").classList.toggle('d-none') */
        document.querySelector(".list").classList.add('d-none')
        document.querySelector("#actor-detail").classList.remove('d-none')
        document.querySelector("#starship-detail").classList.add('d-none')

    }

    static HTML = '' //Переменная для сохранения базового html шаблона с ключами

    renderTableRow() {
        return `
        <tr id="${this.index}" onclick="fnHandlePress(event)">
        <th>${this.name}</th>
        <td>${this.gender}</td>
        <td>${this.birth_year}</td>
        <td>${this.height}</td>
        <td>${this.mass}</td>
        <td>${this.homeworldData.name}</td>
        </tr>
        `
    }

    static renderTable(aActors) {
        let html = `
        <table class="table table-dark table-striped table-hover custom-table shadow">
            <thead>
                <tr>
                    <th scope="col">Имя персонажа</th>
                    <th scope="col">Пол</th>
                    <th scope="col">Год рождения</th>
                    <th scope="col">Рост</th>
                    <th scope="col">Вес</th>
                    <th scope="col">Домашняя планета</th>
                </tr>
            </thead>
            <tbody>
            ${aActors.map(oActor => oActor.renderTableRow()).join('')}
            </tbody>
        </table>
        `
        document.querySelector('.list').innerHTML = html
    }

    static renderDetailTableRow(aData) {
        if (aData.length > 0) {
            return `
          <table class="table caption-top">
          <thead>
              <tr>
                  <th scope="col">Имя персонажа</th>
                  <th scope="col">Пол</th>
                  <th scope="col">Год рождения</th>
                  <th scope="col">Рост</th>
                  <th scope="col">Вес</th>
                  <th scope="col">Домашняя планета</th>
              </tr>
          </thead>
          <tbody>
       ${aData.map(oData => {
                return `
                    <tr id="${oData.url.match(/\d+/g)[0]}" onclick="fnHandlePress(event)">
                    <th>${oData.name}</th>
                    <td>${oData.gender}</td>
                    <td>${oData.birth_year}</td>
                    <td>${oData.height}</td>
                    <td>${oData.mass}</td>
                    <td>${oData.homeworldData.name} </td>
                    </tr>
                  `;
            }).join("")}
          </tbody>
          </table>
            `;
        } else {
            return `<span>Результатов не найдено ¯\_(ツ)_/¯</span>`
        }

    }

}