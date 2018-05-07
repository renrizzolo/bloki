import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BlokiContext } from './BlokiProvider';

export default class Bloki extends Component {
	state = {
		computedStyle: {}
	}

	componentDidMount() {
		const {
			wrap,
			align,
			justify,
			col,
			row,
			spacing,
			sticky,
			style,
		} = this.props;
		
		this.setState({
			computedStyle: {
				minHeight: '1px',
    		position: 'relative',
				boxSizing: 'border-box',
				display: 'flex',
				flexWrap: wrap ? 'wrap' : 'nowrap',
				alignItems: align,
				justifyContent: justify,
				flexDirection: col ? 'column' : 'row',
			}
		})
	}

	getWidth = (width, columns, spacing) => {
	  const { debug } = this.props;
	  const normalizedWidth = Math.max(0, Math.min(columns, width));

	  debug && (
		 	console.log(normalizedWidth),
		 	console.log(`calc(${(100 / columns) * normalizedWidth}% - ${spacing}px)`)
		 );

	  return `calc(${(100 / columns) * normalizedWidth}% - ${spacing}px)`;
	};

	columnWidth = (width, theme, spacing) => {
		const { 			
			col,
			row,
			auto,
			nest
		} = this.props;

		if ( col && width[theme.currentBreakpoint] ) {
				return this.getWidth(width[theme.currentBreakpoint], theme.columns, spacing)
			} else if ( row ) {
				return '100%'
			} else {
				return auto || (!col && !row) ? null : this.getWidth(theme.columns, theme.columns, spacing)
			}
	}
	supports = (property, value) => {
  	if ('CSS' in window && 'supports' in window.CSS) {
    	return window.CSS.supports(property, value);
  	}
	}
	getStyles = (theme) => {
		const spacing = this.props.spacing || theme.spacing || 0;
		const { 			
			col,
			row,
			auto,
			nest,
			sticky,
			xs, sm,	md,	lg,	xl,
			mb,
			innerSpacing,
		} = this.props;
		const { computedStyle } = this.state;
		let padding;  //= `${spacing} ${spacing / 2}`;
		let flexGrow = 0;
		let margin = 0;

		if ( col && row ) {
			console.error('You must use either one of col or row (or neither for your container)')
		}

		if ( col ) {
			margin = spacing / 2;
			padding = theme.innerSpacing ? spacing : 0;
			if (typeof innerSpacing === 'boolean') {
				padding = innerSpacing ? spacing : 0;
			}
		}
		else if ( row ) {
			padding = 0;
			margin = `${spacing / 2}`;
		}

		if ( (col && auto) || row ) {
			flexGrow = 1;
		}
		if ( nest ) {
			margin = `-${spacing / 2}`;
		}

		const stickyPos = this.supports('position', 'sticky') ? 'sticky' : '-webkit-sticky';
		const stickyStyle = sticky ? { top: 0, zIndex: 99, position: stickyPos } : {};

		const marginBottom = mb && typeof mb === 'boolean' ? spacing : mb;
		const styles = {
    	flexBasis: nest ? null : this.columnWidth({xs, sm,	md,	lg,	xl}, theme, spacing),
      maxWidth: nest ? null : this.columnWidth({xs, sm,	md,	lg,	xl}, theme, spacing),
    	padding: padding,
    	marginLeft: margin,
			marginRight: margin,
			marginBottom: marginBottom,
			flexGrow: flexGrow,
    	...computedStyle,
    	...stickyStyle,
    }
    this.props.debug && console.log(styles);
		return styles;
	}
	getBreakpointUpStyle = (currentBreakpoint, up) => {
		// theme.up is an array of breakpoints includeing and above the current breakpoint
		// ['xs', 'md', 'lg', 'xl']
  	let breakpointUpStyles = {};
  	for (let i = 0; i < up.length; i++) {
  		const styleKey = `${[up[i]]}UpStyle`
  		this.props.debug && console.log(`${styleKey}:`, this.props[styleKey]);
  		if (this.props[styleKey]) {
  			breakpointUpStyles = {
  				...breakpointUpStyles, 
  				...this.props[styleKey]
  			}
  		}
  	}
    return breakpointUpStyles;
	}

	render() {
		const {
			children,
			style,
			debug,
			className,
			...rest
		} = this.props;
		
		return (
			<BlokiContext.Consumer>
      {(theme) => {
      	// breakpointStyle > style > props > theme
      	if (!theme) {
      		console.error('Bloki needs to be wrapped in a <BlokiProvider/>, with an optional theme')
      		return;
      	}
      	const styles = this.getStyles(theme);
      	const breakPointStyle = `${theme.currentBreakpoint}Style`;
      	const breakPointUpStyle = this.getBreakpointUpStyle(theme.currentBreakpoint, theme.up);
	      return (
	      // can be a render function returning the theme
	      typeof children === 'function' ?
	      <div 
		      className={className}
			    style={{...styles, ...style, ...this.props[breakPointStyle],  ...breakPointUpStyle}}
	      >
	    		{children(theme)}
	      </div>
	      :
	      <div
	      	className={className}
		      style={{...styles, ...style, ...this.props[breakPointStyle], ...breakPointUpStyle}}
	      >
					{children}
				</div>
			
				)
			}
		}
			</BlokiContext.Consumer>
		);
	}
}

Bloki.propTypes = {
	wrap: PropTypes.bool,
	align: PropTypes.string,
	justify: PropTypes.string,
	innerSpacing: PropTypes.bool,
	sticky: PropTypes.bool,
	col: PropTypes.bool,
	row: PropTypes.bool,
	auto: PropTypes.bool,
	nest: PropTypes.bool,
	xs: PropTypes.number,
	sm: PropTypes.number,
	md: PropTypes.number,
	lg: PropTypes.number,
	xl: PropTypes.number,
	mb: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
	xsUpStyle: PropTypes.object,
	smUpStyle: PropTypes.object,
	mdUpStyle: PropTypes.object,
	lgUpStyle: PropTypes.object,
	xlUpStyle: PropTypes.object,
	debug: PropTypes.bool,
}
Bloki.defaultProps = {
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
	debug: false,
}

