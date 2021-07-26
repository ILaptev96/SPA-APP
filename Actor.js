class Actor {
    constructor(oData, index) {
        this.index = index;
        this.name = oData.name;
        this.height = oData.height;
        this.mass = oData.mass;
        this.hair_color = oData.hair_color;
        this.skin_color = oData.skin_color;
        this.eye_color = oData.eye_color;
        this.birth_year = oData.birth_year;
        this.gender = oData.gender;
        this.homeworldUrl = oData.homeworld;
        this.homeworldData = [];
        this.starshipsUrls = oData.starships;
        this.filmsUrls = oData.films;
        this.filmsData = [];

        this.getHomeworld()
        this.getFilms();
        this.getStarships();
    }
    getHomeworld() {
        $.ajax({
            url: this.homeworldUrl,
            async: false,
            success: (Response) => {
                this.homeworldData = Response;
           //     console.log(this.homeworldData)
            }
        });
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
        Promise.all(aPromises).then((aData) => {
            this.filmsData = aData
          //  console.log(this.filmsData)
        })
    }

    getStarships() {
        let aPromises = this.starshipsUrls.map((sUrl) => {
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
        Promise.all(aPromises).then((aData) => {
            this.filmsData = aData
    //        console.log(this.filmsData)
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

    }
}