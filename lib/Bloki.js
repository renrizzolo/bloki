'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _BlokiProvider = require('./BlokiProvider');

var _reactEmotion = require('react-emotion');

var _reactEmotion2 = _interopRequireDefault(_reactEmotion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bloki = function (_Component) {
	_inherits(Bloki, _Component);

	function Bloki() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, Bloki);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Bloki.__proto__ || Object.getPrototypeOf(Bloki)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
			computedStyle: {}
		}, _this.getWidth = function (width, columns, spacing) {
			var debug = _this.props.debug;

			var normalizedWidth = Math.max(0, Math.min(columns, width));

			debug && (console.log(normalizedWidth), console.log('calc(' + 100 / columns * normalizedWidth + '%)'));

			return Math.round(100 / columns * normalizedWidth) + '%';
		}, _this.columnWidth = function (width, theme, spacing) {
			var _this$props = _this.props,
			    col = _this$props.col,
			    row = _this$props.row,
			    auto = _this$props.auto,
			    nest = _this$props.nest;

			console.log('width:', width);
			if (col && width[theme.currentBreakpoint]) {
				return _this.getWidth(width[theme.currentBreakpoint], theme.columns, spacing);
			} else if (row) {
				return '100%';
			} else {
				return auto || !col && !row ? null : _this.getWidth(theme.columns, theme.columns, spacing);
			}
		}, _this.supports = function (property, value) {
			if ('CSS' in window && 'supports' in window.CSS) {
				return window.CSS.supports(property, value);
			}
		}, _this.getStyles = function (theme, colWidths) {
			var spacing = _this.props.spacing || theme.spacing || 0;
			var _this$props2 = _this.props,
			    col = _this$props2.col,
			    row = _this$props2.row,
			    auto = _this$props2.auto,
			    nest = _this$props2.nest,
			    sticky = _this$props2.sticky,
			    mb = _this$props2.mb,
			    innerSpacing = _this$props2.innerSpacing;
			var computedStyle = _this.state.computedStyle;

			var padding = void 0; //= `${spacing} ${spacing / 2}`;
			var flexGrow = 0;
			var margin = 0;

			if (col && row) {
				console.error('You must use either one of col or row (or neither for your container)');
			}

			if (col) {
				// margin = spacing / 2;
				padding = theme.innerSpacing ? spacing : 0;
				if (typeof innerSpacing === 'boolean') {
					padding = innerSpacing ? spacing : 0;
				}
			} else if (row) {
				padding = 0;
				margin = '-' + spacing + 'px';
			}

			if (col && auto || row) {
				flexGrow = 1;
			}
			if (nest) {
				margin = '-' + spacing / 2 + 'px';
			}

			var stickyPos = _this.supports('position', 'sticky') ? 'sticky' : '-webkit-sticky';
			var stickyStyle = sticky ? { top: 0, zIndex: 99, position: stickyPos } : {};

			var marginBottom = mb && typeof mb === 'boolean' ? spacing : mb;
			var styles = _extends({
				flexBasis: nest ? null : _this.columnWidth(colWidths, theme, spacing),
				maxWidth: nest ? null : _this.columnWidth(colWidths, theme, spacing),
				padding: padding,
				marginLeft: margin,
				marginRight: margin,
				marginBottom: marginBottom,
				flexGrow: flexGrow
			}, computedStyle, stickyStyle);
			_this.props.debug && console.log(styles);
			return styles;
		}, _this.getBreakpointUpStyle = function (currentBreakpoint, up) {
			// theme.up is an array of breakpoints includeing and above the current breakpoint
			// ['xs', 'md', 'lg', 'xl']
			var breakpointUpStyles = {};
			for (var i = 0; i < up.length; i++) {
				var styleKey = [up[i]] + 'UpStyle';
				_this.props.debug && console.log(styleKey + ':', _this.props[styleKey]);
				if (_this.props[styleKey]) {
					breakpointUpStyles = _extends({}, breakpointUpStyles, _this.props[styleKey]);
				}
			}
			return breakpointUpStyles;
		}, _this.Block = (0, _reactEmotion2.default)(_this.props.component === Bloki ? 'div' : _this.props.component)(function (props) {
			return _extends({}, props.styles);
		}), _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(Bloki, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _props = this.props,
			    wrap = _props.wrap,
			    align = _props.align,
			    justify = _props.justify,
			    col = _props.col,
			    row = _props.row,
			    spacing = _props.spacing,
			    sticky = _props.sticky,
			    style = _props.style;


			this.setState({
				computedStyle: {
					minHeight: '1px',
					position: 'relative',
					boxSizing: 'border-box',
					display: 'flex',
					flexWrap: wrap ? 'wrap' : 'nowrap',
					alignItems: align,
					justifyContent: justify,
					flexDirection: col ? 'column' : 'row'
				}
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props2 = this.props,
			    children = _props2.children,
			    style = _props2.style,
			    debug = _props2.debug,
			    component = _props2.component,
			    auto = _props2.auto,
			    xs = _props2.xs,
			    sm = _props2.sm,
			    md = _props2.md,
			    lg = _props2.lg,
			    xl = _props2.xl,
			    rest = _objectWithoutProperties(_props2, ['children', 'style', 'debug', 'component', 'auto', 'xs', 'sm', 'md', 'lg', 'xl']);

			return _react2.default.createElement(
				_BlokiProvider.BlokiContext.Consumer,
				null,
				function (theme) {
					// breakpointStyle > style > props > theme
					if (!theme) {
						console.error('Bloki needs to be wrapped in a <BlokiProvider/>, with an optional theme');
						return;
					}

					// make the breakpoints above 
					// the first supplied equal to that
					// e.g xs:6 sm:8 md:null lg: null xl: null
					// becomes xs:6 sm:8 md:8 lg: 8 xl: 8
					//
					// unsupplied sizes below the lowest supplied
					//  are converted to max cols 
					// it's crude I know...

					var widths = { xl: xl, lg: lg, md: md, sm: sm, xs: xs };
					var arr = [xl, lg, md, sm, xs];

					Object.keys(widths).forEach(function (key, i) {
						console.log(arr[i], arr, i);
						if (!auto && !widths[key]) widths[key] = arr[i + 1] || arr[i + 2] || arr[i + 3] || arr[i + 3] || theme.columns;
					});
					console.log(widths);
					var styles = _this2.getStyles(theme, widths);
					var breakPointStyle = theme.currentBreakpoint + 'Style';
					var breakPointUpStyle = _this2.getBreakpointUpStyle(theme.currentBreakpoint, theme.up);
					return (
						// can be a render function returning the theme
						typeof children === 'function' ? _react2.default.createElement(
							_this2.Block,
							_extends({}, rest, {
								component: component,
								styles: _extends({}, styles, style, _this2.props[breakPointStyle], breakPointUpStyle)
							}),
							children(theme)
						) : _react2.default.createElement(
							_this2.Block,
							_extends({}, rest, {
								component: component,
								styles: _extends({}, styles, style, _this2.props[breakPointStyle], breakPointUpStyle)
							}),
							children
						)
					);
				}
			);
		}
	}]);

	return Bloki;
}(_react.Component);

exports.default = Bloki;


Bloki.propTypes = {
	component: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.function]),
	wrap: _propTypes2.default.bool,
	align: _propTypes2.default.string,
	justify: _propTypes2.default.string,
	innerSpacing: _propTypes2.default.bool,
	sticky: _propTypes2.default.bool,
	col: _propTypes2.default.bool,
	row: _propTypes2.default.bool,
	auto: _propTypes2.default.bool,
	nest: _propTypes2.default.bool,
	xs: _propTypes2.default.number,
	sm: _propTypes2.default.number,
	md: _propTypes2.default.number,
	lg: _propTypes2.default.number,
	xl: _propTypes2.default.number,
	mb: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.number]),
	xsUpStyle: _propTypes2.default.object,
	smUpStyle: _propTypes2.default.object,
	mdUpStyle: _propTypes2.default.object,
	lgUpStyle: _propTypes2.default.object,
	xlUpStyle: _propTypes2.default.object,
	debug: _propTypes2.default.bool
};
Bloki.defaultProps = {
	component: 'div',
	wrap: true,
	align: 'stretch',
	justify: 'flex-start',
	innerSpacing: null,
	sticky: false,
	col: false,
	row: false,
	auto: false,
	nest: false,
	xs: null,
	sm: null,
	md: null,
	lg: null,
	xl: null,
	mb: false,
	xsUpStyle: null,
	smUpStyle: null,
	mdUpStyle: null,
	lgUpStyle: null,
	xlUpStyle: null,
	debug: false
};