import { styles } from "@dash-ui/styles";
import reset from "@dash-ui/reset";

export const variables = {
  color: {
    dark: "#1d2326",
    med: "#373b3e",
    light: "#f2fafe",
  },
  pad: {
    sm: "0.25rem",
    md: "0.5rem",
    lg: "1rem",
    xl: "2rem",
  },
  radius: {
    sm: "0.10rem",
    md: "0.5rem",
    lg: "1rem",
    xl: "2rem",
  },
  shadow: {
    lg:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
};

styles.insertVariables(variables);

styles.insertGlobal(
  ({ color }) => `
    html,
    body {
      font-size: 1rem;
      font-family: Nunito, sans-serif;
      letter-spacing: -0.025em;
      color: ${color.body};
      background-color: ${color.light};
    }

    ${reset}
  `
);

export { styles } from "@dash-ui/styles";
