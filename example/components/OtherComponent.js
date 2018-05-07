import React from 'react';
import Bloki from '../../src/Bloki';

/*
	getting the theme from any component
	using the row prop removes the padding from the row container
*/
const OtherComponent = () => {
	return (
		<React.Fragment>
			<Bloki row nest mb>
				{(theme) => (
					<React.Fragment>
						<Bloki col xs={12} md={12} sm={6} lg={4}  style={{backgroundColor:'whitesmoke'}} mdStyle={{ marginBottom: theme.spacing}}>
							<h2 style={{padding: theme.spacing / 2}}>Test col 3</h2>
						</Bloki>
						<Bloki col xs={12} md={12} sm={6} lg={8}  xsStyle={{marginBottom: theme.spacing}}  mdStyle={{marginBottom: theme.spacing}} style={{backgroundColor:'whitesmoke'}}>
							<h2 style={{padding: theme.spacing / 2}}>{theme.currentBreakpoint}</h2>
							<p>If you don't want to use the [breakpoint]UpStyle method, there's also a <code>[breakpoint]Style</code> prop available for styling within that breakpoint only.</p>
							<code>{`mdStyle={{marginBottom: theme.spacing}}`}</code>
						</Bloki>
					</React.Fragment>
					)
				}
			</Bloki>
			<Bloki row nest justify="flex-end">
				<Bloki col innerSpacing={false} xs={12} md={7} sm={7} lg={7}>
					<Bloki row mb nest innerSpacing={false}>
						<Bloki col auto xs={6} md={6} sm={6} lg={6} xl={6} style={{backgroundColor:'gainsboro'}}>
							<h2>Nested col</h2>
						</Bloki>
						<Bloki col auto xs={6} md={6} sm={6} lg={6} xl={6} style={{backgroundColor:'gainsboro'}}>
							<p>This could get messy.</p>
						</Bloki>
					</Bloki>
				</Bloki>
				<Bloki col mb auto sm={6} md={5} lg={5} style={{backgroundColor:'whitesmoke'}}>
					<h2>Test col</h2>
				</Bloki>
				<Bloki col auto sm={6} md={5} lg={7} style={{backgroundColor:'whitesmoke'}}>
					<h2 >Test col 5</h2>
					<p>pushed right with <code>justify="flex-end"</code> on the parent row</p>
				</Bloki>
			</Bloki>
		</React.Fragment>
	)
}
export default OtherComponent;	