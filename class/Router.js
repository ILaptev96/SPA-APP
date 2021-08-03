class Router {
    constructor() {
        this.aRoutes = ["#actors", "#actorDetail", "#starships", "#starshipDetail"]
        this.sCurrentHash = ""
        this.sPreviousHash = ""
        this.aHistory = []
        this.sDefaultHash = "actors"
        this.bButtonBackVisibility = false
    }

    init(sHash) {

        let arr = sHash.split('/')
        sHash = arr[0]


        this.sCurrentHash = sHash
        window.location.hash = sHash
        this.navigateTo(sHash, false, arr[1])
    }

    navigateTo(sRoute, bChangeHash, sId) {
        if (bChangeHash) {
            this.sPreviousHash = this.sCurrentHash
            this.aHistory.push(this.sPreviousHash)
            this.sCurrentHash = sRoute
            // window.location.hash = `${this.sCurrentHash}/${sId}`
            window.location.hash = this.sCurrentHash
        }
        if (!sId)
            sId = 4
        console.log(sId)
        console.log('oModel.actors-route', oModel.actors)
        console.log('sRoute', sRoute)
        switch (sRoute) {
            case "#actors":
                Actor.renderTable(oModel.actors)
                //  document.querySelector('.list').innerHTML = Actor.renderDetailTableRow(oModel.actors)
                break;
            case "#actorDetail":
                let oSelectedActor = oModel.actors.find(function (oActor, index) {
                    return sId == index
                })

                Promise.all([oSelectedActor.getHomeworld(), oSelectedActor.getFilms(), oSelectedActor.getStarships()]
                ).then(function () {
                    oSelectedActor.renderDetail()
                })
                break
            case "#starships":
                Starship.renderTable(oModel.starships)
                // document.querySelector('.list').innerHTML = Starship.renderDetailTableRow(oModel.starships)
                break;
            case "#starshipDetail":
                let oSelectedStarships = oModel.starships.find(function (oStarship, index) {
                    return sId == index
                })
                Promise.all([oSelectedStarships.getPilots(), oSelectedStarships.getFilms()]
                ).then(function () {
                    oSelectedStarships.renderDetail()
                })
                break

        }
    }


}