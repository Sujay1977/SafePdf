import _extends from '@babel/runtime/helpers/extends';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import _createClass from '@babel/runtime/helpers/createClass';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _inherits from '@babel/runtime/helpers/inherits';
import _createSuper from '@babel/runtime/helpers/createSuper';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SignaturePad from 'signature_pad';
import trimCanvas from 'trim-canvas';

var _excluded = ["canvasProps", "clearOnResize"];
var SignatureCanvas = /*#__PURE__*/function (_Component) {
  _inherits(SignatureCanvas, _Component);
  var _super = _createSuper(SignatureCanvas);
  function SignatureCanvas() {
    var _this;
    _classCallCheck(this, SignatureCanvas);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.staticThis = _this.constructor;
    _this._sigPad = null;
    _this._canvas = null;
    _this.setRef = function (ref) {
      _this._canvas = ref;
      // if component is unmounted, set internal references to null
      if (_this._canvas === null) {
        _this._sigPad = null;
      }
    };
    _this._excludeOurProps = function () {
      var _this$props = _this.props;
        _this$props.canvasProps;
        _this$props.clearOnResize;
        var sigPadProps = _objectWithoutProperties(_this$props, _excluded);
      return sigPadProps;
    };
    _this.componentDidMount = function () {
      var canvas = _this.getCanvas();
      _this._sigPad = new SignaturePad(canvas, _this._excludeOurProps());
      _this._resizeCanvas();
      _this.on();
    };
    _this.componentWillUnmount = function () {
      _this.off();
    };
    _this.componentDidUpdate = function () {
      Object.assign(_this._sigPad, _this._excludeOurProps());
    };
    _this.getCanvas = function () {
      if (_this._canvas === null) {
        throw _this.staticThis.refNullError;
      }
      return _this._canvas;
    };
    _this.getTrimmedCanvas = function () {
      // copy the canvas
      var canvas = _this.getCanvas();
      var copy = document.createElement('canvas');
      copy.width = canvas.width;
      copy.height = canvas.height;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      copy.getContext('2d').drawImage(canvas, 0, 0);
      // then trim it
      return trimCanvas(copy);
    };
    _this.getSignaturePad = function () {
      if (_this._sigPad === null) {
        throw _this.staticThis.refNullError;
      }
      return _this._sigPad;
    };
    _this._checkClearOnResize = function () {
      if (!_this.props.clearOnResize) {
        // eslint-disable-line @typescript-eslint/strict-boolean-expressions -- this is backward compatible with the previous behavior, where null was treated as falsey
        return;
      }
      _this._resizeCanvas();
    };
    _this._resizeCanvas = function () {
      var _this$props$canvasPro, _window$devicePixelRa;
      var canvasProps = (_this$props$canvasPro = _this.props.canvasProps) !== null && _this$props$canvasPro !== void 0 ? _this$props$canvasPro : {};
      var width = canvasProps.width,
        height = canvasProps.height;
      // don't resize if the canvas has fixed width and height
      if (typeof width !== 'undefined' && typeof height !== 'undefined') {
        return;
      }
      var canvas = _this.getCanvas();
      /* When zoomed out to less than 100%, for some very strange reason,
        some browsers report devicePixelRatio as less than 1
        and only part of the canvas is cleared then. */
      var ratio = Math.max((_window$devicePixelRa = window.devicePixelRatio) !== null && _window$devicePixelRa !== void 0 ? _window$devicePixelRa : 1, 1);
      if (typeof width === 'undefined') {
        canvas.width = canvas.offsetWidth * ratio;
      }
      if (typeof height === 'undefined') {
        canvas.height = canvas.offsetHeight * ratio;
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      canvas.getContext('2d').scale(ratio, ratio);
      _this.clear();
    };
    _this.render = function () {
      var canvasProps = _this.props.canvasProps;
      return /*#__PURE__*/React.createElement("canvas", _extends({
        ref: _this.setRef
      }, canvasProps));
    };
    _this.on = function () {
      window.addEventListener('resize', _this._checkClearOnResize);
      return _this.getSignaturePad().on();
    };
    _this.off = function () {
      window.removeEventListener('resize', _this._checkClearOnResize);
      return _this.getSignaturePad().off();
    };
    _this.clear = function () {
      return _this.getSignaturePad().clear();
    };
    _this.isEmpty = function () {
      return _this.getSignaturePad().isEmpty();
    };
    _this.fromDataURL = function (dataURL, options) {
      return _this.getSignaturePad().fromDataURL(dataURL, options);
    };
    _this.toDataURL = function (type, encoderOptions) {
      return _this.getSignaturePad().toDataURL(type, encoderOptions);
    };
    _this.fromData = function (pointGroups) {
      return _this.getSignaturePad().fromData(pointGroups);
    };
    _this.toData = function () {
      return _this.getSignaturePad().toData();
    };
    return _this;
  } // shortcut reference (https://stackoverflow.com/a/29244254/3431180)
  // propagate prop updates to SignaturePad
  // return the canvas ref for operations like toDataURL
  // return a trimmed copy of the canvas
  // return the internal SignaturePad reference
  // all wrapper functions below render
  //
  return _createClass(SignatureCanvas);
}(Component);
SignatureCanvas.propTypes = {
  // signature_pad's props
  velocityFilterWeight: PropTypes.number,
  minWidth: PropTypes.number,
  maxWidth: PropTypes.number,
  minDistance: PropTypes.number,
  dotSize: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  penColor: PropTypes.string,
  throttle: PropTypes.number,
  onEnd: PropTypes.func,
  onBegin: PropTypes.func,
  // props specific to the React wrapper
  canvasProps: PropTypes.object,
  clearOnResize: PropTypes.bool
};
SignatureCanvas.defaultProps = {
  clearOnResize: true
};
SignatureCanvas.refNullError = new Error('react-signature-canvas is currently ' + 'mounting or unmounting: React refs are null during this phase.');

export { SignatureCanvas, SignatureCanvas as default };
//# sourceMappingURL=index.mjs.map
