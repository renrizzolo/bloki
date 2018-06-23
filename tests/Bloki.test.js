import React from 'react'
import { shallow, mount, render } from 'enzyme'
import Bloki, { BlokiProvider } from '../src';
import * as emotion from 'emotion'
import renderer from 'react-test-renderer'
import { createSerializer, createMatchers } from 'jest-emotion'
import { BlokiContext } from '../src/BlokiProvider';
expect.extend(createMatchers(emotion))

expect.addSnapshotSerializer(createSerializer(emotion))
// just a few basic tests

const defaultProps = { 
  wrap: true,
  align: 'stretch',
  justify: 'flex-start',
  innerSpacing: null,
  sticky: false,
  col: false,
  row: false,
  auto: false,
  nest: false,
  component: 'div',
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
}
const defaultTheme = {
  children: <Bloki/>,
  value:{
    spacing: 16,
    columns: 12,
    innerSpacing: true,
    breakpoints: {
      xs: 476,
      sm: 768,
      md: 992,
      lg: 1300,
    },
    currentBreakpoint: 'xs',
    up: [
      'xs',
    ]
  }
}

function createTestProps (props) {
  return {
    ...defaultProps,
    ...props,
  }
}

// force the window width to set the desired currentBreakpoint 
global.innerWidth = 475;


describe('rendering', () => {
  const props = createTestProps();
  const wrapper = shallow((
    <BlokiProvider>
      <Bloki {...props}>
      </Bloki>
    </BlokiProvider>
    ));
  const wrapperWithChild = shallow((
    <BlokiProvider>
      <Bloki>
        <div className="child"/>
      </Bloki>
    </BlokiProvider>
));

  describe('Bloki wrapper', () => {
    it('should render a Bloki', () => {
      expect(wrapper.find(Bloki)).toHaveLength(1);
    })
    it('should render children', () => {
      expect(wrapperWithChild.contains(<div className="child"/>)).toBe(true);
    });
    it('should have the default theme', () => {
      expect(wrapper.props()).toEqual(defaultTheme);
    }) 
    it('should have the default props', () => {
      expect(wrapper.find(Bloki).props()).toEqual(defaultProps);
    })
  })
})

describe('styles', () => {
  const spacing = 24;
  const props = createTestProps({
    justify: 'center',
    align: 'center',
    wrap: false,
    xs: 6,
    spacing,
    //auto: true,
    col: true
  });
  // force sm breakpoint
  global.innerWidth = 477;

  const tree = renderer.create(
    <BlokiProvider>
      <Bloki {...props}>
      </Bloki>
    </BlokiProvider>
  ).toJSON()
  describe('Bloki styles and properties', () => {
    it('Should match the snaphot', () => {
      expect(tree).toMatchSnapshot()
    })
    // it('Should apply auto styles', () => {
    //   expect(tree).not.toHaveStyleRule('max-width', '50%')
    // })
    it('Should apply wrap from props', () => {
      expect(tree).toHaveStyleRule('flex-wrap', 'nowrap')
    })
    it('Should have spacing applied to padding from props', () => {
      expect(tree).toHaveStyleRule('padding', `${spacing}px`)
    })
    // sm = 6
    it('Should have width applied based on column prop', () => {
      expect(tree).toHaveStyleRule('max-width', '50%')
    })
    it('Should have align-items applied based on align prop', () => {
      expect(tree).toHaveStyleRule('align-items', 'center')
    })   
    it('Should have justify-content applied based on justify prop', () => {
      expect(tree).toHaveStyleRule('justify-content', 'center')
    })
  })
})