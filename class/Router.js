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
        this.sCurrentHash = sHash
        window.location.hash = sHash
        this.navigateTo(sHash, false)
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
            case "#actorDetails":
                let oSelectedActor = oModel.actors.find(function (oActor, index) {
                    return sId == index
                })
                Promise.all([oSelectedActor.getHomeworld(), oSelectedActor.getFilms(),oSelectedActor.getStarships()]
                ).then(function() {
                    oSelectedActor.renderDetail()
                })
                break
            case "#starships":
                Starship.renderTable(oModel.starships)
                break;
            case "#starshipDetails":
                let oSelectedStarships = oModel.starships.find(function (oStarship, index) {
                    return sId == index
                })                
                Promise.all([oSelectedStarships.getPilots(),oSelectedStarships.getFilms()]
                ).then(function() {
                    oSelectedStarships.renderDetail()
                }) 
          
                break

        }
    }


}