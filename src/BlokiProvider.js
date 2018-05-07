import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getBreakpoint } from './util';

/*
	Bloki provider.
	Sets the breakpoint from the theme or default, and provides theme settings as context.
*/
const defaults = {
		spacing: 16,
		columns: 12,
		innerSpacing: true,
		breakpoints: {
			xs: 476,
			sm: 768,
			md: 992,
			lg: 1300,
		}
	}
export const BlokiContext = React.createContext();

class BlokiProvider extends Component {
	state = {
		breakpoint: 'xl'
	}
	timeout = 125;
	componentWillMount() {
		this.setBreakpoint();
		this.setTheme();
	}
  componentDidMount = () => {
    this.listener = this.throttle(
    	this.setBreakpoint, this.timeout
    	);
    window.addEventListener('resize', this.listener);
  }

 	componentWillUnmount = () => {
    window.removeEventListener('resize', this.listener);
  }

	throttle = (func, timeout) => {
	  let inThrottle
	  return () => {
	    const args = arguments
	    const context = this
	    if (!inThrottle) {
	      func.apply(context, args)
	      inThrottle = true
	      setTimeout(() => inThrottle = false, timeout)
	    }
	  }
	}

	setBreakpoint = () => {
		const breakpoint = getBreakpoint(this.props.theme.breakpoints);
		const breakpointsUpArray = ['xs','sm','md','lg','xl'];
		// return the breakpoints including and above the current
		const upArray = breakpointsUpArray.filter((item, index) => index <= breakpointsUpArray.indexOf(breakpoint))
		this.setState({ 
			breakpoint: breakpoint,
			up: upArray
		});
	}
	setTheme = () => {
		const { theme } = this.props;
		const computedTheme = Object.assign({}, defaults || {},theme);
		this.setState({computedTheme})
	}
	render() {
		const { children } = this.props;
		const { breakpoint, up, computedTheme } = this.state;
		return (
				<BlokiContext.Provider value={{...computedTheme, currentBreakpoint: breakpoint, up: up}}>
					{children}
				</BlokiContext.Provider>
		);
	}
}

export default BlokiProvider;


BlokiProvider.propTypes = {
	theme: PropTypes.object,
	children: PropTypes.node.isRequired,
}
BlokiProvider.defaultProps =   {
	theme: {
	}
}

