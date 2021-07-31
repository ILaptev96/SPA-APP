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

       /* this.getHomeworld()
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
                //     console.log(this.homeworldData)
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
            //  console.log(this.filmsData)
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
        })
        return Promise.all(aPromises).then((aData) => {
            this.starshipsData = aData
            // console.log(this.starshipsData)
        })
    }

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

    renderDetail() {

        /* Actor.HTML || (Actor.HTML = document.querySelector("#actor-detail").innerHTML) */
        if (!Actor.HTML) //Если шаблн не сохранен
            Actor.HTML = document.querySelector("#actor-detail").innerHTML //Получаем шаблон 
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
        document.querySelector(".list").classList.toggle('d-none')
        document.querySelector("#actor-detail").classList.toggle('d-none')
    }

    static HTML = '' //Переменная для сохранения базового html шаблона с ключами

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

}