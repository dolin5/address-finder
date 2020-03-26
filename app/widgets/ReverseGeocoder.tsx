/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />

import { subclass, declared, property } from "esri/core/accessorSupport/decorators";
import Widget = require("esri/widgets/Widget");
import watchUtils = require("esri/core/watchUtils");

import { renderable, tsx } from "esri/widgets/support/widget";

import Point = require("esri/geometry/Point");
import MapView = require("esri/views/MapView");
import Locator = require("esri/tasks/Locator");
import esri = __esri;

type Coordinates = Point | number[] | any;

interface Center {
  x: number;
  y: number;
}

interface State extends Center {
  interacting: boolean;
  scale: number;
}

interface Style {
  textShadow?: string;
}

interface ReverseGeocoderParams {
  view:esri.MapView,
  expander:esri.Expand
}

const CSS = {
  base: "reverse-geocoder-tool",
  container: "esri-widget",
  addressContainer: "reverse-geocoder-text"
};

const locator = new Locator({
  url:"https://gis.gallatin.mt.gov/arcgis/rest/services/Locators/StreetAddressLocator/GeocodeServer"
})


@subclass("esri.widgets.ReverseGeocoder")
class ReverseGeocoder extends declared(Widget) {

  constructor(params:ReverseGeocoderParams) {
    super();
    this._onViewChange = this._onViewChange.bind(this)
  }

  postInitialize() {
    watchUtils.init(this, "view.center, view.interacting, view.scale", () => this._onViewChange());
    watchUtils.whenTrue(this,"expander.expanded",()=>this.activate());
  }

  //--------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------

  //----------------------------------
  //  view
  //----------------------------------

  @property()
  @renderable()
  view: MapView;

  //----------------------------------
  //  initialCenter
  //----------------------------------

  @property()
  expander:esri.Expand;

  @property()
  @renderable()
  initialCenter: Coordinates;

  //----------------------------------
  //  state
  //----------------------------------

  @property()
  @renderable()
  state: State;

  @property()
  @renderable()
  address: string;

  //-------------------------------------------------------------------
  //
  //  Public methods
  //
  //-------------------------------------------------------------------

  render() {
    const address = this.address;
    const styles: Style = {
      //textShadow: this.state.interacting ? '-1px 0 red, 0 1px red, 1px 0 red, 0 -1px red' : ''
    };
    return (
      <div
        bind={this}
        class={this.classes(CSS.base,CSS.container)}
        styles={styles}
        //onclick={this._defaultCenter}
        >
          <div
          bind={this}
          class={this.classes(CSS.base,CSS.addressContainer)}
          styles={styles}
          >
          <span style="white-space: nowrap">address: {address}</span>
          </div>
        
      </div>
    );
  }

  //-------------------------------------------------------------------
  //
  //  Private methods
  //
  //-------------------------------------------------------------------

  private _onViewChange() {
    let { interacting, center, scale } = this.view;
    this.state = {
      x: center.x,
      y: center.y,
      interacting,
      scale
    };
  }

  private _defaultCenter() {
    //this.view.goTo(this.initialCenter);
  }

  private activate(){
    this.view.on("pointer-move",(e)=>{
      this.view.hitTest(e).then(result=>{
        if (result.results.length){
          let mapPoint = result.results[0].mapPoint;
          locator.locationToAddress({
            location:mapPoint
          }).then((result)=>this.mapLocatorResult(result))
        }     
        else {
          this.address="";
        }   
      })
    });
  }

  private mapLocatorResult(result:esri.AddressCandidate){
    console.log(result.attributes.Street);
    this.address = result.attributes.Street;
  }
}

export = ReverseGeocoder;