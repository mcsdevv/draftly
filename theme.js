import { theme } from "@chakra-ui/core";

export default {
  ...theme,
  icons: {
    // Add Chakra's icons
    ...theme.icons,
    // Your custom icons
    search: {
      // The <path/> or <g> element for the svg. Note the use of  `fill=currentColor`
      path: (
        <path
          fill="currentColor"
          d="M23.384,21.619,16.855,15.09a9.284,9.284,0,1,0-1.768,1.768l6.529,6.529a1.266,1.266,0,0,0,1.768,0A1.251,1.251,0,0,0,23.384,21.619ZM2.75,9.5a6.75,6.75,0,1,1,6.75,6.75A6.758,6.758,0,0,1,2.75,9.5Z"
        />
      ),
      // This is the viewBox of the icon.
      viewBox: "0 0 24 24"
    }
  }
};
