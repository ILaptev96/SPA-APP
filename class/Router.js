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

        /*     this.sCurrentHash = sHash;
            window.location.hash = sHash;
            this.navigateTo(sHash, false); */
    }

    navigateTo(sRoute, bChangeHash, sId) {
        /*         window.location.hash = `${this.sCurrentHash}/${sId}`
                let arr = sHash.split('/')
                sRoute = arr[0]
                sId = arr[1] */

        /* if (!sId)
            sId = 9 */
    

        if (bChangeHash) {
            this.sPreviousHash = this.sCurrentHash
            this.aHistory.push(this.sPreviousHash)
            this.sCurrentHash = sRoute
            window.location.hash = this.sCurrentHash
       
        }
 
 /*        let arr = sRoute.split('/')
        sRoute = arr[0]
        sId = arr[1] */

        console.log('sId', sId)
        console.log('oModel.starships-route', oModel.starships)
        console.log('sRoute', sRoute)
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
                console.log(oSelectedStarships)
                Promise.all([oSelectedStarships.getPilots(), oSelectedStarships.getFilms()]
                ).then(function () {
                    oSelectedStarships.renderDetail()
                })
                break

        }
    }


}