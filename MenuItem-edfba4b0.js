import { s as styled, y as capitalize, m as reactExports, A as jsxRuntimeExports, z as clsx, B as rootShouldForwardProp, C as useEnhancedEffect } from './StanzaReactProvider-6021d3e7.js';
import { l as internal_createExtendSxProp, B as ButtonBase, L as ListContext } from './Select-a2b2ad7a.js';
import { a as generateUtilityClass, g as generateUtilityClasses, m as memoTheme, u as useDefaultProps, c as composeClasses, f as useForkRef } from './useSlotProps-42393a51.js';
import { c as createSimplePaletteValueFilter } from './CircularProgress-0dc9c54d.js';

function getTypographyUtilityClass(slot) {
  return generateUtilityClass('MuiTypography', slot);
}
generateUtilityClasses('MuiTypography', ['root', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'inherit', 'button', 'caption', 'overline', 'alignLeft', 'alignRight', 'alignCenter', 'alignJustify', 'noWrap', 'gutterBottom', 'paragraph']);

const v6Colors = {
  primary: true,
  secondary: true,
  error: true,
  info: true,
  success: true,
  warning: true,
  textPrimary: true,
  textSecondary: true,
  textDisabled: true
};
const extendSxProp = internal_createExtendSxProp();
const useUtilityClasses$1 = ownerState => {
  const {
    align,
    gutterBottom,
    noWrap,
    paragraph,
    variant,
    classes
  } = ownerState;
  const slots = {
    root: ['root', variant, ownerState.align !== 'inherit' && `align${capitalize(align)}`, gutterBottom && 'gutterBottom', noWrap && 'noWrap', paragraph && 'paragraph']
  };
  return composeClasses(slots, getTypographyUtilityClass, classes);
};
const TypographyRoot = styled('span', {
  name: 'MuiTypography',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.variant && styles[ownerState.variant], ownerState.align !== 'inherit' && styles[`align${capitalize(ownerState.align)}`], ownerState.noWrap && styles.noWrap, ownerState.gutterBottom && styles.gutterBottom, ownerState.paragraph && styles.paragraph];
  }
})(memoTheme(({
  theme
}) => ({
  margin: 0,
  variants: [{
    props: {
      variant: 'inherit'
    },
    style: {
      // Some elements, like <button> on Chrome have default font that doesn't inherit, reset this.
      font: 'inherit',
      lineHeight: 'inherit',
      letterSpacing: 'inherit'
    }
  }, ...Object.entries(theme.typography).filter(([variant, value]) => variant !== 'inherit' && value && typeof value === 'object').map(([variant, value]) => ({
    props: {
      variant
    },
    style: value
  })), ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
    props: {
      color
    },
    style: {
      color: (theme.vars || theme).palette[color].main
    }
  })), ...Object.entries(theme.palette?.text || {}).filter(([, value]) => typeof value === 'string').map(([color]) => ({
    props: {
      color: `text${capitalize(color)}`
    },
    style: {
      color: (theme.vars || theme).palette.text[color]
    }
  })), {
    props: ({
      ownerState
    }) => ownerState.align !== 'inherit',
    style: {
      textAlign: 'var(--Typography-textAlign)'
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.noWrap,
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.gutterBottom,
    style: {
      marginBottom: '0.35em'
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.paragraph,
    style: {
      marginBottom: 16
    }
  }]
})));
const defaultVariantMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  inherit: 'p'
};
const Typography = /*#__PURE__*/reactExports.forwardRef(function Typography(inProps, ref) {
  const {
    color,
    ...themeProps
  } = useDefaultProps({
    props: inProps,
    name: 'MuiTypography'
  });
  const isSxColor = !v6Colors[color];
  // TODO: Remove `extendSxProp` in v7
  const props = extendSxProp({
    ...themeProps,
    ...(isSxColor && {
      color
    })
  });
  const {
    align = 'inherit',
    className,
    component,
    gutterBottom = false,
    noWrap = false,
    paragraph = false,
    variant = 'body1',
    variantMapping = defaultVariantMapping,
    ...other
  } = props;
  const ownerState = {
    ...props,
    align,
    color,
    className,
    component,
    gutterBottom,
    noWrap,
    paragraph,
    variant,
    variantMapping
  };
  const Component = component || (paragraph ? 'p' : variantMapping[variant] || defaultVariantMapping[variant]) || 'span';
  const classes = useUtilityClasses$1(ownerState);
  return /*#__PURE__*/jsxRuntimeExports.jsx(TypographyRoot, {
    as: Component,
    ref: ref,
    className: clsx(classes.root, className),
    ...other,
    ownerState: ownerState,
    style: {
      ...(align !== 'inherit' && {
        '--Typography-textAlign': align
      }),
      ...other.style
    }
  });
});
var Typography$1 = Typography;

const dividerClasses = generateUtilityClasses('MuiDivider', ['root', 'absolute', 'fullWidth', 'inset', 'middle', 'flexItem', 'light', 'vertical', 'withChildren', 'withChildrenVertical', 'textAlignRight', 'textAlignLeft', 'wrapper', 'wrapperVertical']);
var dividerClasses$1 = dividerClasses;

const listItemIconClasses = generateUtilityClasses('MuiListItemIcon', ['root', 'alignItemsFlexStart']);
var listItemIconClasses$1 = listItemIconClasses;

const listItemTextClasses = generateUtilityClasses('MuiListItemText', ['root', 'multiline', 'dense', 'inset', 'primary', 'secondary']);
var listItemTextClasses$1 = listItemTextClasses;

function getMenuItemUtilityClass(slot) {
  return generateUtilityClass('MuiMenuItem', slot);
}
const menuItemClasses = generateUtilityClasses('MuiMenuItem', ['root', 'focusVisible', 'dense', 'disabled', 'divider', 'gutters', 'selected']);
var menuItemClasses$1 = menuItemClasses;

const overridesResolver = (props, styles) => {
  const {
    ownerState
  } = props;
  return [styles.root, ownerState.dense && styles.dense, ownerState.divider && styles.divider, !ownerState.disableGutters && styles.gutters];
};
const useUtilityClasses = ownerState => {
  const {
    disabled,
    dense,
    divider,
    disableGutters,
    selected,
    classes
  } = ownerState;
  const slots = {
    root: ['root', dense && 'dense', disabled && 'disabled', !disableGutters && 'gutters', divider && 'divider', selected && 'selected']
  };
  const composedClasses = composeClasses(slots, getMenuItemUtilityClass, classes);
  return {
    ...classes,
    ...composedClasses
  };
};
const MenuItemRoot = styled(ButtonBase, {
  shouldForwardProp: prop => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiMenuItem',
  slot: 'Root',
  overridesResolver
})(memoTheme(({
  theme
}) => ({
  ...theme.typography.body1,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  position: 'relative',
  textDecoration: 'none',
  minHeight: 48,
  paddingTop: 6,
  paddingBottom: 6,
  boxSizing: 'border-box',
  whiteSpace: 'nowrap',
  '&:hover': {
    textDecoration: 'none',
    backgroundColor: (theme.vars || theme).palette.action.hover,
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  },
  [`&.${menuItemClasses$1.selected}`]: {
    backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, (theme.vars || theme).palette.action.selectedOpacity),
    [`&.${menuItemClasses$1.focusVisible}`]: {
      backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.focusOpacity}`)
    }
  },
  [`&.${menuItemClasses$1.selected}:hover`]: {
    backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.hoverOpacity}`),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: theme.alpha((theme.vars || theme).palette.primary.main, (theme.vars || theme).palette.action.selectedOpacity)
    }
  },
  [`&.${menuItemClasses$1.focusVisible}`]: {
    backgroundColor: (theme.vars || theme).palette.action.focus
  },
  [`&.${menuItemClasses$1.disabled}`]: {
    opacity: (theme.vars || theme).palette.action.disabledOpacity
  },
  [`& + .${dividerClasses$1.root}`]: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  [`& + .${dividerClasses$1.inset}`]: {
    marginLeft: 52
  },
  [`& .${listItemTextClasses$1.root}`]: {
    marginTop: 0,
    marginBottom: 0
  },
  [`& .${listItemTextClasses$1.inset}`]: {
    paddingLeft: 36
  },
  [`& .${listItemIconClasses$1.root}`]: {
    minWidth: 36
  },
  variants: [{
    props: ({
      ownerState
    }) => !ownerState.disableGutters,
    style: {
      paddingLeft: 16,
      paddingRight: 16
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.divider,
    style: {
      borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
      backgroundClip: 'padding-box'
    }
  }, {
    props: ({
      ownerState
    }) => !ownerState.dense,
    style: {
      [theme.breakpoints.up('sm')]: {
        minHeight: 'auto'
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.dense,
    style: {
      minHeight: 32,
      // https://m2.material.io/components/menus#specs > Dense
      paddingTop: 4,
      paddingBottom: 4,
      ...theme.typography.body2,
      [`& .${listItemIconClasses$1.root} svg`]: {
        fontSize: '1.25rem'
      }
    }
  }]
})));
const MenuItem = /*#__PURE__*/reactExports.forwardRef(function MenuItem(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiMenuItem'
  });
  const {
    autoFocus = false,
    component = 'li',
    dense = false,
    divider = false,
    disableGutters = false,
    focusVisibleClassName,
    role = 'menuitem',
    tabIndex: tabIndexProp,
    className,
    ...other
  } = props;
  const context = reactExports.useContext(ListContext);
  const childContext = reactExports.useMemo(() => ({
    dense: dense || context.dense || false,
    disableGutters
  }), [context.dense, dense, disableGutters]);
  const menuItemRef = reactExports.useRef(null);
  useEnhancedEffect(() => {
    if (autoFocus) {
      if (menuItemRef.current) {
        menuItemRef.current.focus();
      }
    }
  }, [autoFocus]);
  const ownerState = {
    ...props,
    dense: childContext.dense,
    divider,
    disableGutters
  };
  const classes = useUtilityClasses(props);
  const handleRef = useForkRef(menuItemRef, ref);
  let tabIndex;
  if (!props.disabled) {
    tabIndex = tabIndexProp !== undefined ? tabIndexProp : -1;
  }
  return /*#__PURE__*/jsxRuntimeExports.jsx(ListContext.Provider, {
    value: childContext,
    children: /*#__PURE__*/jsxRuntimeExports.jsx(MenuItemRoot, {
      ref: handleRef,
      role: role,
      tabIndex: tabIndex,
      component: component,
      focusVisibleClassName: clsx(classes.focusVisible, focusVisibleClassName),
      className: clsx(classes.root, className),
      ...other,
      ownerState: ownerState,
      classes: classes
    })
  });
});
var MenuItem$1 = MenuItem;

export { MenuItem$1 as M, Typography$1 as T };
//# sourceMappingURL=MenuItem-edfba4b0.js.map
