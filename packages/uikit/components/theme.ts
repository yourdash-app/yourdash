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
  gap: string;
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
  btn: {
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
    transition?: string;
    padding: {
      vertical: string;
      horizontal: string;
    };
    hover: {
      fg: string;
      bg: string;
      border: string;
      radius: string;
      shadow: string;
      transition?: string;
    };
    active: {
      fg: string;
      bg: string;
      border: string;
      radius: string;
      shadow: string;
      transition?: string;
    };
  };
  padding: string;
  transition: string;
}

export interface UIKitTheme {
  def: Required<UIKitThemeLevel>;
  level: {
    0: UIKitThemeLevel;
    1: UIKitThemeLevel;
    2: UIKitThemeLevel;
  };
  name: string;
  author: string;
  version: string;
}

export function loadThemeLevel(theme: UIKitTheme, element: HTMLElement, levelName: "def" | 0 | 1 | 2) {
  if (!element) return;

  const varName = `--ukt-`;
  let themeAccessor = theme.level[levelName as keyof typeof theme.level];

  const DEFAULT_TRANSITION = "all 0.2s ease-in-out";

  if (levelName === "def") {
    themeAccessor = theme.def;
  }

  // various
  element.style.setProperty(`${varName}fg`, themeAccessor.fg);
  element.style.setProperty(`${varName}bg`, themeAccessor.bg);
  element.style.setProperty(`${varName}border`, themeAccessor.border);
  element.style.setProperty(`${varName}shadow`, themeAccessor.shadow);
  element.style.setProperty(`${varName}accent`, themeAccessor.accent);
  element.style.setProperty(`${varName}radius`, themeAccessor.radius);
  element.style.setProperty(`${varName}padding`, themeAccessor.padding);
  element.style.setProperty(`${varName}gap`, themeAccessor.gap);
  element.style.setProperty(`${varName}transition`, themeAccessor.transition ?? DEFAULT_TRANSITION);

  // font
  element.style.setProperty(`${varName}font-family`, themeAccessor.font.family);
  element.style.setProperty(`${varName}font-size`, themeAccessor.font.size);
  element.style.setProperty(`${varName}font-weight`, themeAccessor.font.weight);

  // header various
  element.style.setProperty(`${varName}header-fg`, themeAccessor.header.fg);

  // header font
  element.style.setProperty(`${varName}header-font-family`, themeAccessor.header.font.family);
  element.style.setProperty(`${varName}header-font-size`, themeAccessor.header.font.size);
  element.style.setProperty(`${varName}header-font-weight`, themeAccessor.header.font.weight);

  // header padding
  element.style.setProperty(`${varName}header-padding-vertical`, themeAccessor.header.padding.vertical);
  element.style.setProperty(`${varName}header-padding-horizontal`, themeAccessor.header.padding.horizontal);

  // button various
  element.style.setProperty(`${varName}btn-fg`, themeAccessor.btn.fg);
  element.style.setProperty(`${varName}btn-bg`, themeAccessor.btn.bg);
  element.style.setProperty(`${varName}btn-border`, themeAccessor.btn.border);
  element.style.setProperty(`${varName}btn-radius`, themeAccessor.btn.radius);
  element.style.setProperty(`${varName}btn-shadow`, themeAccessor.btn.shadow);
  element.style.setProperty(`${varName}btn-transition`, themeAccessor.btn.transition ?? DEFAULT_TRANSITION);

  // button font
  element.style.setProperty(`${varName}btn-font-family`, themeAccessor.btn.font.family);
  element.style.setProperty(`${varName}btn-font-size`, themeAccessor.btn.font.size);
  element.style.setProperty(`${varName}btn-font-weight`, themeAccessor.btn.font.weight);

  // button padding
  element.style.setProperty(`${varName}btn-padding-vertical`, themeAccessor.btn.padding.vertical);
  element.style.setProperty(`${varName}btn-padding-horizontal`, themeAccessor.btn.padding.horizontal);

  // button hover
  element.style.setProperty(`${varName}btn-hover-fg`, themeAccessor.btn.hover.fg);
  element.style.setProperty(`${varName}btn-hover-bg`, themeAccessor.btn.hover.bg);
  element.style.setProperty(`${varName}btn-hover-border`, themeAccessor.btn.hover.border);
  element.style.setProperty(`${varName}btn-hover-shadow`, themeAccessor.btn.hover.shadow);
  element.style.setProperty(`${varName}btn-hover-radius`, themeAccessor.btn.hover.radius);
  element.style.setProperty(`${varName}btn-hover-transition`, themeAccessor.btn.hover.transition ?? DEFAULT_TRANSITION);

  // button active
  element.style.setProperty(`${varName}btn-active-fg`, themeAccessor.btn.active.fg);
  element.style.setProperty(`${varName}btn-active-bg`, themeAccessor.btn.active.bg);
  element.style.setProperty(`${varName}btn-active-border`, themeAccessor.btn.active.border);
  element.style.setProperty(`${varName}btn-active-shadow`, themeAccessor.btn.active.shadow);
  element.style.setProperty(`${varName}btn-active-radius`, themeAccessor.btn.active.radius);
  element.style.setProperty(`${varName}btn-active-transition`, themeAccessor.btn.active.transition ?? DEFAULT_TRANSITION);
}

const defaultTheme: UIKitTheme = {
  // default
  def: {
    fg: "#fff",
    bg: "#222",
    accent: "#459",
    border: "1px solid #444",
    shadow: "0 0 0.5rem 0 #000",
    // button
    btn: {
      fg: "#fff",
      bg: "#444",
      border: "1px solid #444",
      font: {
        family: "Inter",
        size: "0.9rem",
        weight: "400",
      },
      radius: "0.5rem",
      shadow: "0 0 0.5rem 0 #000",
      padding: {
        vertical: "0.25rem",
        horizontal: "0.5rem",
      },
      hover: {
        fg: "#fff",
        bg: "#555",
        border: "1px solid #555",
        radius: "0.5rem",
        shadow: "0 0 0.5rem 0 #000",
      },
      active: {
        fg: "#fff",
        bg: "#555",
        border: "1px solid #555",
        radius: "0.5rem",
        shadow: "0 0 0.5rem 0 #000",
      },
      transition: "all 0.2s ease-in-out",
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
    padding: "0.5rem",
    gap: "0.5rem",
    transition: "all 200ms ease-in-out",
  },
  level: {
    "0": {
      fg: "#fff",
      bg: "#333",
      border: "1px solid #555",
      shadow: "0 0 0.5rem 0 #000",
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
      btn: {
        fg: "#fff",
        bg: "#444",
        border: "1px solid #444",
        font: {
          family: "Inter",
          size: "0.9rem",
          weight: "400",
        },
        radius: "0.5rem",
        shadow: "0 0 0.5rem 0 #000",
        padding: {
          vertical: "0.25rem",
          horizontal: "0.5rem",
        },
        hover: {
          fg: "#fff",
          bg: "#555",
          border: "1px solid #555",
          radius: "0.5rem",
          shadow: "0 0 0.5rem 0 #000",
          transition: "all 100ms ease-in-out",
        },
        active: {
          fg: "#000",
          bg: "#666",
          border: "1px solid #555",
          radius: "0.5rem",
          shadow: "0 0 0.5rem 0 #000",
        },
      },
      padding: "0.5rem",
      gap: "0.5rem",
      transition: "all 200ms ease-in-out",
    },
    "1": {
      fg: "#fff",
      bg: "#444",
      border: "1px solid #555",
      shadow: "0 0 0.5rem 0 #000",
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
      btn: {
        fg: "#fff",
        bg: "#555",
        border: "1px solid #555",
        font: {
          family: "Inter",
          size: "0.9rem",
          weight: "400",
        },
        radius: "0.25rem",
        shadow: "0 0 0.5rem 0 #000",
        padding: {
          vertical: "0.25rem",
          horizontal: "0.5rem",
        },
        hover: {
          fg: "#fff",
          bg: "#666",
          border: "1px solid #666",
          radius: "0.25rem",
          shadow: "0 0 0.5rem 0 #000",
          transition: "all 100ms ease-in-out",
        },
        active: {
          fg: "#fff",
          bg: "#666",
          border: "1px solid #666",
          radius: "0.25rem",
          shadow: "0 0 0.5rem 0 #000",
        },
      },
      padding: "0.75rem",
      gap: "0.75rem",
      transition: "all 200ms ease-in-out",
    },
    "2": {
      fg: "#fff",
      bg: "#555",
      border: "1px solid #555",
      shadow: "0 0 0.5rem 0 #000",
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
      btn: {
        fg: "#fff",
        bg: "#666",
        border: "1px solid #666",
        font: {
          family: "Inter",
          size: "0.9rem",
          weight: "400",
        },
        radius: "0.25rem",
        shadow: "0 0 0.5rem 0 #000",
        padding: {
          vertical: "0.25rem",
          horizontal: "0.5rem",
        },
        hover: {
          fg: "#fff",
          bg: "#777",
          border: "1px solid #777",
          radius: "0.25rem",
          shadow: "0 0 0.5rem 0 #000",
          transition: "all 100ms ease-in-out",
        },
        active: {
          fg: "#fff",
          bg: "#777",
          border: "1px solid #777",
          radius: "0.25rem",
          shadow: "0 0 0.5rem 0 #000",
        },
      },
      padding: "1rem",
      gap: "1rem",
      transition: "all 200ms ease-in-out",
    },
  },
  author: "Ewsgit",
  name: "YourDash Classic Dark",
  version: "0.0.1",
};

export default defaultTheme;
