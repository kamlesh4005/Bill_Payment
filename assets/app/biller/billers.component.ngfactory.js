/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./billers.component";
import * as i3 from "./biller.service";
import * as i4 from "../user/user.service";
import * as i5 from "@angular/router";
var styles_BillersComponent = [".billerDescription[_ngcontent-%COMP%] {\n            display: inline-block;\n            font-style: italic;\n            font-size: 12px;\n            width: 80%;\n        }\n        .config[_ngcontent-%COMP%] {\n            display: inline-block;\n            text-align: right;\n            font-size: 12px;\n            width: 19%;\n        }"];
var RenderType_BillersComponent = i0.ɵcrt({ encapsulation: 0, styles: styles_BillersComponent, data: {} });
export { RenderType_BillersComponent as RenderType_BillersComponent };
function View_BillersComponent_1(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 4, "div", [["class", "card-content white-text"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n            "])), (_l()(), i0.ɵeld(2, 0, null, null, 1, "span", [["class", "card-title"]], null, null, null, null, null)), (_l()(), i0.ɵted(3, null, ["", ""])), (_l()(), i0.ɵted(-1, null, ["\n        "]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.biller.billerName; _ck(_v, 3, 0, currVal_0); }); }
function View_BillersComponent_2(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 4, "div", [["class", "card-content white-text"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n                \n            "])), (_l()(), i0.ɵeld(2, 0, null, null, 1, "p", [], null, null, null, null, null)), (_l()(), i0.ɵted(3, null, ["", ""])), (_l()(), i0.ɵted(-1, null, ["\n            \n        "]))], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.biller.billerDescription; _ck(_v, 3, 0, currVal_0); }); }
function View_BillersComponent_3(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 7, "div", [["class", "card-action"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n            "])), (_l()(), i0.ɵeld(2, 0, null, null, 1, "a", [], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.onEdit(_co.biller.id) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i0.ɵted(-1, null, ["Edit"])), (_l()(), i0.ɵted(-1, null, ["\n            "])), (_l()(), i0.ɵeld(5, 0, null, null, 1, "a", [], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.onDelete(_co.biller.id) !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), (_l()(), i0.ɵted(-1, null, ["Delete"])), (_l()(), i0.ɵted(-1, null, ["\n        "]))], null, null); }
export function View_BillersComponent_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵted(-1, null, ["   \n"])), (_l()(), i0.ɵted(-1, null, ["\n\n"])), (_l()(), i0.ɵeld(2, 0, null, null, 13, "div", [["class", "row"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n        \n        "])), (_l()(), i0.ɵeld(4, 0, null, null, 10, "div", [["class", "card-panel blue-grey darken-1"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["\n                   \n        "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_BillersComponent_1)), i0.ɵdid(7, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n        "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_BillersComponent_2)), i0.ɵdid(10, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n        "])), (_l()(), i0.ɵand(16777216, null, null, 1, null, View_BillersComponent_3)), i0.ɵdid(13, 16384, null, 0, i1.NgIf, [i0.ViewContainerRef, i0.TemplateRef], { ngIf: [0, "ngIf"] }, null), (_l()(), i0.ɵted(-1, null, ["\n        "])), (_l()(), i0.ɵted(-1, null, ["\n        \n"])), (_l()(), i0.ɵted(-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.optionArr["billerName"]; _ck(_v, 7, 0, currVal_0); var currVal_1 = _co.optionArr["billerDescription"]; _ck(_v, 10, 0, currVal_1); var currVal_2 = (_co.optionArr["billerDescription"] || _co.optionArr["billerName"]); _ck(_v, 13, 0, currVal_2); }, null); }
export function View_BillersComponent_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "all-biller", [], null, null, null, View_BillersComponent_0, RenderType_BillersComponent)), i0.ɵdid(1, 114688, null, 0, i2.BillersComponent, [i3.BillerService, i4.UserService, i5.Router], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var BillersComponentNgFactory = i0.ɵccf("all-biller", i2.BillersComponent, View_BillersComponent_Host_0, { biller: "biller", optionArr: "optionArr" }, {}, []);
export { BillersComponentNgFactory as BillersComponentNgFactory };
