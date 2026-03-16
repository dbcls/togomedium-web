import { s as styled, y as capitalize, m as reactExports, z as clsx, A as jsxRuntimeExports, B as rootShouldForwardProp, C as useEnhancedEffect, D as useRtl, v as atom, w as useAtomValue, x as useSetAtom, T as THEME, a as jsxs, j as jsx } from './StanzaReactProvider-7e768473.js';
import { u as usePreviousProps, B as ButtonBase, a as useFormControl, m as mergeSlotProps, d as debounce, o as ownerWindow, b as activeElement, c as Button } from './Select-05682d11.js';
import { m as makeLinkPath, g as getLinkTarget, a as PATH_MEDIUM } from './getLinkTarget-9ee27b52.js';
import { T as Tooltip } from './Tooltip-f3002260.js';
import { g as generateUtilityClasses, a as generateUtilityClass, m as memoTheme, u as useDefaultProps, c as composeClasses, b as useControlled, d as useSlotProps, e as useEventCallback, o as ownerDocument } from './useSlotProps-e0be0a1d.js';
import { u as useSlot, a as useTheme } from './Grow-d098dd8a.js';
import { c as createSvgIcon } from './createSvgIcon-cd17d0e7.js';
import { c as createSimplePaletteValueFilter, C as CircularProgress } from './CircularProgress-790be7e7.js';
import { i as isArray } from './isArray-56c7d056.js';
import { o as object, s as string, n as number, a as array } from './schemas-d468dcf7.js';

function useBadge(parameters) {
  const {
    badgeContent: badgeContentProp,
    invisible: invisibleProp = false,
    max: maxProp = 99,
    showZero = false
  } = parameters;
  const prevProps = usePreviousProps({
    badgeContent: badgeContentProp,
    max: maxProp
  });
  let invisible = invisibleProp;
  if (invisibleProp === false && badgeContentProp === 0 && !showZero) {
    invisible = true;
  }
  const {
    badgeContent,
    max = maxProp
  } = invisible ? prevProps : parameters;
  const displayValue = badgeContent && Number(badgeContent) > max ? `${max}+` : badgeContent;
  return {
    badgeContent,
    invisible,
    max,
    displayValue
  };
}

function getBadgeUtilityClass(slot) {
  return generateUtilityClass('MuiBadge', slot);
}
const badgeClasses = generateUtilityClasses('MuiBadge', ['root', 'badge', 'dot', 'standard', 'anchorOriginTopRight', 'anchorOriginBottomRight', 'anchorOriginTopLeft', 'anchorOriginBottomLeft', 'invisible', 'colorError', 'colorInfo', 'colorPrimary', 'colorSecondary', 'colorSuccess', 'colorWarning', 'overlapRectangular', 'overlapCircular',
// TODO: v6 remove the overlap value from these class keys
'anchorOriginTopLeftCircular', 'anchorOriginTopLeftRectangular', 'anchorOriginTopRightCircular', 'anchorOriginTopRightRectangular', 'anchorOriginBottomLeftCircular', 'anchorOriginBottomLeftRectangular', 'anchorOriginBottomRightCircular', 'anchorOriginBottomRightRectangular']);
var badgeClasses$1 = badgeClasses;

const RADIUS_STANDARD = 10;
const RADIUS_DOT = 4;
const useUtilityClasses$5 = ownerState => {
  const {
    color,
    anchorOrigin,
    invisible,
    overlap,
    variant,
    classes = {}
  } = ownerState;
  const slots = {
    root: ['root'],
    badge: ['badge', variant, invisible && 'invisible', `anchorOrigin${capitalize(anchorOrigin.vertical)}${capitalize(anchorOrigin.horizontal)}`, `anchorOrigin${capitalize(anchorOrigin.vertical)}${capitalize(anchorOrigin.horizontal)}${capitalize(overlap)}`, `overlap${capitalize(overlap)}`, color !== 'default' && `color${capitalize(color)}`]
  };
  return composeClasses(slots, getBadgeUtilityClass, classes);
};
const BadgeRoot = styled('span', {
  name: 'MuiBadge',
  slot: 'Root'
})({
  position: 'relative',
  display: 'inline-flex',
  // For correct alignment with the text.
  verticalAlign: 'middle',
  flexShrink: 0
});
const BadgeBadge = styled('span', {
  name: 'MuiBadge',
  slot: 'Badge',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.badge, styles[ownerState.variant], styles[`anchorOrigin${capitalize(ownerState.anchorOrigin.vertical)}${capitalize(ownerState.anchorOrigin.horizontal)}${capitalize(ownerState.overlap)}`], ownerState.color !== 'default' && styles[`color${capitalize(ownerState.color)}`], ownerState.invisible && styles.invisible];
  }
})(memoTheme(({
  theme
}) => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  boxSizing: 'border-box',
  fontFamily: theme.typography.fontFamily,
  fontWeight: theme.typography.fontWeightMedium,
  fontSize: theme.typography.pxToRem(12),
  minWidth: RADIUS_STANDARD * 2,
  lineHeight: 1,
  padding: '0 6px',
  height: RADIUS_STANDARD * 2,
  borderRadius: RADIUS_STANDARD,
  zIndex: 1,
  // Render the badge on top of potential ripples.
  transition: theme.transitions.create('transform', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.enteringScreen
  }),
  variants: [...Object.entries(theme.palette).filter(createSimplePaletteValueFilter(['contrastText'])).map(([color]) => ({
    props: {
      color
    },
    style: {
      backgroundColor: (theme.vars || theme).palette[color].main,
      color: (theme.vars || theme).palette[color].contrastText
    }
  })), {
    props: {
      variant: 'dot'
    },
    style: {
      borderRadius: RADIUS_DOT,
      height: RADIUS_DOT * 2,
      minWidth: RADIUS_DOT * 2,
      padding: 0
    }
  }, {
    props: {
      invisible: true
    },
    style: {
      transition: theme.transitions.create('transform', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.leavingScreen
      })
    }
  }, {
    style: ({
      ownerState
    }) => {
      const {
        vertical,
        horizontal
      } = ownerState.anchorOrigin;
      const offset = ownerState.overlap === 'circular' ? '14%' : 0;
      return {
        '--Badge-translateX': horizontal === 'right' ? '50%' : '-50%',
        '--Badge-translateY': vertical === 'top' ? '-50%' : '50%',
        top: vertical === 'top' ? offset : 'initial',
        bottom: vertical === 'bottom' ? offset : 'initial',
        right: horizontal === 'right' ? offset : 'initial',
        left: horizontal === 'left' ? offset : 'initial',
        transform: 'scale(1) translate(var(--Badge-translateX), var(--Badge-translateY))',
        transformOrigin: `${horizontal === 'right' ? '100%' : '0%'} ${vertical === 'top' ? '0%' : '100%'}`,
        [`&.${badgeClasses$1.invisible}`]: {
          transform: 'scale(0) translate(var(--Badge-translateX), var(--Badge-translateY))'
        }
      };
    }
  }]
})));
function getAnchorOrigin(anchorOrigin) {
  return {
    vertical: anchorOrigin?.vertical ?? 'top',
    horizontal: anchorOrigin?.horizontal ?? 'right'
  };
}
const Badge = /*#__PURE__*/reactExports.forwardRef(function Badge(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiBadge'
  });
  const {
    anchorOrigin: anchorOriginProp,
    className,
    classes: classesProp,
    component,
    components = {},
    componentsProps = {},
    children,
    overlap: overlapProp = 'rectangular',
    color: colorProp = 'default',
    invisible: invisibleProp = false,
    max: maxProp = 99,
    badgeContent: badgeContentProp,
    slots,
    slotProps,
    showZero = false,
    variant: variantProp = 'standard',
    ...other
  } = props;
  const {
    badgeContent,
    invisible: invisibleFromHook,
    max,
    displayValue: displayValueFromHook
  } = useBadge({
    max: maxProp,
    invisible: invisibleProp,
    badgeContent: badgeContentProp,
    showZero
  });
  const prevProps = usePreviousProps({
    anchorOrigin: getAnchorOrigin(anchorOriginProp),
    color: colorProp,
    overlap: overlapProp,
    variant: variantProp,
    badgeContent: badgeContentProp
  });
  const invisible = invisibleFromHook || badgeContent == null && variantProp !== 'dot';
  const {
    color = colorProp,
    overlap = overlapProp,
    anchorOrigin: anchorOriginPropProp,
    variant = variantProp
  } = invisible ? prevProps : props;
  const anchorOrigin = getAnchorOrigin(anchorOriginPropProp);
  const displayValue = variant !== 'dot' ? displayValueFromHook : undefined;
  const ownerState = {
    ...props,
    badgeContent,
    invisible,
    max,
    displayValue,
    showZero,
    anchorOrigin,
    color,
    overlap,
    variant
  };
  const classes = useUtilityClasses$5(ownerState);

  // support both `slots` and `components` for backward compatibility
  const externalForwardedProps = {
    slots: {
      root: slots?.root ?? components.Root,
      badge: slots?.badge ?? components.Badge
    },
    slotProps: {
      root: slotProps?.root ?? componentsProps.root,
      badge: slotProps?.badge ?? componentsProps.badge
    }
  };
  const [RootSlot, rootProps] = useSlot('root', {
    elementType: BadgeRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other
    },
    ownerState,
    className: clsx(classes.root, className),
    ref,
    additionalProps: {
      as: component
    }
  });
  const [BadgeSlot, badgeProps] = useSlot('badge', {
    elementType: BadgeBadge,
    externalForwardedProps,
    ownerState,
    className: classes.badge
  });
  return /*#__PURE__*/jsxRuntimeExports.jsxs(RootSlot, {
    ...rootProps,
    children: [children, /*#__PURE__*/jsxRuntimeExports.jsx(BadgeSlot, {
      ...badgeProps,
      children: displayValue
    })]
  });
});
var Badge$1 = Badge;

function getSwitchBaseUtilityClass(slot) {
  return generateUtilityClass('PrivateSwitchBase', slot);
}
generateUtilityClasses('PrivateSwitchBase', ['root', 'checked', 'disabled', 'input', 'edgeStart', 'edgeEnd']);

const useUtilityClasses$4 = ownerState => {
  const {
    classes,
    checked,
    disabled,
    edge
  } = ownerState;
  const slots = {
    root: ['root', checked && 'checked', disabled && 'disabled', edge && `edge${capitalize(edge)}`],
    input: ['input']
  };
  return composeClasses(slots, getSwitchBaseUtilityClass, classes);
};
const SwitchBaseRoot = styled(ButtonBase, {
  name: 'MuiSwitchBase'
})({
  padding: 9,
  borderRadius: '50%',
  variants: [{
    props: {
      edge: 'start',
      size: 'small'
    },
    style: {
      marginLeft: -3
    }
  }, {
    props: ({
      edge,
      ownerState
    }) => edge === 'start' && ownerState.size !== 'small',
    style: {
      marginLeft: -12
    }
  }, {
    props: {
      edge: 'end',
      size: 'small'
    },
    style: {
      marginRight: -3
    }
  }, {
    props: ({
      edge,
      ownerState
    }) => edge === 'end' && ownerState.size !== 'small',
    style: {
      marginRight: -12
    }
  }]
});
const SwitchBaseInput = styled('input', {
  name: 'MuiSwitchBase',
  shouldForwardProp: rootShouldForwardProp
})({
  cursor: 'inherit',
  position: 'absolute',
  opacity: 0,
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  margin: 0,
  padding: 0,
  zIndex: 1
});

/**
 * @ignore - internal component.
 */
const SwitchBase = /*#__PURE__*/reactExports.forwardRef(function SwitchBase(props, ref) {
  const {
    autoFocus,
    checked: checkedProp,
    checkedIcon,
    defaultChecked,
    disabled: disabledProp,
    disableFocusRipple = false,
    edge = false,
    icon,
    id,
    inputProps,
    inputRef,
    name,
    onBlur,
    onChange,
    onFocus,
    readOnly,
    required = false,
    tabIndex,
    type,
    value,
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const [checked, setCheckedState] = useControlled({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: 'SwitchBase',
    state: 'checked'
  });
  const muiFormControl = useFormControl();
  const handleFocus = event => {
    if (onFocus) {
      onFocus(event);
    }
    if (muiFormControl && muiFormControl.onFocus) {
      muiFormControl.onFocus(event);
    }
  };
  const handleBlur = event => {
    if (onBlur) {
      onBlur(event);
    }
    if (muiFormControl && muiFormControl.onBlur) {
      muiFormControl.onBlur(event);
    }
  };
  const handleInputChange = event => {
    // Workaround for https://github.com/facebook/react/issues/9023
    if (event.nativeEvent.defaultPrevented || readOnly) {
      return;
    }
    const newChecked = event.target.checked;
    setCheckedState(newChecked);
    if (onChange) {
      // TODO v6: remove the second argument.
      onChange(event, newChecked);
    }
  };
  let disabled = disabledProp;
  if (muiFormControl) {
    if (typeof disabled === 'undefined') {
      disabled = muiFormControl.disabled;
    }
  }
  const hasLabelFor = type === 'checkbox' || type === 'radio';
  const ownerState = {
    ...props,
    checked,
    disabled,
    disableFocusRipple,
    edge
  };
  const classes = useUtilityClasses$4(ownerState);
  const externalForwardedProps = {
    slots,
    slotProps: {
      input: inputProps,
      ...slotProps
    }
  };
  const [RootSlot, rootSlotProps] = useSlot('root', {
    ref,
    elementType: SwitchBaseRoot,
    className: classes.root,
    shouldForwardComponentProp: true,
    externalForwardedProps: {
      ...externalForwardedProps,
      component: 'span',
      ...other
    },
    getSlotProps: handlers => ({
      ...handlers,
      onFocus: event => {
        handlers.onFocus?.(event);
        handleFocus(event);
      },
      onBlur: event => {
        handlers.onBlur?.(event);
        handleBlur(event);
      }
    }),
    ownerState,
    additionalProps: {
      centerRipple: true,
      focusRipple: !disableFocusRipple,
      role: undefined,
      tabIndex: null
    }
  });
  const [InputSlot, inputSlotProps] = useSlot('input', {
    ref: inputRef,
    elementType: SwitchBaseInput,
    className: classes.input,
    externalForwardedProps,
    getSlotProps: handlers => ({
      ...handlers,
      onChange: event => {
        handlers.onChange?.(event);
        handleInputChange(event);
      }
    }),
    ownerState,
    additionalProps: {
      autoFocus,
      checked: checkedProp,
      defaultChecked,
      disabled,
      id: hasLabelFor ? id : undefined,
      name,
      readOnly,
      required,
      tabIndex,
      type,
      ...(type === 'checkbox' && value === undefined ? {} : {
        value
      })
    }
  });
  return /*#__PURE__*/jsxRuntimeExports.jsxs(RootSlot, {
    ...rootSlotProps,
    children: [/*#__PURE__*/jsxRuntimeExports.jsx(InputSlot, {
      ...inputSlotProps
    }), checked ? checkedIcon : icon]
  });
});
var SwitchBase$1 = SwitchBase;

var CheckBoxOutlineBlankIcon = createSvgIcon(/*#__PURE__*/jsxRuntimeExports.jsx("path", {
  d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
}));

var CheckBoxIcon = createSvgIcon(/*#__PURE__*/jsxRuntimeExports.jsx("path", {
  d: "M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
}));

var IndeterminateCheckBoxIcon = createSvgIcon(/*#__PURE__*/jsxRuntimeExports.jsx("path", {
  d: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"
}));

function getCheckboxUtilityClass(slot) {
  return generateUtilityClass('MuiCheckbox', slot);
}
const checkboxClasses = generateUtilityClasses('MuiCheckbox', ['root', 'checked', 'disabled', 'indeterminate', 'colorPrimary', 'colorSecondary', 'sizeSmall', 'sizeMedium']);
var checkboxClasses$1 = checkboxClasses;

const useUtilityClasses$3 = ownerState => {
  const {
    classes,
    indeterminate,
    color,
    size
  } = ownerState;
  const slots = {
    root: ['root', indeterminate && 'indeterminate', `color${capitalize(color)}`, `size${capitalize(size)}`]
  };
  const composedClasses = composeClasses(slots, getCheckboxUtilityClass, classes);
  return {
    ...classes,
    // forward the disabled and checked classes to the SwitchBase
    ...composedClasses
  };
};
const CheckboxRoot = styled(SwitchBase$1, {
  shouldForwardProp: prop => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiCheckbox',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.indeterminate && styles.indeterminate, styles[`size${capitalize(ownerState.size)}`], ownerState.color !== 'default' && styles[`color${capitalize(ownerState.color)}`]];
  }
})(memoTheme(({
  theme
}) => ({
  color: (theme.vars || theme).palette.text.secondary,
  variants: [{
    props: {
      color: 'default',
      disableRipple: false
    },
    style: {
      '&:hover': {
        backgroundColor: theme.alpha((theme.vars || theme).palette.action.active, (theme.vars || theme).palette.action.hoverOpacity)
      }
    }
  }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
    props: {
      color,
      disableRipple: false
    },
    style: {
      '&:hover': {
        backgroundColor: theme.alpha((theme.vars || theme).palette[color].main, (theme.vars || theme).palette.action.hoverOpacity)
      }
    }
  })), ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
    props: {
      color
    },
    style: {
      [`&.${checkboxClasses$1.checked}, &.${checkboxClasses$1.indeterminate}`]: {
        color: (theme.vars || theme).palette[color].main
      },
      [`&.${checkboxClasses$1.disabled}`]: {
        color: (theme.vars || theme).palette.action.disabled
      }
    }
  })), {
    // Should be last to override other colors
    props: {
      disableRipple: false
    },
    style: {
      // Reset on touch devices, it doesn't add specificity
      '&:hover': {
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        }
      }
    }
  }]
})));
const defaultCheckedIcon = /*#__PURE__*/jsxRuntimeExports.jsx(CheckBoxIcon, {});
const defaultIcon = /*#__PURE__*/jsxRuntimeExports.jsx(CheckBoxOutlineBlankIcon, {});
const defaultIndeterminateIcon = /*#__PURE__*/jsxRuntimeExports.jsx(IndeterminateCheckBoxIcon, {});
const Checkbox = /*#__PURE__*/reactExports.forwardRef(function Checkbox(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiCheckbox'
  });
  const {
    checkedIcon = defaultCheckedIcon,
    color = 'primary',
    icon: iconProp = defaultIcon,
    indeterminate = false,
    indeterminateIcon: indeterminateIconProp = defaultIndeterminateIcon,
    inputProps,
    size = 'medium',
    disableRipple = false,
    className,
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const icon = indeterminate ? indeterminateIconProp : iconProp;
  const indeterminateIcon = indeterminate ? indeterminateIconProp : checkedIcon;
  const ownerState = {
    ...props,
    disableRipple,
    color,
    indeterminate,
    size
  };
  const classes = useUtilityClasses$3(ownerState);
  const externalInputProps = slotProps.input ?? inputProps;
  const [RootSlot, rootSlotProps] = useSlot('root', {
    ref,
    elementType: CheckboxRoot,
    className: clsx(classes.root, className),
    shouldForwardComponentProp: true,
    externalForwardedProps: {
      slots,
      slotProps,
      ...other
    },
    ownerState,
    additionalProps: {
      type: 'checkbox',
      icon: /*#__PURE__*/reactExports.cloneElement(icon, {
        fontSize: icon.props.fontSize ?? size
      }),
      checkedIcon: /*#__PURE__*/reactExports.cloneElement(indeterminateIcon, {
        fontSize: indeterminateIcon.props.fontSize ?? size
      }),
      disableRipple,
      slots,
      slotProps: {
        input: mergeSlotProps(typeof externalInputProps === 'function' ? externalInputProps(ownerState) : externalInputProps, {
          'data-indeterminate': indeterminate
        })
      }
    }
  });
  return /*#__PURE__*/jsxRuntimeExports.jsx(RootSlot, {
    ...rootSlotProps,
    classes: classes
  });
});
var Checkbox$1 = Checkbox;

function getTabUtilityClass(slot) {
  return generateUtilityClass('MuiTab', slot);
}
const tabClasses = generateUtilityClasses('MuiTab', ['root', 'labelIcon', 'textColorInherit', 'textColorPrimary', 'textColorSecondary', 'selected', 'disabled', 'fullWidth', 'wrapped', 'iconWrapper', 'icon']);
var tabClasses$1 = tabClasses;

const useUtilityClasses$2 = ownerState => {
  const {
    classes,
    textColor,
    fullWidth,
    wrapped,
    icon,
    label,
    selected,
    disabled
  } = ownerState;
  const slots = {
    root: ['root', icon && label && 'labelIcon', `textColor${capitalize(textColor)}`, fullWidth && 'fullWidth', wrapped && 'wrapped', selected && 'selected', disabled && 'disabled'],
    icon: ['iconWrapper', 'icon']
  };
  return composeClasses(slots, getTabUtilityClass, classes);
};
const TabRoot = styled(ButtonBase, {
  name: 'MuiTab',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.label && ownerState.icon && styles.labelIcon, styles[`textColor${capitalize(ownerState.textColor)}`], ownerState.fullWidth && styles.fullWidth, ownerState.wrapped && styles.wrapped, {
      [`& .${tabClasses$1.iconWrapper}`]: styles.iconWrapper
    }, {
      [`& .${tabClasses$1.icon}`]: styles.icon
    }];
  }
})(memoTheme(({
  theme
}) => ({
  ...theme.typography.button,
  maxWidth: 360,
  minWidth: 90,
  position: 'relative',
  minHeight: 48,
  flexShrink: 0,
  padding: '12px 16px',
  overflow: 'hidden',
  whiteSpace: 'normal',
  textAlign: 'center',
  lineHeight: 1.25,
  variants: [{
    props: ({
      ownerState
    }) => ownerState.label && (ownerState.iconPosition === 'top' || ownerState.iconPosition === 'bottom'),
    style: {
      flexDirection: 'column'
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.label && ownerState.iconPosition !== 'top' && ownerState.iconPosition !== 'bottom',
    style: {
      flexDirection: 'row'
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.icon && ownerState.label,
    style: {
      minHeight: 72,
      paddingTop: 9,
      paddingBottom: 9
    }
  }, {
    props: ({
      ownerState,
      iconPosition
    }) => ownerState.icon && ownerState.label && iconPosition === 'top',
    style: {
      [`& > .${tabClasses$1.icon}`]: {
        marginBottom: 6
      }
    }
  }, {
    props: ({
      ownerState,
      iconPosition
    }) => ownerState.icon && ownerState.label && iconPosition === 'bottom',
    style: {
      [`& > .${tabClasses$1.icon}`]: {
        marginTop: 6
      }
    }
  }, {
    props: ({
      ownerState,
      iconPosition
    }) => ownerState.icon && ownerState.label && iconPosition === 'start',
    style: {
      [`& > .${tabClasses$1.icon}`]: {
        marginRight: theme.spacing(1)
      }
    }
  }, {
    props: ({
      ownerState,
      iconPosition
    }) => ownerState.icon && ownerState.label && iconPosition === 'end',
    style: {
      [`& > .${tabClasses$1.icon}`]: {
        marginLeft: theme.spacing(1)
      }
    }
  }, {
    props: {
      textColor: 'inherit'
    },
    style: {
      color: 'inherit',
      opacity: 0.6,
      // same opacity as theme.palette.text.secondary
      [`&.${tabClasses$1.selected}`]: {
        opacity: 1
      },
      [`&.${tabClasses$1.disabled}`]: {
        opacity: (theme.vars || theme).palette.action.disabledOpacity
      }
    }
  }, {
    props: {
      textColor: 'primary'
    },
    style: {
      color: (theme.vars || theme).palette.text.secondary,
      [`&.${tabClasses$1.selected}`]: {
        color: (theme.vars || theme).palette.primary.main
      },
      [`&.${tabClasses$1.disabled}`]: {
        color: (theme.vars || theme).palette.text.disabled
      }
    }
  }, {
    props: {
      textColor: 'secondary'
    },
    style: {
      color: (theme.vars || theme).palette.text.secondary,
      [`&.${tabClasses$1.selected}`]: {
        color: (theme.vars || theme).palette.secondary.main
      },
      [`&.${tabClasses$1.disabled}`]: {
        color: (theme.vars || theme).palette.text.disabled
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.fullWidth,
    style: {
      flexShrink: 1,
      flexGrow: 1,
      flexBasis: 0,
      maxWidth: 'none'
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.wrapped,
    style: {
      fontSize: theme.typography.pxToRem(12)
    }
  }]
})));
const Tab = /*#__PURE__*/reactExports.forwardRef(function Tab(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiTab'
  });
  const {
    className,
    disabled = false,
    disableFocusRipple = false,
    // eslint-disable-next-line react/prop-types
    fullWidth,
    icon: iconProp,
    iconPosition = 'top',
    // eslint-disable-next-line react/prop-types
    indicator,
    label,
    onChange,
    onClick,
    onFocus,
    // eslint-disable-next-line react/prop-types
    selected,
    // eslint-disable-next-line react/prop-types
    selectionFollowsFocus,
    // eslint-disable-next-line react/prop-types
    textColor = 'inherit',
    value,
    wrapped = false,
    ...other
  } = props;
  const ownerState = {
    ...props,
    disabled,
    disableFocusRipple,
    selected,
    icon: !!iconProp,
    iconPosition,
    label: !!label,
    fullWidth,
    textColor,
    wrapped
  };
  const classes = useUtilityClasses$2(ownerState);
  const icon = iconProp && label && /*#__PURE__*/reactExports.isValidElement(iconProp) ? /*#__PURE__*/reactExports.cloneElement(iconProp, {
    className: clsx(classes.icon, iconProp.props.className)
  }) : iconProp;
  const handleClick = event => {
    if (!selected && onChange) {
      onChange(event, value);
    }
    if (onClick) {
      onClick(event);
    }
  };
  const handleFocus = event => {
    if (selectionFollowsFocus && !selected && onChange) {
      onChange(event, value);
    }
    if (onFocus) {
      onFocus(event);
    }
  };
  return /*#__PURE__*/jsxRuntimeExports.jsxs(TabRoot, {
    focusRipple: !disableFocusRipple,
    className: clsx(classes.root, className),
    ref: ref,
    role: "tab",
    "aria-selected": selected,
    disabled: disabled,
    onClick: handleClick,
    onFocus: handleFocus,
    ownerState: ownerState,
    tabIndex: selected ? 0 : -1,
    ...other,
    children: [iconPosition === 'top' || iconPosition === 'start' ? /*#__PURE__*/jsxRuntimeExports.jsxs(reactExports.Fragment, {
      children: [icon, label]
    }) : /*#__PURE__*/jsxRuntimeExports.jsxs(reactExports.Fragment, {
      children: [label, icon]
    }), indicator]
  });
});
var Tab$1 = Tab;

var KeyboardArrowLeft = createSvgIcon(/*#__PURE__*/jsxRuntimeExports.jsx("path", {
  d: "M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"
}));

var KeyboardArrowRight = createSvgIcon(/*#__PURE__*/jsxRuntimeExports.jsx("path", {
  d: "M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"
}));

function easeInOutSin(time) {
  return (1 + Math.sin(Math.PI * time - Math.PI / 2)) / 2;
}
function animate(property, element, to, options = {}, cb = () => {}) {
  const {
    ease = easeInOutSin,
    duration = 300 // standard
  } = options;
  let start = null;
  const from = element[property];
  let cancelled = false;
  const cancel = () => {
    cancelled = true;
  };
  const step = timestamp => {
    if (cancelled) {
      cb(new Error('Animation cancelled'));
      return;
    }
    if (start === null) {
      start = timestamp;
    }
    const time = Math.min(1, (timestamp - start) / duration);
    element[property] = ease(time) * (to - from) + from;
    if (time >= 1) {
      requestAnimationFrame(() => {
        cb(null);
      });
      return;
    }
    requestAnimationFrame(step);
  };
  if (from === to) {
    cb(new Error('Element already at target position'));
    return cancel;
  }
  requestAnimationFrame(step);
  return cancel;
}

const styles = {
  width: 99,
  height: 99,
  position: 'absolute',
  top: -9999,
  overflow: 'scroll'
};

/**
 * @ignore - internal component.
 * The component originates from https://github.com/STORIS/react-scrollbar-size.
 * It has been moved into the core in order to minimize the bundle size.
 */
function ScrollbarSize(props) {
  const {
    onChange,
    ...other
  } = props;
  const scrollbarHeight = reactExports.useRef();
  const nodeRef = reactExports.useRef(null);
  const setMeasurements = () => {
    scrollbarHeight.current = nodeRef.current.offsetHeight - nodeRef.current.clientHeight;
  };
  useEnhancedEffect(() => {
    const handleResize = debounce(() => {
      const prevHeight = scrollbarHeight.current;
      setMeasurements();
      if (prevHeight !== scrollbarHeight.current) {
        onChange(scrollbarHeight.current);
      }
    });
    const containerWindow = ownerWindow(nodeRef.current);
    containerWindow.addEventListener('resize', handleResize);
    return () => {
      handleResize.clear();
      containerWindow.removeEventListener('resize', handleResize);
    };
  }, [onChange]);
  reactExports.useEffect(() => {
    setMeasurements();
    onChange(scrollbarHeight.current);
  }, [onChange]);
  return /*#__PURE__*/jsxRuntimeExports.jsx("div", {
    style: styles,
    ...other,
    ref: nodeRef
  });
}

function getTabScrollButtonUtilityClass(slot) {
  return generateUtilityClass('MuiTabScrollButton', slot);
}
const tabScrollButtonClasses = generateUtilityClasses('MuiTabScrollButton', ['root', 'vertical', 'horizontal', 'disabled']);
var tabScrollButtonClasses$1 = tabScrollButtonClasses;

const useUtilityClasses$1 = ownerState => {
  const {
    classes,
    orientation,
    disabled
  } = ownerState;
  const slots = {
    root: ['root', orientation, disabled && 'disabled']
  };
  return composeClasses(slots, getTabScrollButtonUtilityClass, classes);
};
const TabScrollButtonRoot = styled(ButtonBase, {
  name: 'MuiTabScrollButton',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.orientation && styles[ownerState.orientation]];
  }
})({
  width: 40,
  flexShrink: 0,
  opacity: 0.8,
  [`&.${tabScrollButtonClasses$1.disabled}`]: {
    opacity: 0
  },
  variants: [{
    props: {
      orientation: 'vertical'
    },
    style: {
      width: '100%',
      height: 40,
      '& svg': {
        transform: 'var(--TabScrollButton-svgRotate)'
      }
    }
  }]
});
const TabScrollButton = /*#__PURE__*/reactExports.forwardRef(function TabScrollButton(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiTabScrollButton'
  });
  const {
    className,
    slots = {},
    slotProps = {},
    direction,
    orientation,
    disabled,
    ...other
  } = props;
  const isRtl = useRtl();
  const ownerState = {
    isRtl,
    ...props
  };
  const classes = useUtilityClasses$1(ownerState);
  const StartButtonIcon = slots.StartScrollButtonIcon ?? KeyboardArrowLeft;
  const EndButtonIcon = slots.EndScrollButtonIcon ?? KeyboardArrowRight;
  const startButtonIconProps = useSlotProps({
    elementType: StartButtonIcon,
    externalSlotProps: slotProps.startScrollButtonIcon,
    additionalProps: {
      fontSize: 'small'
    },
    ownerState
  });
  const endButtonIconProps = useSlotProps({
    elementType: EndButtonIcon,
    externalSlotProps: slotProps.endScrollButtonIcon,
    additionalProps: {
      fontSize: 'small'
    },
    ownerState
  });
  return /*#__PURE__*/jsxRuntimeExports.jsx(TabScrollButtonRoot, {
    component: "div",
    className: clsx(classes.root, className),
    ref: ref,
    role: null,
    ownerState: ownerState,
    tabIndex: null,
    ...other,
    style: {
      ...other.style,
      ...(orientation === 'vertical' && {
        '--TabScrollButton-svgRotate': `rotate(${isRtl ? -90 : 90}deg)`
      })
    },
    children: direction === 'left' ? /*#__PURE__*/jsxRuntimeExports.jsx(StartButtonIcon, {
      ...startButtonIconProps
    }) : /*#__PURE__*/jsxRuntimeExports.jsx(EndButtonIcon, {
      ...endButtonIconProps
    })
  });
});
var TabScrollButton$1 = TabScrollButton;

function getTabsUtilityClass(slot) {
  return generateUtilityClass('MuiTabs', slot);
}
const tabsClasses = generateUtilityClasses('MuiTabs', ['root', 'vertical', 'list', 'flexContainer', 'flexContainerVertical', 'centered', 'scroller', 'fixed', 'scrollableX', 'scrollableY', 'hideScrollbar', 'scrollButtons', 'scrollButtonsHideMobile', 'indicator']);
var tabsClasses$1 = tabsClasses;

const nextItem = (list, item) => {
  if (list === item) {
    return list.firstChild;
  }
  if (item && item.nextElementSibling) {
    return item.nextElementSibling;
  }
  return list.firstChild;
};
const previousItem = (list, item) => {
  if (list === item) {
    return list.lastChild;
  }
  if (item && item.previousElementSibling) {
    return item.previousElementSibling;
  }
  return list.lastChild;
};
const moveFocus = (list, currentFocus, traversalFunction) => {
  let wrappedOnce = false;
  let nextFocus = traversalFunction(list, currentFocus);
  while (nextFocus) {
    // Prevent infinite loop.
    if (nextFocus === list.firstChild) {
      if (wrappedOnce) {
        return;
      }
      wrappedOnce = true;
    }

    // Same logic as useAutocomplete.js
    const nextFocusDisabled = nextFocus.disabled || nextFocus.getAttribute('aria-disabled') === 'true';
    if (!nextFocus.hasAttribute('tabindex') || nextFocusDisabled) {
      // Move to the next element.
      nextFocus = traversalFunction(list, nextFocus);
    } else {
      nextFocus.focus();
      return;
    }
  }
};
const useUtilityClasses = ownerState => {
  const {
    vertical,
    fixed,
    hideScrollbar,
    scrollableX,
    scrollableY,
    centered,
    scrollButtonsHideMobile,
    classes
  } = ownerState;
  const slots = {
    root: ['root', vertical && 'vertical'],
    scroller: ['scroller', fixed && 'fixed', hideScrollbar && 'hideScrollbar', scrollableX && 'scrollableX', scrollableY && 'scrollableY'],
    list: ['list', 'flexContainer', vertical && 'flexContainerVertical', vertical && 'vertical', centered && 'centered'],
    indicator: ['indicator'],
    scrollButtons: ['scrollButtons', scrollButtonsHideMobile && 'scrollButtonsHideMobile'],
    scrollableX: [scrollableX && 'scrollableX'],
    hideScrollbar: [hideScrollbar && 'hideScrollbar']
  };
  return composeClasses(slots, getTabsUtilityClass, classes);
};
const TabsRoot = styled('div', {
  name: 'MuiTabs',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${tabsClasses$1.scrollButtons}`]: styles.scrollButtons
    }, {
      [`& .${tabsClasses$1.scrollButtons}`]: ownerState.scrollButtonsHideMobile && styles.scrollButtonsHideMobile
    }, styles.root, ownerState.vertical && styles.vertical];
  }
})(memoTheme(({
  theme
}) => ({
  overflow: 'hidden',
  minHeight: 48,
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: 'touch',
  display: 'flex',
  variants: [{
    props: ({
      ownerState
    }) => ownerState.vertical,
    style: {
      flexDirection: 'column'
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.scrollButtonsHideMobile,
    style: {
      [`& .${tabsClasses$1.scrollButtons}`]: {
        [theme.breakpoints.down('sm')]: {
          display: 'none'
        }
      }
    }
  }]
})));
const TabsScroller = styled('div', {
  name: 'MuiTabs',
  slot: 'Scroller',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.scroller, ownerState.fixed && styles.fixed, ownerState.hideScrollbar && styles.hideScrollbar, ownerState.scrollableX && styles.scrollableX, ownerState.scrollableY && styles.scrollableY];
  }
})({
  position: 'relative',
  display: 'inline-block',
  flex: '1 1 auto',
  whiteSpace: 'nowrap',
  variants: [{
    props: ({
      ownerState
    }) => ownerState.fixed,
    style: {
      overflowX: 'hidden',
      width: '100%'
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.hideScrollbar,
    style: {
      // Hide dimensionless scrollbar on macOS
      scrollbarWidth: 'none',
      // Firefox
      '&::-webkit-scrollbar': {
        display: 'none' // Safari + Chrome
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.scrollableX,
    style: {
      overflowX: 'auto',
      overflowY: 'hidden'
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.scrollableY,
    style: {
      overflowY: 'auto',
      overflowX: 'hidden'
    }
  }]
});
const List = styled('div', {
  name: 'MuiTabs',
  slot: 'List',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.list, styles.flexContainer, ownerState.vertical && styles.flexContainerVertical, ownerState.centered && styles.centered];
  }
})({
  display: 'flex',
  variants: [{
    props: ({
      ownerState
    }) => ownerState.vertical,
    style: {
      flexDirection: 'column'
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.centered,
    style: {
      justifyContent: 'center'
    }
  }]
});
const TabsIndicator = styled('span', {
  name: 'MuiTabs',
  slot: 'Indicator'
})(memoTheme(({
  theme
}) => ({
  position: 'absolute',
  height: 2,
  bottom: 0,
  width: '100%',
  transition: theme.transitions.create(),
  variants: [{
    props: {
      indicatorColor: 'primary'
    },
    style: {
      backgroundColor: (theme.vars || theme).palette.primary.main
    }
  }, {
    props: {
      indicatorColor: 'secondary'
    },
    style: {
      backgroundColor: (theme.vars || theme).palette.secondary.main
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.vertical,
    style: {
      height: '100%',
      width: 2,
      right: 0
    }
  }]
})));
const TabsScrollbarSize = styled(ScrollbarSize)({
  overflowX: 'auto',
  overflowY: 'hidden',
  // Hide dimensionless scrollbar on macOS
  scrollbarWidth: 'none',
  // Firefox
  '&::-webkit-scrollbar': {
    display: 'none' // Safari + Chrome
  }
});
const defaultIndicatorStyle = {};
const Tabs = /*#__PURE__*/reactExports.forwardRef(function Tabs(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiTabs'
  });
  const theme = useTheme();
  const isRtl = useRtl();
  const {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    action,
    centered = false,
    children: childrenProp,
    className,
    component = 'div',
    allowScrollButtonsMobile = false,
    indicatorColor = 'primary',
    onChange,
    orientation = 'horizontal',
    ScrollButtonComponent,
    // TODO: remove in v7 (deprecated in v6)
    scrollButtons = 'auto',
    selectionFollowsFocus,
    slots = {},
    slotProps = {},
    TabIndicatorProps = {},
    // TODO: remove in v7 (deprecated in v6)
    TabScrollButtonProps = {},
    // TODO: remove in v7 (deprecated in v6)
    textColor = 'primary',
    value,
    variant = 'standard',
    visibleScrollbar = false,
    ...other
  } = props;
  const scrollable = variant === 'scrollable';
  const vertical = orientation === 'vertical';
  const scrollStart = vertical ? 'scrollTop' : 'scrollLeft';
  const start = vertical ? 'top' : 'left';
  const end = vertical ? 'bottom' : 'right';
  const clientSize = vertical ? 'clientHeight' : 'clientWidth';
  const size = vertical ? 'height' : 'width';
  const ownerState = {
    ...props,
    component,
    allowScrollButtonsMobile,
    indicatorColor,
    orientation,
    vertical,
    scrollButtons,
    textColor,
    variant,
    visibleScrollbar,
    fixed: !scrollable,
    hideScrollbar: scrollable && !visibleScrollbar,
    scrollableX: scrollable && !vertical,
    scrollableY: scrollable && vertical,
    centered: centered && !scrollable,
    scrollButtonsHideMobile: !allowScrollButtonsMobile
  };
  const classes = useUtilityClasses(ownerState);
  const startScrollButtonIconProps = useSlotProps({
    elementType: slots.StartScrollButtonIcon,
    externalSlotProps: slotProps.startScrollButtonIcon,
    ownerState
  });
  const endScrollButtonIconProps = useSlotProps({
    elementType: slots.EndScrollButtonIcon,
    externalSlotProps: slotProps.endScrollButtonIcon,
    ownerState
  });
  const [mounted, setMounted] = reactExports.useState(false);
  const [indicatorStyle, setIndicatorStyle] = reactExports.useState(defaultIndicatorStyle);
  const [displayStartScroll, setDisplayStartScroll] = reactExports.useState(false);
  const [displayEndScroll, setDisplayEndScroll] = reactExports.useState(false);
  const [updateScrollObserver, setUpdateScrollObserver] = reactExports.useState(false);
  const [scrollerStyle, setScrollerStyle] = reactExports.useState({
    overflow: 'hidden',
    scrollbarWidth: 0
  });
  const valueToIndex = new Map();
  const tabsRef = reactExports.useRef(null);
  const tabListRef = reactExports.useRef(null);
  const externalForwardedProps = {
    slots,
    slotProps: {
      indicator: TabIndicatorProps,
      scrollButtons: TabScrollButtonProps,
      ...slotProps
    }
  };
  const getTabsMeta = () => {
    const tabsNode = tabsRef.current;
    let tabsMeta;
    if (tabsNode) {
      const rect = tabsNode.getBoundingClientRect();
      // create a new object with ClientRect class props + scrollLeft
      tabsMeta = {
        clientWidth: tabsNode.clientWidth,
        scrollLeft: tabsNode.scrollLeft,
        scrollTop: tabsNode.scrollTop,
        scrollWidth: tabsNode.scrollWidth,
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right
      };
    }
    let tabMeta;
    if (tabsNode && value !== false) {
      const children = tabListRef.current.children;
      if (children.length > 0) {
        const tab = children[valueToIndex.get(value)];
        tabMeta = tab ? tab.getBoundingClientRect() : null;
      }
    }
    return {
      tabsMeta,
      tabMeta
    };
  };
  const updateIndicatorState = useEventCallback(() => {
    const {
      tabsMeta,
      tabMeta
    } = getTabsMeta();
    let startValue = 0;
    let startIndicator;
    if (vertical) {
      startIndicator = 'top';
      if (tabMeta && tabsMeta) {
        startValue = tabMeta.top - tabsMeta.top + tabsMeta.scrollTop;
      }
    } else {
      startIndicator = isRtl ? 'right' : 'left';
      if (tabMeta && tabsMeta) {
        startValue = (isRtl ? -1 : 1) * (tabMeta[startIndicator] - tabsMeta[startIndicator] + tabsMeta.scrollLeft);
      }
    }
    const newIndicatorStyle = {
      [startIndicator]: startValue,
      // May be wrong until the font is loaded.
      [size]: tabMeta ? tabMeta[size] : 0
    };
    if (typeof indicatorStyle[startIndicator] !== 'number' || typeof indicatorStyle[size] !== 'number') {
      setIndicatorStyle(newIndicatorStyle);
    } else {
      const dStart = Math.abs(indicatorStyle[startIndicator] - newIndicatorStyle[startIndicator]);
      const dSize = Math.abs(indicatorStyle[size] - newIndicatorStyle[size]);
      if (dStart >= 1 || dSize >= 1) {
        setIndicatorStyle(newIndicatorStyle);
      }
    }
  });
  const scroll = (scrollValue, {
    animation = true
  } = {}) => {
    if (animation) {
      animate(scrollStart, tabsRef.current, scrollValue, {
        duration: theme.transitions.duration.standard
      });
    } else {
      tabsRef.current[scrollStart] = scrollValue;
    }
  };
  const moveTabsScroll = delta => {
    let scrollValue = tabsRef.current[scrollStart];
    if (vertical) {
      scrollValue += delta;
    } else {
      scrollValue += delta * (isRtl ? -1 : 1);
    }
    scroll(scrollValue);
  };
  const getScrollSize = () => {
    const containerSize = tabsRef.current[clientSize];
    let totalSize = 0;
    const children = Array.from(tabListRef.current.children);
    for (let i = 0; i < children.length; i += 1) {
      const tab = children[i];
      if (totalSize + tab[clientSize] > containerSize) {
        // If the first item is longer than the container size, then only scroll
        // by the container size.
        if (i === 0) {
          totalSize = containerSize;
        }
        break;
      }
      totalSize += tab[clientSize];
    }
    return totalSize;
  };
  const handleStartScrollClick = () => {
    moveTabsScroll(-1 * getScrollSize());
  };
  const handleEndScrollClick = () => {
    moveTabsScroll(getScrollSize());
  };
  const [ScrollbarSlot, {
    onChange: scrollbarOnChange,
    ...scrollbarSlotProps
  }] = useSlot('scrollbar', {
    className: clsx(classes.scrollableX, classes.hideScrollbar),
    elementType: TabsScrollbarSize,
    shouldForwardComponentProp: true,
    externalForwardedProps,
    ownerState
  });

  // TODO Remove <ScrollbarSize /> as browser support for hiding the scrollbar
  // with CSS improves.
  const handleScrollbarSizeChange = reactExports.useCallback(scrollbarWidth => {
    scrollbarOnChange?.(scrollbarWidth);
    setScrollerStyle({
      overflow: null,
      scrollbarWidth
    });
  }, [scrollbarOnChange]);
  const [ScrollButtonsSlot, scrollButtonSlotProps] = useSlot('scrollButtons', {
    className: clsx(classes.scrollButtons, TabScrollButtonProps.className),
    elementType: TabScrollButton$1,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      orientation,
      slots: {
        StartScrollButtonIcon: slots.startScrollButtonIcon || slots.StartScrollButtonIcon,
        EndScrollButtonIcon: slots.endScrollButtonIcon || slots.EndScrollButtonIcon
      },
      slotProps: {
        startScrollButtonIcon: startScrollButtonIconProps,
        endScrollButtonIcon: endScrollButtonIconProps
      }
    }
  });
  const getConditionalElements = () => {
    const conditionalElements = {};
    conditionalElements.scrollbarSizeListener = scrollable ? /*#__PURE__*/jsxRuntimeExports.jsx(ScrollbarSlot, {
      ...scrollbarSlotProps,
      onChange: handleScrollbarSizeChange
    }) : null;
    const scrollButtonsActive = displayStartScroll || displayEndScroll;
    const showScrollButtons = scrollable && (scrollButtons === 'auto' && scrollButtonsActive || scrollButtons === true);
    conditionalElements.scrollButtonStart = showScrollButtons ? /*#__PURE__*/jsxRuntimeExports.jsx(ScrollButtonsSlot, {
      direction: isRtl ? 'right' : 'left',
      onClick: handleStartScrollClick,
      disabled: !displayStartScroll,
      ...scrollButtonSlotProps
    }) : null;
    conditionalElements.scrollButtonEnd = showScrollButtons ? /*#__PURE__*/jsxRuntimeExports.jsx(ScrollButtonsSlot, {
      direction: isRtl ? 'left' : 'right',
      onClick: handleEndScrollClick,
      disabled: !displayEndScroll,
      ...scrollButtonSlotProps
    }) : null;
    return conditionalElements;
  };
  const scrollSelectedIntoView = useEventCallback(animation => {
    const {
      tabsMeta,
      tabMeta
    } = getTabsMeta();
    if (!tabMeta || !tabsMeta) {
      return;
    }
    if (tabMeta[start] < tabsMeta[start]) {
      // left side of button is out of view
      const nextScrollStart = tabsMeta[scrollStart] + (tabMeta[start] - tabsMeta[start]);
      scroll(nextScrollStart, {
        animation
      });
    } else if (tabMeta[end] > tabsMeta[end]) {
      // right side of button is out of view
      const nextScrollStart = tabsMeta[scrollStart] + (tabMeta[end] - tabsMeta[end]);
      scroll(nextScrollStart, {
        animation
      });
    }
  });
  const updateScrollButtonState = useEventCallback(() => {
    if (scrollable && scrollButtons !== false) {
      setUpdateScrollObserver(!updateScrollObserver);
    }
  });
  reactExports.useEffect(() => {
    const handleResize = debounce(() => {
      // If the Tabs component is replaced by Suspense with a fallback, the last
      // ResizeObserver's handler that runs because of the change in the layout is trying to
      // access a dom node that is no longer there (as the fallback component is being shown instead).
      // See https://github.com/mui/material-ui/issues/33276
      // TODO: Add tests that will ensure the component is not failing when
      // replaced by Suspense with a fallback, once React is updated to version 18
      if (tabsRef.current) {
        updateIndicatorState();
      }
    });
    let resizeObserver;

    /**
     * @type {MutationCallback}
     */
    const handleMutation = records => {
      records.forEach(record => {
        record.removedNodes.forEach(item => {
          resizeObserver?.unobserve(item);
        });
        record.addedNodes.forEach(item => {
          resizeObserver?.observe(item);
        });
      });
      handleResize();
      updateScrollButtonState();
    };
    const win = ownerWindow(tabsRef.current);
    win.addEventListener('resize', handleResize);
    let mutationObserver;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(handleResize);
      Array.from(tabListRef.current.children).forEach(child => {
        resizeObserver.observe(child);
      });
    }
    if (typeof MutationObserver !== 'undefined') {
      mutationObserver = new MutationObserver(handleMutation);
      mutationObserver.observe(tabListRef.current, {
        childList: true
      });
    }
    return () => {
      handleResize.clear();
      win.removeEventListener('resize', handleResize);
      mutationObserver?.disconnect();
      resizeObserver?.disconnect();
    };
  }, [updateIndicatorState, updateScrollButtonState]);

  /**
   * Toggle visibility of start and end scroll buttons
   * Using IntersectionObserver on first and last Tabs.
   */
  reactExports.useEffect(() => {
    const tabListChildren = Array.from(tabListRef.current.children);
    const length = tabListChildren.length;
    if (typeof IntersectionObserver !== 'undefined' && length > 0 && scrollable && scrollButtons !== false) {
      const firstTab = tabListChildren[0];
      const lastTab = tabListChildren[length - 1];
      const observerOptions = {
        root: tabsRef.current,
        threshold: 0.99
      };
      const handleScrollButtonStart = entries => {
        setDisplayStartScroll(!entries[0].isIntersecting);
      };
      const firstObserver = new IntersectionObserver(handleScrollButtonStart, observerOptions);
      firstObserver.observe(firstTab);
      const handleScrollButtonEnd = entries => {
        setDisplayEndScroll(!entries[0].isIntersecting);
      };
      const lastObserver = new IntersectionObserver(handleScrollButtonEnd, observerOptions);
      lastObserver.observe(lastTab);
      return () => {
        firstObserver.disconnect();
        lastObserver.disconnect();
      };
    }
    return undefined;
  }, [scrollable, scrollButtons, updateScrollObserver, childrenProp?.length]);
  reactExports.useEffect(() => {
    setMounted(true);
  }, []);
  reactExports.useEffect(() => {
    updateIndicatorState();
  });
  reactExports.useEffect(() => {
    // Don't animate on the first render.
    scrollSelectedIntoView(defaultIndicatorStyle !== indicatorStyle);
  }, [scrollSelectedIntoView, indicatorStyle]);
  reactExports.useImperativeHandle(action, () => ({
    updateIndicator: updateIndicatorState,
    updateScrollButtons: updateScrollButtonState
  }), [updateIndicatorState, updateScrollButtonState]);
  const [IndicatorSlot, indicatorSlotProps] = useSlot('indicator', {
    className: clsx(classes.indicator, TabIndicatorProps.className),
    elementType: TabsIndicator,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      style: indicatorStyle
    }
  });
  const indicator = /*#__PURE__*/jsxRuntimeExports.jsx(IndicatorSlot, {
    ...indicatorSlotProps
  });
  let childIndex = 0;
  const children = reactExports.Children.map(childrenProp, child => {
    if (! /*#__PURE__*/reactExports.isValidElement(child)) {
      return null;
    }
    const childValue = child.props.value === undefined ? childIndex : child.props.value;
    valueToIndex.set(childValue, childIndex);
    const selected = childValue === value;
    childIndex += 1;
    return /*#__PURE__*/reactExports.cloneElement(child, {
      fullWidth: variant === 'fullWidth',
      indicator: selected && !mounted && indicator,
      selected,
      selectionFollowsFocus,
      onChange,
      textColor,
      value: childValue,
      ...(childIndex === 1 && value === false && !child.props.tabIndex ? {
        tabIndex: 0
      } : {})
    });
  });
  const handleKeyDown = event => {
    // Check if a modifier key (Alt, Shift, Ctrl, Meta) is pressed
    if (event.altKey || event.shiftKey || event.ctrlKey || event.metaKey) {
      return;
    }
    const list = tabListRef.current;
    const currentFocus = activeElement(ownerDocument(list));
    // Keyboard navigation assumes that [role="tab"] are siblings
    // though we might warn in the future about nested, interactive elements
    // as a a11y violation
    const role = currentFocus?.getAttribute('role');
    if (role !== 'tab') {
      return;
    }
    let previousItemKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
    let nextItemKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
    if (orientation === 'horizontal' && isRtl) {
      // swap previousItemKey with nextItemKey
      previousItemKey = 'ArrowRight';
      nextItemKey = 'ArrowLeft';
    }
    switch (event.key) {
      case previousItemKey:
        event.preventDefault();
        moveFocus(list, currentFocus, previousItem);
        break;
      case nextItemKey:
        event.preventDefault();
        moveFocus(list, currentFocus, nextItem);
        break;
      case 'Home':
        event.preventDefault();
        moveFocus(list, null, nextItem);
        break;
      case 'End':
        event.preventDefault();
        moveFocus(list, null, previousItem);
        break;
    }
  };
  const conditionalElements = getConditionalElements();
  const [RootSlot, rootSlotProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: TabsRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other,
      component
    },
    ownerState
  });
  const [ScrollerSlot, scrollerSlotProps] = useSlot('scroller', {
    ref: tabsRef,
    className: classes.scroller,
    elementType: TabsScroller,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      style: {
        overflow: scrollerStyle.overflow,
        [vertical ? `margin${isRtl ? 'Left' : 'Right'}` : 'marginBottom']: visibleScrollbar ? undefined : -scrollerStyle.scrollbarWidth
      }
    }
  });
  const [ListSlot, listSlotProps] = useSlot('list', {
    ref: tabListRef,
    className: clsx(classes.list, classes.flexContainer),
    elementType: List,
    externalForwardedProps,
    ownerState,
    getSlotProps: handlers => ({
      ...handlers,
      onKeyDown: event => {
        handleKeyDown(event);
        handlers.onKeyDown?.(event);
      }
    })
  });
  return /*#__PURE__*/jsxRuntimeExports.jsxs(RootSlot, {
    ...rootSlotProps,
    children: [conditionalElements.scrollButtonStart, conditionalElements.scrollbarSizeListener, /*#__PURE__*/jsxRuntimeExports.jsxs(ScrollerSlot, {
      ...scrollerSlotProps,
      children: [/*#__PURE__*/jsxRuntimeExports.jsx(ListSlot, {
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        "aria-orientation": orientation === 'vertical' ? 'vertical' : null,
        role: "tablist",
        ...listSlotProps,
        children: children
      }), mounted && indicator]
    }), conditionalElements.scrollButtonEnd]
  });
});
var Tabs$1 = Tabs;

const hasInfo = (arr, info) => {
    return !!arr.find((item) => item.id === info.id);
};
const filterOutInfo = (arr, info) => {
    return arr.filter((item) => item.id !== info.id);
};
const extractLabelIds = (arr) => {
    return arr.map((item) => item.id);
};
const hasIdOfLabel = (arr, id) => {
    return !!arr.find((info) => info.id === id);
};

const selectedMedia = atom([]);
const useSelectedMediaState = () => {
    return useAtomValue(selectedMedia);
};
const useSelectedMediaMutators = () => {
    const setSelectedMedia = useSetAtom(selectedMedia);
    const toggleMediumSelection = (info) => {
        setSelectedMedia((prev) => {
            return hasInfo(prev, info) ? filterOutInfo(prev, info) : [...prev, info];
        });
    };
    const clearSelectedMedia = () => {
        setSelectedMedia([]);
    };
    return { setSelectedMedia, toggleMediumSelection, clearSelectedMedia };
};

const ActionPane = ({ actionLabel, dispatchEvent }) => {
    const selectedMedia = useSelectedMediaState();
    const { clearSelectedMedia } = useSelectedMediaMutators();
    const onClickAction = () => {
        if (!dispatchEvent)
            return;
        dispatchEvent(selectedMedia.map((item) => item.id));
    };
    return (jsxs(Wrapper$6, { children: [jsx("p", { className: "info", children: getInfoText$1(selectedMedia.length) }), jsxs(ButtonWrapper, { children: [jsx(Button, { variant: "contained", disableElevation: true, disabled: selectedMedia.length === 0, sx: { textTransform: "none" }, onClick: onClickAction, children: actionLabel }), jsx(Button, { variant: "outlined", onClick: clearSelectedMedia, sx: { textTransform: "none" }, children: "Clear selection" })] })] }));
};
const getInfoText$1 = (mediaLength) => {
    if (mediaLength === 0) {
        return "No media selected";
    }
    else if (mediaLength === 1) {
        return "1 medium selected";
    }
    else {
        return `${mediaLength} media selected`;
    }
};
const Wrapper$6 = styled("div")({
    borderRadius: THEME.ROUND.BASE,
    backgroundColor: THEME.COLOR.WHITE,
    paddingBlock: THEME.SIZE.S1,
    paddingInline: THEME.SIZE.S2,
    "& p.info": {
        marginBottom: THEME.SIZE.S05,
        fontSize: 18,
        fontWeight: THEME.FONT_WEIGHT.MEDIUM,
    },
});
const ButtonWrapper = styled("div")({
    display: "flex",
    gap: THEME.SIZE.S1,
    "& > *": {
        flexGrow: 1,
        flexBasis: 0,
    },
});

const MediaListItem = ({ id, label, isChecked, onClick }) => {
    const url = `${PATH_MEDIUM}${id}`;
    return (jsxs(Wrapper$5, { children: [jsx(IdCol, { href: makeLinkPath(url), target: getLinkTarget(url), children: id }), jsx(LabelCol, { children: jsx(Tooltip, { title: label, placement: "top", arrow: true, slotProps: { popper: { disablePortal: true } }, children: jsx("span", { children: label }) }) }), jsx(CheckCol, { children: jsx(Checkbox$1, { checked: isChecked, onClick: () => onClick({ id, label }) }) })] }));
};
const Wrapper$5 = styled("div")({
    display: "flex",
    backgroundColor: THEME.COLOR.WHITE,
    border: `1px solid ${THEME.COLOR.GRAY_LINE}`,
    padding: `0 ${THEME.SIZE.S1}px`,
    justifyContent: "space-between",
    alignItems: "center",
    gap: THEME.SIZE.S2,
    "& + &": {
        borderTop: "none",
    },
});
const IdCol = styled("a")({
    flexShrink: 0,
    flexGrow: 0,
    width: 90,
    color: THEME.COLOR.PRIMARY,
    textDecoration: "none",
});
const LabelCol = styled("span")({
    flexGrow: 1,
    flexShrink: 1,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
});
const CheckCol = styled("span")({
    flexShrink: 0,
});

const Pagination = ({ total, current, displayLength, onClickNext, onClickPrev, }) => {
    return (jsxs(Wrapper$4, { children: [jsxs("div", { children: [current > 0 && jsx("input", { type: "button", value: "PREV", onClick: onClickPrev }), current + displayLength < total && (jsx("input", { type: "button", value: "NEXT", onClick: onClickNext }))] }), jsx("div", { children: makeDisplayMessage(total, current, displayLength) })] }));
};
const makeDisplayMessage = (total, current, displayLength) => {
    switch (true) {
        case current + displayLength > total:
            return `Showing ${current + 1} to ${total} of total ${total} items`;
        default:
            return `Showing ${current + 1} to ${current + displayLength} of total ${total} items`;
    }
};
const Wrapper$4 = styled("div")({
    display: "flex",
    justifyContent: "space-between",
    marginTop: THEME.SIZE.S1,
    "& input[type='button']": {
        cursor: "pointer",
        paddingInline: THEME.SIZE.S1,
        marginRight: THEME.SIZE.S1,
    },
});

const queryData = atom({});
const useQueryDataState = () => {
    return useAtomValue(queryData);
};
const useQueryDataMutators = () => {
    const setQueryData = useSetAtom(queryData);
    return { setQueryData };
};

const queryDataToInfoText = (data) => {
    if (!data) {
        return "";
    }
    return Object.entries(data)
        .map(([key, value]) => {
        let valueText;
        if (isArray(value)) {
            valueText = value.join(", ");
        }
        else {
            valueText = value ?? "";
        }
        return `${key}${valueText ? ":" : ""}${valueText}`;
    })
        .join(" / ");
};

const QueryInfo = () => {
    const queryData = useQueryDataState();
    return (jsxs(Wrapper$3, { children: [jsx("p", { children: "Queried with:" }), jsx("p", { children: queryDataToInfoText(queryData) })] }));
};
const Wrapper$3 = styled("div")({
    borderRadius: THEME.ROUND.BASE,
    borderColor: THEME.COLOR.GRAY_LINE,
    borderStyle: "dashed",
    borderWidth: 2,
    padding: THEME.SIZE.S1,
    "& > p:first-of-type": {
        fontWeight: THEME.FONT_WEIGHT.BOLD,
        marginBottom: THEME.SIZE.S05,
    },
});

const nullResponse = {
    total: 0,
    limit: 0,
    contents: [],
    offset: 0,
};
const foundMedia = atom(nullResponse);
const useFoundMediaState = () => {
    return useAtomValue(foundMedia);
};
const useFoundMediaMutators = () => {
    const setFoundMedia = useSetAtom(foundMedia);
    return { setFoundMedia };
};

const isMediaLoading = atom(false);
const useIsMediaLoadingState = () => {
    return useAtomValue(isMediaLoading);
};
const useIsMediaLoadingMutators = () => {
    const setIsMediaLoading = useSetAtom(isMediaLoading);
    return { setIsMediaLoading };
};

const mediaPagination = atom(1);
const useMediaPaginationState = () => {
    return useAtomValue(mediaPagination);
};
const useMediaPaginationMutators = () => {
    const setMediaPagination = useSetAtom(mediaPagination);
    //todo: fix this logic
    const next = () => setMediaPagination((prev) => prev + 1);
    const prev = () => setMediaPagination((prev) => prev - 1);
    const reset = () => setMediaPagination(1);
    return { next, prev, reset };
};

const FoundMediaList = () => {
    const { next, prev } = useMediaPaginationMutators();
    const { data, toggleChecked, isLoading, response } = useFoundMedia();
    return (jsxs(Wrapper$2, { children: [jsx(QueryInfo, {}), jsx(InfoText, { children: getInfoText(response.total, isLoading) }), jsxs(ListWrapper, { children: [isLoading && (jsx(LoadingIndicator, { children: jsx(CircularProgress, { color: "inherit", size: 40 }) })), jsx("div", { children: data.map((item) => (jsx(MediaListItem, { ...item, onClick: toggleChecked }, item.id))) }), !!response.total && !isLoading && (jsx(Pagination, { total: response.total, current: response.offset, displayLength: response.limit, onClickNext: next, onClickPrev: prev }))] })] }));
};
const useFoundMedia = () => {
    const [data, setData] = reactExports.useState([]);
    const response = useFoundMediaState();
    const isLoading = useIsMediaLoadingState();
    const selectedMedia = useSelectedMediaState();
    const { toggleMediumSelection } = useSelectedMediaMutators();
    const toggleChecked = (info) => {
        toggleMediumSelection(info);
    };
    reactExports.useEffect(() => {
        const result = response.contents.map((medium) => {
            return {
                id: medium.gm_id,
                label: medium.name,
                isChecked: hasIdOfLabel(selectedMedia, medium.gm_id),
            };
        });
        setData(result);
    }, [response, selectedMedia]);
    return { data, toggleChecked, isLoading, response };
};
const Wrapper$2 = styled("div")({
    backgroundColor: THEME.COLOR.WHITE,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    flexGrow: 1,
});
const ListWrapper = styled("div")({
    maxHeight: "100%",
    position: "relative",
});
const InfoText = styled("p")({
    fontSize: "18px",
    fontWeight: THEME.FONT_WEIGHT.BOLD,
    marginTop: THEME.SIZE.S3,
    marginBottom: THEME.SIZE.S1,
});
const LoadingIndicator = styled("div")({
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: THEME.COLOR.GRAY700,
});
const getInfoText = (mediaLength, isLoading) => {
    if (isLoading) {
        return "Loading...";
    }
    if (mediaLength === 0) {
        return "No media found";
    }
    else if (mediaLength === 1) {
        return "1 medium found";
    }
    else {
        return `${mediaLength} media found`;
    }
};

const mediaTabNames = ["Found media", "Selected media"];
const mediaTabFocus = atom("Found media");
const useMediaTabFocusState = () => {
    return useAtomValue(mediaTabFocus);
};
const useMediaTabFocusMutators = () => {
    const setMediaTabFocus = useSetAtom(mediaTabFocus);
    return { setMediaTabFocus };
};

const MediaTab = () => {
    const tabFocus = useMediaTabFocusState();
    const { setMediaTabFocus } = useMediaTabFocusMutators();
    const selected = useSelectedMediaState();
    const handleChange = (event, newValue) => {
        setMediaTabFocus(newValue);
    };
    return (jsx(Wrapper$1, { children: jsx(Tabs$1, { value: tabFocus, onChange: handleChange, children: mediaTabNames.map((label) => {
                if (label === "Selected media") {
                    return (jsx(Tab$1, { label: jsx(Badge$1, { badgeContent: selected.length, color: "primary", children: label }), value: label, sx: tabStyles }, label));
                }
                return jsx(Tab$1, { label: label, value: label, sx: tabStyles }, label);
            }) }) }));
};
const Wrapper$1 = styled("div")({
    width: "100%",
    borderBottom: `1px solid ${THEME.COLOR.GRAY_LINE}`,
    "& > *": {
        position: "relative",
        top: "1px",
    },
});
const tabStyles = {
    textTransform: "none",
};

const SHOW_COUNT = 10;
const SelectedMediaList = () => {
    const selectedMedia = useSelectedMediaState();
    const { toggleMediumSelection } = useSelectedMediaMutators();
    const [current, setCurrent] = reactExports.useState(0);
    const next = () => {
        setCurrent(current + SHOW_COUNT);
    };
    const prev = () => {
        setCurrent(current - SHOW_COUNT);
    };
    const data = reactExports.useMemo(() => selectedMedia.filter((_, i) => i >= current).filter((_, i) => i < SHOW_COUNT), [selectedMedia, current]);
    return (jsxs("div", { children: [jsx("div", { children: data.map((item) => (jsx(MediaListItem, { ...item, isChecked: true, onClick: () => {
                        toggleMediumSelection(item);
                    } }, item.id))) }), !!selectedMedia.length && (jsx(Pagination, { total: selectedMedia.length, current: current, displayLength: SHOW_COUNT, onClickNext: next, onClickPrev: prev }))] }));
};

const MediaPane = ({ dispatchEvent }) => {
    const { tabFocus } = useTabFocus();
    return (jsxs(Wrapper, { children: [jsxs(Media, { children: [jsx(MediaTab, {}), jsxs(Contents, { children: [tabFocus === "Found media" && jsx(FoundMediaList, {}), tabFocus === "Selected media" && jsx(SelectedMediaList, {})] })] }), tabFocus === "Selected media" && (jsx(ActionPane, { actionLabel: "Compare media", dispatchEvent: dispatchEvent }))] }));
};
const useTabFocus = () => {
    const tabFocus = useMediaTabFocusState();
    const { setMediaTabFocus } = useMediaTabFocusMutators();
    const foundMedia = useFoundMediaState();
    reactExports.useEffect(() => {
        setMediaTabFocus("Found media");
    }, [foundMedia]);
    return { tabFocus };
};
const Wrapper = styled("div")({
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    gap: THEME.SIZE.S1,
});
const Media = styled("div")({
    padding: THEME.SIZE.S1,
    borderRadius: THEME.ROUND.BASE,
    backgroundColor: THEME.COLOR.WHITE,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
});
const Contents = styled("div")({
    paddingBlock: THEME.SIZE.S2,
    paddingInline: THEME.SIZE.S1,
    flexGrow: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
});

const AppWrapper = styled("div")({
    position: "relative",
    backgroundColor: THEME.COLOR.GRAY_BG,
    padding: THEME.SIZE.S1,
    height: "100%",
    display: "flex",
    flexGrow: 1,
    alignItems: "stretch",
    gap: THEME.SIZE.S1,
});

const QueryPane = styled("div")({
    position: "relative",
    flex: 1,
    overflowY: "auto",
    borderRadius: THEME.ROUND.BASE,
    padding: THEME.SIZE.S1,
    backgroundColor: THEME.COLOR.WHITE,
    display: "flex",
    flexDirection: "column",
    gap: THEME.SIZE.S2,
});

const SubPane = styled("div")({
    display: "flex",
    flexDirection: "column",
    maxWidth: "380px",
    minWidth: "380px",
});

const listApiColumnSchema = object({
    key: string(),
    label: string(),
});
const listApiLinkSchema = object({
    href: string(),
    label: string(),
});
const createListApiResponseSchema = (itemSchema) => object({
    limit: number(),
    total: number(),
    offset: number(),
    contents: array(itemSchema),
    columns: array(listApiColumnSchema),
});
const createListApiParamsSchema = (shape) => object(shape).extend({
    limit: number().optional(),
    offset: number().optional(),
});
const nullListResponse = {
    total: 0,
    contents: [],
    offset: 0,
    limit: 0,
    columns: [],
};

export { AppWrapper as A, Badge$1 as B, Checkbox$1 as C, MediaPane as M, Pagination as P, QueryPane as Q, SubPane as S, Tabs$1 as T, createListApiParamsSchema as a, useFoundMediaMutators as b, createListApiResponseSchema as c, useQueryDataMutators as d, useIsMediaLoadingMutators as e, useMediaPaginationMutators as f, filterOutInfo as g, hasInfo as h, hasIdOfLabel as i, Tab$1 as j, extractLabelIds as k, listApiLinkSchema as l, nullListResponse as n, useMediaPaginationState as u };
//# sourceMappingURL=ListApi-c3bc90be.js.map
