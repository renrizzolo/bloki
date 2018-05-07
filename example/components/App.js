import React, { Component } from 'react';
import OtherComponent from './OtherComponent';
//import Bloki, { BlokiProvider } from '../../src';
import Bloki from '../../src/Bloki';
import BlokiProvider from '../../src/BlokiProvider';

const blokiTheme = {
	spacing: 12,
	columns: 12,
	innerSpacing: true,
	breakpoints: {
		xs: 420,
		sm: 720,
		md: 960,
		lg: 1320,
	}
}
const styles = {
	root: {
		margin: `${blokiTheme.spacing} auto`,
		fontFamily: 'Helvetica',
	},
	col: {
		backgroundColor: 'white',
		border: '1px solid #dadada',
	},
	layout: {
		border: '1px solid #b0b0b0',
		//backgroundColor: '#dadada',
	},
	cover: {
		padding: 0, 
		backgroundImage: 'url(https://picsum.photos/800/400/?random)',
		backgroundSize: 'cover', 
		paddingTop:  '66.67%',
	},
	hint: {
		borderRadius: 4,
		backgroundColor: 'crimson',
		padding: 8,
		color: 'white',
	},
	info: {
		backgroundColor:'dimgrey',
		padding: 12, color:'white', 
		borderBottom:'1px solid white'
	}
}
class App extends Component {
	render() {
		return (
			<BlokiProvider theme={blokiTheme}>
				<Bloki
					debug
					style={styles.root} 
					justify="center" 
					mdUpStyle={{maxWidth: blokiTheme.breakpoints.md - 256}} 
					lgUpStyle={{maxWidth: blokiTheme.breakpoints.md }}
					xlUpStyle={{maxWidth: blokiTheme.breakpoints.lg - 64}}
				>
				{theme => (
					<React.Fragment>
						<Bloki row justify="center">
							<Bloki
								col
								className={theme.up.includes('md') ? "the-class" : "the-other-class"}
								mb 
								xl={9} 
								lg={9} 
								auto 
								wrap={false} 
								style={styles.layout}
							>
							<Bloki row nest>
								<Bloki col auto mb style={styles.col} mdUpStyle={{border:'1px solid pink'}}>
									<h3>Test col 1</h3>
									<ul>
										<li><code>auto col</code> = fluid width </li>
										<li>this column will be wider then the next one <br/> because it has more content.</li>
										<li>They will automatically wrap.</li>
										<li>These columns also have <code>mb</code> for a <code>theme.spacing</code> margin bottom.</li>
										<li>Without auto, columns will be full width by defaut.</li>
										<li >But can be overridden by <code>{`breakpoint={n columns}`}</code>.</li>
									</ul>
									<h4>Breakpoint styling</h4>
									<p>Bloki uses a mobile-first approach.</p>
									<p>Use the <code>[breakpoint]UpStyle</code> prop  <br/>to specify styles for that breakpoint and above</p>
									<p>this column has <code>{`mdUpStyle={{border:'1px solid pink'}}`}</code></p>
									<h4>using the breakpoints in other elements</h4>
									<p><code>theme.up</code> is an array of breakpoints <br/> including and above the current breakpoint.</p>
										<p style={theme.up.includes('md') ? {color: 'orange'} : {}}>
										{(theme.up.includes('md')) ? `i'm here all night (unless the breakpoint < md)` : `Well I'm still here`}
										</p>
								</Bloki>
								<Bloki col auto mb style={styles.col}>
									<h3>Test col 2</h3>
								</Bloki>
							</Bloki>
							<Bloki row nest sticky>
								<Bloki col auto style={styles.info}>
									<p>Current breakpoint: <strong>{`{${theme.currentBreakpoint}} up to ${theme.breakpoints[theme.currentBreakpoint] ? theme.breakpoints[theme.currentBreakpoint] : '∞'}`}</strong></p>
								</Bloki>
							</Bloki>
							<Bloki row nest>
								<Bloki col auto mb={theme.spacing * 2} innerSpacing={false} md={6}>
									<div style={styles.cover}/>
								</Bloki>
								<Bloki col auto mb md={6} mdStyle={{display:'flex'}} style={{...styles.col, display:'none'}}>
										<div>
											<h3>Test col 3</h3>
											<p style={styles.hint}>{`I'm only visible @ ${theme.breakpoints.sm}px - ${theme.breakpoints.md - 1}px  (md) breakpoint`}</p>
										</div>
								</Bloki>
							</Bloki>
							<OtherComponent/>
							<Bloki row nest>
								<Bloki col innerSpacing={false}>
									<h1>Woo</h1>
								</Bloki>
								<Bloki col xs={blokiTheme.columns} md={blokiTheme.columns} sm={blokiTheme.columns / 2} auto style={{backgroundColor: 'cornflowerblue', color: 'white',}} >
									<h2>Test col 6</h2>
								</Bloki>
								<Bloki  col xs={blokiTheme.columns} md={blokiTheme.columns} sm={blokiTheme.columns / 2} auto style={{backgroundColor: 'cornflowerblue', color: 'white',}} >
									<h2>Test col 7</h2>
								</Bloki>
							</Bloki>
							</Bloki>
							<Bloki col auto mb align="flex-start" xl={3} lg={3} style={{...styles.layout, display:'none'}} lgUpStyle={{display: 'flex'}}>
								<Bloki col innerSpacing={false} sticky style={{paddingTop: theme.spacing}}>
								<h3>Sidebar</h3>
									sticky stuff mate
								</Bloki>
							</Bloki>
						</Bloki>
					</React.Fragment>
				)}
				</Bloki>
			</BlokiProvider>
		);
	}
}

export default App;