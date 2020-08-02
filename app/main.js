var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/WebMap", "esri/views/MapView", "esri/widgets/Expand", "./widgets/ReverseGeocoder"], function (require, exports, WebMap_1, MapView_1, Expand_1, ReverseGeocoder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    WebMap_1 = __importDefault(WebMap_1);
    MapView_1 = __importDefault(MapView_1);
    Expand_1 = __importDefault(Expand_1);
    ReverseGeocoder_1 = __importDefault(ReverseGeocoder_1);
    var map = new WebMap_1.default({
        portalItem: {
            id: "7e05c274552f4c339441b26ee5101e2b"
        }
    });
    var view = new MapView_1.default({
        map: map,
        container: "viewDiv",
        center: [-111.08, 45.752],
        zoom: 12
    });
    var reverseGeocoderExpand = new Expand_1.default({
        view: view
    });
    view.ui.add(reverseGeocoderExpand, "top-left");
    view.when(function () {
        var rG = new ReverseGeocoder_1.default({
            view: view,
            expander: reverseGeocoderExpand
        });
        reverseGeocoderExpand.content = rG;
        //watchUtils.whenTrue(reverseGeocoderExpand,"expanded",rG.activate);
    });
});
//# sourceMappingURL=main.js.map