import { s as styled, y as capitalize, m as reactExports, D as useRtl, N as useId, z as clsx, A as jsxRuntimeExports } from './StanzaReactProvider-6021d3e7.js';
import { h as Popper, i as Timeout, a as useTheme, d as useTimeout, g as getReactElementRef, u as useSlot, G as Grow } from './Grow-d6a16e65.js';
import { g as generateUtilityClasses, a as generateUtilityClass, m as memoTheme, u as useDefaultProps, b as useControlled, e as useEventCallback, f as useForkRef, c as composeClasses, i as isFocusVisible } from './useSlotProps-42393a51.js';

function getTooltipUtilityClass(slot) {
  return generateUtilityClass('MuiTooltip', slot);
}
const tooltipClasses = generateUtilityClasses('MuiTooltip', ['popper', 'popperInteractive', 'popperArrow', 'popperClose', 'tooltip', 'tooltipArrow', 'touch', 'tooltipPlacementLeft', 'tooltipPlacementRight', 'tooltipPlacementTop', 'tooltipPlacementBottom', 'arrow']);
var tooltipClasses$1 = tooltipClasses;

function round(value) {
  return Math.round(value * 1e5) / 1e5;
}
const useUtilityClasses = ownerState => {
  const {
    classes,
    disableInteractive,
    arrow,
    touch,
    placement
  } = ownerState;
  const slots = {
    popper: ['popper', !disableInteractive && 'popperInteractive', arrow && 'popperArrow'],
    tooltip: ['tooltip', arrow && 'tooltipArrow', touch && 'touch', `tooltipPlacement${capitalize(placement.split('-')[0])}`],
    arrow: ['arrow']
  };
  return composeClasses(slots, getTooltipUtilityClass, classes);
};
const TooltipPopper = styled(Popper, {
  name: 'MuiTooltip',
  slot: 'Popper',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.popper, !ownerState.disableInteractive && styles.popperInteractive, ownerState.arrow && styles.popperArrow, !ownerState.open && styles.popperClose];
  }
})(memoTheme(({
  theme
}) => ({
  zIndex: (theme.vars || theme).zIndex.tooltip,
  pointerEvents: 'none',
  variants: [{
    props: ({
      ownerState
    }) => !ownerState.disableInteractive,
    style: {
      pointerEvents: 'auto'
    }
  }, {
    props: ({
      open
    }) => !open,
    style: {
      pointerEvents: 'none'
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.arrow,
    style: {
      [`&[data-popper-placement*="bottom"] .${tooltipClasses$1.arrow}`]: {
        top: 0,
        marginTop: '-0.71em',
        '&::before': {
          transformOrigin: '0 100%'
        }
      },
      [`&[data-popper-placement*="top"] .${tooltipClasses$1.arrow}`]: {
        bottom: 0,
        marginBottom: '-0.71em',
        '&::before': {
          transformOrigin: '100% 0'
        }
      },
      [`&[data-popper-placement*="right"] .${tooltipClasses$1.arrow}`]: {
        height: '1em',
        width: '0.71em',
        '&::before': {
          transformOrigin: '100% 100%'
        }
      },
      [`&[data-popper-placement*="left"] .${tooltipClasses$1.arrow}`]: {
        height: '1em',
        width: '0.71em',
        '&::before': {
          transformOrigin: '0 0'
        }
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.arrow && !ownerState.isRtl,
    style: {
      [`&[data-popper-placement*="right"] .${tooltipClasses$1.arrow}`]: {
        left: 0,
        marginLeft: '-0.71em'
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.arrow && !!ownerState.isRtl,
    style: {
      [`&[data-popper-placement*="right"] .${tooltipClasses$1.arrow}`]: {
        right: 0,
        marginRight: '-0.71em'
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.arrow && !ownerState.isRtl,
    style: {
      [`&[data-popper-placement*="left"] .${tooltipClasses$1.arrow}`]: {
        right: 0,
        marginRight: '-0.71em'
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.arrow && !!ownerState.isRtl,
    style: {
      [`&[data-popper-placement*="left"] .${tooltipClasses$1.arrow}`]: {
        left: 0,
        marginLeft: '-0.71em'
      }
    }
  }]
})));
const TooltipTooltip = styled('div', {
  name: 'MuiTooltip',
  slot: 'Tooltip',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.tooltip, ownerState.touch && styles.touch, ownerState.arrow && styles.tooltipArrow, styles[`tooltipPlacement${capitalize(ownerState.placement.split('-')[0])}`]];
  }
})(memoTheme(({
  theme
}) => ({
  backgroundColor: theme.vars ? theme.vars.palette.Tooltip.bg : theme.alpha(theme.palette.grey[700], 0.92),
  borderRadius: (theme.vars || theme).shape.borderRadius,
  color: (theme.vars || theme).palette.common.white,
  fontFamily: theme.typography.fontFamily,
  padding: '4px 8px',
  fontSize: theme.typography.pxToRem(11),
  maxWidth: 300,
  margin: 2,
  wordWrap: 'break-word',
  fontWeight: theme.typography.fontWeightMedium,
  [`.${tooltipClasses$1.popper}[data-popper-placement*="left"] &`]: {
    transformOrigin: 'right center'
  },
  [`.${tooltipClasses$1.popper}[data-popper-placement*="right"] &`]: {
    transformOrigin: 'left center'
  },
  [`.${tooltipClasses$1.popper}[data-popper-placement*="top"] &`]: {
    transformOrigin: 'center bottom',
    marginBottom: '14px'
  },
  [`.${tooltipClasses$1.popper}[data-popper-placement*="bottom"] &`]: {
    transformOrigin: 'center top',
    marginTop: '14px'
  },
  variants: [{
    props: ({
      ownerState
    }) => ownerState.arrow,
    style: {
      position: 'relative',
      margin: 0
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.touch,
    style: {
      padding: '8px 16px',
      fontSize: theme.typography.pxToRem(14),
      lineHeight: `${round(16 / 14)}em`,
      fontWeight: theme.typography.fontWeightRegular
    }
  }, {
    props: ({
      ownerState
    }) => !ownerState.isRtl,
    style: {
      [`.${tooltipClasses$1.popper}[data-popper-placement*="left"] &`]: {
        marginRight: '14px'
      },
      [`.${tooltipClasses$1.popper}[data-popper-placement*="right"] &`]: {
        marginLeft: '14px'
      }
    }
  }, {
    props: ({
      ownerState
    }) => !ownerState.isRtl && ownerState.touch,
    style: {
      [`.${tooltipClasses$1.popper}[data-popper-placement*="left"] &`]: {
        marginRight: '24px'
      },
      [`.${tooltipClasses$1.popper}[data-popper-placement*="right"] &`]: {
        marginLeft: '24px'
      }
    }
  }, {
    props: ({
      ownerState
    }) => !!ownerState.isRtl,
    style: {
      [`.${tooltipClasses$1.popper}[data-popper-placement*="left"] &`]: {
        marginLeft: '14px'
      },
      [`.${tooltipClasses$1.popper}[data-popper-placement*="right"] &`]: {
        marginRight: '14px'
      }
    }
  }, {
    props: ({
      ownerState
    }) => !!ownerState.isRtl && ownerState.touch,
    style: {
      [`.${tooltipClasses$1.popper}[data-popper-placement*="left"] &`]: {
        marginLeft: '24px'
      },
      [`.${tooltipClasses$1.popper}[data-popper-placement*="right"] &`]: {
        marginRight: '24px'
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.touch,
    style: {
      [`.${tooltipClasses$1.popper}[data-popper-placement*="top"] &`]: {
        marginBottom: '24px'
      }
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.touch,
    style: {
      [`.${tooltipClasses$1.popper}[data-popper-placement*="bottom"] &`]: {
        marginTop: '24px'
      }
    }
  }]
})));
const TooltipArrow = styled('span', {
  name: 'MuiTooltip',
  slot: 'Arrow'
})(memoTheme(({
  theme
}) => ({
  overflow: 'hidden',
  position: 'absolute',
  width: '1em',
  height: '0.71em' /* = width / sqrt(2) = (length of the hypotenuse) */,
  boxSizing: 'border-box',
  color: theme.vars ? theme.vars.palette.Tooltip.bg : theme.alpha(theme.palette.grey[700], 0.9),
  '&::before': {
    content: '""',
    margin: 'auto',
    display: 'block',
    width: '100%',
    height: '100%',
    backgroundColor: 'currentColor',
    transform: 'rotate(45deg)'
  }
})));
let hystersisOpen = false;
const hystersisTimer = new Timeout();
let cursorPosition = {
  x: 0,
  y: 0
};
function composeEventHandler(handler, eventHandler) {
  return (event, ...params) => {
    if (eventHandler) {
      eventHandler(event, ...params);
    }
    handler(event, ...params);
  };
}

// TODO v6: Remove PopperComponent, PopperProps, TransitionComponent and TransitionProps.
const Tooltip = /*#__PURE__*/reactExports.forwardRef(function Tooltip(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiTooltip'
  });
  const {
    arrow = false,
    children: childrenProp,
    classes: classesProp,
    components = {},
    componentsProps = {},
    describeChild = false,
    disableFocusListener = false,
    disableHoverListener = false,
    disableInteractive: disableInteractiveProp = false,
    disableTouchListener = false,
    enterDelay = 100,
    enterNextDelay = 0,
    enterTouchDelay = 700,
    followCursor = false,
    id: idProp,
    leaveDelay = 0,
    leaveTouchDelay = 1500,
    onClose,
    onOpen,
    open: openProp,
    placement = 'bottom',
    PopperComponent: PopperComponentProp,
    PopperProps = {},
    slotProps = {},
    slots = {},
    title,
    TransitionComponent: TransitionComponentProp,
    TransitionProps,
    ...other
  } = props;

  // to prevent runtime errors, developers will need to provide a child as a React element anyway.
  const children = /*#__PURE__*/reactExports.isValidElement(childrenProp) ? childrenProp : /*#__PURE__*/jsxRuntimeExports.jsx("span", {
    children: childrenProp
  });
  const theme = useTheme();
  const isRtl = useRtl();
  const [childNode, setChildNode] = reactExports.useState();
  const [arrowRef, setArrowRef] = reactExports.useState(null);
  const ignoreNonTouchEvents = reactExports.useRef(false);
  const disableInteractive = disableInteractiveProp || followCursor;
  const closeTimer = useTimeout();
  const enterTimer = useTimeout();
  const leaveTimer = useTimeout();
  const touchTimer = useTimeout();
  const [openState, setOpenState] = useControlled({
    controlled: openProp,
    default: false,
    name: 'Tooltip',
    state: 'open'
  });
  let open = openState;
  const id = useId(idProp);
  const prevUserSelect = reactExports.useRef();
  const stopTouchInteraction = useEventCallback(() => {
    if (prevUserSelect.current !== undefined) {
      document.body.style.WebkitUserSelect = prevUserSelect.current;
      prevUserSelect.current = undefined;
    }
    touchTimer.clear();
  });
  reactExports.useEffect(() => stopTouchInteraction, [stopTouchInteraction]);
  const handleOpen = event => {
    hystersisTimer.clear();
    hystersisOpen = true;

    // The mouseover event will trigger for every nested element in the tooltip.
    // We can skip rerendering when the tooltip is already open.
    // We are using the mouseover event instead of the mouseenter event to fix a hide/show issue.
    setOpenState(true);
    if (onOpen && !open) {
      onOpen(event);
    }
  };
  const handleClose = useEventCallback(
  /**
   * @param {React.SyntheticEvent | Event} event
   */
  event => {
    hystersisTimer.start(800 + leaveDelay, () => {
      hystersisOpen = false;
    });
    setOpenState(false);
    if (onClose && open) {
      onClose(event);
    }
    closeTimer.start(theme.transitions.duration.shortest, () => {
      ignoreNonTouchEvents.current = false;
    });
  });
  const handleMouseOver = event => {
    if (ignoreNonTouchEvents.current && event.type !== 'touchstart') {
      return;
    }

    // Remove the title ahead of time.
    // We don't want to wait for the next render commit.
    // We would risk displaying two tooltips at the same time (native + this one).
    if (childNode) {
      childNode.removeAttribute('title');
    }
    enterTimer.clear();
    leaveTimer.clear();
    if (enterDelay || hystersisOpen && enterNextDelay) {
      enterTimer.start(hystersisOpen ? enterNextDelay : enterDelay, () => {
        handleOpen(event);
      });
    } else {
      handleOpen(event);
    }
  };
  const handleMouseLeave = event => {
    enterTimer.clear();
    leaveTimer.start(leaveDelay, () => {
      handleClose(event);
    });
  };
  const [, setChildIsFocusVisible] = reactExports.useState(false);
  const handleBlur = event => {
    // Needed for https://github.com/mui/material-ui/issues/45373
    const target = event?.target ?? childNode;
    if (!target || !isFocusVisible(target)) {
      setChildIsFocusVisible(false);

      // InputBase can call onBlur() without an event when the input becomes disabled.
      // Tooltip must not assume an event object exists.
      const closeEvent = event ?? new Event('blur');

      // `new Event('blur')` has `target/currentTarget === null`, but Tooltip's close logic
      // (and user callbacks like onClose) may expect them to reference the anchor element.
      if (!event && target) {
        Object.defineProperty(closeEvent, 'target', {
          value: target
        });
        Object.defineProperty(closeEvent, 'currentTarget', {
          value: target
        });
      }
      handleMouseLeave(closeEvent);
    }
  };
  const handleFocus = event => {
    // Workaround for https://github.com/facebook/react/issues/7769
    // The autoFocus of React might trigger the event before the componentDidMount.
    // We need to account for this eventuality.
    if (!childNode) {
      setChildNode(event.currentTarget);
    }
    if (isFocusVisible(event.target)) {
      setChildIsFocusVisible(true);
      handleMouseOver(event);
    }
  };
  const detectTouchStart = event => {
    ignoreNonTouchEvents.current = true;
    const childrenProps = children.props;
    if (childrenProps.onTouchStart) {
      childrenProps.onTouchStart(event);
    }
  };
  const handleTouchStart = event => {
    detectTouchStart(event);
    leaveTimer.clear();
    closeTimer.clear();
    stopTouchInteraction();
    prevUserSelect.current = document.body.style.WebkitUserSelect;
    // Prevent iOS text selection on long-tap.
    document.body.style.WebkitUserSelect = 'none';
    touchTimer.start(enterTouchDelay, () => {
      document.body.style.WebkitUserSelect = prevUserSelect.current;
      handleMouseOver(event);
    });
  };
  const handleTouchEnd = event => {
    if (children.props.onTouchEnd) {
      children.props.onTouchEnd(event);
    }
    stopTouchInteraction();
    leaveTimer.start(leaveTouchDelay, () => {
      handleClose(event);
    });
  };
  reactExports.useEffect(() => {
    if (!open) {
      return undefined;
    }

    /**
     * @param {KeyboardEvent} nativeEvent
     */
    function handleKeyDown(nativeEvent) {
      if (nativeEvent.key === 'Escape') {
        handleClose(nativeEvent);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose, open]);
  const handleRef = useForkRef(getReactElementRef(children), setChildNode, ref);

  // There is no point in displaying an empty tooltip.
  // So we exclude all falsy values, except 0, which is valid.
  if (!title && title !== 0) {
    open = false;
  }
  const popperRef = reactExports.useRef();
  const handleMouseMove = event => {
    const childrenProps = children.props;
    if (childrenProps.onMouseMove) {
      childrenProps.onMouseMove(event);
    }
    cursorPosition = {
      x: event.clientX,
      y: event.clientY
    };
    if (popperRef.current) {
      popperRef.current.update();
    }
  };
  const nameOrDescProps = {};
  const titleIsString = typeof title === 'string';
  if (describeChild) {
    nameOrDescProps.title = !open && titleIsString && !disableHoverListener ? title : null;
    nameOrDescProps['aria-describedby'] = open ? id : null;
  } else {
    nameOrDescProps['aria-label'] = titleIsString ? title : null;
    nameOrDescProps['aria-labelledby'] = open && !titleIsString ? id : null;
  }
  const childrenProps = {
    ...nameOrDescProps,
    ...other,
    ...children.props,
    className: clsx(other.className, children.props.className),
    onTouchStart: detectTouchStart,
    ref: handleRef,
    ...(followCursor ? {
      onMouseMove: handleMouseMove
    } : {})
  };
  const interactiveWrapperListeners = {};
  if (!disableTouchListener) {
    childrenProps.onTouchStart = handleTouchStart;
    childrenProps.onTouchEnd = handleTouchEnd;
  }
  if (!disableHoverListener) {
    childrenProps.onMouseOver = composeEventHandler(handleMouseOver, childrenProps.onMouseOver);
    childrenProps.onMouseLeave = composeEventHandler(handleMouseLeave, childrenProps.onMouseLeave);
    if (!disableInteractive) {
      interactiveWrapperListeners.onMouseOver = handleMouseOver;
      interactiveWrapperListeners.onMouseLeave = handleMouseLeave;
    }
  }
  if (!disableFocusListener) {
    childrenProps.onFocus = composeEventHandler(handleFocus, childrenProps.onFocus);
    childrenProps.onBlur = composeEventHandler(handleBlur, childrenProps.onBlur);
    if (!disableInteractive) {
      interactiveWrapperListeners.onFocus = handleFocus;
      interactiveWrapperListeners.onBlur = handleBlur;
    }
  }
  const ownerState = {
    ...props,
    isRtl,
    arrow,
    disableInteractive,
    placement,
    PopperComponentProp,
    touch: ignoreNonTouchEvents.current
  };
  const resolvedPopperProps = typeof slotProps.popper === 'function' ? slotProps.popper(ownerState) : slotProps.popper;
  const popperOptions = reactExports.useMemo(() => {
    let tooltipModifiers = [{
      name: 'arrow',
      enabled: Boolean(arrowRef),
      options: {
        element: arrowRef,
        padding: 4
      }
    }];
    if (PopperProps.popperOptions?.modifiers) {
      tooltipModifiers = tooltipModifiers.concat(PopperProps.popperOptions.modifiers);
    }
    if (resolvedPopperProps?.popperOptions?.modifiers) {
      tooltipModifiers = tooltipModifiers.concat(resolvedPopperProps.popperOptions.modifiers);
    }
    return {
      ...PopperProps.popperOptions,
      ...resolvedPopperProps?.popperOptions,
      modifiers: tooltipModifiers
    };
  }, [arrowRef, PopperProps.popperOptions, resolvedPopperProps?.popperOptions]);
  const classes = useUtilityClasses(ownerState);
  const resolvedTransitionProps = typeof slotProps.transition === 'function' ? slotProps.transition(ownerState) : slotProps.transition;
  const externalForwardedProps = {
    slots: {
      popper: components.Popper,
      transition: components.Transition ?? TransitionComponentProp,
      tooltip: components.Tooltip,
      arrow: components.Arrow,
      ...slots
    },
    slotProps: {
      arrow: slotProps.arrow ?? componentsProps.arrow,
      popper: {
        ...PopperProps,
        ...(resolvedPopperProps ?? componentsProps.popper)
      },
      // resolvedPopperProps can be spread because it's already an object
      tooltip: slotProps.tooltip ?? componentsProps.tooltip,
      transition: {
        ...TransitionProps,
        ...(resolvedTransitionProps ?? componentsProps.transition)
      }
    }
  };
  const [PopperSlot, popperSlotProps] = useSlot('popper', {
    elementType: TooltipPopper,
    externalForwardedProps,
    ownerState,
    className: clsx(classes.popper, PopperProps?.className)
  });
  const [TransitionSlot, transitionSlotProps] = useSlot('transition', {
    elementType: Grow,
    externalForwardedProps,
    ownerState
  });
  const [TooltipSlot, tooltipSlotProps] = useSlot('tooltip', {
    elementType: TooltipTooltip,
    className: classes.tooltip,
    externalForwardedProps,
    ownerState
  });
  const [ArrowSlot, arrowSlotProps] = useSlot('arrow', {
    elementType: TooltipArrow,
    className: classes.arrow,
    externalForwardedProps,
    ownerState,
    ref: setArrowRef
  });
  return /*#__PURE__*/jsxRuntimeExports.jsxs(reactExports.Fragment, {
    children: [/*#__PURE__*/reactExports.cloneElement(children, childrenProps), /*#__PURE__*/jsxRuntimeExports.jsx(PopperSlot, {
      as: PopperComponentProp ?? Popper,
      placement: placement,
      anchorEl: followCursor ? {
        getBoundingClientRect: () => ({
          top: cursorPosition.y,
          left: cursorPosition.x,
          right: cursorPosition.x,
          bottom: cursorPosition.y,
          width: 0,
          height: 0
        })
      } : childNode,
      popperRef: popperRef,
      open: childNode ? open : false,
      id: id,
      transition: true,
      ...interactiveWrapperListeners,
      ...popperSlotProps,
      popperOptions: popperOptions,
      children: ({
        TransitionProps: TransitionPropsInner
      }) => /*#__PURE__*/jsxRuntimeExports.jsx(TransitionSlot, {
        timeout: theme.transitions.duration.shorter,
        ...TransitionPropsInner,
        ...transitionSlotProps,
        children: /*#__PURE__*/jsxRuntimeExports.jsxs(TooltipSlot, {
          ...tooltipSlotProps,
          children: [title, arrow ? /*#__PURE__*/jsxRuntimeExports.jsx(ArrowSlot, {
            ...arrowSlotProps
          }) : null]
        })
      })
    })]
  });
});
var Tooltip$1 = Tooltip;

export { Tooltip$1 as T };
//# sourceMappingURL=Tooltip-805a9746.js.map
