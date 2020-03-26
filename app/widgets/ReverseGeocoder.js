/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/core/watchUtils", "esri/widgets/support/widget", "esri/tasks/Locator"], function (require, exports, __extends, __decorate, decorators_1, Widget, watchUtils, widget_1, Locator) {
    "use strict";
    var CSS = {
        base: "reverse-geocoder-tool",
        container: "esri-widget",
        addressContainer: "reverse-geocoder-text"
    };
    var locator = new Locator({
        url: "https://gis.gallatin.mt.gov/arcgis/rest/services/Locators/StreetAddressLocator/GeocodeServer"
    });
    var ReverseGeocoder = /** @class */ (function (_super) {
        __extends(ReverseGeocoder, _super);
        function ReverseGeocoder(params) {
            var _this = _super.call(this) || this;
            _this._onViewChange = _this._onViewChange.bind(_this);
            return _this;
        }
        ReverseGeocoder.prototype.postInitialize = function () {
            var _this = this;
            watchUtils.init(this, "view.center, view.interacting, view.scale", function () { return _this._onViewChange(); });
            watchUtils.whenTrue(this, "expander.expanded", function () { return _this.activate(); });
        };
        //-------------------------------------------------------------------
        //
        //  Public methods
        //
        //-------------------------------------------------------------------
        ReverseGeocoder.prototype.render = function () {
            var address = this.address;
            var styles = {
            //textShadow: this.state.interacting ? '-1px 0 red, 0 1px red, 1px 0 red, 0 -1px red' : ''
            };
            return (widget_1.tsx("div", { bind: this, class: this.classes(CSS.base, CSS.container), styles: styles },
                widget_1.tsx("div", { bind: this, class: this.classes(CSS.base, CSS.addressContainer), styles: styles },
                    widget_1.tsx("span", { style: "white-space: nowrap" },
                        "address: ",
                        address))));
        };
        //-------------------------------------------------------------------
        //
        //  Private methods
        //
        //-------------------------------------------------------------------
        ReverseGeocoder.prototype._onViewChange = function () {
            var _a = this.view, interacting = _a.interacting, center = _a.center, scale = _a.scale;
            this.state = {
                x: center.x,
                y: center.y,
                interacting: interacting,
                scale: scale
            };
        };
        ReverseGeocoder.prototype._defaultCenter = function () {
            //this.view.goTo(this.initialCenter);
        };
        ReverseGeocoder.prototype.activate = function () {
            var _this = this;
            this.view.on("pointer-move", function (e) {
                _this.view.hitTest(e).then(function (result) {
                    if (result.results.length) {
                        var mapPoint = result.results[0].mapPoint;
                        locator.locationToAddress({
                            location: mapPoint
                        }).then(function (result) { return _this.mapLocatorResult(result); });
                    }
                    else {
                        _this.address = "";
                    }
                });
            });
        };
        ReverseGeocoder.prototype.mapLocatorResult = function (result) {
            console.log(result.attributes.Street);
            this.address = result.attributes.Street;
        };
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], ReverseGeocoder.prototype, "view", void 0);
        __decorate([
            decorators_1.property()
        ], ReverseGeocoder.prototype, "expander", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], ReverseGeocoder.prototype, "initialCenter", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], ReverseGeocoder.prototype, "state", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], ReverseGeocoder.prototype, "address", void 0);
        ReverseGeocoder = __decorate([
            decorators_1.subclass("esri.widgets.ReverseGeocoder")
        ], ReverseGeocoder);
        return ReverseGeocoder;
    }(decorators_1.declared(Widget)));
    return ReverseGeocoder;
});
//# sourceMappingURL=ReverseGeocoder.js.map