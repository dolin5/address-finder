import WebMap from "esri/WebMap";
import MapView from "esri/views/MapView";
import MapImageLayer from "esri/layers/MapImageLayer";
import Expand from "esri/widgets/Expand";
import watchUtils from "esri/core/watchUtils";

import ReverseGeocoder from "./widgets/ReverseGeocoder";

const map = new WebMap({
  portalItem: {
    id:"7e05c274552f4c339441b26ee5101e2b"
  }
});

const view = new MapView({
  map: map,
  container: "viewDiv",
  center: [-111.08, 45.752],
  zoom: 12
});

const reverseGeocoderExpand = new Expand({
  view: view
})
view.ui.add(reverseGeocoderExpand,"top-left");


view.when(function() {
  let rG = new ReverseGeocoder({
    view: view,
    expander:reverseGeocoderExpand
  });
  reverseGeocoderExpand.content = rG;
  //watchUtils.whenTrue(reverseGeocoderExpand,"expanded",rG.activate);
  
});