import { W as styled, X as styleFunctionSx, q as jsxRuntimeExports, Y as createTheme, w as THEME_ID } from './StanzaReactProvider-b083349e.js';
import { e as extendSxProp, c as createSvgIcon } from './createSvgIcon-d354a6e3.js';
import { c as clsx, a as generateUtilityClasses, C as ClassNameGenerator } from './DefaultPropsProvider-c607464a.js';
import { r as reactExports } from './index-ef9d40bc.js';
import { u as useTheme } from './Tooltip-f4db4da8.js';

function createBox(options = {}) {
  const {
    themeId,
    defaultTheme,
    defaultClassName = 'MuiBox-root',
    generateClassName
  } = options;
  const BoxRoot = styled('div', {
    shouldForwardProp: prop => prop !== 'theme' && prop !== 'sx' && prop !== 'as'
  })(styleFunctionSx);
  const Box = /*#__PURE__*/reactExports.forwardRef(function Box(inProps, ref) {
    const theme = useTheme(defaultTheme);
    const {
      className,
      component = 'div',
      ...other
    } = extendSxProp(inProps);
    return /*#__PURE__*/jsxRuntimeExports.jsx(BoxRoot, {
      as: component,
      ref: ref,
      className: clsx(className, generateClassName ? generateClassName(defaultClassName) : defaultClassName),
      theme: themeId ? theme[themeId] || theme : theme,
      ...other
    });
  });
  return Box;
}

const boxClasses = generateUtilityClasses('MuiBox', ['root']);
var boxClasses$1 = boxClasses;

const defaultTheme = createTheme();
const Box = createBox({
  themeId: THEME_ID,
  defaultTheme,
  defaultClassName: boxClasses$1.root,
  generateClassName: ClassNameGenerator.generate
});
var Box$1 = Box;

var AddBoxOutlined = createSvgIcon(/*#__PURE__*/jsxRuntimeExports.jsx("path", {
  d: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 16H5V5h14zm-8-2h2v-4h4v-2h-4V7h-2v4H7v2h4z"
}), 'AddBoxOutlined');

var AdjustOutlined = createSvgIcon(/*#__PURE__*/jsxRuntimeExports.jsx("path", {
  d: "M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m3-8c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3"
}), 'AdjustOutlined');

var CachedOutlinedIcon = createSvgIcon(/*#__PURE__*/jsxRuntimeExports.jsx("path", {
  d: "m19 8-4 4h3c0 3.31-2.69 6-6 6-1.01 0-1.97-.25-2.8-.7l-1.46 1.46C8.97 19.54 10.43 20 12 20c4.42 0 8-3.58 8-8h3zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46C15.03 4.46 13.57 4 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4z"
}), 'CachedOutlined');

var IndeterminateCheckBoxOutlined = createSvgIcon(/*#__PURE__*/jsxRuntimeExports.jsx("path", {
  d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 16H5V5h14zM7 11h10v2H7z"
}), 'IndeterminateCheckBoxOutlined');

const IconExpand = AddBoxOutlined;
const IconCompact = IndeterminateCheckBoxOutlined;
const IconLoading = CachedOutlinedIcon;
const IconNoChildren = AdjustOutlined;
const IconBlank = Box$1;

export { Box$1 as B, IconLoading as I, IconCompact as a, IconExpand as b, IconNoChildren as c, IconBlank as d };
//# sourceMappingURL=icons-c7bf1293.js.map
