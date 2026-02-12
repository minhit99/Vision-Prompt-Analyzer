
# 👁️ VisionPrompt Analyzer

**VisionPrompt Analyzer** is an advanced AI-powered tool designed to reverse-engineer the "DNA" of any image. By leveraging the **Google Gemini API**, it decomposes visual inputs into structured prompts (Subject, Style, Environment, Objects) and allows creators to remix, edit, and regenerate new visuals instantly.

![App Preview](https://via.placeholder.com/1200x600/0f172a/6366f1?text=VisionPrompt+Analyzer+Preview)
> *Note: Replace the image above with a screenshot of your main interface.*

## ✨ Key Features

### 1. 🧠 AI-Powered Visual Analysis
Uses **Gemini 3 Flash** to deeply analyze images and extract:
*   **Subject DNA:** Identifies the main character or focal point.
*   **Style & Medium:** Detects art styles (e.g., Oil Painting, Cyberpunk, 35mm Photography).
*   **Context/Environment:** Describes the background, lighting, and atmosphere.
*   **Color Mapping:** Extracts an exact hex color palette.
*   **Typography:** Detects text elements, fonts, and their locations.

### 2. ⚡ Batch Processing & Queue System
Support for high-volume workflows.
*   **Multi-Upload:** Drag and drop multiple images at once.
*   **Queue Management:** Images are processed sequentially to respect API rate limits.
*   **History Bar:** A visual gallery of previous analyses allows you to switch between results instantly.

### 3. 🧬 Prompt DNA Lab
A granular editor for the generated prompt.
*   **Toggle Control:** Enable or disable specific parts of the prompt (e.g., keep the subject but remove the background).
*   **Auto-Sync:** Changes in the text fields automatically update the "Master Synthesis Prompt".
*   **Typography Matrix:** Specific controls for text elements found in the image.

### 4. 🎨 Creative Synthesis & Generation
Re-imagine your image using **Gemini 2.5 Flash Image**.
*   **Style Overrides:** Apply presets like *Cinematic, Anime, Minimalist, or Neon*.
*   **Lens Optics:** Simulate camera lenses (35mm, 85mm, Fisheye, Macro).
*   **Aspect Ratio Control:** Switch between Square (1:1), Landscape (16:9), and Portrait (9:16).
*   **Visualization:** Generate small previews of individual objects or the full composition.

### 5. 🌍 Multi-Language Support
Full UI localization support for:
*   🇬🇧 English
*   🇻🇳 Vietnamese
*   🇨🇳 Chinese (Simplified)
*   🇯🇵 Japanese
*   🇹🇭 Thai

---

## 📸 Screenshots

| Upload & Queue | Analysis Results |
|:---:|:---:|
| ![Upload Interface](https://via.placeholder.com/600x400/1e293b/94a3b8?text=Upload+Queue) | ![Analysis Result](https://via.placeholder.com/600x400/1e293b/94a3b8?text=DNA+Lab+Result) |
| *Batch upload interface with queue status* | *Detailed breakdown of image components* |

| Creative Config | History Gallery |
|:---:|:---:|
| ![Creative Tools](https://via.placeholder.com/600x400/1e293b/94a3b8?text=Creative+Config) | ![History Bar](https://via.placeholder.com/600x400/1e293b/94a3b8?text=History+Gallery) |
| *Style overrides and lens settings* | *Session history with thumbnail navigation* |

---

## 🛠️ Tech Stack

*   **Frontend:** React 19, TypeScript, Vite (assumed)
*   **Styling:** Tailwind CSS (Dark Mode / Glassmorphism UI)
*   **AI Core:** Google Gemini API (`@google/genai` SDK)
    *   Analysis: `gemini-3-flash-preview`
    *   Generation: `gemini-2.5-flash-image`
*   **Icons:** FontAwesome 6

---

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   A Google Gemini API Key (Get one at [aistudio.google.com](https://aistudio.google.com/))

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/visionprompt-analyzer.git
    cd visionprompt-analyzer
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Create a `.env` file in the root directory and add your API key:
    ```env
    API_KEY=your_google_gemini_api_key_here
    ```
    *(Note: The app is configured to read `process.env.API_KEY`. Ensure your bundler supports this).*

4.  **Run the App**
    ```bash
    npm start
    # or
    npm run dev
    ```

---

## 📖 Usage Guide

1.  **Upload:** Drag and drop one or more images into the drop zone.
2.  **Analyze:** Click "Analyze Queue". The app will process images one by one.
3.  **Review DNA:** Scroll down to the "Prompt DNA Lab". Review the Subject, Style, and Context.
4.  **Edit:** Uncheck boxes to remove elements or edit the text fields directly.
5.  **Configure:** Use the "Creative Configuration" section to add a "Cyberpunk" filter or a "Fisheye" lens effect.
6.  **Generate:** Click **Visualize Result** to generate a new image based on your modified prompt.

---

## 📄 License

This project is licensed under the MIT License.
