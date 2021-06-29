import { extendTheme } from "@chakra-ui/react"
import { createBreakpoints } from "@chakra-ui/theme-tools"


const breakpoints = createBreakpoints({
    xs: "180px",
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
})


const theme = extendTheme({
    fonts: {
        heading: 'Poppins, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica,Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
        body: 'Poppins, -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica,Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
    },
},
    breakpoints)

// 2. Update the breakpoints as key-value pairs
export default theme