import { K as keyframes, Q as css, s as styled, y as capitalize, m as reactExports, A as jsxRuntimeExports, z as clsx } from './StanzaReactProvider-6021d3e7.js';
import { a as generateUtilityClass, g as generateUtilityClasses, m as memoTheme, u as useDefaultProps, c as composeClasses } from './useSlotProps-42393a51.js';

/**
 * Type guard to check if the object has a "main" property of type string.
 *
 * @param obj - the object to check
 * @returns boolean
 */
function hasCorrectMainProperty(obj) {
  return typeof obj.main === 'string';
}
/**
 * Checks if the object conforms to the SimplePaletteColorOptions type.
 * The minimum requirement is that the object has a "main" property of type string, this is always checked.
 * Optionally, you can pass additional properties to check.
 *
 * @param obj - The object to check
 * @param additionalPropertiesToCheck - Array containing "light", "dark", and/or "contrastText"
 * @returns boolean
 */
function checkSimplePaletteColorValues(obj, additionalPropertiesToCheck = []) {
  if (!hasCorrectMainProperty(obj)) {
    return false;
  }
  for (const value of additionalPropertiesToCheck) {
    if (!obj.hasOwnProperty(value) || typeof obj[value] !== 'string') {
      return false;
    }
  }
  return true;
}

/**
 * Creates a filter function used to filter simple palette color options.
 * The minimum requirement is that the object has a "main" property of type string, this is always checked.
 * Optionally, you can pass additional properties to check.
 *
 * @param additionalPropertiesToCheck - Array containing "light", "dark", and/or "contrastText"
 * @returns ([, value]: [any, PaletteColorOptions]) => boolean
 */
function createSimplePaletteValueFilter(additionalPropertiesToCheck = []) {
  return ([, value]) => value && checkSimplePaletteColorValues(value, additionalPropertiesToCheck);
}

function getCircularProgressUtilityClass(slot) {
  return generateUtilityClass('MuiCircularProgress', slot);
}
generateUtilityClasses('MuiCircularProgress', ['root', 'determinate', 'indeterminate', 'colorPrimary', 'colorSecondary', 'svg', 'track', 'circle', 'circleDeterminate', 'circleIndeterminate', 'circleDisableShrink']);

const SIZE = 44;
const circularRotateKeyframe = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;
const circularDashKeyframe = keyframes`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: -126px;
  }
`;

// This implementation is for supporting both Styled-components v4+ and Pigment CSS.
// A global animation has to be created here for Styled-components v4+ (https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#12).
// which can be done by checking typeof indeterminate1Keyframe !== 'string' (at runtime, Pigment CSS transform keyframes`` to a string).
const rotateAnimation = typeof circularRotateKeyframe !== 'string' ? css`
        animation: ${circularRotateKeyframe} 1.4s linear infinite;
      ` : null;
const dashAnimation = typeof circularDashKeyframe !== 'string' ? css`
        animation: ${circularDashKeyframe} 1.4s ease-in-out infinite;
      ` : null;
const useUtilityClasses = ownerState => {
  const {
    classes,
    variant,
    color,
    disableShrink
  } = ownerState;
  const slots = {
    root: ['root', variant, `color${capitalize(color)}`],
    svg: ['svg'],
    track: ['track'],
    circle: ['circle', `circle${capitalize(variant)}`, disableShrink && 'circleDisableShrink']
  };
  return composeClasses(slots, getCircularProgressUtilityClass, classes);
};
const CircularProgressRoot = styled('span', {
  name: 'MuiCircularProgress',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.variant], styles[`color${capitalize(ownerState.color)}`]];
  }
})(memoTheme(({
  theme
}) => ({
  display: 'inline-block',
  variants: [{
    props: {
      variant: 'determinate'
    },
    style: {
      transition: theme.transitions.create('transform')
    }
  }, {
    props: {
      variant: 'indeterminate'
    },
    style: rotateAnimation || {
      animation: `${circularRotateKeyframe} 1.4s linear infinite`
    }
  }, ...Object.entries(theme.palette).filter(createSimplePaletteValueFilter()).map(([color]) => ({
    props: {
      color
    },
    style: {
      color: (theme.vars || theme).palette[color].main
    }
  }))]
})));
const CircularProgressSVG = styled('svg', {
  name: 'MuiCircularProgress',
  slot: 'Svg'
})({
  display: 'block' // Keeps the progress centered
});
const CircularProgressCircle = styled('circle', {
  name: 'MuiCircularProgress',
  slot: 'Circle',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.circle, styles[`circle${capitalize(ownerState.variant)}`], ownerState.disableShrink && styles.circleDisableShrink];
  }
})(memoTheme(({
  theme
}) => ({
  stroke: 'currentColor',
  variants: [{
    props: {
      variant: 'determinate'
    },
    style: {
      transition: theme.transitions.create('stroke-dashoffset')
    }
  }, {
    props: {
      variant: 'indeterminate'
    },
    style: {
      // Some default value that looks fine waiting for the animation to kicks in.
      strokeDasharray: '80px, 200px',
      strokeDashoffset: 0 // Add the unit to fix a Edge 16 and below bug.
    }
  }, {
    props: ({
      ownerState
    }) => ownerState.variant === 'indeterminate' && !ownerState.disableShrink,
    style: dashAnimation || {
      // At runtime for Pigment CSS, `bufferAnimation` will be null and the generated keyframe will be used.
      animation: `${circularDashKeyframe} 1.4s ease-in-out infinite`
    }
  }]
})));
const CircularProgressTrack = styled('circle', {
  name: 'MuiCircularProgress',
  slot: 'Track'
})(memoTheme(({
  theme
}) => ({
  stroke: 'currentColor',
  opacity: (theme.vars || theme).palette.action.activatedOpacity
})));

/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 */
const CircularProgress = /*#__PURE__*/reactExports.forwardRef(function CircularProgress(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiCircularProgress'
  });
  const {
    className,
    color = 'primary',
    disableShrink = false,
    enableTrackSlot = false,
    size = 40,
    style,
    thickness = 3.6,
    value = 0,
    variant = 'indeterminate',
    ...other
  } = props;
  const ownerState = {
    ...props,
    color,
    disableShrink,
    size,
    thickness,
    value,
    variant,
    enableTrackSlot
  };
  const classes = useUtilityClasses(ownerState);
  const circleStyle = {};
  const rootStyle = {};
  const rootProps = {};
  if (variant === 'determinate') {
    const circumference = 2 * Math.PI * ((SIZE - thickness) / 2);
    circleStyle.strokeDasharray = circumference.toFixed(3);
    rootProps['aria-valuenow'] = Math.round(value);
    circleStyle.strokeDashoffset = `${((100 - value) / 100 * circumference).toFixed(3)}px`;
    rootStyle.transform = 'rotate(-90deg)';
  }
  return /*#__PURE__*/jsxRuntimeExports.jsx(CircularProgressRoot, {
    className: clsx(classes.root, className),
    style: {
      width: size,
      height: size,
      ...rootStyle,
      ...style
    },
    ownerState: ownerState,
    ref: ref,
    role: "progressbar",
    ...rootProps,
    ...other,
    children: /*#__PURE__*/jsxRuntimeExports.jsxs(CircularProgressSVG, {
      className: classes.svg,
      ownerState: ownerState,
      viewBox: `${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`,
      children: [enableTrackSlot ? /*#__PURE__*/jsxRuntimeExports.jsx(CircularProgressTrack, {
        className: classes.track,
        ownerState: ownerState,
        cx: SIZE,
        cy: SIZE,
        r: (SIZE - thickness) / 2,
        fill: "none",
        strokeWidth: thickness,
        "aria-hidden": "true"
      }) : null, /*#__PURE__*/jsxRuntimeExports.jsx(CircularProgressCircle, {
        className: classes.circle,
        style: circleStyle,
        ownerState: ownerState,
        cx: SIZE,
        cy: SIZE,
        r: (SIZE - thickness) / 2,
        fill: "none",
        strokeWidth: thickness
      })]
    })
  });
});
var CircularProgress$1 = CircularProgress;

export { CircularProgress$1 as C, createSimplePaletteValueFilter as c };
//# sourceMappingURL=CircularProgress-0dc9c54d.js.map
