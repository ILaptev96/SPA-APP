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
        this.sCurrentHash = arr[0]
        window.location.hash = arr[0]
        this.navigateTo(arr[0], false, arr[1])

    }

    navigateTo(sRoute, bChangeHash, sId) {
        if (bChangeHash) {
            this.sPreviousHash = this.sCurrentHash
            this.aHistory.push(this.sPreviousHash)
            this.sCurrentHash = sRoute
            window.location.hash = this.sCurrentHash
       
        }
 
        switch (sRoute) {
            case "#actors":
                Actor.renderTable(oModel.actors)
                break;
            case "#actorDetail":
                let oSelectedActor = oModel.actors.find(function (oActor) {
                    return sId == oActor.index
                })
                Promise.all([oSelectedActor.getFilms(), oSelectedActor.getStarships()]
                ).then(function () {
                    oSelectedActor.renderDetail()
                })
                break
            case "#starships":
                Starship.renderTable(oModel.starships)
                break;
            case "#starshipDetail":
                let oSelectedStarships = oModel.starships.find(function (oStarship) {
                    return sId == oStarship.index
                })
                Promise.all([oSelectedStarships.getPilots(), oSelectedStarships.getFilms()]
                ).then(function () {
                    oSelectedStarships.renderDetail()
                })
                break

        }
    }


}