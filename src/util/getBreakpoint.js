const getWidth = () => {
  if (typeof window !== 'undefined' && window.innerWidth) {
    return window.innerWidth;
  }
  return null;
};

const defaultBreakpoints = {
		xs: 476,
		sm: 768,
		md: 992,
		lg: 1200,
}

const getBreakpoint = (themeBreakpoints) => {
	const breakpoints = themeBreakpoints || defaultBreakpoints;
	const viewport = getWidth();
	let currentBreakpoint = 'xl';
	if ( viewport ) {
			currentBreakpoint = 'xs';
		 	if ( breakpoints.xs && viewport >= breakpoints.xs ) currentBreakpoint = 'sm';
		  if ( breakpoints.sm && viewport >= breakpoints.sm )currentBreakpoint = 'md';
		  if ( breakpoints.md && viewport >= breakpoints.md )currentBreakpoint = 'lg';
		  if ( breakpoints.lg && viewport >= breakpoints.lg )currentBreakpoint = 'xl';
	  }
	  console.log(currentBreakpoint, viewport);
	  return currentBreakpoint;
}

export default getBreakpoint;