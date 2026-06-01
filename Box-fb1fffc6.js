import { a2 as styled, a3 as styleFunctionSx, m as reactExports, W as useTheme, A as jsxRuntimeExports, z as clsx, a4 as createTheme, H as THEME_ID } from './StanzaReactProvider-6021d3e7.js';
import { g as generateUtilityClasses, C as ClassNameGenerator } from './useSlotProps-42393a51.js';
import { e as extendSxProp } from './createSvgIcon-a7ac74f6.js';

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

export { Box$1 as B };
//# sourceMappingURL=Box-fb1fffc6.js.map
