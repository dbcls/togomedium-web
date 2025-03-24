import { d as defineStanzaElement } from './stanza-ee9dc64c.js';
import { s as styled, A as capitalize, q as jsxRuntimeExports, C as rootShouldForwardProp, x as alpha, z as useEnhancedEffect, T as THEME, a as jsxs, j as jsx, l as atom, m as useAtomValue, o as useSetAtom, b as TogoMediumReactStanza } from './StanzaReactProvider-b083349e.js';
import { q as internal_createExtendSxProp, j as useFormControl, k as formControlState, B as ButtonBase, L as ListContext, C as Checkbox, r as hasInfo, s as filterOutInfo, t as hasIdOfLabel, n as nullListResponse, v as Pagination, T as Tabs, w as Tab, x as Badge, F as FormControl, I as InputLabel, l as Select, u as useMediaPaginationState, b as useQueryDataMutators, a as useFoundMediaMutators, c as useIsMediaLoadingMutators, d as useMediaPaginationMutators, y as extractLabelIds, Q as QueryPane, S as SubPane, M as MediaPane, A as AppWrapper } from './ListApi-115ba089.js';
import { r as reactExports } from './index-ef9d40bc.js';
import { b as PATH_TAXON } from './consts-deffa432.js';
import { m as makeLinkPath, g as getLinkTarget, u as useQuery } from './getLinkTarget-f23444d4.js';
import { m as makeApiUrl, g as getData } from './getData-1442ae18.js';
import { c as clone } from './clone-4533aa20.js';
import { c as createSimplePaletteValueFilter, C as CircularProgress } from './isHostComponent-b55b8d7a.js';
import { g as generateUtilityClass, a as generateUtilityClasses, m as memoTheme, u as useDefaultProps, c as clsx, b as composeClasses, d as useForkRef } from './DefaultPropsProvider-c607464a.js';
import { h as useSlot } from './Tooltip-f4db4da8.js';
import { S as Slider } from './Slider-fa6f7527.js';
import { l as listMediaOfTaxonsURL } from './definitions-85d5d955.js';
import './createSvgIcon-d354a6e3.js';

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
const useUtilityClasses$2 = ownerState => {
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
  const classes = useUtilityClasses$2(ownerState);
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

function getFormControlLabelUtilityClasses(slot) {
  return generateUtilityClass('MuiFormControlLabel', slot);
}
const formControlLabelClasses = generateUtilityClasses('MuiFormControlLabel', ['root', 'labelPlacementStart', 'labelPlacementTop', 'labelPlacementBottom', 'disabled', 'label', 'error', 'required', 'asterisk']);
var formControlLabelClasses$1 = formControlLabelClasses;

const useUtilityClasses$1 = ownerState => {
  const {
    classes,
    disabled,
    labelPlacement,
    error,
    required
  } = ownerState;
  const slots = {
    root: ['root', disabled && 'disabled', `labelPlacement${capitalize(labelPlacement)}`, error && 'error', required && 'required'],
    label: ['label', disabled && 'disabled'],
    asterisk: ['asterisk', error && 'error']
  };
  return composeClasses(slots, getFormControlLabelUtilityClasses, classes);
};
const FormControlLabelRoot = styled('label', {
  name: 'MuiFormControlLabel',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${formControlLabelClasses$1.label}`]: styles.label
    }, styles.root, styles[`labelPlacement${capitalize(ownerState.labelPlacement)}`]];
  }
})(memoTheme(({
  theme
}) => ({
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'pointer',
  // For correct alignment with the text.
  verticalAlign: 'middle',
  WebkitTapHighlightColor: 'transparent',
  marginLeft: -11,
  marginRight: 16,
  // used for row presentation of radio/checkbox
  [`&.${formControlLabelClasses$1.disabled}`]: {
    cursor: 'default'
  },
  [`& .${formControlLabelClasses$1.label}`]: {
    [`&.${formControlLabelClasses$1.disabled}`]: {
      color: (theme.vars || theme).palette.text.disabled
    }
  },
  variants: [{
    props: {
      labelPlacement: 'start'
    },
    style: {
      flexDirection: 'row-reverse',
      marginRight: -11
    }
  }, {
    props: {
      labelPlacement: 'top'
    },
    style: {
      flexDirection: 'column-reverse'
    }
  }, {
    props: {
      labelPlacement: 'bottom'
    },
    style: {
      flexDirection: 'column'
    }
  }, {
    props: ({
      labelPlacement
    }) => labelPlacement === 'start' || labelPlacement === 'top' || labelPlacement === 'bottom',
    style: {
      marginLeft: 16 // used for row presentation of radio/checkbox
    }
  }]
})));
const AsteriskComponent = styled('span', {
  name: 'MuiFormControlLabel',
  slot: 'Asterisk',
  overridesResolver: (props, styles) => styles.asterisk
})(memoTheme(({
  theme
}) => ({
  [`&.${formControlLabelClasses$1.error}`]: {
    color: (theme.vars || theme).palette.error.main
  }
})));

/**
 * Drop-in replacement of the `Radio`, `Switch` and `Checkbox` component.
 * Use this component if you want to display an extra label.
 */
const FormControlLabel = /*#__PURE__*/reactExports.forwardRef(function FormControlLabel(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiFormControlLabel'
  });
  const {
    checked,
    className,
    componentsProps = {},
    control,
    disabled: disabledProp,
    disableTypography,
    inputRef,
    label: labelProp,
    labelPlacement = 'end',
    name,
    onChange,
    required: requiredProp,
    slots = {},
    slotProps = {},
    value,
    ...other
  } = props;
  const muiFormControl = useFormControl();
  const disabled = disabledProp ?? control.props.disabled ?? muiFormControl?.disabled;
  const required = requiredProp ?? control.props.required;
  const controlProps = {
    disabled,
    required
  };
  ['checked', 'name', 'onChange', 'value', 'inputRef'].forEach(key => {
    if (typeof control.props[key] === 'undefined' && typeof props[key] !== 'undefined') {
      controlProps[key] = props[key];
    }
  });
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ['error']
  });
  const ownerState = {
    ...props,
    disabled,
    labelPlacement,
    required,
    error: fcs.error
  };
  const classes = useUtilityClasses$1(ownerState);
  const externalForwardedProps = {
    slots,
    slotProps: {
      ...componentsProps,
      ...slotProps
    }
  };
  const [TypographySlot, typographySlotProps] = useSlot('typography', {
    elementType: Typography$1,
    externalForwardedProps,
    ownerState
  });
  let label = labelProp;
  if (label != null && label.type !== Typography$1 && !disableTypography) {
    label = /*#__PURE__*/jsxRuntimeExports.jsx(TypographySlot, {
      component: "span",
      ...typographySlotProps,
      className: clsx(classes.label, typographySlotProps?.className),
      children: label
    });
  }
  return /*#__PURE__*/jsxRuntimeExports.jsxs(FormControlLabelRoot, {
    className: clsx(classes.root, className),
    ownerState: ownerState,
    ref: ref,
    ...other,
    children: [/*#__PURE__*/reactExports.cloneElement(control, controlProps), required ? /*#__PURE__*/jsxRuntimeExports.jsxs("div", {
      children: [label, /*#__PURE__*/jsxRuntimeExports.jsxs(AsteriskComponent, {
        ownerState: ownerState,
        "aria-hidden": true,
        className: classes.asterisk,
        children: ["\u2009", '*']
      })]
    }) : label]
  });
});
var FormControlLabel$1 = FormControlLabel;

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
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.selectedOpacity})` : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    [`&.${menuItemClasses$1.focusVisible}`]: {
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.focusOpacity}))` : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
    }
  },
  [`&.${menuItemClasses$1.selected}:hover`]: {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / calc(${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.hoverOpacity}))` : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: theme.vars ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.selectedOpacity})` : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
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

const OrganismListItem = ({ id, label, isChecked, onClick }) => {
    const url = `${PATH_TAXON}${id}`;
    return (jsxs(Wrapper$6, { children: [jsxs(ListInner, { children: [jsx(LabelCol, { children: label }), jsxs(IdCol, { href: makeLinkPath(url), target: getLinkTarget(url), children: ["[tax_id:", id, "]"] })] }), jsx(CheckCol, { children: jsx(Checkbox, { checked: isChecked, onClick: () => onClick({ id, label }) }) })] }));
};
const Wrapper$6 = styled("div")({
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: THEME.COLOR.WHITE,
    border: `1px solid ${THEME.COLOR.GRAY_LINE}`,
    paddingInline: THEME.SIZE.S1,
    alignItems: "center",
    "& + &": {
        borderTop: "none",
    },
});
const ListInner = styled("div")({
    display: "flex",
    gap: THEME.SIZE.S2,
    flexShrink: 0,
    flexGrow: 0,
    width: "calc(100% - 40px)",
});
const IdCol = styled("a")({
    flexShrink: 0,
    flexGrow: 0,
    width: 100,
    color: THEME.COLOR.PRIMARY,
    textDecoration: "none",
});
const LabelCol = styled("span")({
    flexGrow: 0,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
});
const CheckCol = styled("span")({
    flexShrink: 0,
    flexGrow: 0,
});

const selectedOrganisms = atom([]);
const useSelectedOrganismsState = () => {
    return useAtomValue(selectedOrganisms);
};
const useSelectedOrganismsMutators = () => {
    const setSelectedOrganisms = useSetAtom(selectedOrganisms);
    const toggleOrganismSelection = (info) => {
        setSelectedOrganisms((prev) => {
            return hasInfo(prev, info) ? filterOutInfo(prev, info) : [...prev, info];
        });
    };
    const clearSelectedOrganisms = () => {
        setSelectedOrganisms([]);
    };
    return { setSelectedOrganisms, toggleOrganismSelection, clearSelectedOrganisms };
};

// type FoundOrganisms = MediaFinderListApiBody<"tax_id" | "name">;
const useOrganismList = (response) => {
    const [list, setList] = reactExports.useState([]);
    const selectedOrganisms = useSelectedOrganismsState();
    const { toggleOrganismSelection } = useSelectedOrganismsMutators();
    reactExports.useEffect(() => {
        const result = (response?.contents ?? []).map((organism) => {
            return {
                id: organism.tax_id,
                label: organism.name,
                isChecked: hasIdOfLabel(selectedOrganisms, organism.tax_id),
            };
        });
        setList(result);
    }, [response, selectedOrganisms]);
    return { list, toggleOrganismSelection };
};

const listOrganismsByPhenotypesURL = makeApiUrl("gmdb_organisms_by_phenotypes");

const organismPagination = atom(1);
const useOrganismPaginationState = () => {
    return useAtomValue(organismPagination);
};
const useOrganismPaginationMutators = () => {
    const setOrganismPagination = useSetAtom(organismPagination);
    const next = () => setOrganismPagination((prev) => prev + 1);
    const prev = () => setOrganismPagination((prev) => prev - 1);
    const reset = () => setOrganismPagination(1);
    return { next, prev, reset };
};

const phenotypeQuery = atom({});
const usePhenotypeQueryState = () => {
    return useAtomValue(phenotypeQuery);
};
const usePhenotypeQueryMutators = () => {
    const setPhenotypeQuery = useSetAtom(phenotypeQuery);
    const updatePhenotypeQuery = (key, value) => {
        setPhenotypeQuery((prev) => {
            const cloned = clone(prev);
            cloned[key] = value;
            return cloned;
        });
    };
    const removePhenotypeQuery = (key) => {
        setPhenotypeQuery((prev) => {
            const cloned = clone(prev);
            if (cloned[key]) {
                delete cloned[key];
            }
            return cloned;
        });
    };
    const clearPhenotypeQuery = () => {
        setPhenotypeQuery({});
    };
    return { updatePhenotypeQuery, removePhenotypeQuery, clearPhenotypeQuery };
};

const SHOW_COUNT$2 = 10;
const useOrganismQuery = () => {
    const page = useOrganismPaginationState();
    const phenotypeQueryParams = usePhenotypeQueryState();
    return useQuery({
        queryKey: [phenotypeQueryParams, { page }],
        queryFn: async () => {
            if (Object.entries(phenotypeQueryParams).length === 0)
                return nullListResponse;
            //
            const response = await getData(listOrganismsByPhenotypesURL, {
                ...phenotypeQueryParams,
                limit: SHOW_COUNT$2,
                offset: (page - 1) * SHOW_COUNT$2,
            });
            if (!response.body)
                throw new Error("No data");
            return response.body;
        },
        staleTime: Infinity,
        placeholderData: (previousData) => previousData,
    });
};

const FoundOrganismsList = () => {
    const { data, isLoading, isPlaceholderData } = useOrganismQuery();
    const { list, toggleOrganismSelection } = useOrganismList(data);
    const { next, prev } = useOrganismPaginationMutators();
    return (jsx(Wrapper$5, { children: jsxs("div", { children: [(isLoading || isPlaceholderData) && (jsx(LoadingIndicator, { children: jsx(CircularProgress, { color: "inherit", size: 40 }) })), jsx(InfoText, { children: getInfoText(data?.total, isLoading) }), jsx(Inner, { children: (list ?? []).map((item) => (jsx(OrganismListItem, { ...item, onClick: toggleOrganismSelection }, item.id))) }), !!data?.total && !isLoading && (jsx(Pagination, { total: data.total, current: data.offset, displayLength: data.limit, onClickNext: next, onClickPrev: prev }))] }) }));
};
const getInfoText = (organismLength, isLoading) => {
    if (isLoading) {
        return "Loading...";
    }
    if (!organismLength) {
        return "No organisms found";
    }
    else if (organismLength === 1) {
        return "1 organism found";
    }
    else {
        return `${organismLength} organisms found`;
    }
};
const Wrapper$5 = styled("div")({
    position: "relative",
});
const InfoText = styled("p")({
    fontSize: "18px",
    fontWeight: THEME.FONT_WEIGHT.BOLD,
    marginBottom: THEME.SIZE.S1,
});
const Inner = styled("div")({
    maxHeight: "100%",
    overflowY: "auto",
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

const organismTabNames = ["Found organisms", "Selected organisms"];
const organismTabFocus = atom("Found organisms");
const useOrganismTabFocusState = () => {
    return useAtomValue(organismTabFocus);
};
const useOrganismTabFocusMutators = () => {
    const setOrganismTabFocus = useSetAtom(organismTabFocus);
    return { setOrganismTabFocus };
};

const OrganismTab = () => {
    const tabFocus = useOrganismTabFocusState();
    const { setOrganismTabFocus } = useOrganismTabFocusMutators();
    const selected = useSelectedOrganismsState();
    const handleChange = (event, newValue) => {
        setOrganismTabFocus(newValue);
    };
    return (jsx(Wrapper$4, { children: jsx(Tabs, { value: tabFocus, onChange: handleChange, children: organismTabNames.map((label) => {
                if (label === "Selected organisms") {
                    return (jsx(Tab, { label: jsx(Badge, { badgeContent: selected.length, color: "primary", children: label }), value: label, sx: tabStyles }, label));
                }
                return (jsx(Tab, { label: label, value: label, sx: tabStyles }, label));
            }) }) }));
};
const Wrapper$4 = styled("div")({
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

const SHOW_COUNT$1 = 10;
const SelectedOrganismsList = () => {
    const selectedOrganisms = useSelectedOrganismsState();
    const { toggleOrganismSelection } = useSelectedOrganismsMutators();
    const [current, setCurrent] = reactExports.useState(0);
    const next = () => {
        setCurrent(current + SHOW_COUNT$1);
    };
    const prev = () => {
        setCurrent(current - SHOW_COUNT$1);
    };
    const data = reactExports.useMemo(() => selectedOrganisms.filter((item, i) => i >= current).filter((item, i) => i < SHOW_COUNT$1), [selectedOrganisms, current]);
    return (jsxs("div", { children: [jsx("div", { children: data.map((item) => (jsx(OrganismListItem, { ...item, isChecked: true, onClick: () => {
                        toggleOrganismSelection(item);
                    } }, item.id))) }), !!selectedOrganisms.length && (jsx(Pagination, { total: selectedOrganisms.length, current: current, displayLength: SHOW_COUNT$1, onClickNext: next, onClickPrev: prev }))] }));
};

const OrganismPane = () => {
    const tabFocus = useOrganismTabFocusState();
    const { reset } = useOrganismPaginationMutators();
    const { setOrganismTabFocus } = useOrganismTabFocusMutators();
    const phenotypeQueryParams = usePhenotypeQueryState();
    reactExports.useEffect(() => {
        reset();
        setOrganismTabFocus("Found organisms");
    }, [phenotypeQueryParams]);
    return (jsxs(Wrapper$3, { children: [jsx(OrganismTab, {}), jsxs(Contents, { children: [tabFocus === "Found organisms" && jsx(FoundOrganismsList, {}), tabFocus === "Selected organisms" && jsx(SelectedOrganismsList, {})] })] }));
};
const Wrapper$3 = styled("div")({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: THEME.SIZE.S1,
    backgroundColor: THEME.COLOR.WHITE,
    borderRadius: THEME.ROUND.BASE,
});
const Contents = styled("div")({
    paddingBlock: THEME.SIZE.S2,
    paddingInline: THEME.SIZE.S1,
    flexGrow: 1,
    overflowY: "auto",
});

function valuetext(value) {
    return `${value}°C`;
}
const RangeSlider = ({ min, max, label, marks, queryKey, handleValueChange, handleEnabledChange, }) => {
    const [value, setValue] = reactExports.useState([min, max]);
    const [enabled, setEnabled] = reactExports.useState(false);
    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleCheckChange = (event, checked) => {
        setEnabled(checked);
    };
    const handleChangeCommitted = (event, newValue) => {
        handleValueChange(queryKey, newValue.join(","));
    };
    reactExports.useEffect(() => {
        if (enabled) {
            handleValueChange(queryKey, value.join(","));
        }
        else {
            handleEnabledChange(queryKey, false);
        }
    }, [enabled]);
    return (jsxs("div", { children: [jsx("div", { children: jsx("span", { children: jsx(FormControlLabel$1, { label: label, control: jsx(Checkbox, { onChange: handleCheckChange, sx: { paddingLeft: 0 } }) }) }) }), jsx(Slider, { value: value, onChange: handleSliderChange, onChangeCommitted: handleChangeCommitted, valueLabelDisplay: "auto", getAriaValueText: valuetext, min: min, max: max, marks: marks, step: 0.1, disabled: enabled ? undefined : true })] }));
};

const SelectBox = ({ label, items, queryKey, handleEnabledChange, handleValueChange, }) => {
    // const [value, setValue] = useState("");
    const [enabled, setEnabled] = reactExports.useState(false);
    const [selectedValue, setSelectedValue] = reactExports.useState("");
    const handleCheckChange = (event, checked) => {
        setEnabled(checked);
        if (!checked) {
            setSelectedValue("");
        }
    };
    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };
    reactExports.useEffect(() => {
        if (enabled && selectedValue !== "") {
            handleValueChange(queryKey, selectedValue);
        }
        else {
            handleEnabledChange(queryKey, false);
        }
    }, [selectedValue, enabled]);
    return (jsxs(Wrapper$2, { children: [jsx(Checkbox, { onChange: handleCheckChange, sx: { paddingLeft: 0 } }), jsxs(FormControl, { sx: { m: 0, minWidth: 200 }, children: [jsx(InputLabel, { id: "selectLabel", children: label }), jsx(Select, { labelId: "selectLabel", label: label, value: selectedValue, disabled: enabled ? undefined : true, onChange: handleSelectChange, MenuProps: { disablePortal: true }, children: items.map(([key, label]) => (jsx(MenuItem$1, { value: key, children: label }, key))) })] })] }));
};
const Wrapper$2 = styled("div")({
    display: "flex",
    alignItems: "center",
    // backgroundColor: THEME.COLOR.WHITE,
    width: "fit-content",
    marginLeft: "-11px",
});

const PhenotypeSearchArea = () => {
    const { updatePhenotypeQuery, removePhenotypeQuery } = usePhenotypeQueryMutators();
    const handleEnabledChange = (key, enabled) => {
        !enabled && removePhenotypeQuery(key);
    };
    const handleValueChange = (key, value) => {
        updatePhenotypeQuery(key, value);
    };
    return (jsxs(Wrapper$1, { children: [jsxs(Sliders, { children: [jsx(RangeSlider, { min: 0, max: 110, label: "Growth temperature", marks: [
                            { value: 0, label: "0°C" },
                            { value: 37, label: "37°C" },
                            { value: 55, label: "55°C" },
                            { value: 75, label: "75°C" },
                            { value: 90, label: "90°C" },
                            { value: 110, label: "110°C" },
                        ], queryKey: "growth_temp", handleEnabledChange: handleEnabledChange, handleValueChange: handleValueChange }), jsx(RangeSlider, { min: 0, max: 14, label: "Growth pH", marks: [
                            { value: 0, label: "0" },
                            { value: 14, label: "14" },
                        ], queryKey: "growth_ph", handleEnabledChange: handleEnabledChange, handleValueChange: handleValueChange }), jsx(RangeSlider, { min: 0, max: 25, label: "Growth salinity", marks: [
                            { value: 0, label: "0%" },
                            { value: 25, label: "25%" },
                        ], queryKey: "growth_salinity", handleEnabledChange: handleEnabledChange, handleValueChange: handleValueChange }), jsx(RangeSlider, { min: 0, max: 50, label: "Cell length", marks: [
                            { value: 0, label: "0µm" },
                            { value: 50, label: "50µm" },
                        ], queryKey: "cell_length", handleEnabledChange: handleEnabledChange, handleValueChange: handleValueChange }), jsx(RangeSlider, { min: 0, max: 25, label: "Cell diameter", marks: [
                            { value: 0, label: "0µm" },
                            { value: 25, label: "25µm" },
                        ], queryKey: "cell_diameter", handleEnabledChange: handleEnabledChange, handleValueChange: handleValueChange })] }), jsxs(SelectBoxWrapper, { children: [jsx(SelectBox, { label: "Oxygen requirement", items: [
                            ["MPO_04002", "Aerobe"],
                            ["MPO_04003", "Anaerobe"],
                            ["MPO_04004", "Obligate aerobe"],
                            ["MPO_04005", "Facultative aerobe"],
                            ["MPO_04006", "Obligate anaerobe"],
                            ["MPO_04007", "Facultative anaerobe"],
                            ["MPO_04009", "Microaerophilic"],
                        ], queryKey: "MPO_10002", handleEnabledChange: handleEnabledChange, handleValueChange: handleValueChange }), jsx(SelectBox, { label: "Gram Strain", queryKey: "MPO_07001", items: [
                            ["MPO_07002", "Gram+"],
                            ["MPO_07003", "Gram-"],
                        ], handleEnabledChange: handleEnabledChange, handleValueChange: handleValueChange }), jsx(SelectBox, { label: "Motility", queryKey: "MPO_02000", items: [
                            ["MPO_02001", "Motile"],
                            ["MPO_02002", "Nonmotile"],
                            ["MPO_02007", "Chemotactic"],
                        ], handleEnabledChange: handleEnabledChange, handleValueChange: handleValueChange }), jsx(SelectBox, { label: "Cell shape", queryKey: "MPO_01001", items: [
                            ["MPO_01015", "Rod-shaped"],
                            ["MPO_01003", "Coccus-shaped"],
                            ["MPO_01005", "Curved-shaped"],
                            ["MPO_01014", "Pleomorphic-shaped"],
                            ["MPO_01007", "Filament-shaped"],
                            // ["MPO_01003", "Sphere-shaped"],
                            ["MPO_01022", "Vibrio-shaped"],
                            ["MPO_01021", "Star-shaped"],
                            ["MPO_01026", "Triangular"],
                            ["MPO_01018", "Spiral-shaped"],
                            ["MPO_01010", "Helical-shaped"],
                            // ["MPO_01003", "Coccoid"],
                            ["MPO_01013", "Ovoid-shaped"],
                            ["MPO_01012", "Oval-shaped"],
                            ["MPO_01017", "Spindle-shaped"],
                            ["MPO_01004", "Crescent-shaped"],
                            ["MPO_01009", "Fusiform"],
                            ["MPO_01020", "Square-shaped"],
                            ["MPO_01019", "Spore-shaped"],
                            ["MPO_01006", "Disc-shaped"],
                            ["MPO_01008", "Flask-shaped"],
                        ], handleEnabledChange: handleEnabledChange, handleValueChange: handleValueChange }), jsx(SelectBox, { label: "Salinity", queryKey: "MPO_03006", items: [
                            ["MPO_03007", "Halophile"],
                            ["MPO_03008", "Halotolerant"],
                        ], handleEnabledChange: handleEnabledChange, handleValueChange: handleValueChange }), jsx(SelectBox, { label: "Energy metabolism", queryKey: "MPO_04053", items: [["MPO_04153", "Carbon fixation"]], handleEnabledChange: handleEnabledChange, handleValueChange: handleValueChange })] })] }));
};
const Wrapper$1 = styled("div")({
    backgroundColor: THEME.COLOR.WHITE,
    paddingInline: 20,
    paddingBlock: `${THEME.SIZE.S1}px ${THEME.SIZE.S4}px`,
    flexGrow: 1,
    containerName: "wrapper",
    containerType: "inline-size",
});
const Sliders = styled("div")({
    display: "flex",
    flexDirection: "column",
    gap: 10,
});
const SelectBoxWrapper = styled("div")({
    display: "grid",
    marginTop: THEME.SIZE.S3,
    rowGap: THEME.SIZE.S2,
    ["@container wrapper (min-width: 500px)"]: {
        gridTemplateColumns: "275px 275px",
    },
});

const PhenotypeSection = () => {
    return (jsx(Wrapper, { children: jsx(PhenotypeSearchArea, {}) }));
};
const Wrapper = styled("div")({
    display: "flex",
    backgroundColor: THEME.COLOR.WHITE,
    flexGrow: 1,
});

const SHOW_COUNT = 10;
const useMediaLoadFromOrganismSelection = () => {
    const page = useMediaPaginationState();
    const selectedOrganisms = useSelectedOrganismsState();
    const { setQueryData } = useQueryDataMutators();
    const { setFoundMedia } = useFoundMediaMutators();
    const { setIsMediaLoading } = useIsMediaLoadingMutators();
    const { reset } = useMediaPaginationMutators();
    const query = useQuery({
        queryKey: [selectedOrganisms, { page }],
        queryFn: async () => {
            if (selectedOrganisms.length === 0)
                return nullListResponse;
            //
            const tax_ids = extractLabelIds(selectedOrganisms).join(",");
            const response = await getData(listMediaOfTaxonsURL, {
                tax_ids,
                limit: SHOW_COUNT,
                offset: (page - 1) * SHOW_COUNT,
            });
            if (!response.body)
                throw new Error("No data");
            return response.body;
        },
        staleTime: Infinity,
        placeholderData: (previousData) => previousData,
    });
    reactExports.useEffect(() => {
        setQueryData({ tax_ids: extractLabelIds(selectedOrganisms) });
    }, [selectedOrganisms]);
    reactExports.useEffect(() => {
        query.data && setFoundMedia(query.data);
    }, [query.data]);
    reactExports.useEffect(() => {
        setIsMediaLoading(query.isLoading || query.isPlaceholderData);
    }, [query.isLoading, query.isPlaceholderData]);
    reactExports.useEffect(() => {
        reset();
    }, [selectedOrganisms]);
};

const AppContainer = ({ dispatchEvent }) => {
    useMediaLoadFromOrganismSelection();
    return (jsxs(AppWrapper, { children: [jsx(QueryPane, { children: jsx(PhenotypeSection, {}) }), jsx(SubPane, { children: jsx(OrganismPane, {}) }), jsx(SubPane, { children: jsx(MediaPane, { dispatchEvent: dispatchEvent }) })] }));
};

const App = ({ stanzaElement }) => {
    const dispatchEvent = (gmIds) => {
        if (!stanzaElement)
            return;
        //
        stanzaElement.dispatchEvent(new CustomEvent("STANZA_RUN_ACTION", { bubbles: true, composed: true, detail: gmIds }));
    };
    return jsx(AppContainer, { dispatchEvent: dispatchEvent });
};

class ReactStanza extends TogoMediumReactStanza {
    makeApp() {
        return jsx(App, { stanzaElement: this.root });
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
	"@id": "gmdb-find-media-by-organism-phenotype",
	"stanza:label": "Media finder by organism phenotype",
	"stanza:definition": "Retrieves media by selecting organisms filtered by their phenotypes",
	"stanza:license": "MIT",
	"stanza:author": "Satoshi Onoda (YOHAK)",
	"stanza:address": "satoshionoda@yohak.design",
	"stanza:contributor": [
],
	"stanza:created": "2022-01-01",
	"stanza:updated": "2025-03-22",
	"stanza:parameter": [
],
	"stanza:menu-placement": "none",
	"stanza:style": [
],
	"stanza:incomingEvent": [
],
	"stanza:outgoingEvent": [
	{
		"stanza:key": "STANZA_RUN_ACTION",
		"stanza:description": "dispatches when the action button is clicked"
	}
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
    + "!!!</p>\n";
},"useData":true}]
];

const url = import.meta.url.replace(/\?.*$/, '');

defineStanzaElement({stanzaModule, metadata, templates, url});
//# sourceMappingURL=gmdb-find-media-by-organism-phenotype.js.map
