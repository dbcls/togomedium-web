import { d as defineStanzaElement } from './stanza-0294ba58.js';
import { a5 as createStyled, M as resolveProps, W as useTheme, a6 as createTheme, a7 as handleBreakpoints, a8 as resolveBreakpointValues, a9 as createUnarySpacing, O as deepmerge, aa as mergeBreakpointsInOrder, m as reactExports, A as jsxRuntimeExports, z as clsx, ab as getValue, s as styled$1, y as capitalize, N as useId, K as keyframes, Q as css, D as useRtl, ac as emphasize, ad as useDispatch, ae as useSelector, j as jsx, a as jsxs, T as THEME, af as useStore, R as React, b as TogoMediumReactStanza } from './StanzaReactProvider-6021d3e7.js';
import { n as nanoid } from './index.browser-9dccf6b2.js';
import { c as composeClasses, a as generateUtilityClass, g as generateUtilityClasses, m as memoTheme, u as useDefaultProps, f as useForkRef, e as useEventCallback, o as ownerDocument, j as extractEventHandlers } from './useSlotProps-42393a51.js';
import { u as useSlot, g as getReactElementRef, a as useTheme$1, d as useTimeout, G as Grow } from './Grow-d6a16e65.js';
import { c as createSimplePaletteValueFilter } from './CircularProgress-0dc9c54d.js';
import { e as extendSxProp, c as createSvgIcon } from './createSvgIcon-a7ac74f6.js';
import { I as IconButton, a as ClearIcon, T as TextField, A as Autocomplete } from './TextField-95122230.js';
import { P as Paper, n as Backdrop, M as Modal, p as Fade, c as Button, q as Menu } from './Select-a2b2ad7a.js';
import { T as Typography, M as MenuItem } from './MenuItem-edfba4b0.js';
import { B as Box } from './Box-fb1fffc6.js';
import { o as object, s as string, n as number, a as array, l as literal, m as makeApiUrl, g as getData } from './makeApiUrl-bc69b05b.js';
import { P as PATH_COMPONENTS_WITH_COMPONENTS } from './definitions-a04f4463.js';
import { d as decodeHTMLEntities } from './decodeHtmlEntities-9696853d.js';
import { u as useQuery } from './useQuery-c819e3b3.js';
import { P as PATH_MEDIUM_DETAIL } from './definitions-a767899b.js';
import './isArray-56c7d056.js';

const styled = createStyled();
var systemStyled = styled;

function getThemeProps(params) {
  const {
    theme,
    name,
    props
  } = params;
  if (!theme || !theme.components || !theme.components[name] || !theme.components[name].defaultProps) {
    return props;
  }
  return resolveProps(theme.components[name].defaultProps, props);
}

function useThemeProps({
  props,
  name,
  defaultTheme,
  themeId
}) {
  let theme = useTheme(defaultTheme);
  if (themeId) {
    theme = theme[themeId] || theme;
  }
  return getThemeProps({
    theme,
    name,
    props
  });
}

const defaultTheme = createTheme();
// widening Theme to any so that the consumer can own the theme structure.
const defaultCreateStyledComponent = systemStyled('div', {
  name: 'MuiStack',
  slot: 'Root'
});
function useThemePropsDefault(props) {
  return useThemeProps({
    props,
    name: 'MuiStack',
    defaultTheme
  });
}

/**
 * Return an array with the separator React element interspersed between
 * each React node of the input children.
 *
 * > joinChildren([1,2,3], 0)
 * [1,0,2,0,3]
 */
function joinChildren(children, separator) {
  const childrenArray = reactExports.Children.toArray(children).filter(Boolean);
  return childrenArray.reduce((output, child, index) => {
    output.push(child);
    if (index < childrenArray.length - 1) {
      output.push(/*#__PURE__*/reactExports.cloneElement(separator, {
        key: `separator-${index}`
      }));
    }
    return output;
  }, []);
}
const getSideFromDirection = direction => {
  return {
    row: 'Left',
    'row-reverse': 'Right',
    column: 'Top',
    'column-reverse': 'Bottom'
  }[direction];
};
const style = ({
  ownerState,
  theme
}) => {
  let styles = {
    display: 'flex',
    flexDirection: 'column',
    ...handleBreakpoints({
      theme
    }, resolveBreakpointValues({
      values: ownerState.direction,
      breakpoints: theme.breakpoints.values
    }), propValue => ({
      flexDirection: propValue
    }))
  };
  if (ownerState.spacing) {
    const transformer = createUnarySpacing(theme);
    const base = Object.keys(theme.breakpoints.values).reduce((acc, breakpoint) => {
      if (typeof ownerState.spacing === 'object' && ownerState.spacing[breakpoint] != null || typeof ownerState.direction === 'object' && ownerState.direction[breakpoint] != null) {
        acc[breakpoint] = true;
      }
      return acc;
    }, {});
    const directionValues = resolveBreakpointValues({
      values: ownerState.direction,
      base
    });
    const spacingValues = resolveBreakpointValues({
      values: ownerState.spacing,
      base
    });
    if (typeof directionValues === 'object') {
      Object.keys(directionValues).forEach((breakpoint, index, breakpoints) => {
        const directionValue = directionValues[breakpoint];
        if (!directionValue) {
          const previousDirectionValue = index > 0 ? directionValues[breakpoints[index - 1]] : 'column';
          directionValues[breakpoint] = previousDirectionValue;
        }
      });
    }
    const styleFromPropValue = (propValue, breakpoint) => {
      if (ownerState.useFlexGap) {
        return {
          gap: getValue(transformer, propValue)
        };
      }
      return {
        // The useFlexGap={false} implement relies on each child to give up control of the margin.
        // We need to reset the margin to avoid double spacing.
        '& > :not(style):not(style)': {
          margin: 0
        },
        '& > :not(style) ~ :not(style)': {
          [`margin${getSideFromDirection(breakpoint ? directionValues[breakpoint] : ownerState.direction)}`]: getValue(transformer, propValue)
        }
      };
    };
    styles = deepmerge(styles, handleBreakpoints({
      theme
    }, spacingValues, styleFromPropValue));
  }
  styles = mergeBreakpointsInOrder(theme.breakpoints, styles);
  return styles;
};
function createStack(options = {}) {
  const {
    // This will allow adding custom styled fn (for example for custom sx style function)
    createStyledComponent = defaultCreateStyledComponent,
    useThemeProps = useThemePropsDefault,
    componentName = 'MuiStack'
  } = options;
  const useUtilityClasses = () => {
    const slots = {
      root: ['root']
    };
    return composeClasses(slots, slot => generateUtilityClass(componentName, slot), {});
  };
  const StackRoot = createStyledComponent(style);
  const Stack = /*#__PURE__*/reactExports.forwardRef(function Grid(inProps, ref) {
    const themeProps = useThemeProps(inProps);
    const props = extendSxProp(themeProps); // `color` type conflicts with html color attribute.
    const {
      component = 'div',
      direction = 'column',
      spacing = 0,
      divider,
      children,
      className,
      useFlexGap = false,
      ...other
    } = props;
    const ownerState = {
      direction,
      spacing,
      useFlexGap
    };
    const classes = useUtilityClasses();
    return /*#__PURE__*/jsxRuntimeExports.jsx(StackRoot, {
      as: component,
      ownerState: ownerState,
      ref: ref,
      className: clsx(classes.root, className),
      ...other,
      children: divider ? joinChildren(children, divider) : children
    });
  });
  return Stack;
}

function getAlertUtilityClass(slot) {
  return generateUtilityClass('MuiAlert', slot);
}
const alertClasses = generateUtilityClasses('MuiAlert', ['root', 'action', 'icon', 'message', 'filled', 'colorSuccess', 'colorInfo', 'colorWarning', 'colorError', 'filledSuccess', 'filledInfo', 'filledWarning', 'filledError', 'outlined', 'outlinedSuccess', 'outlinedInfo', 'outlinedWarning', 'outlinedError', 'standard', 'standardSuccess', 'standardInfo', 'standardWarning', 'standardError']);
var alertClasses$1 = alertClasses;

var SuccessOutlinedIcon = createSvgIcon(/*#__PURE__*/jsxRuntimeExports.jsx("path", {
  d: "M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z"
}));

var ReportProblemOutlinedIcon = createSvgIcon(/*#__PURE__*/jsxRuntimeExports.jsx("path", {
  d: "M12 5.99L19.53 19H4.47L12 5.99M12 2L1 21h22L12 2zm1 14h-2v2h2v-2zm0-6h-2v4h2v-4z"
}));

var ErrorOutlineIcon = createSvgIcon(/*#__PURE__*/jsxRuntimeExports.jsx("path", {
  d: "M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
}));

var InfoOutlinedIcon = createSvgIcon(/*#__PURE__*/jsxRuntimeExports.jsx("path", {
  d: "M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20, 12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10, 10 0 0,0 12,2M11,17H13V11H11V17Z"
}));

const useUtilityClasses$7 = ownerState => {
  const {
    variant,
    color,
    severity,
    classes
  } = ownerState;
  const slots = {
    root: ['root', `color${capitalize(color || severity)}`, `${variant}${capitalize(color || severity)}`, `${variant}`],
    icon: ['icon'],
    message: ['message'],
    action: ['action']
  };
  return composeClasses(slots, getAlertUtilityClass, classes);
};
const AlertRoot = styled$1(Paper, {
  name: 'MuiAlert',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.variant], styles[`${ownerState.variant}${capitalize(ownerState.color || ownerState.severity)}`]];
  }
})(memoTheme(({
  theme
}) => {
  const getColor = theme.palette.mode === 'light' ? theme.darken : theme.lighten;
  const getBackgroundColor = theme.palette.mode === 'light' ? theme.lighten : theme.darken;
  return {
    ...theme.typography.body2,
    backgroundColor: 'transparent',
    display: 'flex',
    padding: '6px 16px',
    variants: [...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(['light'])).map(([color]) => ({
      props: {
        colorSeverity: color,
        variant: 'standard'
      },
      style: {
        color: theme.vars ? theme.vars.palette.Alert[`${color}Color`] : getColor(theme.palette[color].light, 0.6),
        backgroundColor: theme.vars ? theme.vars.palette.Alert[`${color}StandardBg`] : getBackgroundColor(theme.palette[color].light, 0.9),
        [`& .${alertClasses$1.icon}`]: theme.vars ? {
          color: theme.vars.palette.Alert[`${color}IconColor`]
        } : {
          color: theme.palette[color].main
        }
      }
    })), ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(['light'])).map(([color]) => ({
      props: {
        colorSeverity: color,
        variant: 'outlined'
      },
      style: {
        color: theme.vars ? theme.vars.palette.Alert[`${color}Color`] : getColor(theme.palette[color].light, 0.6),
        border: `1px solid ${(theme.vars || theme).palette[color].light}`,
        [`& .${alertClasses$1.icon}`]: theme.vars ? {
          color: theme.vars.palette.Alert[`${color}IconColor`]
        } : {
          color: theme.palette[color].main
        }
      }
    })), ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(['dark'])).map(([color]) => ({
      props: {
        colorSeverity: color,
        variant: 'filled'
      },
      style: {
        fontWeight: theme.typography.fontWeightMedium,
        ...(theme.vars ? {
          color: theme.vars.palette.Alert[`${color}FilledColor`],
          backgroundColor: theme.vars.palette.Alert[`${color}FilledBg`]
        } : {
          backgroundColor: theme.palette.mode === 'dark' ? theme.palette[color].dark : theme.palette[color].main,
          color: theme.palette.getContrastText(theme.palette[color].main)
        })
      }
    }))]
  };
}));
const AlertIcon = styled$1('div', {
  name: 'MuiAlert',
  slot: 'Icon'
})({
  marginRight: 12,
  padding: '7px 0',
  display: 'flex',
  fontSize: 22,
  opacity: 0.9
});
const AlertMessage = styled$1('div', {
  name: 'MuiAlert',
  slot: 'Message'
})({
  padding: '8px 0',
  minWidth: 0,
  overflow: 'auto'
});
const AlertAction = styled$1('div', {
  name: 'MuiAlert',
  slot: 'Action'
})({
  display: 'flex',
  alignItems: 'flex-start',
  padding: '4px 0 0 16px',
  marginLeft: 'auto',
  marginRight: -8
});
const defaultIconMapping = {
  success: /*#__PURE__*/jsxRuntimeExports.jsx(SuccessOutlinedIcon, {
    fontSize: "inherit"
  }),
  warning: /*#__PURE__*/jsxRuntimeExports.jsx(ReportProblemOutlinedIcon, {
    fontSize: "inherit"
  }),
  error: /*#__PURE__*/jsxRuntimeExports.jsx(ErrorOutlineIcon, {
    fontSize: "inherit"
  }),
  info: /*#__PURE__*/jsxRuntimeExports.jsx(InfoOutlinedIcon, {
    fontSize: "inherit"
  })
};
const Alert = /*#__PURE__*/reactExports.forwardRef(function Alert(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiAlert'
  });
  const {
    action,
    children,
    className,
    closeText = 'Close',
    color,
    components = {},
    componentsProps = {},
    icon,
    iconMapping = defaultIconMapping,
    onClose,
    role = 'alert',
    severity = 'success',
    slotProps = {},
    slots = {},
    variant = 'standard',
    ...other
  } = props;
  const ownerState = {
    ...props,
    color,
    severity,
    variant,
    colorSeverity: color || severity
  };
  const classes = useUtilityClasses$7(ownerState);
  const externalForwardedProps = {
    slots: {
      closeButton: components.CloseButton,
      closeIcon: components.CloseIcon,
      ...slots
    },
    slotProps: {
      ...componentsProps,
      ...slotProps
    }
  };
  const [RootSlot, rootSlotProps] = useSlot('root', {
    ref,
    shouldForwardComponentProp: true,
    className: clsx(classes.root, className),
    elementType: AlertRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other
    },
    ownerState,
    additionalProps: {
      role,
      elevation: 0
    }
  });
  const [IconSlot, iconSlotProps] = useSlot('icon', {
    className: classes.icon,
    elementType: AlertIcon,
    externalForwardedProps,
    ownerState
  });
  const [MessageSlot, messageSlotProps] = useSlot('message', {
    className: classes.message,
    elementType: AlertMessage,
    externalForwardedProps,
    ownerState
  });
  const [ActionSlot, actionSlotProps] = useSlot('action', {
    className: classes.action,
    elementType: AlertAction,
    externalForwardedProps,
    ownerState
  });
  const [CloseButtonSlot, closeButtonProps] = useSlot('closeButton', {
    elementType: IconButton,
    externalForwardedProps,
    ownerState
  });
  const [CloseIconSlot, closeIconProps] = useSlot('closeIcon', {
    elementType: ClearIcon,
    externalForwardedProps,
    ownerState
  });
  return /*#__PURE__*/jsxRuntimeExports.jsxs(RootSlot, {
    ...rootSlotProps,
    children: [icon !== false ? /*#__PURE__*/jsxRuntimeExports.jsx(IconSlot, {
      ...iconSlotProps,
      children: icon || iconMapping[severity] || defaultIconMapping[severity]
    }) : null, /*#__PURE__*/jsxRuntimeExports.jsx(MessageSlot, {
      ...messageSlotProps,
      children: children
    }), action != null ? /*#__PURE__*/jsxRuntimeExports.jsx(ActionSlot, {
      ...actionSlotProps,
      children: action
    }) : null, action == null && onClose ? /*#__PURE__*/jsxRuntimeExports.jsx(ActionSlot, {
      ...actionSlotProps,
      children: /*#__PURE__*/jsxRuntimeExports.jsx(CloseButtonSlot, {
        size: "small",
        "aria-label": closeText,
        title: closeText,
        color: "inherit",
        onClick: onClose,
        ...closeButtonProps,
        children: /*#__PURE__*/jsxRuntimeExports.jsx(CloseIconSlot, {
          fontSize: "small",
          ...closeIconProps
        })
      })
    }) : null]
  });
});
var Alert$1 = Alert;

// TODO: return `EventHandlerName extends `on${infer EventName}` ? Lowercase<EventName> : never` once generatePropTypes runs with TS 4.1
function mapEventPropToEvent(eventProp) {
  return eventProp.substring(2).toLowerCase();
}
function clickedRootScrollbar(event, doc) {
  return doc.documentElement.clientWidth < event.clientX || doc.documentElement.clientHeight < event.clientY;
}
/**
 * Listen for click events that occur somewhere in the document, outside of the element itself.
 * For instance, if you need to hide a menu when people click anywhere else on your page.
 *
 * Demos:
 *
 * - [Click-Away Listener](https://mui.com/material-ui/react-click-away-listener/)
 * - [Menu](https://mui.com/material-ui/react-menu/)
 *
 * API:
 *
 * - [ClickAwayListener API](https://mui.com/material-ui/api/click-away-listener/)
 */
function ClickAwayListener(props) {
  const {
    children,
    disableReactTree = false,
    mouseEvent = 'onClick',
    onClickAway,
    touchEvent = 'onTouchEnd'
  } = props;
  const movedRef = reactExports.useRef(false);
  const nodeRef = reactExports.useRef(null);
  const activatedRef = reactExports.useRef(false);
  const syntheticEventRef = reactExports.useRef(false);
  reactExports.useEffect(() => {
    // Ensure that this component is not "activated" synchronously.
    // https://github.com/facebook/react/issues/20074
    setTimeout(() => {
      activatedRef.current = true;
    }, 0);
    return () => {
      activatedRef.current = false;
    };
  }, []);
  const handleRef = useForkRef(getReactElementRef(children), nodeRef);

  // The handler doesn't take event.defaultPrevented into account:
  //
  // event.preventDefault() is meant to stop default behaviors like
  // clicking a checkbox to check it, hitting a button to submit a form,
  // and hitting left arrow to move the cursor in a text input etc.
  // Only special HTML elements have these default behaviors.
  const handleClickAway = useEventCallback(event => {
    // Given developers can stop the propagation of the synthetic event,
    // we can only be confident with a positive value.
    const insideReactTree = syntheticEventRef.current;
    syntheticEventRef.current = false;
    const doc = ownerDocument(nodeRef.current);

    // 1. IE11 support, which trigger the handleClickAway even after the unbind
    // 2. The child might render null.
    // 3. Behave like a blur listener.
    if (!activatedRef.current || !nodeRef.current || 'clientX' in event && clickedRootScrollbar(event, doc)) {
      return;
    }

    // Do not act if user performed touchmove
    if (movedRef.current) {
      movedRef.current = false;
      return;
    }
    let insideDOM;

    // If not enough, can use https://github.com/DieterHolvoet/event-propagation-path/blob/master/propagationPath.js
    if (event.composedPath) {
      insideDOM = event.composedPath().includes(nodeRef.current);
    } else {
      insideDOM = !doc.documentElement.contains(
      // @ts-expect-error returns `false` as intended when not dispatched from a Node
      event.target) || nodeRef.current.contains(
      // @ts-expect-error returns `false` as intended when not dispatched from a Node
      event.target);
    }
    if (!insideDOM && (disableReactTree || !insideReactTree)) {
      onClickAway(event);
    }
  });

  // Keep track of mouse/touch events that bubbled up through the portal.
  const createHandleSynthetic = handlerName => event => {
    syntheticEventRef.current = true;
    const childrenPropsHandler = children.props[handlerName];
    if (childrenPropsHandler) {
      childrenPropsHandler(event);
    }
  };
  const childrenProps = {
    ref: handleRef
  };
  if (touchEvent !== false) {
    childrenProps[touchEvent] = createHandleSynthetic(touchEvent);
  }
  reactExports.useEffect(() => {
    if (touchEvent !== false) {
      const mappedTouchEvent = mapEventPropToEvent(touchEvent);
      const doc = ownerDocument(nodeRef.current);
      const handleTouchMove = () => {
        movedRef.current = true;
      };
      doc.addEventListener(mappedTouchEvent, handleClickAway);
      doc.addEventListener('touchmove', handleTouchMove);
      return () => {
        doc.removeEventListener(mappedTouchEvent, handleClickAway);
        doc.removeEventListener('touchmove', handleTouchMove);
      };
    }
    return undefined;
  }, [handleClickAway, touchEvent]);
  if (mouseEvent !== false) {
    childrenProps[mouseEvent] = createHandleSynthetic(mouseEvent);
  }
  reactExports.useEffect(() => {
    if (mouseEvent !== false) {
      const mappedMouseEvent = mapEventPropToEvent(mouseEvent);
      const doc = ownerDocument(nodeRef.current);
      doc.addEventListener(mappedMouseEvent, handleClickAway);
      return () => {
        doc.removeEventListener(mappedMouseEvent, handleClickAway);
      };
    }
    return undefined;
  }, [handleClickAway, mouseEvent]);
  return /*#__PURE__*/reactExports.cloneElement(children, childrenProps);
}

function getDialogUtilityClass(slot) {
  return generateUtilityClass('MuiDialog', slot);
}
const dialogClasses = generateUtilityClasses('MuiDialog', ['root', 'backdrop', 'scrollPaper', 'scrollBody', 'container', 'paper', 'paperScrollPaper', 'paperScrollBody', 'paperWidthFalse', 'paperWidthXs', 'paperWidthSm', 'paperWidthMd', 'paperWidthLg', 'paperWidthXl', 'paperFullWidth', 'paperFullScreen']);
var dialogClasses$1 = dialogClasses;

const DialogContext = /*#__PURE__*/reactExports.createContext({});
var DialogContext$1 = DialogContext;

const DialogBackdrop = styled$1(Backdrop, {
  name: 'MuiDialog',
  slot: 'Backdrop'
})({
  // Improve scrollable dialog support.
  zIndex: -1
});
const useUtilityClasses$6 = ownerState => {
  const {
    classes,
    scroll,
    maxWidth,
    fullWidth,
    fullScreen
  } = ownerState;
  const slots = {
    root: ['root'],
    backdrop: ['backdrop'],
    container: ['container', `scroll${capitalize(scroll)}`],
    paper: ['paper', `paperScroll${capitalize(scroll)}`, `paperWidth${capitalize(String(maxWidth))}`, fullWidth && 'paperFullWidth', fullScreen && 'paperFullScreen']
  };
  return composeClasses(slots, getDialogUtilityClass, classes);
};
const DialogRoot = styled$1(Modal, {
  name: 'MuiDialog',
  slot: 'Root'
})({
  '@media print': {
    // Use !important to override the Modal inline-style.
    position: 'absolute !important'
  }
});
const DialogContainer = styled$1('div', {
  name: 'MuiDialog',
  slot: 'Container',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.container, styles[`scroll${capitalize(ownerState.scroll)}`]];
  }
})({
  height: '100%',
  '@media print': {
    height: 'auto'
  },
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0,
  variants: [{
    props: {
      scroll: 'paper'
    },
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, {
    props: {
      scroll: 'body'
    },
    style: {
      overflowY: 'auto',
      overflowX: 'hidden',
      textAlign: 'center',
      '&::after': {
        content: '""',
        display: 'inline-block',
        verticalAlign: 'middle',
        height: '100%',
        width: '0'
      }
    }
  }]
});
const DialogPaper = styled$1(Paper, {
  name: 'MuiDialog',
  slot: 'Paper',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.paper, styles[`scrollPaper${capitalize(ownerState.scroll)}`], styles[`paperWidth${capitalize(String(ownerState.maxWidth))}`], ownerState.fullWidth && styles.paperFullWidth, ownerState.fullScreen && styles.paperFullScreen];
  }
})(memoTheme(({
  theme
}) => ({
  margin: 32,
  position: 'relative',
  overflowY: 'auto',
  '@media print': {
    overflowY: 'visible',
    boxShadow: 'none'
  },
  variants: [{
    props: {
      scroll: 'paper'
    },
    style: {
      display: 'flex',
      flexDirection: 'column',
      maxHeight: 'calc(100% - 64px)'
    }
  }, {
    props: {
      scroll: 'body'
    },
    style: {
      display: 'inline-block',
      verticalAlign: 'middle',
      textAlign: 'initial'
    }
  }, {
    props: ({
      ownerState
    }) => !ownerState.maxWidth,
    style: {
      maxWidth: 'calc(100% - 64px)'
    }
  }, {
    props: {
      maxWidth: 'xs'
    },
    style: {
      maxWidth: theme.breakpoints.unit === 'px' ? Math.max(theme.breakpoints.values.xs, 444) : `max(${theme.breakpoints.values.xs}${theme.breakpoints.unit}, 444px)`,
      [`&.${dialogClasses$1.paperScrollBody}`]: {
        [theme.breakpoints.down(Math.max(theme.breakpoints.values.xs, 444) + 32 * 2)]: {
          maxWidth: 'calc(100% - 64px)'
        }
      }
    }
  }, ...Object.keys(theme.breakpoints.values).filter(maxWidth => maxWidth !== 'xs').map(maxWidth => ({
    props: {
      maxWidth
    },
    style: {
      maxWidth: `${theme.breakpoints.values[maxWidth]}${theme.breakpoints.unit}`,
      [`&.${dialogClasses$1.paperScrollBody}`]: {
        [theme.breakpoints.down(theme.breakpoints.values[maxWidth] + 32 * 2)]: {
          maxWidth: 'calc(100% - 64px)'
        }
      }
    }
  })), {
    props: ({
      ownerState
    }) => ownerState.fullWidth,
    style: {
      width: 'calc(100% - 64px)'
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.fullScreen,
    style: {
      margin: 0,
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: 'none',
      borderRadius: 0,
      [`&.${dialogClasses$1.paperScrollBody}`]: {
        margin: 0,
        maxWidth: '100%'
      }
    }
  }]
})));

/**
 * Dialogs are overlaid modal paper based components with a backdrop.
 */
const Dialog = /*#__PURE__*/reactExports.forwardRef(function Dialog(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiDialog'
  });
  const theme = useTheme$1();
  const defaultTransitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };
  const {
    'aria-describedby': ariaDescribedby,
    'aria-labelledby': ariaLabelledbyProp,
    'aria-modal': ariaModal = true,
    BackdropComponent,
    BackdropProps,
    children,
    className,
    disableEscapeKeyDown = false,
    fullScreen = false,
    fullWidth = false,
    maxWidth = 'sm',
    onClick,
    onClose,
    open,
    PaperComponent = Paper,
    PaperProps = {},
    scroll = 'paper',
    slots = {},
    slotProps = {},
    TransitionComponent = Fade,
    transitionDuration = defaultTransitionDuration,
    TransitionProps,
    ...other
  } = props;
  const ownerState = {
    ...props,
    disableEscapeKeyDown,
    fullScreen,
    fullWidth,
    maxWidth,
    scroll
  };
  const classes = useUtilityClasses$6(ownerState);
  const backdropClick = reactExports.useRef();
  const handleMouseDown = event => {
    // We don't want to close the dialog when clicking the dialog content.
    // Make sure the event starts and ends on the same DOM element.
    backdropClick.current = event.target === event.currentTarget;
  };
  const handleBackdropClick = event => {
    if (onClick) {
      onClick(event);
    }

    // Ignore the events not coming from the "backdrop".
    if (!backdropClick.current) {
      return;
    }
    backdropClick.current = null;
    if (onClose) {
      onClose(event, 'backdropClick');
    }
  };
  const ariaLabelledby = useId(ariaLabelledbyProp);
  const dialogContextValue = reactExports.useMemo(() => {
    return {
      titleId: ariaLabelledby
    };
  }, [ariaLabelledby]);
  const backwardCompatibleSlots = {
    transition: TransitionComponent,
    ...slots
  };
  const backwardCompatibleSlotProps = {
    transition: TransitionProps,
    paper: PaperProps,
    backdrop: BackdropProps,
    ...slotProps
  };
  const externalForwardedProps = {
    slots: backwardCompatibleSlots,
    slotProps: backwardCompatibleSlotProps
  };
  const [RootSlot, rootSlotProps] = useSlot('root', {
    elementType: DialogRoot,
    shouldForwardComponentProp: true,
    externalForwardedProps,
    ownerState,
    className: clsx(classes.root, className),
    ref
  });
  const [BackdropSlot, backdropSlotProps] = useSlot('backdrop', {
    elementType: DialogBackdrop,
    shouldForwardComponentProp: true,
    externalForwardedProps,
    ownerState,
    className: classes.backdrop
  });
  const [PaperSlot, paperSlotProps] = useSlot('paper', {
    elementType: DialogPaper,
    shouldForwardComponentProp: true,
    externalForwardedProps,
    ownerState,
    className: clsx(classes.paper, PaperProps.className)
  });
  const [ContainerSlot, containerSlotProps] = useSlot('container', {
    elementType: DialogContainer,
    externalForwardedProps,
    ownerState,
    className: classes.container
  });
  const [TransitionSlot, transitionSlotProps] = useSlot('transition', {
    elementType: Fade,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      appear: true,
      in: open,
      timeout: transitionDuration,
      role: 'presentation'
    }
  });
  return /*#__PURE__*/jsxRuntimeExports.jsx(RootSlot, {
    closeAfterTransition: true,
    slots: {
      backdrop: BackdropSlot
    },
    slotProps: {
      backdrop: {
        transitionDuration,
        as: BackdropComponent,
        ...backdropSlotProps
      }
    },
    disableEscapeKeyDown: disableEscapeKeyDown,
    onClose: onClose,
    open: open,
    onClick: handleBackdropClick,
    ...rootSlotProps,
    ...other,
    children: /*#__PURE__*/jsxRuntimeExports.jsx(TransitionSlot, {
      ...transitionSlotProps,
      children: /*#__PURE__*/jsxRuntimeExports.jsx(ContainerSlot, {
        onMouseDown: handleMouseDown,
        ...containerSlotProps,
        children: /*#__PURE__*/jsxRuntimeExports.jsx(PaperSlot, {
          as: PaperComponent,
          elevation: 24,
          role: "dialog",
          "aria-describedby": ariaDescribedby,
          "aria-labelledby": ariaLabelledby,
          "aria-modal": ariaModal,
          ...paperSlotProps,
          children: /*#__PURE__*/jsxRuntimeExports.jsx(DialogContext$1.Provider, {
            value: dialogContextValue,
            children: children
          })
        })
      })
    })
  });
});
var Dialog$1 = Dialog;

function getDialogActionsUtilityClass(slot) {
  return generateUtilityClass('MuiDialogActions', slot);
}
generateUtilityClasses('MuiDialogActions', ['root', 'spacing']);

const useUtilityClasses$5 = ownerState => {
  const {
    classes,
    disableSpacing
  } = ownerState;
  const slots = {
    root: ['root', !disableSpacing && 'spacing']
  };
  return composeClasses(slots, getDialogActionsUtilityClass, classes);
};
const DialogActionsRoot = styled$1('div', {
  name: 'MuiDialogActions',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, !ownerState.disableSpacing && styles.spacing];
  }
})({
  display: 'flex',
  alignItems: 'center',
  padding: 8,
  justifyContent: 'flex-end',
  flex: '0 0 auto',
  variants: [{
    props: ({
      ownerState
    }) => !ownerState.disableSpacing,
    style: {
      '& > :not(style) ~ :not(style)': {
        marginLeft: 8
      }
    }
  }]
});
const DialogActions = /*#__PURE__*/reactExports.forwardRef(function DialogActions(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiDialogActions'
  });
  const {
    className,
    disableSpacing = false,
    ...other
  } = props;
  const ownerState = {
    ...props,
    disableSpacing
  };
  const classes = useUtilityClasses$5(ownerState);
  return /*#__PURE__*/jsxRuntimeExports.jsx(DialogActionsRoot, {
    className: clsx(classes.root, className),
    ownerState: ownerState,
    ref: ref,
    ...other
  });
});
var DialogActions$1 = DialogActions;

function getDialogContentUtilityClass(slot) {
  return generateUtilityClass('MuiDialogContent', slot);
}
generateUtilityClasses('MuiDialogContent', ['root', 'dividers']);

function getDialogTitleUtilityClass(slot) {
  return generateUtilityClass('MuiDialogTitle', slot);
}
const dialogTitleClasses = generateUtilityClasses('MuiDialogTitle', ['root']);
var dialogTitleClasses$1 = dialogTitleClasses;

const useUtilityClasses$4 = ownerState => {
  const {
    classes,
    dividers
  } = ownerState;
  const slots = {
    root: ['root', dividers && 'dividers']
  };
  return composeClasses(slots, getDialogContentUtilityClass, classes);
};
const DialogContentRoot = styled$1('div', {
  name: 'MuiDialogContent',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.dividers && styles.dividers];
  }
})(memoTheme(({
  theme
}) => ({
  flex: '1 1 auto',
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: 'touch',
  overflowY: 'auto',
  padding: '20px 24px',
  variants: [{
    props: ({
      ownerState
    }) => ownerState.dividers,
    style: {
      padding: '16px 24px',
      borderTop: `1px solid ${(theme.vars || theme).palette.divider}`,
      borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`
    }
  }, {
    props: ({
      ownerState
    }) => !ownerState.dividers,
    style: {
      [`.${dialogTitleClasses$1.root} + &`]: {
        paddingTop: 0
      }
    }
  }]
})));
const DialogContent = /*#__PURE__*/reactExports.forwardRef(function DialogContent(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiDialogContent'
  });
  const {
    className,
    dividers = false,
    ...other
  } = props;
  const ownerState = {
    ...props,
    dividers
  };
  const classes = useUtilityClasses$4(ownerState);
  return /*#__PURE__*/jsxRuntimeExports.jsx(DialogContentRoot, {
    className: clsx(classes.root, className),
    ownerState: ownerState,
    ref: ref,
    ...other
  });
});
var DialogContent$1 = DialogContent;

const useUtilityClasses$3 = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root']
  };
  return composeClasses(slots, getDialogTitleUtilityClass, classes);
};
const DialogTitleRoot = styled$1(Typography, {
  name: 'MuiDialogTitle',
  slot: 'Root'
})({
  padding: '16px 24px',
  flex: '0 0 auto'
});
const DialogTitle = /*#__PURE__*/reactExports.forwardRef(function DialogTitle(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiDialogTitle'
  });
  const {
    className,
    id: idProp,
    ...other
  } = props;
  const ownerState = props;
  const classes = useUtilityClasses$3(ownerState);
  const {
    titleId = idProp
  } = reactExports.useContext(DialogContext$1);
  return /*#__PURE__*/jsxRuntimeExports.jsx(DialogTitleRoot, {
    component: "h2",
    className: clsx(classes.root, className),
    ownerState: ownerState,
    ref: ref,
    variant: "h6",
    id: idProp ?? titleId,
    ...other
  });
});
var DialogTitle$1 = DialogTitle;

function getLinearProgressUtilityClass(slot) {
  return generateUtilityClass('MuiLinearProgress', slot);
}
generateUtilityClasses('MuiLinearProgress', ['root', 'colorPrimary', 'colorSecondary', 'determinate', 'indeterminate', 'buffer', 'query', 'dashed', 'dashedColorPrimary', 'dashedColorSecondary', 'bar', 'bar1', 'bar2', 'barColorPrimary', 'barColorSecondary', 'bar1Indeterminate', 'bar1Determinate', 'bar1Buffer', 'bar2Indeterminate', 'bar2Buffer']);

const TRANSITION_DURATION = 4; // seconds
const indeterminate1Keyframe = keyframes`
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
`;

// This implementation is for supporting both Styled-components v4+ and Pigment CSS.
// A global animation has to be created here for Styled-components v4+ (https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#12).
// which can be done by checking typeof indeterminate1Keyframe !== 'string' (at runtime, Pigment CSS transform keyframes`` to a string).
const indeterminate1Animation = typeof indeterminate1Keyframe !== 'string' ? css`
        animation: ${indeterminate1Keyframe} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
      ` : null;
const indeterminate2Keyframe = keyframes`
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
`;
const indeterminate2Animation = typeof indeterminate2Keyframe !== 'string' ? css`
        animation: ${indeterminate2Keyframe} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
      ` : null;
const bufferKeyframe = keyframes`
  0% {
    opacity: 1;
    background-position: 0 -23px;
  }

  60% {
    opacity: 0;
    background-position: 0 -23px;
  }

  100% {
    opacity: 1;
    background-position: -200px -23px;
  }
`;
const bufferAnimation = typeof bufferKeyframe !== 'string' ? css`
        animation: ${bufferKeyframe} 3s infinite linear;
      ` : null;
const useUtilityClasses$2 = ownerState => {
  const {
    classes,
    variant,
    color
  } = ownerState;
  const slots = {
    root: ['root', `color${capitalize(color)}`, variant],
    dashed: ['dashed', `dashedColor${capitalize(color)}`],
    bar1: ['bar', 'bar1', `barColor${capitalize(color)}`, (variant === 'indeterminate' || variant === 'query') && 'bar1Indeterminate', variant === 'determinate' && 'bar1Determinate', variant === 'buffer' && 'bar1Buffer'],
    bar2: ['bar', 'bar2', variant !== 'buffer' && `barColor${capitalize(color)}`, variant === 'buffer' && `color${capitalize(color)}`, (variant === 'indeterminate' || variant === 'query') && 'bar2Indeterminate', variant === 'buffer' && 'bar2Buffer']
  };
  return composeClasses(slots, getLinearProgressUtilityClass, classes);
};
const getColorShade = (theme, color) => {
  if (theme.vars) {
    return theme.vars.palette.LinearProgress[`${color}Bg`];
  }
  return theme.palette.mode === 'light' ? theme.lighten(theme.palette[color].main, 0.62) : theme.darken(theme.palette[color].main, 0.5);
};
const LinearProgressRoot = styled$1('span', {
  name: 'MuiLinearProgress',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[`color${capitalize(ownerState.color)}`], styles[ownerState.variant]];
  }
})(memoTheme(({
  theme
}) => ({
  position: 'relative',
  overflow: 'hidden',
  display: 'block',
  height: 4,
  // Fix Safari's bug during composition of different paint.
  zIndex: 0,
  '@media print': {
    colorAdjust: 'exact'
  },
  variants: [...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
    props: {
      color
    },
    style: {
      backgroundColor: getColorShade(theme, color)
    }
  })), {
    props: ({
      ownerState
    }) => ownerState.color === 'inherit' && ownerState.variant !== 'buffer',
    style: {
      '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'currentColor',
        opacity: 0.3
      }
    }
  }, {
    props: {
      variant: 'buffer'
    },
    style: {
      backgroundColor: 'transparent'
    }
  }, {
    props: {
      variant: 'query'
    },
    style: {
      transform: 'rotate(180deg)'
    }
  }]
})));
const LinearProgressDashed = styled$1('span', {
  name: 'MuiLinearProgress',
  slot: 'Dashed',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.dashed, styles[`dashedColor${capitalize(ownerState.color)}`]];
  }
})(memoTheme(({
  theme
}) => ({
  position: 'absolute',
  marginTop: 0,
  height: '100%',
  width: '100%',
  backgroundSize: '10px 10px',
  backgroundPosition: '0 -23px',
  variants: [{
    props: {
      color: 'inherit'
    },
    style: {
      opacity: 0.3,
      backgroundImage: `radial-gradient(currentColor 0%, currentColor 16%, transparent 42%)`
    }
  }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => {
    const backgroundColor = getColorShade(theme, color);
    return {
      props: {
        color
      },
      style: {
        backgroundImage: `radial-gradient(${backgroundColor} 0%, ${backgroundColor} 16%, transparent 42%)`
      }
    };
  })]
})), bufferAnimation || {
  // At runtime for Pigment CSS, `bufferAnimation` will be null and the generated keyframe will be used.
  animation: `${bufferKeyframe} 3s infinite linear`
});
const LinearProgressBar1 = styled$1('span', {
  name: 'MuiLinearProgress',
  slot: 'Bar1',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.bar, styles.bar1, styles[`barColor${capitalize(ownerState.color)}`], (ownerState.variant === 'indeterminate' || ownerState.variant === 'query') && styles.bar1Indeterminate, ownerState.variant === 'determinate' && styles.bar1Determinate, ownerState.variant === 'buffer' && styles.bar1Buffer];
  }
})(memoTheme(({
  theme
}) => ({
  width: '100%',
  position: 'absolute',
  left: 0,
  bottom: 0,
  top: 0,
  transition: 'transform 0.2s linear',
  transformOrigin: 'left',
  variants: [{
    props: {
      color: 'inherit'
    },
    style: {
      backgroundColor: 'currentColor'
    }
  }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
    props: {
      color
    },
    style: {
      backgroundColor: (theme.vars || theme).palette[color].main
    }
  })), {
    props: {
      variant: 'determinate'
    },
    style: {
      transition: `transform .${TRANSITION_DURATION}s linear`
    }
  }, {
    props: {
      variant: 'buffer'
    },
    style: {
      zIndex: 1,
      transition: `transform .${TRANSITION_DURATION}s linear`
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.variant === 'indeterminate' || ownerState.variant === 'query',
    style: {
      width: 'auto'
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.variant === 'indeterminate' || ownerState.variant === 'query',
    style: indeterminate1Animation || {
      animation: `${indeterminate1Keyframe} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite`
    }
  }]
})));
const LinearProgressBar2 = styled$1('span', {
  name: 'MuiLinearProgress',
  slot: 'Bar2',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.bar, styles.bar2, styles[`barColor${capitalize(ownerState.color)}`], (ownerState.variant === 'indeterminate' || ownerState.variant === 'query') && styles.bar2Indeterminate, ownerState.variant === 'buffer' && styles.bar2Buffer];
  }
})(memoTheme(({
  theme
}) => ({
  width: '100%',
  position: 'absolute',
  left: 0,
  bottom: 0,
  top: 0,
  transition: 'transform 0.2s linear',
  transformOrigin: 'left',
  variants: [...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
    props: {
      color
    },
    style: {
      '--LinearProgressBar2-barColor': (theme.vars || theme).palette[color].main
    }
  })), {
    props: ({
      ownerState
    }) => ownerState.variant !== 'buffer' && ownerState.color !== 'inherit',
    style: {
      backgroundColor: 'var(--LinearProgressBar2-barColor, currentColor)'
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.variant !== 'buffer' && ownerState.color === 'inherit',
    style: {
      backgroundColor: 'currentColor'
    }
  }, {
    props: {
      color: 'inherit'
    },
    style: {
      opacity: 0.3
    }
  }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
    props: {
      color,
      variant: 'buffer'
    },
    style: {
      backgroundColor: getColorShade(theme, color),
      transition: `transform .${TRANSITION_DURATION}s linear`
    }
  })), {
    props: ({
      ownerState
    }) => ownerState.variant === 'indeterminate' || ownerState.variant === 'query',
    style: {
      width: 'auto'
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.variant === 'indeterminate' || ownerState.variant === 'query',
    style: indeterminate2Animation || {
      animation: `${indeterminate2Keyframe} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite`
    }
  }]
})));

/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 */
const LinearProgress = /*#__PURE__*/reactExports.forwardRef(function LinearProgress(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiLinearProgress'
  });
  const {
    className,
    color = 'primary',
    value,
    valueBuffer,
    variant = 'indeterminate',
    ...other
  } = props;
  const ownerState = {
    ...props,
    color,
    variant
  };
  const classes = useUtilityClasses$2(ownerState);
  const isRtl = useRtl();
  const rootProps = {};
  const inlineStyles = {
    bar1: {},
    bar2: {}
  };
  if (variant === 'determinate' || variant === 'buffer') {
    if (value !== undefined) {
      rootProps['aria-valuenow'] = Math.round(value);
      rootProps['aria-valuemin'] = 0;
      rootProps['aria-valuemax'] = 100;
      let transform = value - 100;
      if (isRtl) {
        transform = -transform;
      }
      inlineStyles.bar1.transform = `translateX(${transform}%)`;
    }
  }
  if (variant === 'buffer') {
    if (valueBuffer !== undefined) {
      let transform = (valueBuffer || 0) - 100;
      if (isRtl) {
        transform = -transform;
      }
      inlineStyles.bar2.transform = `translateX(${transform}%)`;
    }
  }
  return /*#__PURE__*/jsxRuntimeExports.jsxs(LinearProgressRoot, {
    className: clsx(classes.root, className),
    ownerState: ownerState,
    role: "progressbar",
    ...rootProps,
    ref: ref,
    ...other,
    children: [variant === 'buffer' ? /*#__PURE__*/jsxRuntimeExports.jsx(LinearProgressDashed, {
      className: classes.dashed,
      ownerState: ownerState
    }) : null, /*#__PURE__*/jsxRuntimeExports.jsx(LinearProgressBar1, {
      className: classes.bar1,
      ownerState: ownerState,
      style: inlineStyles.bar1
    }), variant === 'determinate' ? null : /*#__PURE__*/jsxRuntimeExports.jsx(LinearProgressBar2, {
      className: classes.bar2,
      ownerState: ownerState,
      style: inlineStyles.bar2
    })]
  });
});
var LinearProgress$1 = LinearProgress;

function useSnackbar(parameters = {}) {
  const {
    autoHideDuration = null,
    disableWindowBlurListener = false,
    onClose,
    open,
    resumeHideDuration
  } = parameters;
  const timerAutoHide = useTimeout();
  reactExports.useEffect(() => {
    if (!open) {
      return undefined;
    }

    /**
     * @param {KeyboardEvent} nativeEvent
     */
    function handleKeyDown(nativeEvent) {
      if (!nativeEvent.defaultPrevented) {
        if (nativeEvent.key === 'Escape') {
          // not calling `preventDefault` since we don't know if people may ignore this event e.g. a permanently open snackbar
          onClose?.(nativeEvent, 'escapeKeyDown');
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);
  const handleClose = useEventCallback((event, reason) => {
    onClose?.(event, reason);
  });
  const setAutoHideTimer = useEventCallback(autoHideDurationParam => {
    if (!onClose || autoHideDurationParam == null) {
      return;
    }
    timerAutoHide.start(autoHideDurationParam, () => {
      handleClose(null, 'timeout');
    });
  });
  reactExports.useEffect(() => {
    if (open) {
      setAutoHideTimer(autoHideDuration);
    }
    return timerAutoHide.clear;
  }, [open, autoHideDuration, setAutoHideTimer, timerAutoHide]);
  const handleClickAway = event => {
    onClose?.(event, 'clickaway');
  };

  // Pause the timer when the user is interacting with the Snackbar
  // or when the user hide the window.
  const handlePause = timerAutoHide.clear;

  // Restart the timer when the user is no longer interacting with the Snackbar
  // or when the window is shown back.
  const handleResume = reactExports.useCallback(() => {
    if (autoHideDuration != null) {
      setAutoHideTimer(resumeHideDuration != null ? resumeHideDuration : autoHideDuration * 0.5);
    }
  }, [autoHideDuration, resumeHideDuration, setAutoHideTimer]);
  const createHandleBlur = otherHandlers => event => {
    const onBlurCallback = otherHandlers.onBlur;
    onBlurCallback?.(event);
    handleResume();
  };
  const createHandleFocus = otherHandlers => event => {
    const onFocusCallback = otherHandlers.onFocus;
    onFocusCallback?.(event);
    handlePause();
  };
  const createMouseEnter = otherHandlers => event => {
    const onMouseEnterCallback = otherHandlers.onMouseEnter;
    onMouseEnterCallback?.(event);
    handlePause();
  };
  const createMouseLeave = otherHandlers => event => {
    const onMouseLeaveCallback = otherHandlers.onMouseLeave;
    onMouseLeaveCallback?.(event);
    handleResume();
  };
  reactExports.useEffect(() => {
    // TODO: window global should be refactored here
    if (!disableWindowBlurListener && open) {
      window.addEventListener('focus', handleResume);
      window.addEventListener('blur', handlePause);
      return () => {
        window.removeEventListener('focus', handleResume);
        window.removeEventListener('blur', handlePause);
      };
    }
    return undefined;
  }, [disableWindowBlurListener, open, handleResume, handlePause]);
  const getRootProps = (externalProps = {}) => {
    const externalEventHandlers = {
      ...extractEventHandlers(parameters),
      ...extractEventHandlers(externalProps)
    };
    return {
      // ClickAwayListener adds an `onClick` prop which results in the alert not being announced.
      // See https://github.com/mui/material-ui/issues/29080
      role: 'presentation',
      ...externalProps,
      ...externalEventHandlers,
      onBlur: createHandleBlur(externalEventHandlers),
      onFocus: createHandleFocus(externalEventHandlers),
      onMouseEnter: createMouseEnter(externalEventHandlers),
      onMouseLeave: createMouseLeave(externalEventHandlers)
    };
  };
  return {
    getRootProps,
    onClickAway: handleClickAway
  };
}

function getSnackbarContentUtilityClass(slot) {
  return generateUtilityClass('MuiSnackbarContent', slot);
}
generateUtilityClasses('MuiSnackbarContent', ['root', 'message', 'action']);

const useUtilityClasses$1 = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    action: ['action'],
    message: ['message']
  };
  return composeClasses(slots, getSnackbarContentUtilityClass, classes);
};
const SnackbarContentRoot = styled$1(Paper, {
  name: 'MuiSnackbarContent',
  slot: 'Root'
})(memoTheme(({
  theme
}) => {
  const emphasis = theme.palette.mode === 'light' ? 0.8 : 0.98;
  return {
    ...theme.typography.body2,
    color: theme.vars ? theme.vars.palette.SnackbarContent.color : theme.palette.getContrastText(emphasize(theme.palette.background.default, emphasis)),
    backgroundColor: theme.vars ? theme.vars.palette.SnackbarContent.bg : emphasize(theme.palette.background.default, emphasis),
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '6px 16px',
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      flexGrow: 'initial',
      minWidth: 288
    }
  };
}));
const SnackbarContentMessage = styled$1('div', {
  name: 'MuiSnackbarContent',
  slot: 'Message'
})({
  padding: '8px 0'
});
const SnackbarContentAction = styled$1('div', {
  name: 'MuiSnackbarContent',
  slot: 'Action'
})({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
  paddingLeft: 16,
  marginRight: -8
});
const SnackbarContent = /*#__PURE__*/reactExports.forwardRef(function SnackbarContent(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiSnackbarContent'
  });
  const {
    action,
    className,
    message,
    role = 'alert',
    ...other
  } = props;
  const ownerState = props;
  const classes = useUtilityClasses$1(ownerState);
  return /*#__PURE__*/jsxRuntimeExports.jsxs(SnackbarContentRoot, {
    role: role,
    elevation: 6,
    className: clsx(classes.root, className),
    ownerState: ownerState,
    ref: ref,
    ...other,
    children: [/*#__PURE__*/jsxRuntimeExports.jsx(SnackbarContentMessage, {
      className: classes.message,
      ownerState: ownerState,
      children: message
    }), action ? /*#__PURE__*/jsxRuntimeExports.jsx(SnackbarContentAction, {
      className: classes.action,
      ownerState: ownerState,
      children: action
    }) : null]
  });
});
var SnackbarContent$1 = SnackbarContent;

function getSnackbarUtilityClass(slot) {
  return generateUtilityClass('MuiSnackbar', slot);
}
generateUtilityClasses('MuiSnackbar', ['root', 'anchorOriginTopCenter', 'anchorOriginBottomCenter', 'anchorOriginTopRight', 'anchorOriginBottomRight', 'anchorOriginTopLeft', 'anchorOriginBottomLeft']);

const useUtilityClasses = ownerState => {
  const {
    classes,
    anchorOrigin
  } = ownerState;
  const slots = {
    root: ['root', `anchorOrigin${capitalize(anchorOrigin.vertical)}${capitalize(anchorOrigin.horizontal)}`]
  };
  return composeClasses(slots, getSnackbarUtilityClass, classes);
};
const SnackbarRoot = styled$1('div', {
  name: 'MuiSnackbar',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[`anchorOrigin${capitalize(ownerState.anchorOrigin.vertical)}${capitalize(ownerState.anchorOrigin.horizontal)}`]];
  }
})(memoTheme(({
  theme
}) => ({
  zIndex: (theme.vars || theme).zIndex.snackbar,
  position: 'fixed',
  display: 'flex',
  left: 8,
  right: 8,
  justifyContent: 'center',
  alignItems: 'center',
  variants: [{
    props: ({
      ownerState
    }) => ownerState.anchorOrigin.vertical === 'top',
    style: {
      top: 8,
      [theme.breakpoints.up('sm')]: {
        top: 24
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.anchorOrigin.vertical !== 'top',
    style: {
      bottom: 8,
      [theme.breakpoints.up('sm')]: {
        bottom: 24
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.anchorOrigin.horizontal === 'left',
    style: {
      justifyContent: 'flex-start',
      [theme.breakpoints.up('sm')]: {
        left: 24,
        right: 'auto'
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.anchorOrigin.horizontal === 'right',
    style: {
      justifyContent: 'flex-end',
      [theme.breakpoints.up('sm')]: {
        right: 24,
        left: 'auto'
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.anchorOrigin.horizontal === 'center',
    style: {
      [theme.breakpoints.up('sm')]: {
        left: '50%',
        right: 'auto',
        transform: 'translateX(-50%)'
      }
    }
  }]
})));
const Snackbar = /*#__PURE__*/reactExports.forwardRef(function Snackbar(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiSnackbar'
  });
  const theme = useTheme$1();
  const defaultTransitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen
  };
  const {
    action,
    anchorOrigin: {
      vertical,
      horizontal
    } = {
      vertical: 'bottom',
      horizontal: 'left'
    },
    autoHideDuration = null,
    children,
    className,
    ClickAwayListenerProps: ClickAwayListenerPropsProp,
    ContentProps: ContentPropsProp,
    disableWindowBlurListener = false,
    message,
    onBlur,
    onClose,
    onFocus,
    onMouseEnter,
    onMouseLeave,
    open,
    resumeHideDuration,
    slots = {},
    slotProps = {},
    TransitionComponent: TransitionComponentProp,
    transitionDuration = defaultTransitionDuration,
    TransitionProps: {
      onEnter,
      onExited,
      ...TransitionPropsProp
    } = {},
    ...other
  } = props;
  const ownerState = {
    ...props,
    anchorOrigin: {
      vertical,
      horizontal
    },
    autoHideDuration,
    disableWindowBlurListener,
    TransitionComponent: TransitionComponentProp,
    transitionDuration
  };
  const classes = useUtilityClasses(ownerState);
  const {
    getRootProps,
    onClickAway
  } = useSnackbar(ownerState);
  const [exited, setExited] = reactExports.useState(true);
  const handleExited = node => {
    setExited(true);
    if (onExited) {
      onExited(node);
    }
  };
  const handleEnter = (node, isAppearing) => {
    setExited(false);
    if (onEnter) {
      onEnter(node, isAppearing);
    }
  };
  const externalForwardedProps = {
    slots: {
      transition: TransitionComponentProp,
      ...slots
    },
    slotProps: {
      content: ContentPropsProp,
      clickAwayListener: ClickAwayListenerPropsProp,
      transition: TransitionPropsProp,
      ...slotProps
    }
  };
  const [Root, rootProps] = useSlot('root', {
    ref,
    className: [classes.root, className],
    elementType: SnackbarRoot,
    getSlotProps: getRootProps,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other
    },
    ownerState
  });
  const [ClickAwaySlot, {
    ownerState: clickAwayOwnerStateProp,
    ...clickAwayListenerProps
  }] = useSlot('clickAwayListener', {
    elementType: ClickAwayListener,
    externalForwardedProps,
    getSlotProps: handlers => ({
      onClickAway: (...params) => {
        const event = params[0];
        handlers.onClickAway?.(...params);
        if (event?.defaultMuiPrevented) {
          return;
        }
        onClickAway(...params);
      }
    }),
    ownerState
  });
  const [ContentSlot, contentSlotProps] = useSlot('content', {
    elementType: SnackbarContent$1,
    shouldForwardComponentProp: true,
    externalForwardedProps,
    additionalProps: {
      message,
      action
    },
    ownerState
  });
  const [TransitionSlot, transitionProps] = useSlot('transition', {
    elementType: Grow,
    externalForwardedProps,
    getSlotProps: handlers => ({
      onEnter: (...params) => {
        handlers.onEnter?.(...params);
        handleEnter(...params);
      },
      onExited: (...params) => {
        handlers.onExited?.(...params);
        handleExited(...params);
      }
    }),
    additionalProps: {
      appear: true,
      in: open,
      timeout: transitionDuration,
      direction: vertical === 'top' ? 'down' : 'up'
    },
    ownerState
  });

  // So we only render active snackbars.
  if (!open && exited) {
    return null;
  }
  return /*#__PURE__*/jsxRuntimeExports.jsx(ClickAwaySlot, {
    ...clickAwayListenerProps,
    ...(slots.clickAwayListener && {
      ownerState: clickAwayOwnerStateProp
    }),
    children: /*#__PURE__*/jsxRuntimeExports.jsx(Root, {
      ...rootProps,
      children: /*#__PURE__*/jsxRuntimeExports.jsx(TransitionSlot, {
        ...transitionProps,
        children: children || /*#__PURE__*/jsxRuntimeExports.jsx(ContentSlot, {
          ...contentSlotProps
        })
      })
    })
  });
});
var Snackbar$1 = Snackbar;

const Stack = createStack({
  createStyledComponent: styled$1('div', {
    name: 'MuiStack',
    slot: 'Root'
  }),
  useThemeProps: inProps => useDefaultProps({
    props: inProps,
    name: 'MuiStack'
  })
});
var Stack$1 = Stack;

// src/utils/formatProdErrorMessage.ts
function formatProdErrorMessage$1(code) {
  return `Minified Redux error #${code}; visit https://redux.js.org/Errors?code=${code} for the full message or use the non-minified dev environment for full errors. `;
}

// src/utils/symbol-observable.ts
var $$observable = /* @__PURE__ */ (() => typeof Symbol === "function" && Symbol.observable || "@@observable")();
var symbol_observable_default = $$observable;

// src/utils/actionTypes.ts
var randomString = () => Math.random().toString(36).substring(7).split("").join(".");
var ActionTypes = {
  INIT: `@@redux/INIT${ randomString()}`,
  REPLACE: `@@redux/REPLACE${ randomString()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${randomString()}`
};
var actionTypes_default = ActionTypes;

// src/utils/isPlainObject.ts
function isPlainObject$1(obj) {
  if (typeof obj !== "object" || obj === null)
    return false;
  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto || Object.getPrototypeOf(obj) === null;
}

// src/createStore.ts
function createStore(reducer, preloadedState, enhancer) {
  if (typeof reducer !== "function") {
    throw new Error(formatProdErrorMessage$1(2) );
  }
  if (typeof preloadedState === "function" && typeof enhancer === "function" || typeof enhancer === "function" && typeof arguments[3] === "function") {
    throw new Error(formatProdErrorMessage$1(0) );
  }
  if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
    enhancer = preloadedState;
    preloadedState = void 0;
  }
  if (typeof enhancer !== "undefined") {
    if (typeof enhancer !== "function") {
      throw new Error(formatProdErrorMessage$1(1) );
    }
    return enhancer(createStore)(reducer, preloadedState);
  }
  let currentReducer = reducer;
  let currentState = preloadedState;
  let currentListeners = /* @__PURE__ */ new Map();
  let nextListeners = currentListeners;
  let listenerIdCounter = 0;
  let isDispatching = false;
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = /* @__PURE__ */ new Map();
      currentListeners.forEach((listener, key) => {
        nextListeners.set(key, listener);
      });
    }
  }
  function getState() {
    if (isDispatching) {
      throw new Error(formatProdErrorMessage$1(3) );
    }
    return currentState;
  }
  function subscribe(listener) {
    if (typeof listener !== "function") {
      throw new Error(formatProdErrorMessage$1(4) );
    }
    if (isDispatching) {
      throw new Error(formatProdErrorMessage$1(5) );
    }
    let isSubscribed = true;
    ensureCanMutateNextListeners();
    const listenerId = listenerIdCounter++;
    nextListeners.set(listenerId, listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }
      if (isDispatching) {
        throw new Error(formatProdErrorMessage$1(6) );
      }
      isSubscribed = false;
      ensureCanMutateNextListeners();
      nextListeners.delete(listenerId);
      currentListeners = null;
    };
  }
  function dispatch(action) {
    if (!isPlainObject$1(action)) {
      throw new Error(formatProdErrorMessage$1(7) );
    }
    if (typeof action.type === "undefined") {
      throw new Error(formatProdErrorMessage$1(8) );
    }
    if (typeof action.type !== "string") {
      throw new Error(formatProdErrorMessage$1(17) );
    }
    if (isDispatching) {
      throw new Error(formatProdErrorMessage$1(9) );
    }
    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }
    const listeners = currentListeners = nextListeners;
    listeners.forEach((listener) => {
      listener();
    });
    return action;
  }
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== "function") {
      throw new Error(formatProdErrorMessage$1(10) );
    }
    currentReducer = nextReducer;
    dispatch({
      type: actionTypes_default.REPLACE
    });
  }
  function observable() {
    const outerSubscribe = subscribe;
    return {
      /**
       * The minimal observable subscription method.
       * @param observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe(observer) {
        if (typeof observer !== "object" || observer === null) {
          throw new Error(formatProdErrorMessage$1(11) );
        }
        function observeState() {
          const observerAsObserver = observer;
          if (observerAsObserver.next) {
            observerAsObserver.next(getState());
          }
        }
        observeState();
        const unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe
        };
      },
      [symbol_observable_default]() {
        return this;
      }
    };
  }
  dispatch({
    type: actionTypes_default.INIT
  });
  const store = {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [symbol_observable_default]: observable
  };
  return store;
}
function assertReducerShape(reducers) {
  Object.keys(reducers).forEach((key) => {
    const reducer = reducers[key];
    const initialState = reducer(void 0, {
      type: actionTypes_default.INIT
    });
    if (typeof initialState === "undefined") {
      throw new Error(formatProdErrorMessage$1(12) );
    }
    if (typeof reducer(void 0, {
      type: actionTypes_default.PROBE_UNKNOWN_ACTION()
    }) === "undefined") {
      throw new Error(formatProdErrorMessage$1(13) );
    }
  });
}
function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);
  const finalReducers = {};
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i];
    if (typeof reducers[key] === "function") {
      finalReducers[key] = reducers[key];
    }
  }
  const finalReducerKeys = Object.keys(finalReducers);
  let shapeAssertionError;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }
  return function combination(state = {}, action) {
    if (shapeAssertionError) {
      throw shapeAssertionError;
    }
    let hasChanged = false;
    const nextState = {};
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i];
      const reducer = finalReducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === "undefined") {
        action && action.type;
        throw new Error(formatProdErrorMessage$1(14) );
      }
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}

// src/compose.ts
function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

// src/applyMiddleware.ts
function applyMiddleware(...middlewares) {
  return (createStore2) => (reducer, preloadedState) => {
    const store = createStore2(reducer, preloadedState);
    let dispatch = () => {
      throw new Error(formatProdErrorMessage$1(15) );
    };
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args)
    };
    const chain = middlewares.map((middleware) => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);
    return {
      ...store,
      dispatch
    };
  };
}

// src/utils/isAction.ts
function isAction(action) {
  return isPlainObject$1(action) && "type" in action && typeof action.type === "string";
}

// src/utils/env.ts
var NOTHING = Symbol.for("immer-nothing");
var DRAFTABLE = Symbol.for("immer-draftable");
var DRAFT_STATE = Symbol.for("immer-state");
function die(error, ...args) {
  throw new Error(
    `[Immer] minified error nr: ${error}. Full error at: https://bit.ly/3cXEKWf`
  );
}

// src/utils/common.ts
var O = Object;
var getPrototypeOf = O.getPrototypeOf;
var CONSTRUCTOR = "constructor";
var PROTOTYPE = "prototype";
var CONFIGURABLE = "configurable";
var ENUMERABLE = "enumerable";
var WRITABLE = "writable";
var VALUE = "value";
var isDraft = (value) => !!value && !!value[DRAFT_STATE];
function isDraftable(value) {
  if (!value)
    return false;
  return isPlainObject(value) || isArray(value) || !!value[DRAFTABLE] || !!value[CONSTRUCTOR]?.[DRAFTABLE] || isMap(value) || isSet(value);
}
var objectCtorString = O[PROTOTYPE][CONSTRUCTOR].toString();
var cachedCtorStrings = /* @__PURE__ */ new WeakMap();
function isPlainObject(value) {
  if (!value || !isObjectish(value))
    return false;
  const proto = getPrototypeOf(value);
  if (proto === null || proto === O[PROTOTYPE])
    return true;
  const Ctor = O.hasOwnProperty.call(proto, CONSTRUCTOR) && proto[CONSTRUCTOR];
  if (Ctor === Object)
    return true;
  if (!isFunction(Ctor))
    return false;
  let ctorString = cachedCtorStrings.get(Ctor);
  if (ctorString === void 0) {
    ctorString = Function.toString.call(Ctor);
    cachedCtorStrings.set(Ctor, ctorString);
  }
  return ctorString === objectCtorString;
}
function each(obj, iter, strict = true) {
  if (getArchtype(obj) === 0 /* Object */) {
    const keys = strict ? Reflect.ownKeys(obj) : O.keys(obj);
    keys.forEach((key) => {
      iter(key, obj[key], obj);
    });
  } else {
    obj.forEach((entry, index) => iter(index, entry, obj));
  }
}
function getArchtype(thing) {
  const state = thing[DRAFT_STATE];
  return state ? state.type_ : isArray(thing) ? 1 /* Array */ : isMap(thing) ? 2 /* Map */ : isSet(thing) ? 3 /* Set */ : 0 /* Object */;
}
var has = (thing, prop, type = getArchtype(thing)) => type === 2 /* Map */ ? thing.has(prop) : O[PROTOTYPE].hasOwnProperty.call(thing, prop);
var get = (thing, prop, type = getArchtype(thing)) => (
  // @ts-ignore
  type === 2 /* Map */ ? thing.get(prop) : thing[prop]
);
var set = (thing, propOrOldValue, value, type = getArchtype(thing)) => {
  if (type === 2 /* Map */)
    thing.set(propOrOldValue, value);
  else if (type === 3 /* Set */) {
    thing.add(value);
  } else
    thing[propOrOldValue] = value;
};
function is(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}
var isArray = Array.isArray;
var isMap = (target) => target instanceof Map;
var isSet = (target) => target instanceof Set;
var isObjectish = (target) => typeof target === "object";
var isFunction = (target) => typeof target === "function";
var isBoolean$1 = (target) => typeof target === "boolean";
function isArrayIndex(value) {
  const n = +value;
  return Number.isInteger(n) && String(n) === value;
}
var latest = (state) => state.copy_ || state.base_;
var getFinalValue = (state) => state.modified_ ? state.copy_ : state.base_;
function shallowCopy(base, strict) {
  if (isMap(base)) {
    return new Map(base);
  }
  if (isSet(base)) {
    return new Set(base);
  }
  if (isArray(base))
    return Array[PROTOTYPE].slice.call(base);
  const isPlain = isPlainObject(base);
  if (strict === true || strict === "class_only" && !isPlain) {
    const descriptors = O.getOwnPropertyDescriptors(base);
    delete descriptors[DRAFT_STATE];
    let keys = Reflect.ownKeys(descriptors);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const desc = descriptors[key];
      if (desc[WRITABLE] === false) {
        desc[WRITABLE] = true;
        desc[CONFIGURABLE] = true;
      }
      if (desc.get || desc.set)
        descriptors[key] = {
          [CONFIGURABLE]: true,
          [WRITABLE]: true,
          // could live with !!desc.set as well here...
          [ENUMERABLE]: desc[ENUMERABLE],
          [VALUE]: base[key]
        };
    }
    return O.create(getPrototypeOf(base), descriptors);
  } else {
    const proto = getPrototypeOf(base);
    if (proto !== null && isPlain) {
      return { ...base };
    }
    const obj = O.create(proto);
    return O.assign(obj, base);
  }
}
function freeze(obj, deep = false) {
  if (isFrozen(obj) || isDraft(obj) || !isDraftable(obj))
    return obj;
  if (getArchtype(obj) > 1) {
    O.defineProperties(obj, {
      set: dontMutateMethodOverride,
      add: dontMutateMethodOverride,
      clear: dontMutateMethodOverride,
      delete: dontMutateMethodOverride
    });
  }
  O.freeze(obj);
  if (deep)
    each(
      obj,
      (_key, value) => {
        freeze(value, true);
      },
      false
    );
  return obj;
}
function dontMutateFrozenCollections() {
  die(2);
}
var dontMutateMethodOverride = {
  [VALUE]: dontMutateFrozenCollections
};
function isFrozen(obj) {
  if (obj === null || !isObjectish(obj))
    return true;
  return O.isFrozen(obj);
}

// src/utils/plugins.ts
var PluginMapSet = "MapSet";
var PluginPatches = "Patches";
var PluginArrayMethods = "ArrayMethods";
var plugins = {};
function getPlugin(pluginKey) {
  const plugin = plugins[pluginKey];
  if (!plugin) {
    die(0, pluginKey);
  }
  return plugin;
}
var isPluginLoaded = (pluginKey) => !!plugins[pluginKey];

// src/core/scope.ts
var currentScope;
var getCurrentScope = () => currentScope;
var createScope = (parent_, immer_) => ({
  drafts_: [],
  parent_,
  immer_,
  // Whenever the modified draft contains a draft from another scope, we
  // need to prevent auto-freezing so the unowned draft can be finalized.
  canAutoFreeze_: true,
  unfinalizedDrafts_: 0,
  handledSet_: /* @__PURE__ */ new Set(),
  processedForPatches_: /* @__PURE__ */ new Set(),
  mapSetPlugin_: isPluginLoaded(PluginMapSet) ? getPlugin(PluginMapSet) : void 0,
  arrayMethodsPlugin_: isPluginLoaded(PluginArrayMethods) ? getPlugin(PluginArrayMethods) : void 0
});
function usePatchesInScope(scope, patchListener) {
  if (patchListener) {
    scope.patchPlugin_ = getPlugin(PluginPatches);
    scope.patches_ = [];
    scope.inversePatches_ = [];
    scope.patchListener_ = patchListener;
  }
}
function revokeScope(scope) {
  leaveScope(scope);
  scope.drafts_.forEach(revokeDraft);
  scope.drafts_ = null;
}
function leaveScope(scope) {
  if (scope === currentScope) {
    currentScope = scope.parent_;
  }
}
var enterScope = (immer2) => currentScope = createScope(currentScope, immer2);
function revokeDraft(draft) {
  const state = draft[DRAFT_STATE];
  if (state.type_ === 0 /* Object */ || state.type_ === 1 /* Array */)
    state.revoke_();
  else
    state.revoked_ = true;
}

// src/core/finalize.ts
function processResult(result, scope) {
  scope.unfinalizedDrafts_ = scope.drafts_.length;
  const baseDraft = scope.drafts_[0];
  const isReplaced = result !== void 0 && result !== baseDraft;
  if (isReplaced) {
    if (baseDraft[DRAFT_STATE].modified_) {
      revokeScope(scope);
      die(4);
    }
    if (isDraftable(result)) {
      result = finalize(scope, result);
    }
    const { patchPlugin_ } = scope;
    if (patchPlugin_) {
      patchPlugin_.generateReplacementPatches_(
        baseDraft[DRAFT_STATE].base_,
        result,
        scope
      );
    }
  } else {
    result = finalize(scope, baseDraft);
  }
  maybeFreeze(scope, result, true);
  revokeScope(scope);
  if (scope.patches_) {
    scope.patchListener_(scope.patches_, scope.inversePatches_);
  }
  return result !== NOTHING ? result : void 0;
}
function finalize(rootScope, value) {
  if (isFrozen(value))
    return value;
  const state = value[DRAFT_STATE];
  if (!state) {
    const finalValue = handleValue(value, rootScope.handledSet_, rootScope);
    return finalValue;
  }
  if (!isSameScope(state, rootScope)) {
    return value;
  }
  if (!state.modified_) {
    return state.base_;
  }
  if (!state.finalized_) {
    const { callbacks_ } = state;
    if (callbacks_) {
      while (callbacks_.length > 0) {
        const callback = callbacks_.pop();
        callback(rootScope);
      }
    }
    generatePatchesAndFinalize(state, rootScope);
  }
  return state.copy_;
}
function maybeFreeze(scope, value, deep = false) {
  if (!scope.parent_ && scope.immer_.autoFreeze_ && scope.canAutoFreeze_) {
    freeze(value, deep);
  }
}
function markStateFinalized(state) {
  state.finalized_ = true;
  state.scope_.unfinalizedDrafts_--;
}
var isSameScope = (state, rootScope) => state.scope_ === rootScope;
var EMPTY_LOCATIONS_RESULT = [];
function updateDraftInParent(parent, draftValue, finalizedValue, originalKey) {
  const parentCopy = latest(parent);
  const parentType = parent.type_;
  if (originalKey !== void 0) {
    const currentValue = get(parentCopy, originalKey, parentType);
    if (currentValue === draftValue) {
      set(parentCopy, originalKey, finalizedValue, parentType);
      return;
    }
  }
  if (!parent.draftLocations_) {
    const draftLocations = parent.draftLocations_ = /* @__PURE__ */ new Map();
    each(parentCopy, (key, value) => {
      if (isDraft(value)) {
        const keys = draftLocations.get(value) || [];
        keys.push(key);
        draftLocations.set(value, keys);
      }
    });
  }
  const locations = parent.draftLocations_.get(draftValue) ?? EMPTY_LOCATIONS_RESULT;
  for (const location of locations) {
    set(parentCopy, location, finalizedValue, parentType);
  }
}
function registerChildFinalizationCallback(parent, child, key) {
  parent.callbacks_.push(function childCleanup(rootScope) {
    const state = child;
    if (!state || !isSameScope(state, rootScope)) {
      return;
    }
    rootScope.mapSetPlugin_?.fixSetContents(state);
    const finalizedValue = getFinalValue(state);
    updateDraftInParent(parent, state.draft_ ?? state, finalizedValue, key);
    generatePatchesAndFinalize(state, rootScope);
  });
}
function generatePatchesAndFinalize(state, rootScope) {
  const shouldFinalize = state.modified_ && !state.finalized_ && (state.type_ === 3 /* Set */ || state.type_ === 1 /* Array */ && state.allIndicesReassigned_ || (state.assigned_?.size ?? 0) > 0);
  if (shouldFinalize) {
    const { patchPlugin_ } = rootScope;
    if (patchPlugin_) {
      const basePath = patchPlugin_.getPath(state);
      if (basePath) {
        patchPlugin_.generatePatches_(state, basePath, rootScope);
      }
    }
    markStateFinalized(state);
  }
}
function handleCrossReference(target, key, value) {
  const { scope_ } = target;
  if (isDraft(value)) {
    const state = value[DRAFT_STATE];
    if (isSameScope(state, scope_)) {
      state.callbacks_.push(function crossReferenceCleanup() {
        prepareCopy(target);
        const finalizedValue = getFinalValue(state);
        updateDraftInParent(target, value, finalizedValue, key);
      });
    }
  } else if (isDraftable(value)) {
    target.callbacks_.push(function nestedDraftCleanup() {
      const targetCopy = latest(target);
      if (target.type_ === 3 /* Set */) {
        if (targetCopy.has(value)) {
          handleValue(value, scope_.handledSet_, scope_);
        }
      } else {
        if (get(targetCopy, key, target.type_) === value) {
          if (scope_.drafts_.length > 1 && (target.assigned_.get(key) ?? false) === true && target.copy_) {
            handleValue(
              get(target.copy_, key, target.type_),
              scope_.handledSet_,
              scope_
            );
          }
        }
      }
    });
  }
}
function handleValue(target, handledSet, rootScope) {
  if (!rootScope.immer_.autoFreeze_ && rootScope.unfinalizedDrafts_ < 1) {
    return target;
  }
  if (isDraft(target) || handledSet.has(target) || !isDraftable(target) || isFrozen(target)) {
    return target;
  }
  handledSet.add(target);
  each(target, (key, value) => {
    if (isDraft(value)) {
      const state = value[DRAFT_STATE];
      if (isSameScope(state, rootScope)) {
        const updatedValue = getFinalValue(state);
        set(target, key, updatedValue, target.type_);
        markStateFinalized(state);
      }
    } else if (isDraftable(value)) {
      handleValue(value, handledSet, rootScope);
    }
  });
  return target;
}

// src/core/proxy.ts
function createProxyProxy(base, parent) {
  const baseIsArray = isArray(base);
  const state = {
    type_: baseIsArray ? 1 /* Array */ : 0 /* Object */,
    // Track which produce call this is associated with.
    scope_: parent ? parent.scope_ : getCurrentScope(),
    // True for both shallow and deep changes.
    modified_: false,
    // Used during finalization.
    finalized_: false,
    // Track which properties have been assigned (true) or deleted (false).
    // actually instantiated in `prepareCopy()`
    assigned_: void 0,
    // The parent draft state.
    parent_: parent,
    // The base state.
    base_: base,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: false,
    // `callbacks` actually gets assigned in `createProxy`
    callbacks_: void 0
  };
  let target = state;
  let traps = objectTraps;
  if (baseIsArray) {
    target = [state];
    traps = arrayTraps;
  }
  const { revoke, proxy } = Proxy.revocable(target, traps);
  state.draft_ = proxy;
  state.revoke_ = revoke;
  return [proxy, state];
}
var objectTraps = {
  get(state, prop) {
    if (prop === DRAFT_STATE)
      return state;
    let arrayPlugin = state.scope_.arrayMethodsPlugin_;
    const isArrayWithStringProp = state.type_ === 1 /* Array */ && typeof prop === "string";
    if (isArrayWithStringProp) {
      if (arrayPlugin?.isArrayOperationMethod(prop)) {
        return arrayPlugin.createMethodInterceptor(state, prop);
      }
    }
    const source = latest(state);
    if (!has(source, prop, state.type_)) {
      return readPropFromProto(state, source, prop);
    }
    const value = source[prop];
    if (state.finalized_ || !isDraftable(value)) {
      return value;
    }
    if (isArrayWithStringProp && state.operationMethod && arrayPlugin?.isMutatingArrayMethod(
      state.operationMethod
    ) && isArrayIndex(prop)) {
      return value;
    }
    if (value === peek(state.base_, prop)) {
      prepareCopy(state);
      const childKey = state.type_ === 1 /* Array */ ? +prop : prop;
      const childDraft = createProxy(state.scope_, value, state, childKey);
      return state.copy_[childKey] = childDraft;
    }
    return value;
  },
  has(state, prop) {
    return prop in latest(state);
  },
  ownKeys(state) {
    return Reflect.ownKeys(latest(state));
  },
  set(state, prop, value) {
    const desc = getDescriptorFromProto(latest(state), prop);
    if (desc?.set) {
      desc.set.call(state.draft_, value);
      return true;
    }
    if (!state.modified_) {
      const current2 = peek(latest(state), prop);
      const currentState = current2?.[DRAFT_STATE];
      if (currentState && currentState.base_ === value) {
        state.copy_[prop] = value;
        state.assigned_.set(prop, false);
        return true;
      }
      if (is(value, current2) && (value !== void 0 || has(state.base_, prop, state.type_)))
        return true;
      prepareCopy(state);
      markChanged(state);
    }
    if (state.copy_[prop] === value && // special case: handle new props with value 'undefined'
    (value !== void 0 || prop in state.copy_) || // special case: NaN
    Number.isNaN(value) && Number.isNaN(state.copy_[prop]))
      return true;
    state.copy_[prop] = value;
    state.assigned_.set(prop, true);
    handleCrossReference(state, prop, value);
    return true;
  },
  deleteProperty(state, prop) {
    prepareCopy(state);
    if (peek(state.base_, prop) !== void 0 || prop in state.base_) {
      state.assigned_.set(prop, false);
      markChanged(state);
    } else {
      state.assigned_.delete(prop);
    }
    if (state.copy_) {
      delete state.copy_[prop];
    }
    return true;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(state, prop) {
    const owner = latest(state);
    const desc = Reflect.getOwnPropertyDescriptor(owner, prop);
    if (!desc)
      return desc;
    return {
      [WRITABLE]: true,
      [CONFIGURABLE]: state.type_ !== 1 /* Array */ || prop !== "length",
      [ENUMERABLE]: desc[ENUMERABLE],
      [VALUE]: owner[prop]
    };
  },
  defineProperty() {
    die(11);
  },
  getPrototypeOf(state) {
    return getPrototypeOf(state.base_);
  },
  setPrototypeOf() {
    die(12);
  }
};
var arrayTraps = {};
for (let key in objectTraps) {
  let fn = objectTraps[key];
  arrayTraps[key] = function() {
    const args = arguments;
    args[0] = args[0][0];
    return fn.apply(this, args);
  };
}
arrayTraps.deleteProperty = function(state, prop) {
  return arrayTraps.set.call(this, state, prop, void 0);
};
arrayTraps.set = function(state, prop, value) {
  return objectTraps.set.call(this, state[0], prop, value, state[0]);
};
function peek(draft, prop) {
  const state = draft[DRAFT_STATE];
  const source = state ? latest(state) : draft;
  return source[prop];
}
function readPropFromProto(state, source, prop) {
  const desc = getDescriptorFromProto(source, prop);
  return desc ? VALUE in desc ? desc[VALUE] : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    desc.get?.call(state.draft_)
  ) : void 0;
}
function getDescriptorFromProto(source, prop) {
  if (!(prop in source))
    return void 0;
  let proto = getPrototypeOf(source);
  while (proto) {
    const desc = Object.getOwnPropertyDescriptor(proto, prop);
    if (desc)
      return desc;
    proto = getPrototypeOf(proto);
  }
  return void 0;
}
function markChanged(state) {
  if (!state.modified_) {
    state.modified_ = true;
    if (state.parent_) {
      markChanged(state.parent_);
    }
  }
}
function prepareCopy(state) {
  if (!state.copy_) {
    state.assigned_ = /* @__PURE__ */ new Map();
    state.copy_ = shallowCopy(
      state.base_,
      state.scope_.immer_.useStrictShallowCopy_
    );
  }
}

// src/core/immerClass.ts
var Immer2 = class {
  constructor(config) {
    this.autoFreeze_ = true;
    this.useStrictShallowCopy_ = false;
    this.useStrictIteration_ = false;
    /**
     * The `produce` function takes a value and a "recipe function" (whose
     * return value often depends on the base state). The recipe function is
     * free to mutate its first argument however it wants. All mutations are
     * only ever applied to a __copy__ of the base state.
     *
     * Pass only a function to create a "curried producer" which relieves you
     * from passing the recipe function every time.
     *
     * Only plain objects and arrays are made mutable. All other objects are
     * considered uncopyable.
     *
     * Note: This function is __bound__ to its `Immer` instance.
     *
     * @param {any} base - the initial state
     * @param {Function} recipe - function that receives a proxy of the base state as first argument and which can be freely modified
     * @param {Function} patchListener - optional function that will be called with all the patches produced here
     * @returns {any} a new state, or the initial state if nothing was modified
     */
    this.produce = (base, recipe, patchListener) => {
      if (isFunction(base) && !isFunction(recipe)) {
        const defaultBase = recipe;
        recipe = base;
        const self = this;
        return function curriedProduce(base2 = defaultBase, ...args) {
          return self.produce(base2, (draft) => recipe.call(this, draft, ...args));
        };
      }
      if (!isFunction(recipe))
        die(6);
      if (patchListener !== void 0 && !isFunction(patchListener))
        die(7);
      let result;
      if (isDraftable(base)) {
        const scope = enterScope(this);
        const proxy = createProxy(scope, base, void 0);
        let hasError = true;
        try {
          result = recipe(proxy);
          hasError = false;
        } finally {
          if (hasError)
            revokeScope(scope);
          else
            leaveScope(scope);
        }
        usePatchesInScope(scope, patchListener);
        return processResult(result, scope);
      } else if (!base || !isObjectish(base)) {
        result = recipe(base);
        if (result === void 0)
          result = base;
        if (result === NOTHING)
          result = void 0;
        if (this.autoFreeze_)
          freeze(result, true);
        if (patchListener) {
          const p = [];
          const ip = [];
          getPlugin(PluginPatches).generateReplacementPatches_(base, result, {
            patches_: p,
            inversePatches_: ip
          });
          patchListener(p, ip);
        }
        return result;
      } else
        die(1, base);
    };
    this.produceWithPatches = (base, recipe) => {
      if (isFunction(base)) {
        return (state, ...args) => this.produceWithPatches(state, (draft) => base(draft, ...args));
      }
      let patches, inversePatches;
      const result = this.produce(base, recipe, (p, ip) => {
        patches = p;
        inversePatches = ip;
      });
      return [result, patches, inversePatches];
    };
    if (isBoolean$1(config?.autoFreeze))
      this.setAutoFreeze(config.autoFreeze);
    if (isBoolean$1(config?.useStrictShallowCopy))
      this.setUseStrictShallowCopy(config.useStrictShallowCopy);
    if (isBoolean$1(config?.useStrictIteration))
      this.setUseStrictIteration(config.useStrictIteration);
  }
  createDraft(base) {
    if (!isDraftable(base))
      die(8);
    if (isDraft(base))
      base = current(base);
    const scope = enterScope(this);
    const proxy = createProxy(scope, base, void 0);
    proxy[DRAFT_STATE].isManual_ = true;
    leaveScope(scope);
    return proxy;
  }
  finishDraft(draft, patchListener) {
    const state = draft && draft[DRAFT_STATE];
    if (!state || !state.isManual_)
      die(9);
    const { scope_: scope } = state;
    usePatchesInScope(scope, patchListener);
    return processResult(void 0, scope);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(value) {
    this.autoFreeze_ = value;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(value) {
    this.useStrictShallowCopy_ = value;
  }
  /**
   * Pass false to use faster iteration that skips non-enumerable properties
   * but still handles symbols for compatibility.
   *
   * By default, strict iteration is enabled (includes all own properties).
   */
  setUseStrictIteration(value) {
    this.useStrictIteration_ = value;
  }
  shouldUseStrictIteration() {
    return this.useStrictIteration_;
  }
  applyPatches(base, patches) {
    let i;
    for (i = patches.length - 1; i >= 0; i--) {
      const patch = patches[i];
      if (patch.path.length === 0 && patch.op === "replace") {
        base = patch.value;
        break;
      }
    }
    if (i > -1) {
      patches = patches.slice(i + 1);
    }
    const applyPatchesImpl = getPlugin(PluginPatches).applyPatches_;
    if (isDraft(base)) {
      return applyPatchesImpl(base, patches);
    }
    return this.produce(
      base,
      (draft) => applyPatchesImpl(draft, patches)
    );
  }
};
function createProxy(rootScope, value, parent, key) {
  const [draft, state] = isMap(value) ? getPlugin(PluginMapSet).proxyMap_(value, parent) : isSet(value) ? getPlugin(PluginMapSet).proxySet_(value, parent) : createProxyProxy(value, parent);
  const scope = parent?.scope_ ?? getCurrentScope();
  scope.drafts_.push(draft);
  state.callbacks_ = parent?.callbacks_ ?? [];
  state.key_ = key;
  if (parent && key !== void 0) {
    registerChildFinalizationCallback(parent, state, key);
  } else {
    state.callbacks_.push(function rootDraftCleanup(rootScope2) {
      rootScope2.mapSetPlugin_?.fixSetContents(state);
      const { patchPlugin_ } = rootScope2;
      if (state.modified_ && patchPlugin_) {
        patchPlugin_.generatePatches_(state, [], rootScope2);
      }
    });
  }
  return draft;
}

// src/core/current.ts
function current(value) {
  if (!isDraft(value))
    die(10, value);
  return currentImpl(value);
}
function currentImpl(value) {
  if (!isDraftable(value) || isFrozen(value))
    return value;
  const state = value[DRAFT_STATE];
  let copy;
  let strict = true;
  if (state) {
    if (!state.modified_)
      return state.base_;
    state.finalized_ = true;
    copy = shallowCopy(value, state.scope_.immer_.useStrictShallowCopy_);
    strict = state.scope_.immer_.shouldUseStrictIteration();
  } else {
    copy = shallowCopy(value, true);
  }
  each(
    copy,
    (key, childValue) => {
      set(copy, key, currentImpl(childValue));
    },
    strict
  );
  if (state) {
    state.finalized_ = false;
  }
  return copy;
}

// src/immer.ts
var immer = new Immer2();
var produce = immer.produce;

// src/devModeChecks/identityFunctionCheck.ts
function assertIsFunction(func, errorMessage = `expected a function, instead received ${typeof func}`) {
  if (typeof func !== "function") {
    throw new TypeError(errorMessage);
  }
}
function assertIsObject(object, errorMessage = `expected an object, instead received ${typeof object}`) {
  if (typeof object !== "object") {
    throw new TypeError(errorMessage);
  }
}
function assertIsArrayOfFunctions(array, errorMessage = `expected all items to be functions, instead received the following types: `) {
  if (!array.every((item) => typeof item === "function")) {
    const itemTypes = array.map(
      (item) => typeof item === "function" ? `function ${item.name || "unnamed"}()` : typeof item
    ).join(", ");
    throw new TypeError(`${errorMessage}[${itemTypes}]`);
  }
}
var ensureIsArray = (item) => {
  return Array.isArray(item) ? item : [item];
};
function getDependencies(createSelectorArgs) {
  const dependencies = Array.isArray(createSelectorArgs[0]) ? createSelectorArgs[0] : createSelectorArgs;
  assertIsArrayOfFunctions(
    dependencies,
    `createSelector expects all input-selectors to be functions, but received the following types: `
  );
  return dependencies;
}
function collectInputSelectorResults(dependencies, inputSelectorArgs) {
  const inputSelectorResults = [];
  const { length } = dependencies;
  for (let i = 0; i < length; i++) {
    inputSelectorResults.push(dependencies[i].apply(null, inputSelectorArgs));
  }
  return inputSelectorResults;
}

// src/weakMapMemoize.ts
var StrongRef = class {
  constructor(value) {
    this.value = value;
  }
  deref() {
    return this.value;
  }
};
var Ref = typeof WeakRef !== "undefined" ? WeakRef : StrongRef;
var UNTERMINATED = 0;
var TERMINATED = 1;
function createCacheNode() {
  return {
    s: UNTERMINATED,
    v: void 0,
    o: null,
    p: null
  };
}
function weakMapMemoize(func, options = {}) {
  let fnNode = createCacheNode();
  const { resultEqualityCheck } = options;
  let lastResult;
  let resultsCount = 0;
  function memoized() {
    let cacheNode = fnNode;
    const { length } = arguments;
    for (let i = 0, l = length; i < l; i++) {
      const arg = arguments[i];
      if (typeof arg === "function" || typeof arg === "object" && arg !== null) {
        let objectCache = cacheNode.o;
        if (objectCache === null) {
          cacheNode.o = objectCache = /* @__PURE__ */ new WeakMap();
        }
        const objectNode = objectCache.get(arg);
        if (objectNode === void 0) {
          cacheNode = createCacheNode();
          objectCache.set(arg, cacheNode);
        } else {
          cacheNode = objectNode;
        }
      } else {
        let primitiveCache = cacheNode.p;
        if (primitiveCache === null) {
          cacheNode.p = primitiveCache = /* @__PURE__ */ new Map();
        }
        const primitiveNode = primitiveCache.get(arg);
        if (primitiveNode === void 0) {
          cacheNode = createCacheNode();
          primitiveCache.set(arg, cacheNode);
        } else {
          cacheNode = primitiveNode;
        }
      }
    }
    const terminatedNode = cacheNode;
    let result;
    if (cacheNode.s === TERMINATED) {
      result = cacheNode.v;
    } else {
      result = func.apply(null, arguments);
      resultsCount++;
      if (resultEqualityCheck) {
        const lastResultValue = lastResult?.deref?.() ?? lastResult;
        if (lastResultValue != null && resultEqualityCheck(lastResultValue, result)) {
          result = lastResultValue;
          resultsCount !== 0 && resultsCount--;
        }
        const needsWeakRef = typeof result === "object" && result !== null || typeof result === "function";
        lastResult = needsWeakRef ? new Ref(result) : result;
      }
    }
    terminatedNode.s = TERMINATED;
    terminatedNode.v = result;
    return result;
  }
  memoized.clearCache = () => {
    fnNode = createCacheNode();
    memoized.resetResultsCount();
  };
  memoized.resultsCount = () => resultsCount;
  memoized.resetResultsCount = () => {
    resultsCount = 0;
  };
  return memoized;
}

// src/createSelectorCreator.ts
function createSelectorCreator(memoizeOrOptions, ...memoizeOptionsFromArgs) {
  const createSelectorCreatorOptions = typeof memoizeOrOptions === "function" ? {
    memoize: memoizeOrOptions,
    memoizeOptions: memoizeOptionsFromArgs
  } : memoizeOrOptions;
  const createSelector2 = (...createSelectorArgs) => {
    let recomputations = 0;
    let dependencyRecomputations = 0;
    let lastResult;
    let directlyPassedOptions = {};
    let resultFunc = createSelectorArgs.pop();
    if (typeof resultFunc === "object") {
      directlyPassedOptions = resultFunc;
      resultFunc = createSelectorArgs.pop();
    }
    assertIsFunction(
      resultFunc,
      `createSelector expects an output function after the inputs, but received: [${typeof resultFunc}]`
    );
    const combinedOptions = {
      ...createSelectorCreatorOptions,
      ...directlyPassedOptions
    };
    const {
      memoize,
      memoizeOptions = [],
      argsMemoize = weakMapMemoize,
      argsMemoizeOptions = [],
      devModeChecks = {}
    } = combinedOptions;
    const finalMemoizeOptions = ensureIsArray(memoizeOptions);
    const finalArgsMemoizeOptions = ensureIsArray(argsMemoizeOptions);
    const dependencies = getDependencies(createSelectorArgs);
    const memoizedResultFunc = memoize(function recomputationWrapper() {
      recomputations++;
      return resultFunc.apply(
        null,
        arguments
      );
    }, ...finalMemoizeOptions);
    const selector = argsMemoize(function dependenciesChecker() {
      dependencyRecomputations++;
      const inputSelectorResults = collectInputSelectorResults(
        dependencies,
        arguments
      );
      lastResult = memoizedResultFunc.apply(null, inputSelectorResults);
      return lastResult;
    }, ...finalArgsMemoizeOptions);
    return Object.assign(selector, {
      resultFunc,
      memoizedResultFunc,
      dependencies,
      dependencyRecomputations: () => dependencyRecomputations,
      resetDependencyRecomputations: () => {
        dependencyRecomputations = 0;
      },
      lastResult: () => lastResult,
      recomputations: () => recomputations,
      resetRecomputations: () => {
        recomputations = 0;
      },
      memoize,
      argsMemoize
    });
  };
  Object.assign(createSelector2, {
    withTypes: () => createSelector2
  });
  return createSelector2;
}
var createSelector = /* @__PURE__ */ createSelectorCreator(weakMapMemoize);

// src/createStructuredSelector.ts
var createStructuredSelector = Object.assign(
  (inputSelectorsObject, selectorCreator = createSelector) => {
    assertIsObject(
      inputSelectorsObject,
      `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof inputSelectorsObject}`
    );
    const inputSelectorKeys = Object.keys(inputSelectorsObject);
    const dependencies = inputSelectorKeys.map(
      (key) => inputSelectorsObject[key]
    );
    const structuredSelector = selectorCreator(
      dependencies,
      (...inputSelectorResults) => {
        return inputSelectorResults.reduce((composition, value, index) => {
          composition[inputSelectorKeys[index]] = value;
          return composition;
        }, {});
      }
    );
    return structuredSelector;
  },
  { withTypes: () => createStructuredSelector }
);

// src/index.ts
function createThunkMiddleware(extraArgument) {
  const middleware = ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState, extraArgument);
    }
    return next(action);
  };
  return middleware;
}
var thunk = createThunkMiddleware();
var withExtraArgument = createThunkMiddleware;

// src/index.ts

// src/createDraftSafeSelector.ts
var createDraftSafeSelectorCreator = (...args) => {
  const createSelector2 = createSelectorCreator(...args);
  const createDraftSafeSelector2 = Object.assign((...args2) => {
    const selector = createSelector2(...args2);
    const wrappedSelector = (value, ...rest) => selector(isDraft(value) ? current(value) : value, ...rest);
    Object.assign(wrappedSelector, selector);
    return wrappedSelector;
  }, {
    withTypes: () => createDraftSafeSelector2
  });
  return createDraftSafeSelector2;
};
var createDraftSafeSelector = /* @__PURE__ */ createDraftSafeSelectorCreator(weakMapMemoize);

// src/devtoolsExtension.ts
var composeWithDevTools = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
  if (arguments.length === 0) return void 0;
  if (typeof arguments[0] === "object") return compose;
  return compose.apply(null, arguments);
};

// src/createAction.ts
function createAction(type, prepareAction) {
  function actionCreator(...args) {
    if (prepareAction) {
      let prepared = prepareAction(...args);
      if (!prepared) {
        throw new Error(formatProdErrorMessage(0) );
      }
      return {
        type,
        payload: prepared.payload,
        ..."meta" in prepared && {
          meta: prepared.meta
        },
        ..."error" in prepared && {
          error: prepared.error
        }
      };
    }
    return {
      type,
      payload: args[0]
    };
  }
  actionCreator.toString = () => `${type}`;
  actionCreator.type = type;
  actionCreator.match = (action) => isAction(action) && action.type === type;
  return actionCreator;
}
function isFSA(action) {
  return isAction(action) && Object.keys(action).every(isValidKey);
}
function isValidKey(key) {
  return ["type", "payload", "error", "meta"].indexOf(key) > -1;
}
var Tuple = class _Tuple extends Array {
  constructor(...items) {
    super(...items);
    Object.setPrototypeOf(this, _Tuple.prototype);
  }
  static get [Symbol.species]() {
    return _Tuple;
  }
  concat(...arr) {
    return super.concat.apply(this, arr);
  }
  prepend(...arr) {
    if (arr.length === 1 && Array.isArray(arr[0])) {
      return new _Tuple(...arr[0].concat(this));
    }
    return new _Tuple(...arr.concat(this));
  }
};
function freezeDraftable(val) {
  return isDraftable(val) ? produce(val, () => {
  }) : val;
}
function getOrInsertComputed(map, key, compute) {
  if (map.has(key)) return map.get(key);
  return map.set(key, compute(key)).get(key);
}

// src/getDefaultMiddleware.ts
function isBoolean(x) {
  return typeof x === "boolean";
}
var buildGetDefaultMiddleware = () => function getDefaultMiddleware(options) {
  const {
    thunk: thunk$1 = true,
    immutableCheck = true,
    serializableCheck = true,
    actionCreatorCheck = true
  } = options ?? {};
  let middlewareArray = new Tuple();
  if (thunk$1) {
    if (isBoolean(thunk$1)) {
      middlewareArray.push(thunk);
    } else {
      middlewareArray.push(withExtraArgument(thunk$1.extraArgument));
    }
  }
  return middlewareArray;
};

// src/autoBatchEnhancer.ts
var SHOULD_AUTOBATCH = "RTK_autoBatch";
var createQueueWithTimer = (timeout) => {
  return (notify) => {
    setTimeout(notify, timeout);
  };
};
var autoBatchEnhancer = (options = {
  type: "raf"
}) => (next) => (...args) => {
  const store = next(...args);
  let notifying = true;
  let shouldNotifyAtEndOfTick = false;
  let notificationQueued = false;
  const listeners = /* @__PURE__ */ new Set();
  const queueCallback = options.type === "tick" ? queueMicrotask : options.type === "raf" ? (
    // requestAnimationFrame won't exist in SSR environments. Fall back to a vague approximation just to keep from erroring.
    typeof window !== "undefined" && window.requestAnimationFrame ? window.requestAnimationFrame : createQueueWithTimer(10)
  ) : options.type === "callback" ? options.queueNotification : createQueueWithTimer(options.timeout);
  const notifyListeners = () => {
    notificationQueued = false;
    if (shouldNotifyAtEndOfTick) {
      shouldNotifyAtEndOfTick = false;
      listeners.forEach((l) => l());
    }
  };
  return Object.assign({}, store, {
    // Override the base `store.subscribe` method to keep original listeners
    // from running if we're delaying notifications
    subscribe(listener2) {
      const wrappedListener = () => notifying && listener2();
      const unsubscribe = store.subscribe(wrappedListener);
      listeners.add(listener2);
      return () => {
        unsubscribe();
        listeners.delete(listener2);
      };
    },
    // Override the base `store.dispatch` method so that we can check actions
    // for the `shouldAutoBatch` flag and determine if batching is active
    dispatch(action) {
      try {
        notifying = !action?.meta?.[SHOULD_AUTOBATCH];
        shouldNotifyAtEndOfTick = !notifying;
        if (shouldNotifyAtEndOfTick) {
          if (!notificationQueued) {
            notificationQueued = true;
            queueCallback(notifyListeners);
          }
        }
        return store.dispatch(action);
      } finally {
        notifying = true;
      }
    }
  });
};

// src/getDefaultEnhancers.ts
var buildGetDefaultEnhancers = (middlewareEnhancer) => function getDefaultEnhancers(options) {
  const {
    autoBatch = true
  } = options ?? {};
  let enhancerArray = new Tuple(middlewareEnhancer);
  if (autoBatch) {
    enhancerArray.push(autoBatchEnhancer(typeof autoBatch === "object" ? autoBatch : void 0));
  }
  return enhancerArray;
};

// src/configureStore.ts
function configureStore(options) {
  const getDefaultMiddleware = buildGetDefaultMiddleware();
  const {
    reducer = void 0,
    middleware,
    devTools = true,
    duplicateMiddlewareCheck = true,
    preloadedState = void 0,
    enhancers = void 0
  } = options || {};
  let rootReducer;
  if (typeof reducer === "function") {
    rootReducer = reducer;
  } else if (isPlainObject$1(reducer)) {
    rootReducer = combineReducers(reducer);
  } else {
    throw new Error(formatProdErrorMessage(1) );
  }
  let finalMiddleware;
  if (typeof middleware === "function") {
    finalMiddleware = middleware(getDefaultMiddleware);
  } else {
    finalMiddleware = getDefaultMiddleware();
  }
  let finalCompose = compose;
  if (devTools) {
    finalCompose = composeWithDevTools({
      // Enable capture of stack traces for dispatched Redux actions
      trace: "production" !== "production",
      ...typeof devTools === "object" && devTools
    });
  }
  const middlewareEnhancer = applyMiddleware(...finalMiddleware);
  const getDefaultEnhancers = buildGetDefaultEnhancers(middlewareEnhancer);
  let storeEnhancers = typeof enhancers === "function" ? enhancers(getDefaultEnhancers) : getDefaultEnhancers();
  const composedEnhancer = finalCompose(...storeEnhancers);
  return createStore(rootReducer, preloadedState, composedEnhancer);
}

// src/mapBuilders.ts
function executeReducerBuilderCallback(builderCallback) {
  const actionsMap = {};
  const actionMatchers = [];
  let defaultCaseReducer;
  const builder = {
    addCase(typeOrActionCreator, reducer) {
      const type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
      if (!type) {
        throw new Error(formatProdErrorMessage(28) );
      }
      if (type in actionsMap) {
        throw new Error(formatProdErrorMessage(29) );
      }
      actionsMap[type] = reducer;
      return builder;
    },
    addAsyncThunk(asyncThunk, reducers) {
      if (reducers.pending) actionsMap[asyncThunk.pending.type] = reducers.pending;
      if (reducers.rejected) actionsMap[asyncThunk.rejected.type] = reducers.rejected;
      if (reducers.fulfilled) actionsMap[asyncThunk.fulfilled.type] = reducers.fulfilled;
      if (reducers.settled) actionMatchers.push({
        matcher: asyncThunk.settled,
        reducer: reducers.settled
      });
      return builder;
    },
    addMatcher(matcher, reducer) {
      actionMatchers.push({
        matcher,
        reducer
      });
      return builder;
    },
    addDefaultCase(reducer) {
      defaultCaseReducer = reducer;
      return builder;
    }
  };
  builderCallback(builder);
  return [actionsMap, actionMatchers, defaultCaseReducer];
}

// src/createReducer.ts
function isStateFunction(x) {
  return typeof x === "function";
}
function createReducer(initialState, mapOrBuilderCallback) {
  let [actionsMap, finalActionMatchers, finalDefaultCaseReducer] = executeReducerBuilderCallback(mapOrBuilderCallback);
  let getInitialState;
  if (isStateFunction(initialState)) {
    getInitialState = () => freezeDraftable(initialState());
  } else {
    const frozenInitialState = freezeDraftable(initialState);
    getInitialState = () => frozenInitialState;
  }
  function reducer(state = getInitialState(), action) {
    let caseReducers = [actionsMap[action.type], ...finalActionMatchers.filter(({
      matcher
    }) => matcher(action)).map(({
      reducer: reducer2
    }) => reducer2)];
    if (caseReducers.filter((cr) => !!cr).length === 0) {
      caseReducers = [finalDefaultCaseReducer];
    }
    return caseReducers.reduce((previousState, caseReducer) => {
      if (caseReducer) {
        if (isDraft(previousState)) {
          const draft = previousState;
          const result = caseReducer(draft, action);
          if (result === void 0) {
            return previousState;
          }
          return result;
        } else if (!isDraftable(previousState)) {
          const result = caseReducer(previousState, action);
          if (result === void 0) {
            if (previousState === null) {
              return previousState;
            }
            throw Error("A case reducer on a non-draftable value must not return undefined");
          }
          return result;
        } else {
          return produce(previousState, (draft) => {
            return caseReducer(draft, action);
          });
        }
      }
      return previousState;
    }, state);
  }
  reducer.getInitialState = getInitialState;
  return reducer;
}

// src/createSlice.ts
var asyncThunkSymbol = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function getType(slice, actionKey) {
  return `${slice}/${actionKey}`;
}
function buildCreateSlice({
  creators
} = {}) {
  const cAT = creators?.asyncThunk?.[asyncThunkSymbol];
  return function createSlice2(options) {
    const {
      name,
      reducerPath = name
    } = options;
    if (!name) {
      throw new Error(formatProdErrorMessage(11) );
    }
    if (typeof process !== "undefined" && "production" === "development") {
      if (options.initialState === void 0) {
        console.error("You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`");
      }
    }
    const reducers = (typeof options.reducers === "function" ? options.reducers(buildReducerCreators()) : options.reducers) || {};
    const reducerNames = Object.keys(reducers);
    const context = {
      sliceCaseReducersByName: {},
      sliceCaseReducersByType: {},
      actionCreators: {},
      sliceMatchers: []
    };
    const contextMethods = {
      addCase(typeOrActionCreator, reducer2) {
        const type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
        if (!type) {
          throw new Error(formatProdErrorMessage(12) );
        }
        if (type in context.sliceCaseReducersByType) {
          throw new Error(formatProdErrorMessage(13) );
        }
        context.sliceCaseReducersByType[type] = reducer2;
        return contextMethods;
      },
      addMatcher(matcher, reducer2) {
        context.sliceMatchers.push({
          matcher,
          reducer: reducer2
        });
        return contextMethods;
      },
      exposeAction(name2, actionCreator) {
        context.actionCreators[name2] = actionCreator;
        return contextMethods;
      },
      exposeCaseReducer(name2, reducer2) {
        context.sliceCaseReducersByName[name2] = reducer2;
        return contextMethods;
      }
    };
    reducerNames.forEach((reducerName) => {
      const reducerDefinition = reducers[reducerName];
      const reducerDetails = {
        reducerName,
        type: getType(name, reducerName),
        createNotation: typeof options.reducers === "function"
      };
      if (isAsyncThunkSliceReducerDefinition(reducerDefinition)) {
        handleThunkCaseReducerDefinition(reducerDetails, reducerDefinition, contextMethods, cAT);
      } else {
        handleNormalReducerDefinition(reducerDetails, reducerDefinition, contextMethods);
      }
    });
    function buildReducer() {
      const [extraReducers = {}, actionMatchers = [], defaultCaseReducer = void 0] = typeof options.extraReducers === "function" ? executeReducerBuilderCallback(options.extraReducers) : [options.extraReducers];
      const finalCaseReducers = {
        ...extraReducers,
        ...context.sliceCaseReducersByType
      };
      return createReducer(options.initialState, (builder) => {
        for (let key in finalCaseReducers) {
          builder.addCase(key, finalCaseReducers[key]);
        }
        for (let sM of context.sliceMatchers) {
          builder.addMatcher(sM.matcher, sM.reducer);
        }
        for (let m of actionMatchers) {
          builder.addMatcher(m.matcher, m.reducer);
        }
        if (defaultCaseReducer) {
          builder.addDefaultCase(defaultCaseReducer);
        }
      });
    }
    const selectSelf = (state) => state;
    const injectedSelectorCache = /* @__PURE__ */ new Map();
    const injectedStateCache = /* @__PURE__ */ new WeakMap();
    let _reducer;
    function reducer(state, action) {
      if (!_reducer) _reducer = buildReducer();
      return _reducer(state, action);
    }
    function getInitialState() {
      if (!_reducer) _reducer = buildReducer();
      return _reducer.getInitialState();
    }
    function makeSelectorProps(reducerPath2, injected = false) {
      function selectSlice(state) {
        let sliceState = state[reducerPath2];
        if (typeof sliceState === "undefined") {
          if (injected) {
            sliceState = getOrInsertComputed(injectedStateCache, selectSlice, getInitialState);
          }
        }
        return sliceState;
      }
      function getSelectors(selectState = selectSelf) {
        const selectorCache = getOrInsertComputed(injectedSelectorCache, injected, () => /* @__PURE__ */ new WeakMap());
        return getOrInsertComputed(selectorCache, selectState, () => {
          const map = {};
          for (const [name2, selector] of Object.entries(options.selectors ?? {})) {
            map[name2] = wrapSelector(selector, selectState, () => getOrInsertComputed(injectedStateCache, selectState, getInitialState), injected);
          }
          return map;
        });
      }
      return {
        reducerPath: reducerPath2,
        getSelectors,
        get selectors() {
          return getSelectors(selectSlice);
        },
        selectSlice
      };
    }
    const slice = {
      name,
      reducer,
      actions: context.actionCreators,
      caseReducers: context.sliceCaseReducersByName,
      getInitialState,
      ...makeSelectorProps(reducerPath),
      injectInto(injectable, {
        reducerPath: pathOpt,
        ...config
      } = {}) {
        const newReducerPath = pathOpt ?? reducerPath;
        injectable.inject({
          reducerPath: newReducerPath,
          reducer
        }, config);
        return {
          ...slice,
          ...makeSelectorProps(newReducerPath, true)
        };
      }
    };
    return slice;
  };
}
function wrapSelector(selector, selectState, getInitialState, injected) {
  function wrapper(rootState, ...args) {
    let sliceState = selectState(rootState);
    if (typeof sliceState === "undefined") {
      if (injected) {
        sliceState = getInitialState();
      }
    }
    return selector(sliceState, ...args);
  }
  wrapper.unwrapped = selector;
  return wrapper;
}
var createSlice = /* @__PURE__ */ buildCreateSlice();
function buildReducerCreators() {
  function asyncThunk(payloadCreator, config) {
    return {
      _reducerDefinitionType: "asyncThunk" /* asyncThunk */,
      payloadCreator,
      ...config
    };
  }
  asyncThunk.withTypes = () => asyncThunk;
  return {
    reducer(caseReducer) {
      return Object.assign({
        // hack so the wrapping function has the same name as the original
        // we need to create a wrapper so the `reducerDefinitionType` is not assigned to the original
        [caseReducer.name](...args) {
          return caseReducer(...args);
        }
      }[caseReducer.name], {
        _reducerDefinitionType: "reducer" /* reducer */
      });
    },
    preparedReducer(prepare, reducer) {
      return {
        _reducerDefinitionType: "reducerWithPrepare" /* reducerWithPrepare */,
        prepare,
        reducer
      };
    },
    asyncThunk
  };
}
function handleNormalReducerDefinition({
  type,
  reducerName,
  createNotation
}, maybeReducerWithPrepare, context) {
  let caseReducer;
  let prepareCallback;
  if ("reducer" in maybeReducerWithPrepare) {
    if (createNotation && !isCaseReducerWithPrepareDefinition(maybeReducerWithPrepare)) {
      throw new Error(formatProdErrorMessage(17) );
    }
    caseReducer = maybeReducerWithPrepare.reducer;
    prepareCallback = maybeReducerWithPrepare.prepare;
  } else {
    caseReducer = maybeReducerWithPrepare;
  }
  context.addCase(type, caseReducer).exposeCaseReducer(reducerName, caseReducer).exposeAction(reducerName, prepareCallback ? createAction(type, prepareCallback) : createAction(type));
}
function isAsyncThunkSliceReducerDefinition(reducerDefinition) {
  return reducerDefinition._reducerDefinitionType === "asyncThunk" /* asyncThunk */;
}
function isCaseReducerWithPrepareDefinition(reducerDefinition) {
  return reducerDefinition._reducerDefinitionType === "reducerWithPrepare" /* reducerWithPrepare */;
}
function handleThunkCaseReducerDefinition({
  type,
  reducerName
}, reducerDefinition, context, cAT) {
  if (!cAT) {
    throw new Error(formatProdErrorMessage(18) );
  }
  const {
    payloadCreator,
    fulfilled,
    pending,
    rejected,
    settled,
    options
  } = reducerDefinition;
  const thunk = cAT(type, payloadCreator, options);
  context.exposeAction(reducerName, thunk);
  if (fulfilled) {
    context.addCase(thunk.fulfilled, fulfilled);
  }
  if (pending) {
    context.addCase(thunk.pending, pending);
  }
  if (rejected) {
    context.addCase(thunk.rejected, rejected);
  }
  if (settled) {
    context.addMatcher(thunk.settled, settled);
  }
  context.exposeCaseReducer(reducerName, {
    fulfilled: fulfilled || noop,
    pending: pending || noop,
    rejected: rejected || noop,
    settled: settled || noop
  });
}
function noop() {
}

// src/entities/entity_state.ts
function getInitialEntityState() {
  return {
    ids: [],
    entities: {}
  };
}
function createInitialStateFactory(stateAdapter) {
  function getInitialState(additionalState = {}, entities) {
    const state = Object.assign(getInitialEntityState(), additionalState);
    return entities ? stateAdapter.setAll(state, entities) : state;
  }
  return {
    getInitialState
  };
}

// src/entities/state_selectors.ts
function createSelectorsFactory() {
  function getSelectors(selectState, options = {}) {
    const {
      createSelector: createSelector2 = createDraftSafeSelector
    } = options;
    const selectIds = (state) => state.ids;
    const selectEntities = (state) => state.entities;
    const selectAll = createSelector2(selectIds, selectEntities, (ids, entities) => ids.map((id) => entities[id]));
    const selectId = (_, id) => id;
    const selectById = (entities, id) => entities[id];
    const selectTotal = createSelector2(selectIds, (ids) => ids.length);
    if (!selectState) {
      return {
        selectIds,
        selectEntities,
        selectAll,
        selectTotal,
        selectById: createSelector2(selectEntities, selectId, selectById)
      };
    }
    const selectGlobalizedEntities = createSelector2(selectState, selectEntities);
    return {
      selectIds: createSelector2(selectState, selectIds),
      selectEntities: selectGlobalizedEntities,
      selectAll: createSelector2(selectState, selectAll),
      selectTotal: createSelector2(selectState, selectTotal),
      selectById: createSelector2(selectGlobalizedEntities, selectId, selectById)
    };
  }
  return {
    getSelectors
  };
}

// src/entities/state_adapter.ts
var isDraftTyped = isDraft;
function createSingleArgumentStateOperator(mutator) {
  const operator = createStateOperator((_, state) => mutator(state));
  return function operation(state) {
    return operator(state, void 0);
  };
}
function createStateOperator(mutator) {
  return function operation(state, arg) {
    function isPayloadActionArgument(arg2) {
      return isFSA(arg2);
    }
    const runMutator = (draft) => {
      if (isPayloadActionArgument(arg)) {
        mutator(arg.payload, draft);
      } else {
        mutator(arg, draft);
      }
    };
    if (isDraftTyped(state)) {
      runMutator(state);
      return state;
    }
    return produce(state, runMutator);
  };
}

// src/entities/utils.ts
function selectIdValue(entity, selectId) {
  const key = selectId(entity);
  return key;
}
function ensureEntitiesArray(entities) {
  if (!Array.isArray(entities)) {
    entities = Object.values(entities);
  }
  return entities;
}
function getCurrent(value) {
  return isDraft(value) ? current(value) : value;
}
function splitAddedUpdatedEntities(newEntities, selectId, state) {
  newEntities = ensureEntitiesArray(newEntities);
  const existingIdsArray = getCurrent(state.ids);
  const existingIds = new Set(existingIdsArray);
  const added = [];
  const addedIds = /* @__PURE__ */ new Set([]);
  const updated = [];
  for (const entity of newEntities) {
    const id = selectIdValue(entity, selectId);
    if (existingIds.has(id) || addedIds.has(id)) {
      updated.push({
        id,
        changes: entity
      });
    } else {
      addedIds.add(id);
      added.push(entity);
    }
  }
  return [added, updated, existingIdsArray];
}

// src/entities/unsorted_state_adapter.ts
function createUnsortedStateAdapter(selectId) {
  function addOneMutably(entity, state) {
    const key = selectIdValue(entity, selectId);
    if (key in state.entities) {
      return;
    }
    state.ids.push(key);
    state.entities[key] = entity;
  }
  function addManyMutably(newEntities, state) {
    newEntities = ensureEntitiesArray(newEntities);
    for (const entity of newEntities) {
      addOneMutably(entity, state);
    }
  }
  function setOneMutably(entity, state) {
    const key = selectIdValue(entity, selectId);
    if (!(key in state.entities)) {
      state.ids.push(key);
    }
    state.entities[key] = entity;
  }
  function setManyMutably(newEntities, state) {
    newEntities = ensureEntitiesArray(newEntities);
    for (const entity of newEntities) {
      setOneMutably(entity, state);
    }
  }
  function setAllMutably(newEntities, state) {
    newEntities = ensureEntitiesArray(newEntities);
    state.ids = [];
    state.entities = {};
    addManyMutably(newEntities, state);
  }
  function removeOneMutably(key, state) {
    return removeManyMutably([key], state);
  }
  function removeManyMutably(keys, state) {
    let didMutate = false;
    keys.forEach((key) => {
      if (key in state.entities) {
        delete state.entities[key];
        didMutate = true;
      }
    });
    if (didMutate) {
      state.ids = state.ids.filter((id) => id in state.entities);
    }
  }
  function removeAllMutably(state) {
    Object.assign(state, {
      ids: [],
      entities: {}
    });
  }
  function takeNewKey(keys, update, state) {
    const original3 = state.entities[update.id];
    if (original3 === void 0) {
      return false;
    }
    const updated = Object.assign({}, original3, update.changes);
    const newKey = selectIdValue(updated, selectId);
    const hasNewKey = newKey !== update.id;
    if (hasNewKey) {
      keys[update.id] = newKey;
      delete state.entities[update.id];
    }
    state.entities[newKey] = updated;
    return hasNewKey;
  }
  function updateOneMutably(update, state) {
    return updateManyMutably([update], state);
  }
  function updateManyMutably(updates, state) {
    const newKeys = {};
    const updatesPerEntity = {};
    updates.forEach((update) => {
      if (update.id in state.entities) {
        updatesPerEntity[update.id] = {
          id: update.id,
          // Spreads ignore falsy values, so this works even if there isn't
          // an existing update already at this key
          changes: {
            ...updatesPerEntity[update.id]?.changes,
            ...update.changes
          }
        };
      }
    });
    updates = Object.values(updatesPerEntity);
    const didMutateEntities = updates.length > 0;
    if (didMutateEntities) {
      const didMutateIds = updates.filter((update) => takeNewKey(newKeys, update, state)).length > 0;
      if (didMutateIds) {
        state.ids = Object.values(state.entities).map((e) => selectIdValue(e, selectId));
      }
    }
  }
  function upsertOneMutably(entity, state) {
    return upsertManyMutably([entity], state);
  }
  function upsertManyMutably(newEntities, state) {
    const [added, updated] = splitAddedUpdatedEntities(newEntities, selectId, state);
    addManyMutably(added, state);
    updateManyMutably(updated, state);
  }
  return {
    removeAll: createSingleArgumentStateOperator(removeAllMutably),
    addOne: createStateOperator(addOneMutably),
    addMany: createStateOperator(addManyMutably),
    setOne: createStateOperator(setOneMutably),
    setMany: createStateOperator(setManyMutably),
    setAll: createStateOperator(setAllMutably),
    updateOne: createStateOperator(updateOneMutably),
    updateMany: createStateOperator(updateManyMutably),
    upsertOne: createStateOperator(upsertOneMutably),
    upsertMany: createStateOperator(upsertManyMutably),
    removeOne: createStateOperator(removeOneMutably),
    removeMany: createStateOperator(removeManyMutably)
  };
}

// src/entities/sorted_state_adapter.ts
function findInsertIndex(sortedItems, item, comparisonFunction) {
  let lowIndex = 0;
  let highIndex = sortedItems.length;
  while (lowIndex < highIndex) {
    let middleIndex = lowIndex + highIndex >>> 1;
    const currentItem = sortedItems[middleIndex];
    const res = comparisonFunction(item, currentItem);
    if (res >= 0) {
      lowIndex = middleIndex + 1;
    } else {
      highIndex = middleIndex;
    }
  }
  return lowIndex;
}
function insert(sortedItems, item, comparisonFunction) {
  const insertAtIndex = findInsertIndex(sortedItems, item, comparisonFunction);
  sortedItems.splice(insertAtIndex, 0, item);
  return sortedItems;
}
function createSortedStateAdapter(selectId, comparer) {
  const {
    removeOne,
    removeMany,
    removeAll
  } = createUnsortedStateAdapter(selectId);
  function addOneMutably(entity, state) {
    return addManyMutably([entity], state);
  }
  function addManyMutably(newEntities, state, existingIds) {
    newEntities = ensureEntitiesArray(newEntities);
    const existingKeys = new Set(existingIds ?? getCurrent(state.ids));
    const addedKeys = /* @__PURE__ */ new Set();
    const models = newEntities.filter((model) => {
      const modelId = selectIdValue(model, selectId);
      const notAdded = !addedKeys.has(modelId);
      if (notAdded) addedKeys.add(modelId);
      return !existingKeys.has(modelId) && notAdded;
    });
    if (models.length !== 0) {
      mergeFunction(state, models);
    }
  }
  function setOneMutably(entity, state) {
    return setManyMutably([entity], state);
  }
  function setManyMutably(newEntities, state) {
    let deduplicatedEntities = {};
    newEntities = ensureEntitiesArray(newEntities);
    if (newEntities.length !== 0) {
      for (const item of newEntities) {
        const entityId = selectId(item);
        deduplicatedEntities[entityId] = item;
        delete state.entities[entityId];
      }
      newEntities = ensureEntitiesArray(deduplicatedEntities);
      mergeFunction(state, newEntities);
    }
  }
  function setAllMutably(newEntities, state) {
    newEntities = ensureEntitiesArray(newEntities);
    state.entities = {};
    state.ids = [];
    addManyMutably(newEntities, state, []);
  }
  function updateOneMutably(update, state) {
    return updateManyMutably([update], state);
  }
  function updateManyMutably(updates, state) {
    let appliedUpdates = false;
    let replacedIds = false;
    for (let update of updates) {
      const entity = state.entities[update.id];
      if (!entity) {
        continue;
      }
      appliedUpdates = true;
      Object.assign(entity, update.changes);
      const newId = selectId(entity);
      if (update.id !== newId) {
        replacedIds = true;
        delete state.entities[update.id];
        const oldIndex = state.ids.indexOf(update.id);
        state.ids[oldIndex] = newId;
        state.entities[newId] = entity;
      }
    }
    if (appliedUpdates) {
      mergeFunction(state, [], appliedUpdates, replacedIds);
    }
  }
  function upsertOneMutably(entity, state) {
    return upsertManyMutably([entity], state);
  }
  function upsertManyMutably(newEntities, state) {
    const [added, updated, existingIdsArray] = splitAddedUpdatedEntities(newEntities, selectId, state);
    if (added.length) {
      addManyMutably(added, state, existingIdsArray);
    }
    if (updated.length) {
      updateManyMutably(updated, state);
    }
  }
  function areArraysEqual(a, b) {
    if (a.length !== b.length) {
      return false;
    }
    for (let i = 0; i < a.length; i++) {
      if (a[i] === b[i]) {
        continue;
      }
      return false;
    }
    return true;
  }
  const mergeFunction = (state, addedItems, appliedUpdates, replacedIds) => {
    const currentEntities = getCurrent(state.entities);
    const currentIds = getCurrent(state.ids);
    const stateEntities = state.entities;
    let ids = currentIds;
    if (replacedIds) {
      ids = new Set(currentIds);
    }
    let sortedEntities = [];
    for (const id of ids) {
      const entity = currentEntities[id];
      if (entity) {
        sortedEntities.push(entity);
      }
    }
    const wasPreviouslyEmpty = sortedEntities.length === 0;
    for (const item of addedItems) {
      stateEntities[selectId(item)] = item;
      if (!wasPreviouslyEmpty) {
        insert(sortedEntities, item, comparer);
      }
    }
    if (wasPreviouslyEmpty) {
      sortedEntities = addedItems.slice().sort(comparer);
    } else if (appliedUpdates) {
      sortedEntities.sort(comparer);
    }
    const newSortedIds = sortedEntities.map(selectId);
    if (!areArraysEqual(currentIds, newSortedIds)) {
      state.ids = newSortedIds;
    }
  };
  return {
    removeOne,
    removeMany,
    removeAll,
    addOne: createStateOperator(addOneMutably),
    updateOne: createStateOperator(updateOneMutably),
    upsertOne: createStateOperator(upsertOneMutably),
    setOne: createStateOperator(setOneMutably),
    setMany: createStateOperator(setManyMutably),
    setAll: createStateOperator(setAllMutably),
    addMany: createStateOperator(addManyMutably),
    updateMany: createStateOperator(updateManyMutably),
    upsertMany: createStateOperator(upsertManyMutably)
  };
}

// src/entities/create_adapter.ts
function createEntityAdapter(options = {}) {
  const {
    selectId,
    sortComparer
  } = {
    sortComparer: false,
    selectId: (instance) => instance.id,
    ...options
  };
  const stateAdapter = sortComparer ? createSortedStateAdapter(selectId, sortComparer) : createUnsortedStateAdapter(selectId);
  const stateFactory = createInitialStateFactory(stateAdapter);
  const selectorsFactory = createSelectorsFactory();
  return {
    selectId,
    sortComparer,
    ...stateFactory,
    ...selectorsFactory,
    ...stateAdapter
  };
}

// src/formatProdErrorMessage.ts
function formatProdErrorMessage(code) {
  return `Minified Redux Toolkit error #${code}; visit https://redux-toolkit.js.org/Errors?code=${code} for the full message or use the non-minified dev environment for full errors. `;
}

const DEFAULT_FEEDBACK_AUTO_HIDE_DURATION = 6000;
const createInitialFeedbackState = () => ({
    open: false,
    severity: "success",
    message: "",
    detail: undefined,
    autoHideDuration: DEFAULT_FEEDBACK_AUTO_HIDE_DURATION,
    key: 0,
});
const normalizePayload = (payload) => {
    if (typeof payload === "string") {
        return { message: payload };
    }
    return payload;
};
const showFeedback = (state, severity, payload) => {
    const input = normalizePayload(payload);
    state.open = true;
    state.severity = severity;
    state.message = input.message;
    state.detail = input.detail;
    state.autoHideDuration = input.autoHideDuration ?? DEFAULT_FEEDBACK_AUTO_HIDE_DURATION;
    state.key += 1;
};
const slice$3 = createSlice({
    name: "feedback",
    initialState: createInitialFeedbackState(),
    reducers: {
        showSuccess: (state, action) => {
            showFeedback(state, "success", action.payload);
        },
        showError: (state, action) => {
            showFeedback(state, "error", action.payload);
        },
        closeFeedback: (state) => {
            state.open = false;
        },
    },
});
const feedbackReducer = slice$3.reducer;
const FeedbackActions = slice$3.actions;
const FeedbackSelectors = {
    selectFeedback: (state) => state.feedback,
};

const createBlankDocumentProvenance = (params = {}) => {
    return {
        importSourceGmId: params.importSourceGmId ?? "",
        originalMediaId: params.originalMediaId ?? "",
        sourceUrl: params.sourceUrl ?? "",
    };
};
const initialState = {
    title: "",
    description: "",
    provenance: createBlankDocumentProvenance(),
    solutions: [],
};
const slice$2 = createSlice({
    name: "document",
    initialState,
    reducers: {
        addSolution: (state, action) => {
            state.solutions.push(action.payload);
        },
        removeSolution: (state, action) => {
            state.solutions = state.solutions.filter((id) => id !== action.payload);
        },
        setSolutions: (state, action) => {
            state.solutions = action.payload;
        },
        setTitle: (state, action) => {
            state.title = action.payload;
        },
        setDescription: (state, action) => {
            state.description = action.payload;
        },
        setProvenance: (state, action) => {
            state.provenance = createBlankDocumentProvenance({
                ...state.provenance,
                ...action.payload,
            });
        },
        replaceDocument: (_state, action) => {
            return action.payload;
        },
    },
});
const documentReducer = slice$2.reducer;
const DocumentActions = slice$2.actions;
const documentState = (state) => state.document;
const DocumentSelectors = {
    selectTitle: createSelector(documentState, (document) => document.title),
    selectDescription: createSelector(documentState, (document) => document.description),
    selectProvenance: createSelector(documentState, (document) => document.provenance ?? createBlankDocumentProvenance()),
    selectSolutions: createSelector(documentState, (document) => document.solutions),
};

const adapter$1 = createEntityAdapter({
    selectId: (componentRowModel) => componentRowModel.id,
    sortComparer: (a, b) => a.id.localeCompare(b.id),
});
const slice$1 = createSlice({
    name: "entities/componentRow",
    initialState: adapter$1.getInitialState(),
    reducers: {
        addComponentRow: (state, action) => adapter$1.addOne(state, action),
        removeComponentRow: (state, action) => adapter$1.removeOne(state, action),
        removeComponentRows: (state, action) => adapter$1.removeMany(state, action),
        updateComponentRow: (state, action) => adapter$1.updateOne(state, action),
        replaceComponentRows: (_state, action) => {
            return action.payload;
        },
    },
});
const ComponentRowModelActions = slice$1.actions;
const componentRowModelReducer = slice$1.reducer;
const selectors$1 = adapter$1.getSelectors((state) => state.entities.componentRows);
const ComponentRowSelectors = selectors$1;
const createBlankComponentRow = (params = {}) => {
    const id = params.id ?? nanoid();
    return {
        id,
        gmoId: params.gmoId ?? "",
        component: params.component ?? "",
        volume: params.volume ?? null,
        unit: params.unit ?? "",
        concentrationValue: params.concentrationValue ?? null,
        concentrationUnit: params.concentrationUnit ?? "",
        note: params.note ?? "",
    };
};

const adapter = createEntityAdapter({
    selectId: (solutionBlockModel) => solutionBlockModel.id,
    sortComparer: (a, b) => a.id.localeCompare(b.id),
});
const slice = createSlice({
    name: "entities/solutionBlock",
    initialState: adapter.getInitialState(),
    reducers: {
        addSolutionBlock: (state, action) => adapter.addOne(state, action),
        removeSolutionBlock: (state, action) => adapter.removeOne(state, action),
        updateSolutionBlock: (state, action) => adapter.updateOne(state, action),
        setSolutionBlocks: (state, action) => adapter.setAll(state, action),
        replaceSolutionBlocks: (_state, action) => {
            return action.payload;
        },
    },
});
const SolutionBlockModelActions = slice.actions;
const solutionBlockModelReducer = slice.reducer;
const selectors = adapter.getSelectors((state) => state.entities.solutionBlocks);
const SolutionBlockSelectors = selectors;
const createBlankSolutionBlock = (params = {}) => {
    const id = params.id ?? nanoid();
    return {
        id,
        title: params.title ?? "",
        description: params.description ?? "",
        components: params.components ?? [],
    };
};

const createInitialState = () => {
    const componentRow = createBlankComponentRow();
    const solutionBlock = createBlankSolutionBlock({
        components: [componentRow.id],
    });
    return {
        entities: {
            componentRows: {
                ids: [componentRow.id],
                entities: {
                    [componentRow.id]: componentRow,
                },
            },
            solutionBlocks: {
                ids: [solutionBlock.id],
                entities: {
                    [solutionBlock.id]: solutionBlock,
                },
            },
        },
        document: {
            title: "",
            description: "",
            provenance: createBlankDocumentProvenance(),
            solutions: [solutionBlock.id],
        },
        feedback: createInitialFeedbackState(),
    };
};

const appStore = configureStore({
    reducer: {
        entities: combineReducers({
            componentRows: componentRowModelReducer,
            solutionBlocks: solutionBlockModelReducer,
        }),
        document: documentReducer,
        feedback: feedbackReducer,
    },
    preloadedState: createInitialState(),
});
const useAppDispatch = useDispatch;
const useAppSelector = useSelector;

const useFeedback = () => {
    const dispatch = useAppDispatch();
    return reactExports.useMemo(() => ({
        showSuccess: (input) => {
            dispatch(FeedbackActions.showSuccess(input));
        },
        showError: (input) => {
            dispatch(FeedbackActions.showError(input));
        },
        closeFeedback: () => {
            dispatch(FeedbackActions.closeFeedback());
        },
    }), [dispatch]);
};

const FeedbackSnackbar = () => {
    const feedback = useAppSelector(FeedbackSelectors.selectFeedback);
    const { closeFeedback } = useFeedback();
    const handleClose = (_event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        closeFeedback();
    };
    return (jsx(Snackbar$1, { open: feedback.open, autoHideDuration: feedback.autoHideDuration, anchorOrigin: { vertical: "bottom", horizontal: "center" }, onClose: handleClose, children: jsxs(Alert$1, { variant: "filled", severity: feedback.severity, onClose: handleClose, sx: { alignItems: "center", maxWidth: 560, width: "100%" }, children: [jsx("span", { children: feedback.message }), feedback.detail ? jsxs("span", { children: [" ", feedback.detail] }) : null] }) }, feedback.key));
};

// disable react-refresh as this file contains shared styled components
const GRID_TEMPLATE_COLUMNS = "20px 384px 70px 70px 70px 70px 1fr";
const SPAN_GRID_COLUMNS = "span 7";
const Sheet = styled$1("div")({
    display: "grid",
    gridTemplateColumns: GRID_TEMPLATE_COLUMNS,
    columnGap: THEME.SIZE.S2,
    rowGap: THEME.SIZE.S2,
});
const Block = styled$1("div")({
    display: "grid",
    gridTemplateColumns: "subgrid",
    gridColumn: SPAN_GRID_COLUMNS,
    rowGap: THEME.SIZE.S2,
    backgroundColor: THEME.COLOR.WHITE,
    paddingInline: THEME.SIZE.S1,
    paddingTop: THEME.SIZE.S3,
    paddingBottom: THEME.SIZE.S1,
    borderRadius: THEME.ROUND.BASE,
    // border: THEME.BORDER,
});
const TableRow = styled$1("div")({
    display: "grid",
    gridTemplateColumns: "subgrid",
    gridColumn: SPAN_GRID_COLUMNS,
});

const ImportDialog = ({ open, selectedFile, onClose, onFileSelect, onImport, }) => {
    const inputId = reactExports.useId();
    const [selectionError, setSelectionError] = reactExports.useState(null);
    const selectFiles = (files) => {
        if (!files || files.length === 0) {
            return;
        }
        if (files.length > 1) {
            onFileSelect(null);
            setSelectionError("Select a single JSON file. Multiple files cannot be imported at once.");
            return;
        }
        onFileSelect(files[0] ?? null);
        setSelectionError(null);
    };
    const handleInputChange = (event) => {
        selectFiles(event.target.files);
        event.target.value = "";
    };
    const handleDrop = (event) => {
        event.preventDefault();
        selectFiles(event.dataTransfer.files);
    };
    const handleDragOver = (event) => {
        event.preventDefault();
    };
    const handleClose = () => {
        setSelectionError(null);
        onClose();
    };
    const handleImport = () => {
        if (!selectedFile || !onImport) {
            return;
        }
        onImport(selectedFile);
    };
    return (jsxs(Dialog$1, { open: open, onClose: handleClose, fullWidth: true, maxWidth: "sm", children: [jsx(DialogTitle$1, { children: "Upload .json" }), jsx(DialogContent$1, { children: jsxs(Stack$1, { gap: 2, children: [jsx(Alert$1, { severity: "warning", children: "Importing a JSON file will replace the current medium builder contents." }), jsxs(DropZone, { htmlFor: inputId, onDrop: handleDrop, onDragOver: handleDragOver, children: [jsx(VisuallyHiddenInput, { id: inputId, type: "file", accept: "application/json,.json", onChange: handleInputChange }), jsx(Typography, { variant: "subtitle2", component: "span", children: "Drop a JSON file here" }), jsx(Typography, { variant: "body2", color: "text.secondary", component: "span", children: "or choose one from your computer" }), jsx(Button, { variant: "outlined", size: "small", component: "span", sx: { textTransform: "none" }, children: "Choose file" })] }), jsxs(Box, { children: [jsx(Typography, { variant: "caption", color: "text.secondary", component: "p", children: "Selected file" }), jsx(Typography, { variant: "body2", component: "p", children: selectedFile ? selectedFile.name : "No file selected" })] }), selectionError ? jsx(Alert$1, { severity: "error", children: selectionError }) : null] }) }), jsxs(DialogActions$1, { children: [jsx(Button, { onClick: handleClose, sx: { textTransform: "none" }, children: "Cancel" }), jsx(Button, { variant: "contained", disableElevation: true, disabled: !selectedFile || !onImport, onClick: handleImport, sx: { textTransform: "none" }, children: "Import" })] })] }));
};
const DropZone = styled$1("label")({
    minHeight: 140,
    border: `1px dashed ${THEME.COLOR.GRAY_LINE}`,
    borderRadius: THEME.ROUND.BASE,
    padding: THEME.SIZE.S2,
    display: "grid",
    placeItems: "center",
    alignContent: "center",
    gap: THEME.SIZE.S1,
    cursor: "pointer",
    backgroundColor: THEME.COLOR.WHITE,
});
const VisuallyHiddenInput = styled$1("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const replaceImportedAppStateThunk = (importedState) => {
    return (dispatch) => {
        dispatch(ComponentRowModelActions.replaceComponentRows(importedState.entities.componentRows));
        dispatch(SolutionBlockModelActions.replaceSolutionBlocks(importedState.entities.solutionBlocks));
        dispatch(DocumentActions.replaceDocument(importedState.document));
    };
};

const DRAFT_SCHEMA_VERSION = "2026-05-18";
const componentSchema = object({
    gmoId: string().nullable(),
    component: string().nullable(),
    volume: number().finite().nullable(),
    unit: string().nullable(),
    concentrationValue: number().finite().nullable(),
    concentrationUnit: string().nullable(),
    note: string().nullable(),
});
const solutionSchema = object({
    title: string().nullable(),
    description: string().nullable(),
    components: array(componentSchema),
});
const provenanceSchema = object({
    importSourceGmId: string().nullable(),
    originalMediaId: string().nullable(),
    sourceUrl: string().nullable(),
});
const appDataSchema = object({
    schemaVersion: literal(DRAFT_SCHEMA_VERSION),
    title: string().nullable(),
    description: string().nullable(),
    provenance: provenanceSchema,
    solutions: array(solutionSchema),
});

const mapAppStateToDraftAppData = (state) => {
    return {
        schemaVersion: DRAFT_SCHEMA_VERSION,
        title: state.document.title,
        description: state.document.description,
        provenance: mapDocumentProvenanceToDraft(state.document.provenance),
        solutions: state.document.solutions.flatMap((solutionId) => {
            const solution = state.entities.solutionBlocks.entities[solutionId];
            if (!solution) {
                return [];
            }
            return [
                {
                    title: solution.title,
                    description: solution.description,
                    components: solution.components.flatMap((componentId) => {
                        const component = state.entities.componentRows.entities[componentId];
                        if (!component) {
                            return [];
                        }
                        return [
                            {
                                gmoId: component.gmoId,
                                component: component.component,
                                volume: component.volume,
                                unit: component.unit,
                                concentrationValue: component.concentrationValue ?? null,
                                concentrationUnit: component.concentrationUnit ?? "",
                                note: component.note,
                            },
                        ];
                    }),
                },
            ];
        }),
    };
};
const mapDraftAppDataToAppState = (input, options) => {
    const parseResult = appDataSchema.safeParse(input);
    if (!parseResult.success) {
        return {
            success: false,
            error: parseResult.error,
            warnings: [],
        };
    }
    const warnings = [];
    const draft = parseResult.data;
    const componentCandidateByGmoId = createComponentCandidateMap(options.componentCandidates);
    if (!componentCandidateByGmoId && hasAnyGmoId(draft)) {
        warnings.push({
            code: "gmo-id-validation-skipped",
            path: ["solutions"],
            message: "GMO ID validation was skipped because component candidates were not provided.",
        });
    }
    const solutionIds = [];
    const solutionBlockEntities = {};
    const componentRowIds = [];
    const componentRowEntities = {};
    draft.solutions.forEach((solution, solutionIndex) => {
        const solutionId = options.createId({ kind: "solution", solutionIndex });
        const componentIds = [];
        solution.components.forEach((component, componentIndex) => {
            const componentId = options.createId({
                kind: "component",
                solutionIndex,
                componentIndex,
            });
            const normalizedGmoComponent = normalizeGmoComponent({
                gmoId: normalizeString(component.gmoId, ["solutions", solutionIndex, "components", componentIndex, "gmoId"], warnings),
                component: normalizeString(component.component, ["solutions", solutionIndex, "components", componentIndex, "component"], warnings),
                componentCandidateByGmoId,
                path: ["solutions", solutionIndex, "components", componentIndex],
                warnings,
            });
            componentIds.push(componentId);
            componentRowIds.push(componentId);
            componentRowEntities[componentId] = {
                id: componentId,
                gmoId: normalizedGmoComponent.gmoId,
                component: normalizedGmoComponent.component,
                volume: normalizeNumber(component.volume),
                unit: normalizeString(component.unit, ["solutions", solutionIndex, "components", componentIndex, "unit"], warnings),
                concentrationValue: normalizeNumber(component.concentrationValue),
                concentrationUnit: normalizeString(component.concentrationUnit, ["solutions", solutionIndex, "components", componentIndex, "concentrationUnit"], warnings),
                note: normalizeString(component.note, ["solutions", solutionIndex, "components", componentIndex, "note"], warnings),
            };
        });
        solutionIds.push(solutionId);
        solutionBlockEntities[solutionId] = {
            id: solutionId,
            title: normalizeString(solution.title, ["solutions", solutionIndex, "title"], warnings),
            description: normalizeString(solution.description, ["solutions", solutionIndex, "description"], warnings),
            components: componentIds,
        };
    });
    return {
        success: true,
        draft,
        warnings,
        state: {
            entities: {
                componentRows: {
                    ids: componentRowIds,
                    entities: componentRowEntities,
                },
                solutionBlocks: {
                    ids: solutionIds,
                    entities: solutionBlockEntities,
                },
            },
            document: {
                title: normalizeString(draft.title, ["title"], warnings),
                description: normalizeString(draft.description, ["description"], warnings),
                provenance: {
                    importSourceGmId: normalizeString(draft.provenance.importSourceGmId, ["provenance", "importSourceGmId"], warnings),
                    originalMediaId: normalizeString(draft.provenance.originalMediaId, ["provenance", "originalMediaId"], warnings),
                    sourceUrl: normalizeString(draft.provenance.sourceUrl, ["provenance", "sourceUrl"], warnings),
                },
                solutions: solutionIds,
            },
            feedback: createInitialFeedbackState(),
        },
    };
};
const normalizeString = (value, path, warnings) => {
    if (value !== null) {
        return value;
    }
    warnings.push({
        code: "null-normalized",
        path,
        message: `Null at ${formatPath$1(path)} was normalized to an empty string.`,
    });
    return "";
};
const normalizeNumber = (value, _path) => value;
const mapDocumentProvenanceToDraft = (provenance) => {
    if (!provenance) {
        return {
            importSourceGmId: null,
            originalMediaId: null,
            sourceUrl: null,
        };
    }
    const normalizedProvenance = createBlankDocumentProvenance(provenance);
    return {
        importSourceGmId: normalizedProvenance.importSourceGmId,
        originalMediaId: normalizedProvenance.originalMediaId,
        sourceUrl: normalizedProvenance.sourceUrl,
    };
};
const normalizeGmoComponent = ({ gmoId, component, componentCandidateByGmoId, path, warnings, }) => {
    if (!componentCandidateByGmoId || gmoId === "") {
        return { gmoId, component };
    }
    const candidate = componentCandidateByGmoId.get(gmoId);
    if (!candidate) {
        warnings.push({
            code: "invalid-gmo-id",
            path: [...path, "gmoId"],
            message: `Unknown GMO ID ${gmoId} was normalized to an empty string.`,
        });
        return { gmoId: "", component };
    }
    if (component !== candidate.name) {
        warnings.push({
            code: "component-name-normalized",
            path: [...path, "component"],
            message: `Component name for ${gmoId} was normalized to ${candidate.name}.`,
        });
        return { gmoId, component: candidate.name };
    }
    return { gmoId, component };
};
const createComponentCandidateMap = (componentCandidates) => {
    if (!componentCandidates) {
        return undefined;
    }
    const componentCandidateByGmoId = new Map();
    for (const candidate of componentCandidates) {
        if (candidate.gmoId !== "" && !componentCandidateByGmoId.has(candidate.gmoId)) {
            componentCandidateByGmoId.set(candidate.gmoId, candidate);
        }
    }
    return componentCandidateByGmoId;
};
const hasAnyGmoId = (draft) => {
    return draft.solutions.some((solution) => solution.components.some((component) => component.gmoId !== null && component.gmoId !== ""));
};
const formatPath$1 = (path) => path.map(String).join(".");

const FALLBACK_FILENAME_PREFIX = "medium-builder-draft";
const JSON_MIME_TYPE = "application/json";
const createDraftFilename = (title, now = new Date()) => {
    const basename = createFilenameBasename(title) || FALLBACK_FILENAME_PREFIX;
    return `${basename}-${formatLocalDate(now)}.json`;
};
const createDraftJson = (state) => {
    return JSON.stringify(mapAppStateToDraftAppData(state), null, 2);
};
const downloadDraft = (state, options = {}) => {
    const json = createDraftJson(state);
    const filename = createDraftFilename(state.document.title, options.now);
    downloadTextFile({
        content: json,
        filename,
        mimeType: JSON_MIME_TYPE,
        documentRef: options.document ?? globalThis.document,
        urlRef: options.url ?? globalThis.URL,
    });
    return { filename, json };
};
const createFilenameBasename = (title) => {
    const sanitizedTitle = Array.from(title.normalize("NFKC"))
        .filter((character) => character.charCodeAt(0) > 31 && !`"*/:<>?\\|`.includes(character))
        .join("");
    return sanitizedTitle
        .trim()
        .replace(/\s+/gu, "-")
        .replace(/-+/gu, "-")
        .replace(/^[.-]+|[.-]+$/gu, "");
};
const formatLocalDate = (date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
};
const downloadTextFile = ({ content, filename, mimeType, documentRef, urlRef, }) => {
    if (!documentRef || !urlRef?.createObjectURL || !urlRef?.revokeObjectURL) {
        throw new Error("Browser download APIs are unavailable.");
    }
    const blob = new Blob([content], { type: mimeType });
    const objectUrl = urlRef.createObjectURL(blob);
    const anchor = documentRef.createElement("a");
    anchor.href = objectUrl;
    anchor.download = filename;
    anchor.style.display = "none";
    try {
        documentRef.body.append(anchor);
        anchor.click();
    }
    finally {
        anchor.remove();
        urlRef.revokeObjectURL(objectUrl);
    }
};

const formatComponentLabel = (label) => {
    return label.includes(";") ? decodeHTMLEntities(label) : label;
};

const importDraftJson = async (file, dependencies = {}) => {
    const readFileText = dependencies.readFileText ?? ((targetFile) => targetFile.text());
    const createId = dependencies.createId ?? createImportId;
    const fetchComponents = dependencies.fetchComponents ?? fetchComponentCandidatesFromApi;
    const warnings = [];
    let fileText;
    try {
        fileText = await readFileText(file);
    }
    catch (error) {
        return {
            success: false,
            warnings,
            error: {
                code: "file-read-failed",
                message: "Import failed.",
                detail: error instanceof Error ? error.message : "The selected file could not be read.",
            },
        };
    }
    const parseResult = parseJson(fileText);
    if (!parseResult.success) {
        return {
            success: false,
            warnings,
            error: {
                code: "invalid-json",
                message: "Import failed.",
                detail: parseResult.detail,
            },
        };
    }
    const schemaVersion = getSchemaVersion(parseResult.value);
    if (schemaVersion !== DRAFT_SCHEMA_VERSION) {
        return {
            success: false,
            warnings,
            error: {
                code: "unsupported-schema-version",
                message: "Import failed.",
                detail: `Unsupported schemaVersion. Expected ${DRAFT_SCHEMA_VERSION}.`,
            },
        };
    }
    const schemaResult = appDataSchema.safeParse(parseResult.value);
    if (!schemaResult.success) {
        return {
            success: false,
            warnings,
            error: {
                code: "schema-validation-failed",
                message: "Import failed.",
                detail: formatZodError(schemaResult.error),
            },
        };
    }
    const componentCandidates = await fetchComponentCandidates(fetchComponents, warnings);
    const mapResult = mapDraftAppDataToAppState(schemaResult.data, {
        createId,
        ...(componentCandidates ? { componentCandidates } : {}),
    });
    warnings.push(...mapResult.warnings);
    if (!mapResult.success) {
        return {
            success: false,
            warnings,
            error: {
                code: "mapper-failed",
                message: "Import failed.",
                detail: formatZodError(mapResult.error),
            },
        };
    }
    return {
        success: true,
        state: mapResult.state,
        warnings,
    };
};
const logImportWarnings = (warnings, warn = console.warn) => {
    for (const warning of warnings) {
        const location = warning.path.length > 0 ? ` at ${formatPath(warning.path)}` : "";
        if (warning.code === "component-candidates-fetch-failed") {
            warn(`[Import] ${warning.message}`, warning.error);
            continue;
        }
        warn(`[Import] ${warning.code}${location}: ${warning.message}`);
    }
};
const createImportId = (params) => {
    return `${params.kind}-${nanoid()}`;
};
const parseJson = (text) => {
    try {
        return { success: true, value: JSON.parse(text) };
    }
    catch (error) {
        return {
            success: false,
            detail: error instanceof Error ? error.message : "The selected file is not valid JSON.",
        };
    }
};
const getSchemaVersion = (value) => {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
        return undefined;
    }
    return value.schemaVersion;
};
const fetchComponentCandidates = async (fetchComponents, warnings) => {
    try {
        const components = await fetchComponents();
        return components.map((component) => ({
            gmoId: component.gmo_id,
            name: formatComponentLabel(component.name),
        }));
    }
    catch (error) {
        warnings.push({
            code: "component-candidates-fetch-failed",
            path: [],
            message: "Component candidates could not be fetched. GMO ID validation was skipped.",
            error,
        });
        return undefined;
    }
};
const fetchComponentCandidatesFromApi = async () => {
    const params = { gmo_ids: "" };
    const url = makeApiUrl(PATH_COMPONENTS_WITH_COMPONENTS, new URLSearchParams(params));
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Component candidates request failed with HTTP ${response.status}.`);
    }
    return response.json();
};
const formatZodError = (error) => {
    const firstIssue = error.issues[0];
    if (!firstIssue) {
        return "The selected file does not match the Medium Builder draft format.";
    }
    const location = firstIssue.path.length > 0 ? `${formatPath(firstIssue.path)}: ` : "";
    return `${location}${firstIssue.message}`;
};
const formatPath = (path) => path.map(String).join(".");

const MediumInfo = () => {
    const dispatch = useAppDispatch();
    const store = useStore();
    const title = useAppSelector(DocumentSelectors.selectTitle);
    const description = useAppSelector(DocumentSelectors.selectDescription);
    const { showSuccess, showError } = useFeedback();
    const [isImportDialogOpen, setIsImportDialogOpen] = reactExports.useState(false);
    const [selectedImportFile, setSelectedImportFile] = reactExports.useState(null);
    const [isImporting, setIsImporting] = reactExports.useState(false);
    const handleChangeTitle = (event) => {
        dispatch(DocumentActions.setTitle(event.target.value));
    };
    const handleChangeDescription = (event) => {
        dispatch(DocumentActions.setDescription(event.target.value));
    };
    const handleOpenImportDialog = () => {
        setIsImportDialogOpen(true);
    };
    const handleSaveDraftJson = () => {
        try {
            const { filename } = downloadDraft(store.getState());
            showSuccess(`Saved ${filename}.`);
        }
        catch (error) {
            showError({
                message: "Export failed.",
                detail: error instanceof Error ? error.message : "The draft JSON could not be downloaded.",
            });
        }
    };
    const handleCloseImportDialog = () => {
        setIsImportDialogOpen(false);
        setSelectedImportFile(null);
    };
    const handleImportDraftJson = async (file) => {
        if (isImporting) {
            return;
        }
        setIsImporting(true);
        try {
            const result = await importDraftJson(file);
            logImportWarnings(result.warnings);
            if (!result.success) {
                showError({
                    message: result.error.message,
                    detail: result.error.detail,
                });
                return;
            }
            dispatch(replaceImportedAppStateThunk(result.state));
            handleCloseImportDialog();
            showSuccess(`Imported ${file.name}.`);
        }
        finally {
            setIsImporting(false);
        }
    };
    return (jsxs(Wrapper$2, { children: [jsxs(Fields, { children: [jsx(TextField, { fullWidth: true, placeholder: "Medium name", size: "small", value: title, onChange: handleChangeTitle }), jsx(TextField, { fullWidth: true, placeholder: "Medium description", multiline: true, size: "small", rows: 3, value: description, onChange: handleChangeDescription })] }), jsxs(Actions, { children: [jsx(Button, { variant: "contained", size: "small", disableElevation: true, sx: { textTransform: "none" }, onClick: handleSaveDraftJson, children: "Save as .json" }), jsx(Button, { variant: "contained", size: "small", disableElevation: true, sx: { textTransform: "none" }, onClick: handleOpenImportDialog, children: "Upload .json" })] }), jsx(ImportDialog, { open: isImportDialogOpen, selectedFile: selectedImportFile, onClose: handleCloseImportDialog, onFileSelect: setSelectedImportFile, onImport: handleImportDraftJson })] }));
};
const Wrapper$2 = styled$1("header")({
    padding: THEME.SIZE.S2,
    borderRadius: THEME.ROUND.BASE,
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: THEME.SIZE.S2,
    backgroundColor: THEME.COLOR.WHITE,
});
const Actions = styled$1("div")({
    display: "flex",
    flexDirection: "column",
    gap: THEME.SIZE.S1,
});
const Fields = styled$1("div")({
    display: "grid",
    gap: THEME.SIZE.S1,
    flex: 1,
});

const VerticalEllipsisIcon = ({ sx }) => {
    return (jsx(Wrapper$1, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 640 640", sx: sx, children: jsx("path", { d: "M368 144C368 170.5 346.5 192 320 192C293.5 192 272 170.5 272 144C272 117.5 293.5 96 320 96C346.5 96 368 117.5 368 144zM272 320C272 293.5 293.5 272 320 272C346.5 272 368 293.5 368 320C368 346.5 346.5 368 320 368C293.5 368 272 346.5 272 320zM368 496C368 522.5 346.5 544 320 544C293.5 544 272 522.5 272 496C272 469.5 293.5 448 320 448C346.5 448 368 469.5 368 496z" }) }));
};
const Wrapper$1 = styled$1("svg")({});

const fetchAllComponents = async () => {
    const params = { gmo_ids: "" };
    const url = makeApiUrl(PATH_COMPONENTS_WITH_COMPONENTS, new URLSearchParams(params));
    const res = await fetch(url);
    if (res.ok) {
        return res.json();
    }
    else {
        return [];
    }
};

const deleteComponentRowThunk = (solutionBlockId, componentRowId) => {
    return (dispatch, getState) => {
        const solutionBlock = SolutionBlockSelectors.selectById(getState(), solutionBlockId);
        if (!solutionBlock || solutionBlock.components.length <= 1) {
            return;
        }
        dispatch(ComponentRowModelActions.removeComponentRow(componentRowId));
        dispatch(SolutionBlockModelActions.updateSolutionBlock({
            id: solutionBlockId,
            changes: {
                components: solutionBlock.components.filter((id) => id !== componentRowId),
            },
        }));
    };
};

const duplicateComponentRowThunk = (solutionBlockId, componentRowId) => {
    return (dispatch, getState) => {
        const state = getState();
        const solutionBlock = SolutionBlockSelectors.selectById(state, solutionBlockId);
        const componentRow = ComponentRowSelectors.selectById(state, componentRowId);
        if (!solutionBlock || !componentRow) {
            return;
        }
        const currentIndex = solutionBlock.components.indexOf(componentRowId);
        if (currentIndex < 0) {
            return;
        }
        const duplicatedComponentRow = createBlankComponentRow({
            gmoId: componentRow.gmoId,
            component: componentRow.component,
            volume: componentRow.volume,
            unit: componentRow.unit,
            concentrationValue: componentRow.concentrationValue,
            concentrationUnit: componentRow.concentrationUnit,
            note: componentRow.note,
        });
        const nextComponents = [...solutionBlock.components];
        nextComponents.splice(currentIndex + 1, 0, duplicatedComponentRow.id);
        dispatch(ComponentRowModelActions.addComponentRow(duplicatedComponentRow));
        dispatch(SolutionBlockModelActions.updateSolutionBlock({
            id: solutionBlockId,
            changes: {
                components: nextComponents,
            },
        }));
    };
};

const moveComponentRowThunk = (solutionBlockId, componentRowId, direction) => {
    return (dispatch, getState) => {
        const solutionBlock = SolutionBlockSelectors.selectById(getState(), solutionBlockId);
        if (!solutionBlock) {
            return;
        }
        const currentIndex = solutionBlock.components.indexOf(componentRowId);
        if (currentIndex < 0) {
            return;
        }
        const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
        if (targetIndex < 0 || targetIndex >= solutionBlock.components.length) {
            return;
        }
        const nextComponents = [...solutionBlock.components];
        const currentValue = nextComponents[currentIndex];
        const targetValue = nextComponents[targetIndex];
        nextComponents[currentIndex] = targetValue;
        nextComponents[targetIndex] = currentValue;
        dispatch(SolutionBlockModelActions.updateSolutionBlock({
            id: solutionBlockId,
            changes: {
                components: nextComponents,
            },
        }));
    };
};

const units = [
    {
        label: "mg",
        value: "mg",
    },
    {
        label: "g",
        value: "g",
    },
    {
        label: "ml",
        value: "ml",
    },
    {
        label: "l",
        value: "l",
    },
];
const concentrationUnits = [
    {
        label: "mM",
        value: "mM",
    },
    {
        label: "uM",
        value: "uM",
    },
    {
        label: "%",
        value: "%",
    },
    {
        label: "x",
        value: "x",
    },
];
const ComponentRow = ({ id, solutionBlockId }) => {
    const componentRow = useAppSelector((state) => ComponentRowSelectors.selectById(state, id));
    const { components, isSuccess } = useComponentsData();
    const { handleChangeComponent, handleInputComponent, handleChangeVolume, handleChangeUnit, handleInputUnit, handleChangeConcentrationValue, handleChangeConcentrationUnit, handleInputConcentrationUnit, handleChangeNote, } = useInputHandlers$1(id);
    const { solutionBlock, anchorEl, open, handleClose, handleClick, handleClickDeleteRow, handleClickDuplicateRow, handleClickMoveRowUp, handleClickMoveRowDown, disableDelete, disableMoveRowUp, disableMoveRowDown, } = useMenu$1(id, solutionBlockId);
    if (!componentRow || !solutionBlock) {
        return null;
    }
    return (jsxs(ComponentTableRow, { children: [jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [jsx(IconButton, { size: "small", id: "basic-button", "aria-controls": open ? "basic-menu" : undefined, "aria-haspopup": "true", "aria-expanded": open ? "true" : undefined, onClick: handleClick, children: jsx(VerticalEllipsisIcon, { sx: { fill: "black", width: "16px" } }) }), jsxs(Menu, { id: "basic-menu", disablePortal: true, anchorEl: anchorEl, open: open, onClose: handleClose, slotProps: {
                            list: {
                                "aria-labelledby": "basic-button",
                            },
                        }, children: [jsx(MenuItem, { onClick: handleClickDuplicateRow, children: "Duplicate row" }), jsx(MenuItem, { onClick: handleClickDeleteRow, disabled: disableDelete, children: "Delete row" }), jsx(MenuItem, { onClick: handleClickMoveRowUp, disabled: disableMoveRowUp, children: "Move row up" }), jsx(MenuItem, { onClick: handleClickMoveRowDown, disabled: disableMoveRowDown, children: "Move row down" })] })] }), jsxs(ComponentInputCell, { children: [jsx(GmoIdLabel, { children: componentRow.gmoId || "No GMO ID" }), jsx(Autocomplete, { freeSolo: true, size: "small", disablePortal: true, disabled: !isSuccess, options: components, sx: { width: 300, flex: "0 0 auto" }, inputValue: componentRow.component, value: components.find((component) => component.gmoId === componentRow.gmoId) ?? null, getOptionLabel: (option) => (typeof option === "string" ? option : option.label), isOptionEqualToValue: (option, value) => typeof value === "string" ? option.label === value : option.gmoId === value.gmoId, onChange: handleChangeComponent, onInputChange: handleInputComponent, renderInput: (params) => (jsx(TextField, { ...params, slotProps: {
                                htmlInput: {
                                    ...params.inputProps,
                                    "aria-label": "Component",
                                },
                            } })) })] }), jsx("div", { children: jsx(TextField, { size: "small", value: formatNullableNumberInput(componentRow.volume), onChange: handleChangeVolume, slotProps: {
                        htmlInput: {
                            "aria-label": "Volume",
                        },
                    } }) }), jsx("div", { children: jsx(Autocomplete, { freeSolo: true, size: "small", disablePortal: true, options: units, 
                    // sx={{ width: 110 }}
                    inputValue: componentRow.unit, value: componentRow.unit, onChange: handleChangeUnit, onInputChange: handleInputUnit, getOptionLabel: getUnitOptionLabel, renderInput: (params) => (jsx(TextField, { ...params, slotProps: {
                            htmlInput: {
                                ...params.inputProps,
                                "aria-label": "Unit",
                            },
                        } })) }) }), jsx("div", { children: jsx(TextField, { size: "small", value: formatNullableNumberInput(componentRow.concentrationValue ?? null), onChange: handleChangeConcentrationValue, slotProps: {
                        htmlInput: {
                            "aria-label": "Concentration",
                        },
                    } }) }), jsx("div", { children: jsx(Autocomplete, { freeSolo: true, size: "small", disablePortal: true, options: concentrationUnits, inputValue: componentRow.concentrationUnit ?? "", value: componentRow.concentrationUnit ?? "", onChange: handleChangeConcentrationUnit, onInputChange: handleInputConcentrationUnit, getOptionLabel: getUnitOptionLabel, renderInput: (params) => (jsx(TextField, { ...params, slotProps: {
                            htmlInput: {
                                ...params.inputProps,
                                "aria-label": "Concentration unit",
                            },
                        } })) }) }), jsx("div", { children: jsx(TextField, { sx: { width: "100%" }, size: "small", value: componentRow.note, onChange: handleChangeNote, slotProps: {
                        htmlInput: {
                            "aria-label": "Component note",
                        },
                    } }) })] }));
};
const useComponentsData = () => {
    const { data, isSuccess } = useQuery({
        queryKey: ["allComponents"],
        queryFn: fetchAllComponents,
        placeholderData: [],
        staleTime: Infinity,
        retryOnMount: false,
    });
    const components = (data ?? []).map((c) => ({
        label: formatComponentLabel(c.name),
        gmoId: c.gmo_id,
    }));
    return { components, isSuccess };
};
const useInputHandlers$1 = (id) => {
    const dispatch = useAppDispatch();
    const handleChangeComponent = (_event, value) => {
        const component = typeof value === "string" ? value : (value?.label ?? "");
        const gmoId = typeof value === "string" ? "" : (value?.gmoId ?? "");
        dispatch(ComponentRowModelActions.updateComponentRow({
            id,
            changes: {
                gmoId,
                component,
            },
        }));
    };
    const handleInputComponent = (_event, value, reason) => {
        if (reason === "reset") {
            return;
        }
        dispatch(ComponentRowModelActions.updateComponentRow({
            id,
            changes: {
                gmoId: "",
                component: value,
            },
        }));
    };
    const handleChangeVolume = (event) => {
        const nextVolume = parseNullableNumberInput(event.target.value);
        dispatch(ComponentRowModelActions.updateComponentRow({
            id,
            changes: {
                volume: Number.isNaN(nextVolume) ? 0 : nextVolume,
            },
        }));
    };
    const handleChangeUnit = (_event, value) => {
        updateUnit(getUnitValue(value));
    };
    const handleInputUnit = (_event, value, reason) => {
        if (reason === "reset") {
            return;
        }
        updateUnit(value);
    };
    const updateUnit = (unit) => {
        dispatch(ComponentRowModelActions.updateComponentRow({
            id,
            changes: {
                unit,
            },
        }));
    };
    const handleChangeConcentrationValue = (event) => {
        const nextConcentrationValue = parseNullableNumberInput(event.target.value);
        dispatch(ComponentRowModelActions.updateComponentRow({
            id,
            changes: {
                concentrationValue: nextConcentrationValue,
            },
        }));
    };
    const handleChangeConcentrationUnit = (_event, value) => {
        updateConcentrationUnit(getUnitValue(value));
    };
    const handleInputConcentrationUnit = (_event, value, reason) => {
        if (reason === "reset") {
            return;
        }
        updateConcentrationUnit(value);
    };
    const updateConcentrationUnit = (concentrationUnit) => {
        dispatch(ComponentRowModelActions.updateComponentRow({
            id,
            changes: {
                concentrationUnit,
            },
        }));
    };
    const handleChangeNote = (event) => {
        dispatch(ComponentRowModelActions.updateComponentRow({
            id,
            changes: {
                note: event.target.value,
            },
        }));
    };
    return {
        handleChangeComponent,
        handleInputComponent,
        handleChangeVolume,
        handleChangeUnit,
        handleInputUnit,
        handleChangeConcentrationValue,
        handleChangeConcentrationUnit,
        handleInputConcentrationUnit,
        handleChangeNote,
    };
};
const useMenu$1 = (id, solutionBlockId) => {
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const solutionBlock = useAppSelector((state) => SolutionBlockSelectors.selectById(state, solutionBlockId));
    const open = Boolean(anchorEl);
    const componentRowIds = solutionBlock?.components ?? [];
    const componentRowIndex = componentRowIds.indexOf(id);
    const disableDelete = componentRowIds.length <= 1;
    const disableMoveRowUp = componentRowIndex <= 0;
    const disableMoveRowDown = componentRowIndex < 0 || componentRowIndex >= componentRowIds.length - 1;
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClickDeleteRow = () => {
        dispatch(deleteComponentRowThunk(solutionBlockId, id));
        handleClose();
    };
    const handleClickDuplicateRow = () => {
        dispatch(duplicateComponentRowThunk(solutionBlockId, id));
        handleClose();
    };
    const handleClickMoveRowUp = () => {
        dispatch(moveComponentRowThunk(solutionBlockId, id, "up"));
        handleClose();
    };
    const handleClickMoveRowDown = () => {
        dispatch(moveComponentRowThunk(solutionBlockId, id, "down"));
        handleClose();
    };
    return {
        solutionBlock,
        anchorEl,
        open,
        handleClose,
        handleClick,
        handleClickDeleteRow,
        handleClickDuplicateRow,
        handleClickMoveRowUp,
        handleClickMoveRowDown,
        disableDelete,
        disableMoveRowUp,
        disableMoveRowDown,
    };
};
const formatNullableNumberInput = (value) => (value === null ? "" : String(value));
const parseNullableNumberInput = (value) => {
    if (value.trim() === "") {
        return null;
    }
    const numericValue = Number(value);
    return Number.isFinite(numericValue) ? numericValue : null;
};
const getUnitOptionLabel = (option) => typeof option === "string" ? option : option.label;
const getUnitValue = (value) => typeof value === "string" ? value : (value?.value ?? "");
const ComponentTableRow = styled$1(TableRow)({
    gridColumn: "span 7",
});
const ComponentInputCell = styled$1("div")({
    display: "flex",
    alignItems: "center",
    gap: "8px",
});
const GmoIdLabel = styled$1("span")({
    flex: "0 0 76px",
    fontSize: "0.75rem",
    lineHeight: 1.2,
    color: "rgba(0, 0, 0, 0.6)",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
});

const selectSolutionComponentRows = createSelector([
    (_state, solutionBlockId) => solutionBlockId,
    SolutionBlockSelectors.selectEntities,
    ComponentRowSelectors.selectEntities,
], (solutionBlockId, solutionEntities, componentRowEntities) => {
    const solution = solutionEntities[solutionBlockId];
    if (!solution) {
        return [];
    }
    return solution.components
        .map((componentRowId) => componentRowEntities[componentRowId])
        .filter((row) => row !== undefined);
});

const addComponentRowThunk = (solutionBlockId) => {
    return (dispatch, getState) => {
        const componentRow = createBlankComponentRow();
        const solutionBlock = SolutionBlockSelectors.selectById(getState(), solutionBlockId);
        if (!solutionBlock) {
            return;
        }
        dispatch(ComponentRowModelActions.addComponentRow(componentRow));
        dispatch(SolutionBlockModelActions.updateSolutionBlock({
            id: solutionBlockId,
            changes: {
                components: [...solutionBlock.components, componentRow.id],
            },
        }));
    };
};

const deleteSolutionThunk = (solutionBlockId) => {
    return (dispatch, getState) => {
        const solutions = DocumentSelectors.selectSolutions(getState());
        const solutionBlock = SolutionBlockSelectors.selectById(getState(), solutionBlockId);
        if (!solutionBlock || solutions.length <= 1) {
            return;
        }
        dispatch(ComponentRowModelActions.removeComponentRows(solutionBlock.components));
        dispatch(SolutionBlockModelActions.removeSolutionBlock(solutionBlockId));
        dispatch(DocumentActions.removeSolution(solutionBlockId));
    };
};

const duplicateSolutionThunk = (solutionBlockId) => {
    return (dispatch, getState) => {
        const state = getState();
        const solutions = DocumentSelectors.selectSolutions(state);
        const solutionBlock = SolutionBlockSelectors.selectById(state, solutionBlockId);
        if (!solutionBlock) {
            return;
        }
        const currentIndex = solutions.indexOf(solutionBlockId);
        if (currentIndex < 0) {
            return;
        }
        const duplicatedComponentRows = solutionBlock.components
            .map((componentRowId) => ComponentRowSelectors.selectById(state, componentRowId))
            .filter((componentRow) => componentRow !== undefined)
            .map((componentRow) => createBlankComponentRow({
            gmoId: componentRow.gmoId,
            component: componentRow.component,
            volume: componentRow.volume,
            unit: componentRow.unit,
            concentrationValue: componentRow.concentrationValue,
            concentrationUnit: componentRow.concentrationUnit,
            note: componentRow.note,
        }));
        const duplicatedSolutionBlock = createBlankSolutionBlock({
            title: solutionBlock.title,
            description: solutionBlock.description,
            components: duplicatedComponentRows.map((componentRow) => componentRow.id),
        });
        const nextSolutions = [...solutions];
        nextSolutions.splice(currentIndex + 1, 0, duplicatedSolutionBlock.id);
        duplicatedComponentRows.forEach((componentRow) => {
            dispatch(ComponentRowModelActions.addComponentRow(componentRow));
        });
        dispatch(SolutionBlockModelActions.addSolutionBlock(duplicatedSolutionBlock));
        dispatch(DocumentActions.setSolutions(nextSolutions));
    };
};

const moveSolutionThunk = (solutionBlockId, direction) => {
    return (dispatch, getState) => {
        const solutions = DocumentSelectors.selectSolutions(getState());
        const currentIndex = solutions.indexOf(solutionBlockId);
        if (currentIndex < 0) {
            return;
        }
        const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
        if (targetIndex < 0 || targetIndex >= solutions.length) {
            return;
        }
        const nextSolutions = [...solutions];
        const currentValue = nextSolutions[currentIndex];
        const targetValue = nextSolutions[targetIndex];
        nextSolutions[currentIndex] = targetValue;
        nextSolutions[targetIndex] = currentValue;
        dispatch(DocumentActions.setSolutions(nextSolutions));
    };
};

var ArrowDropDownIcon = createSvgIcon(/*#__PURE__*/jsxRuntimeExports.jsx("path", {
  d: "m7 10 5 5 5-5z"
}));

var ArrowRightIcon = createSvgIcon(/*#__PURE__*/jsxRuntimeExports.jsx("path", {
  d: "m10 17 5-5-5-5z"
}));

const SolutionBlock = ({ id }) => {
    const solution = useAppSelector((state) => SolutionBlockSelectors.selectById(state, id));
    const componentRows = useAppSelector((state) => selectSolutionComponentRows(state, id));
    const { handleClickAddComponentRow, handleChangeTitle, handleChangeDescription } = useInputHandlers(id);
    const [isNoteOpen, setIsNoteOpen] = reactExports.useState(false);
    const { anchorEl, open, handleClose, handleClick, handleClickDeleteBlock, handleClickDuplicateBlock, handleClickMoveBlockUp, handleClickMoveBlockDown, disableDelete, disableMoveBlockUp, disableMoveBlockDown, } = useMenu(id);
    if (!solution) {
        return null;
    }
    return (jsxs(Block, { children: [jsxs(TitleRow, { children: [jsxs("div", { style: { display: "flex", alignItems: "center" }, children: [jsx(IconButton, { size: "small", id: "basic-button", "aria-controls": open ? "basic-menu" : undefined, "aria-haspopup": "true", "aria-expanded": open ? "true" : undefined, onClick: handleClick, children: jsx(VerticalEllipsisIcon, { sx: { fill: "black", width: "16px" } }) }), jsxs(Menu, { id: "basic-menu", disablePortal: true, anchorEl: anchorEl, open: open, onClose: handleClose, slotProps: {
                                    list: {
                                        "aria-labelledby": "basic-button",
                                    },
                                }, children: [jsx(MenuItem, { onClick: handleClickDuplicateBlock, children: "Duplicate Block" }), jsx(MenuItem, { onClick: handleClickDeleteBlock, disabled: disableDelete, children: "Delete Block" }), jsx(MenuItem, { onClick: handleClickMoveBlockUp, disabled: disableMoveBlockUp, children: "Move Block up" }), jsx(MenuItem, { onClick: handleClickMoveBlockDown, disabled: disableMoveBlockDown, children: "Move Block down" })] })] }), jsx("div", { style: { gridColumn: "span 6" }, children: jsx(TextField, { fullWidth: true, placeholder: "Solution name", size: "small", value: solution.title, onChange: handleChangeTitle }) })] }), jsxs(ComponentTable, { children: [jsxs(ComponentHeaderRow, { children: [jsx("div", {}), jsx("div", { children: "Component" }), jsx("div", { children: "Volume" }), jsx("div", { children: "Unit" }), jsx("div", { children: "Conc." }), jsx("div", { children: "Conc. unit" }), jsx("div", { children: "Note" })] }), jsx(ComponentTableBody, { children: componentRows.map((componentRow) => (jsx(ComponentRow, { id: componentRow.id, solutionBlockId: id }, componentRow.id))) }), jsxs(ComponentTableFooter, { children: [jsx(AddButtonWrapper, { children: jsx(Button, { variant: "contained", size: "small", disableElevation: true, sx: { textTransform: "none" }, onClick: handleClickAddComponentRow, children: "Add component row" }) }), jsxs(NoteLabelWrapper, { type: "button", "aria-expanded": isNoteOpen, "aria-controls": `solution-note-${id}`, onClick: () => setIsNoteOpen((prev) => !prev), children: [jsx("span", { children: "Note" }), isNoteOpen ? (jsx(ArrowDropDownIcon, { fontSize: "small" })) : (jsx(ArrowRightIcon, { fontSize: "small" }))] }), isNoteOpen ? (jsx(NoteTextWrapper, { id: `solution-note-${id}`, children: jsx(TextField, { multiline: true, fullWidth: true, rows: 3, value: solution.description, onChange: handleChangeDescription, size: "small", slotProps: {
                                        htmlInput: {
                                            "aria-label": "Solution note",
                                        },
                                    } }) })) : null] })] })] }));
};
const ComponentTable = styled$1("div")({
    display: "grid",
    gridColumn: SPAN_GRID_COLUMNS,
    gridTemplateColumns: "subgrid",
    columnGap: THEME.SIZE.S2,
    rowGap: "0px",
    minWidth: "max-content",
});
const ComponentHeaderRow = styled$1(TableRow)({
    gridColumn: SPAN_GRID_COLUMNS,
});
const ComponentTableBody = styled$1("div")({
    display: "grid",
    gridTemplateColumns: "subgrid",
    gridColumn: SPAN_GRID_COLUMNS,
    rowGap: "10px",
});
const ComponentTableFooter = styled$1("div")({
    display: "grid",
    gridTemplateColumns: "subgrid",
    gridColumn: SPAN_GRID_COLUMNS,
    paddingTop: "10px",
    rowGap: THEME.SIZE.S1,
    gridAutoFlow: "dense",
});
const AddButtonWrapper = styled$1("div")({
    gridColumn: "6/8",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
});
const NoteLabelWrapper = styled$1("button")({
    gridColumn: "2/3",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    whiteSpace: "nowrap",
    width: "fit-content",
    padding: 0,
    border: "none",
    background: "transparent",
    color: "inherit",
    font: "inherit",
    cursor: "pointer",
});
const NoteTextWrapper = styled$1("div")({
    gridColumn: "2/8",
});
const TitleRow = styled$1("div")({
    display: "grid",
    gridColumn: SPAN_GRID_COLUMNS,
    gridTemplateColumns: "subgrid",
});
const useInputHandlers = (id) => {
    const dispatch = useAppDispatch();
    const handleClickAddComponentRow = () => {
        dispatch(addComponentRowThunk(id));
    };
    const handleChangeTitle = (event) => {
        dispatch(SolutionBlockModelActions.updateSolutionBlock({
            id,
            changes: {
                title: event.target.value,
            },
        }));
    };
    const handleChangeDescription = (event) => {
        dispatch(SolutionBlockModelActions.updateSolutionBlock({
            id,
            changes: {
                description: event.target.value,
            },
        }));
    };
    return {
        handleClickAddComponentRow,
        handleChangeTitle,
        handleChangeDescription,
    };
};
const useMenu = (id) => {
    const dispatch = useAppDispatch();
    const solutionIds = useAppSelector(DocumentSelectors.selectSolutions);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const solutionIndex = solutionIds.indexOf(id);
    const disableDelete = solutionIds.length <= 1;
    const disableMoveBlockUp = solutionIndex <= 0;
    const disableMoveBlockDown = solutionIndex < 0 || solutionIndex >= solutionIds.length - 1;
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClickDeleteBlock = () => {
        dispatch(deleteSolutionThunk(id));
        handleClose();
    };
    const handleClickDuplicateBlock = () => {
        dispatch(duplicateSolutionThunk(id));
        handleClose();
    };
    const handleClickMoveBlockUp = () => {
        dispatch(moveSolutionThunk(id, "up"));
        handleClose();
    };
    const handleClickMoveBlockDown = () => {
        dispatch(moveSolutionThunk(id, "down"));
        handleClose();
    };
    return {
        anchorEl,
        open,
        handleClose,
        handleClick,
        handleClickDeleteBlock,
        handleClickDuplicateBlock,
        handleClickMoveBlockUp,
        handleClickMoveBlockDown,
        disableDelete,
        disableMoveBlockUp,
        disableMoveBlockDown,
    };
};

const selectDocumentSolutions = createSelector([DocumentSelectors.selectSolutions, SolutionBlockSelectors.selectEntities], (ids, entities) => {
    return ids.map((id) => entities[id]).filter((entity) => entity !== undefined);
});

const addSolutionThunk = () => {
    return (dispatch) => {
        const componentRow = createBlankComponentRow();
        const block = createBlankSolutionBlock({
            components: [componentRow.id],
        });
        dispatch(ComponentRowModelActions.addComponentRow(componentRow));
        dispatch(SolutionBlockModelActions.addSolutionBlock(block));
        dispatch(DocumentActions.addSolution(block.id));
    };
};

const mapMediumDetailResponseToAppState = (response, options = {}) => {
    const createId = options.createId ?? createMediumDetailImportId;
    const solutionIds = [];
    const solutionBlockEntities = {};
    const componentRowIds = [];
    const componentRowEntities = {};
    const commentMap = createSolutionCommentMap(response);
    response.components.forEach((table, tableIndex) => {
        const solutionId = createId({ kind: "solution", tableIndex });
        const componentIds = [];
        table.items.forEach((component, componentIndex) => {
            const componentId = createId({
                kind: "component",
                tableIndex,
                componentIndex,
            });
            componentIds.push(componentId);
            componentRowIds.push(componentId);
            componentRowEntities[componentId] = mapComponentToRow(component, componentId);
        });
        solutionIds.push(solutionId);
        solutionBlockEntities[solutionId] = mapTableToSolutionBlock(table, solutionId, componentIds, commentMap.get(table.paragraph_index) ?? "");
    });
    return {
        entities: {
            componentRows: {
                ids: componentRowIds,
                entities: componentRowEntities,
            },
            solutionBlocks: {
                ids: solutionIds,
                entities: solutionBlockEntities,
            },
        },
        document: {
            title: response.meta.name,
            description: createDocumentDescription(response.meta),
            provenance: createBlankDocumentProvenance({
                importSourceGmId: response.meta.gm,
                originalMediaId: response.meta.original_media_id ?? "",
                sourceUrl: response.meta.src_url,
            }),
            solutions: solutionIds,
        },
        feedback: createInitialFeedbackState(),
    };
};
const createMediumDetailImportId = (params) => {
    return `${params.kind}-${nanoid()}`;
};
const mapTableToSolutionBlock = (table, id, components, description) => {
    return {
        id,
        title: table.subcomponent_name,
        description,
        components,
    };
};
const mapComponentToRow = (component, id) => {
    const displayComponent = getComponentDisplayName(component);
    return {
        id,
        gmoId: component.gmo_id ?? "",
        component: displayComponent,
        volume: component.volume ?? null,
        unit: component.unit ?? "",
        concentrationValue: component.conc_value ?? null,
        concentrationUnit: component.conc_unit ?? "",
        note: "",
    };
};
const getComponentDisplayName = (component) => {
    if (component.label && component.label.trim() !== "") {
        return formatComponentLabel(component.label);
    }
    return formatComponentLabel(component.component_name);
};
const createDocumentDescription = (meta) => {
    const descriptionLines = [meta.ph ? `pH: ${meta.ph}` : ""];
    return descriptionLines.filter((line) => line !== "").join("\n");
};
const createSolutionCommentMap = (response) => {
    const sortedTables = [...response.components].sort((a, b) => a.paragraph_index - b.paragraph_index);
    const commentsByTableParagraphIndex = new Map();
    response.comments.forEach((comment) => {
        const table = findPreviousTable(sortedTables, comment.paragraph_index);
        if (!table || comment.comment === "") {
            return;
        }
        const comments = commentsByTableParagraphIndex.get(table.paragraph_index) ?? [];
        comments.push(comment.comment);
        commentsByTableParagraphIndex.set(table.paragraph_index, comments);
    });
    return new Map([...commentsByTableParagraphIndex.entries()].map(([paragraphIndex, comments]) => [
        paragraphIndex,
        comments.join("\n"),
    ]));
};
const findPreviousTable = (tables, paragraphIndex) => {
    let previousTable;
    tables.forEach((table) => {
        if (table.paragraph_index < paragraphIndex) {
            previousTable = table;
        }
    });
    return previousTable;
};

const expandReferenceMediumTables = async (response, loadReferenceMedium) => {
    const requests = collectReferenceRequests(response);
    const appendedTables = [];
    const appendedComments = [];
    const loadedReferences = new Map();
    let nextParagraphIndex = getNextParagraphIndex(response);
    for (const request of requests) {
        const referenceResponse = await getReferenceResponse(request, loadReferenceMedium, loadedReferences);
        if (!referenceResponse.success) {
            return referenceResponse;
        }
        const table = findReferencedTable(referenceResponse.response, request.tableName);
        if (!table) {
            return {
                success: false,
                error: {
                    code: "reference-table-missing",
                    message: "Import failed.",
                    detail: `Reference medium ${request.referenceMediaId} does not include table "${request.tableName}".`,
                    referenceMediaId: request.referenceMediaId,
                    tableName: request.tableName,
                },
            };
        }
        const reindexed = createReindexedReferencedRecipeItems(referenceResponse.response, table, nextParagraphIndex);
        nextParagraphIndex = reindexed.nextParagraphIndex;
        appendedTables.push(reindexed.table);
        appendedComments.push(...reindexed.comments);
    }
    return {
        success: true,
        response: {
            ...response,
            components: [...response.components, ...appendedTables],
            comments: [...response.comments, ...appendedComments],
        },
    };
};
const collectReferenceRequests = (response) => {
    const requests = [];
    const seen = new Set();
    response.components.forEach((table) => {
        table.items.forEach((component) => {
            const request = createReferenceRequest(component);
            if (!request) {
                return;
            }
            const key = createReferenceRequestKey(request);
            if (seen.has(key)) {
                return;
            }
            seen.add(key);
            requests.push(request);
        });
    });
    return requests;
};
const createReferenceRequest = (component) => {
    const referenceMediaId = component.reference_media_id?.trim();
    if (!referenceMediaId) {
        return null;
    }
    return {
        referenceMediaId,
        tableName: normalizeReferenceTableName(component.component_name),
    };
};
const createReferenceRequestKey = (request) => {
    return `${request.referenceMediaId}\u0000${request.tableName}`;
};
const getReferenceResponse = async (request, loadReferenceMedium, loadedReferences) => {
    const cached = loadedReferences.get(request.referenceMediaId);
    if (cached) {
        return {
            success: true,
            response: cached,
        };
    }
    try {
        const response = await loadReferenceMedium(request.referenceMediaId);
        loadedReferences.set(request.referenceMediaId, response);
        return {
            success: true,
            response,
        };
    }
    catch (cause) {
        return {
            success: false,
            error: {
                code: "reference-fetch-failed",
                message: "Import failed.",
                detail: `Reference medium ${request.referenceMediaId} could not be fetched.`,
                referenceMediaId: request.referenceMediaId,
                tableName: request.tableName,
                cause,
            },
        };
    }
};
const findReferencedTable = (response, tableName) => {
    return response.components.find((table) => normalizeReferenceTableName(table.subcomponent_name) === tableName);
};
const createReindexedReferencedRecipeItems = (response, table, startParagraphIndex) => {
    const comments = findCommentsForTable(response, table);
    const reindexedTable = {
        ...table,
        paragraph_index: startParagraphIndex,
    };
    const reindexedComments = comments.map((comment, index) => ({
        ...comment,
        paragraph_index: startParagraphIndex + index + 1,
    }));
    return {
        table: reindexedTable,
        comments: reindexedComments,
        nextParagraphIndex: startParagraphIndex + reindexedComments.length + 1,
    };
};
const findCommentsForTable = (response, table) => {
    const nextTable = response.components
        .filter((candidate) => candidate.paragraph_index > table.paragraph_index)
        .sort((a, b) => a.paragraph_index - b.paragraph_index)[0];
    return response.comments.filter((comment) => {
        return (comment.paragraph_index > table.paragraph_index &&
            (!nextTable || comment.paragraph_index < nextTable.paragraph_index));
    });
};
const getNextParagraphIndex = (response) => {
    const maxParagraphIndex = [...response.components, ...response.comments].reduce((max, item) => Math.max(max, item.paragraph_index), 0);
    return maxParagraphIndex + 1;
};
const normalizeReferenceTableName = (value) => {
    return value
        .replace(/ \(.*\)/, "")
        .replace(/\*/g, "")
        .trim();
};

const importMediumDetailByGmId = async (gmId, options = {}) => {
    const loadMediumDetail = options.loadMediumDetail ?? loadMediumDetailFromApi;
    const mainMediumResult = await loadMainMedium(gmId, loadMediumDetail, options.abortController);
    if (!mainMediumResult.success) {
        return mainMediumResult;
    }
    const expansionResult = await expandReferenceMediumTables(mainMediumResult.response, (refGmId) => loadMediumDetail(refGmId, options.abortController));
    if (!expansionResult.success) {
        return {
            success: false,
            error: expansionResult.error,
        };
    }
    return {
        success: true,
        state: mapMediumDetailResponseToAppState(expansionResult.response),
    };
};
const loadMainMedium = async (gmId, loadMediumDetail, abortController) => {
    try {
        return {
            success: true,
            response: await loadMediumDetail(gmId, abortController),
        };
    }
    catch (cause) {
        return {
            success: false,
            error: {
                message: "Import failed.",
                detail: `Medium ${gmId} could not be fetched.`,
                cause,
            },
        };
    }
};
const loadMediumDetailFromApi = async (gmId, abortController) => {
    const response = await getData(makeApiUrl(PATH_MEDIUM_DETAIL), { gm_id: gmId }, abortController);
    if (!response.body) {
        throw new Error(response.message ?? `Medium detail request failed with ${response.status}.`);
    }
    return response.body;
};

const App = ({ sourceGmId }) => {
    const dispatch = useAppDispatch();
    const { showSuccess, showError } = useFeedback();
    const normalizedSourceGmId = reactExports.useMemo(() => sourceGmId?.trim() ?? "", [sourceGmId]);
    const initialImportQuery = useInitialMediumImportQuery(normalizedSourceGmId);
    const onClickAdd = () => {
        dispatch(addSolutionThunk());
    };
    const solutions = useAppSelector(selectDocumentSolutions);
    reactExports.useEffect(() => {
        const result = initialImportQuery.data;
        if (!result) {
            return;
        }
        if (!result.success) {
            showError({
                message: result.error.message,
                detail: result.error.detail,
            });
            return;
        }
        dispatch(replaceImportedAppStateThunk(result.state));
        showSuccess(`Imported ${normalizedSourceGmId}.`);
    }, [dispatch, initialImportQuery.data, normalizedSourceGmId, showError, showSuccess]);
    reactExports.useEffect(() => {
        const error = initialImportQuery.error;
        if (!error) {
            return;
        }
        showError({
            message: "Import failed.",
            detail: error instanceof Error
                ? error.message
                : `Medium ${normalizedSourceGmId} could not be imported.`,
        });
    }, [initialImportQuery.error, normalizedSourceGmId, showError]);
    const isInitialImporting = normalizedSourceGmId !== "" && initialImportQuery.isFetching;
    return (jsxs(Wrapper, { children: [isInitialImporting ? (jsxs(InitialImportStatus, { children: [jsx(LinearProgress$1, {}), jsx("span", { children: "Importing medium..." })] })) : null, jsx(MediumInfo, {}), jsxs(Sheet, { children: [solutions.map((solution) => (jsx(SolutionBlock, { id: solution.id }, solution.id))), jsx(FooterRow, { children: jsx(Button, { variant: "contained", size: "small", disableElevation: true, sx: { textTransform: "none" }, onClick: onClickAdd, children: "Add solution block" }) })] }), jsx(FeedbackSnackbar, {})] }));
};
const useInitialMediumImportQuery = (sourceGmId) => {
    return useQuery({
        queryKey: ["gmdb-medium-builder", "initial-medium-import", sourceGmId],
        queryFn: async ({ signal }) => {
            const abortController = new AbortController();
            const abortImport = () => abortController.abort();
            signal.addEventListener("abort", abortImport, { once: true });
            try {
                if (signal.aborted) {
                    abortImport();
                }
                return await importMediumDetailByGmId(sourceGmId, { abortController });
            }
            finally {
                signal.removeEventListener("abort", abortImport);
            }
        },
        enabled: sourceGmId !== "",
        retry: false,
        staleTime: Infinity,
    });
};
const Wrapper = styled$1("div")({
    minHeight: 100,
    width: "fit-content",
    minWidth: "100%",
    // backgroundColor: "white",
    borderRadius: THEME.ROUND.BASE,
    display: "grid",
    gap: THEME.SIZE.S2,
});
const InitialImportStatus = styled$1("div")({
    display: "grid",
    gap: THEME.SIZE.S1,
    padding: THEME.SIZE.S2,
    borderRadius: THEME.ROUND.BASE,
    backgroundColor: THEME.COLOR.WHITE,
    color: THEME.COLOR.GRAY,
    fontSize: 13,
});
const FooterRow = styled$1("div")({
    gridColumn: SPAN_GRID_COLUMNS,
    display: "flex",
    justifyContent: "end",
    paddingInline: THEME.SIZE.S1,
});

class ReactStanza extends TogoMediumReactStanza {
    makeApp() {
        this.reduxStore = appStore;
        const sourceGmId = this.params.source_gm_id;
        return jsx(App, { sourceGmId: sourceGmId });
    }
}

var stanzaModule = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': ReactStanza
});

var metadata = {
	"@context": {
	stanza: "http://togostanza.org/resource/stanza#"
},
	"@id": "gmdb-medium-builder",
	"stanza:label": "Medium Builder",
	"stanza:definition": "",
	"stanza:license": "MIT",
	"stanza:author": "Satoshi Onoda (YOHAK)",
	"stanza:address": "satoshionoda@yohak.design",
	"stanza:contributor": [
],
	"stanza:created": "2022-01-01",
	"stanza:updated": "2026-05-18",
	"stanza:parameter": [
	{
		"stanza:key": "source_gm_id",
		"stanza:example": "NBRC_M249",
		"stanza:description": "Source medium ID to use as the initial import target.",
		"stanza:required": false
	}
],
	"stanza:menu-placement": "none",
	"stanza:style": [
],
	"stanza:incomingEvent": [
],
	"stanza:outgoingEvent": [
]
};

var templates = [
  ["stanza.html.hbs", {"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<p class=\"greeting\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"greeting") || (depth0 != null ? lookupProperty(depth0,"greeting") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"greeting","hash":{},"data":data,"loc":{"start":{"line":1,"column":20},"end":{"line":1,"column":32}}}) : helper)))
    + "!!!</p>";
},"useData":true}]
];

const url = import.meta.url.replace(/\?.*$/, '');

defineStanzaElement({stanzaModule, metadata, templates, url});
//# sourceMappingURL=gmdb-medium-builder.js.map
