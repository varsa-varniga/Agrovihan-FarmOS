import { useEffect } from "react";
import { Paper, Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Create a custom green theme
const greenTheme = createTheme({
  palette: {
    primary: {
      main: "#4caf50",
      light: "#e8f5e9",
      dark: "#2e7d32",
    },
  },
});

const GoogleTranslate = ({ compact = false }) => {
  useEffect(() => {
    // Add custom styling for Google Translate elements
    const style = document.createElement("style");
    style.textContent = `
      .goog-te-gadget {
        font-family: 'Roboto', sans-serif;
        color: #2e7d32;
      }
      
      .goog-te-gadget-simple {
        background-color: #ffffff !important;
        border: 1px solid #4caf50 !important;
        padding: 6px !important;
        border-radius: 4px !important;
        transition: all 0.3s ease;
      }
      
      .goog-te-gadget-simple:hover {
        background-color: #f1f8e9 !important;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
      
      .goog-te-menu-value span {
        color: #2e7d32 !important;
        font-weight: 500;
      }
      
      .goog-te-menu-frame {
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
      }
      
      .goog-te-menu2 {
        border: none !important;
        border-radius: 4px !important;
      }

      /* Compact mode overrides */
      .agro-gt.compact .goog-te-gadget-simple {
        padding: 2px 6px !important;
        height: 32px !important;
        line-height: 28px !important;
        display: inline-flex !important;
        align-items: center !important;
        gap: 6px !important;
        box-sizing: border-box !important;
      }

      .agro-gt.compact .goog-te-menu-value span {
        font-size: 12px !important;
      }

      .agro-gt.compact .goog-te-menu-value {
        display: inline-flex !important;
        align-items: center !important;
        gap: 6px !important;
        max-width: 100% !important;
        line-height: 1 !important;
      }

      .agro-gt.compact .goog-te-gadget-simple img {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    const initGoogleTranslate = () => {
      if (!window.google || !window.google.translate) return;

      // Avoid re-initialization
      if (!document.getElementById("google_translate_element_initialized")) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "ta,ml,hi,te,kn,en",
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );

        // Dummy div to mark it's already initialized
        const flagDiv = document.createElement("div");
        flagDiv.id = "google_translate_element_initialized";
        flagDiv.style.display = "none";
        document.body.appendChild(flagDiv);
      }
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    window.googleTranslateElementInit = initGoogleTranslate;

    // Cleanup
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <ThemeProvider theme={greenTheme}>
      <Paper
        elevation={2}
        className={`agro-gt ${compact ? "compact" : ""}`}
        sx={{
          padding: compact ? 0.5 : 1,
          minWidth: compact ? "120px" : "160px",
          maxWidth: compact ? "150px" : "240px",
          minHeight: compact ? "36px" : "auto",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <Box id="google_translate_element" />
      </Paper>
    </ThemeProvider>
  );
};

export default GoogleTranslate;
