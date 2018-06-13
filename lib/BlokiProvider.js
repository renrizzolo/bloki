'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.BlokiContext = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
	Bloki provider.
	Sets the breakpoint from the theme or default, and provides theme settings as context.
*/
var defaults = {
	spacing: 16,
	columns: 12,
	innerSpacing: true,
	breakpoints: {
		xs: 476,
		sm: 768,
		md: 992,
		lg: 1300
	}
};
var BlokiContext = exports.BlokiContext = _react2.default.createContext();

var BlokiProvider = function (_Component) {
	_inherits(BlokiProvider, _Component);

	function BlokiProvider() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, BlokiProvider);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BlokiProvider.__proto__ || Object.getPrototypeOf(BlokiProvider)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(BlokiProvider, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.setBreakpoint();
			this.setTheme();
		}
	}, {
		key: 'render',
		value: function render() {
			var children = this.props.children;
			var _state = this.state,
			    breakpoint = _state.breakpoint,
			    up = _state.up,
			    computedTheme = _state.computedTheme;

			return _react2.default.createElement(
				BlokiContext.Provider,
				{ value: _extends({}, computedTheme, { currentBreakpoint: breakpoint, up: up }) },
				children
			);
		}
	}]);

	return BlokiProvider;
}(_react.Component);

var _initialiseProps = function _initialiseProps() {
	var _this2 = this,
	    _arguments = arguments;

	this.state = {
		breakpoint: 'xl'
	};
	this.timeout = 200;

	this.componentDidMount = function () {
		_this2.listener = _this2.throttle(_this2.setBreakpoint, _this2.timeout);
		window.addEventListener('resize', _this2.listener);
	};

	this.componentWillUnmount = function () {
		window.removeEventListener('resize', _this2.listener);
	};

	this.throttle = function (func, timeout) {
		var inThrottle = void 0;
		return function () {
			var args = _arguments;
			var context = _this2;
			if (!inThrottle) {
				func.apply(context, args);
				inThrottle = true;
				setTimeout(function () {
					return inThrottle = false;
				}, timeout);
			}
		};
	};

	this.setBreakpoint = function () {
		var breakpoint = (0, _util.getBreakpoint)(_this2.props.theme.breakpoints);
		var breakpointsUpArray = ['xs', 'sm', 'md', 'lg', 'xl'];
		// return the breakpoints including and above the current
		var upArray = breakpointsUpArray.filter(function (item, index) {
			return index <= breakpointsUpArray.indexOf(breakpoint);
		});
		_this2.setState({
			breakpoint: breakpoint,
			up: upArray
		});
	};

	this.setTheme = function () {
		var theme = _this2.props.theme;

		var computedTheme = Object.assign({}, defaults || {}, theme);
		_this2.setState({ computedTheme: computedTheme });
	};
};

exports.default = BlokiProvider;


BlokiProvider.propTypes = {
	theme: _propTypes2.default.object,
	children: _propTypes2.default.node.isRequired
};
BlokiProvider.defaultProps = {
	theme: {}
};