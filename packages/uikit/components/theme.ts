/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

interface UIKitThemeLevel {
  fg: string;
  bg: string;
  border: string;
  shadow: string;
  accent: string;
  radius: string;
  font: {
    family: string;
    size: string;
    weight: string;
  };
  header: {
    fg: string;
    font: {
      family: string;
      size: string;
      weight: string;
    };
    padding: {
      vertical: string;
      horizontal: string;
    };
  };
  button: {
    fg: string;
    bg: string;
    border: string;
    font: {
      family: string;
      size: string;
      weight: string;
    };
    radius: string;
    shadow: string;
    accent: string;
    padding: {
      vertical: string;
      horizontal: string;
    };
  };
}

export interface UIKitTheme {
  default: Required<UIKitThemeLevel>;
  level: {
    0: UIKitThemeLevel;
    1: UIKitThemeLevel;
    2: UIKitThemeLevel;
  };
  name: string;
  author: string;
  version: string;
}

const defaultTheme: UIKitTheme = {
  default: {
    fg: "#fff",
    accent: "#459",
    border: "1px solid #444",
    bg: "#222",
    shadow: "0 0 0 0.5rem #000",
    button: {
      fg: "#fff",
      bg: "#444",
      border: "1px solid #444",
      font: {
        family: "Inter",
        size: "0.9rem",
        weight: "400",
      },
      radius: "0.5rem",
      shadow: "0 0 0 0.5rem #000",
      accent: "#459",
      padding: {
        vertical: "0.25rem",
        horizontal: "0.5rem",
      },
    },
    font: {
      family: "Inter",
      size: "0.9rem",
      weight: "400",
    },
    radius: "0.5rem",
    header: {
      fg: "#fff",
      font: {
        family: "Inter",
        size: "1.2rem",
        weight: "700",
      },
      padding: {
        vertical: "1rem",
        horizontal: "0.5rem",
      },
    },
  },
  level: {
    "0": {
      fg: "#fff",
      bg: "#333",
      border: "1px solid #555",
      shadow: "0 0 0 0.5rem #000",
      accent: "#459",
      radius: "0.5rem",
      font: {
        family: "Inter",
        size: "0.9rem",
        weight: "400",
      },
      header: {
        fg: "#fff",
        font: {
          family: "Inter",
          size: "1.2rem",
          weight: "700",
        },
        padding: {
          vertical: "0.5rem",
          horizontal: "0.25rem",
        },
      },
      button: {
        fg: "#fff",
        bg: "#444",
        border: "1px solid #444",
        font: {
          family: "Inter",
          size: "0.9rem",
          weight: "400",
        },
        radius: "0.25rem",
        shadow: "0 0 0 0.5rem #000",
        accent: "#459",
        padding: {
          vertical: "0.25rem",
          horizontal: "0.5rem",
        },
      },
    },
    "1": {
      fg: "#fff",
      bg: "#444",
      border: "1px solid #555",
      shadow: "0 0 0 0.5rem #000",
      accent: "#459",
      radius: "0.5rem",
      font: {
        family: "Inter",
        size: "0.9rem",
        weight: "400",
      },
      header: {
        fg: "#fff",
        font: {
          family: "Inter",
          size: "1.2rem",
          weight: "700",
        },
        padding: {
          vertical: "0.5rem",
          horizontal: "0.25rem",
        },
      },
      button: {
        fg: "#fff",
        bg: "#555",
        border: "1px solid #555",
        font: {
          family: "Inter",
          size: "0.9rem",
          weight: "400",
        },
        radius: "0.25rem",
        shadow: "0 0 0 0.5rem #000",
        accent: "#459",
        padding: {
          vertical: "0.25rem",
          horizontal: "0.5rem",
        },
      },
    },
    "2": {
      fg: "#fff",
      bg: "#555",
      border: "1px solid #555",
      shadow: "0 0 0 0.5rem #000",
      accent: "#459",
      radius: "0.5rem",
      font: {
        family: "Inter",
        size: "0.9rem",
        weight: "400",
      },
      header: {
        fg: "#fff",
        font: {
          family: "Inter",
          size: "1.2rem",
          weight: "700",
        },
        padding: {
          vertical: "0.5rem",
          horizontal: "0.25rem",
        },
      },
      button: {
        fg: "#fff",
        bg: "#666",
        border: "1px solid #666",
        font: {
          family: "Inter",
          size: "0.9rem",
          weight: "400",
        },
        radius: "0.25rem",
        shadow: "0 0 0 0.5rem #000",
        accent: "#459",
        padding: {
          vertical: "0.25rem",
          horizontal: "0.5rem",
        },
      },
    },
  },
  author: "Ewsgit",
  name: "YourDash Classic Dark",
  version: "0.0.1",
};

export default defaultTheme;
