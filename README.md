# Curve Creator

Curve Creator is a powerful Roblox Studio plugin and open-source library for designing and using smooth Bézier curves to replace simple linear mappings. It provides a highly intuitive interface for curve creation, file management, and in-game integration—perfect for Roblox developers building rich experiences with custom animations, dynamic transitions, recoil patterns, and more.

---

## 🔧 Features

### 🎨 Intuitive Editor Interface

- Drag-and-drop point plotting on a timeline-style canvas
- Adjustable Bézier handles for precise curvature
- Real-time curve visualization with optional guide overlays
- Click to move, numerically adjust, or delete points
- Visualize mode: toggle readonly display without handles

### 🗂 File Menu & Project Management

- Create, save, load, and rename curve files within the plugin
- “Save As” and overwrite support for efficient workflow
- Automatically embeds the Lua-based runtime library (ModuleScript) for game use

### ⚙️ Settings & Customization

- Tweak curve resolution and rounding precision
- Toggle display elements like grid lines, point values, or guides
- Fully reactive UI powered by [Reflex](https://github.com/littensy/reflex) (minimal, reactive state management for Roblox)
- Smooth transitions with [Ripple](https://github.com/littensy/ripple) for UI feedback and animation

---

## 📦 Included Library Module

Curve Creator auto-generates a ModuleScript that interprets curve data in-game using cubic and quadratic Bézier math. Here's a simplified usage:

```lua
local Curve = require(path.To.Curve)
local y = Curve.calculate(data, x)
```

Supports non-linear mappings between any \[0,1] `x` input and corresponding `y` output, with seamless fallbacks when handles are missing or linear segments are used.

Internally, the library solves cubic roots for parameterized Bézier segments and uses adaptive logic to fall back to quadratic or linear interpolation.

---

## 💡 Use Cases

- **Custom animations** – Smooth easing or tweens tailored for character movement, UI, or particles.
- **Weapon recoil patterns** – Define precise trajectories using points for each shot.
- **Camera smoothing** – Map camera position or FOV to curved input paths.
- **Custom XP/level curves** – Non-linear experience gain mappings.
- **Dynamic audio fades** – Fine-tuned volume curves with visual precision.

---

## 💻 Development Notes

- Written entirely in **RobloxTS** (TypeScript for Roblox), compiled via `roblox-ts`.
- Built with **React** using a custom UI kit.
- State is managed by **Reflex**, a lightweight reactive state library.
- Animations powered by **Ripple** for minimal performance cost.
- Code formatted with **Prettier**, linted via **ESLint**, and developed in **VSCode**.

---

## 📸 Visuals

### Interface Screenshots

_Curve editor with plotted points and Bézier handles_

![](https://ik.imagekit.io/somewhatmay/project-outline-images/curve-creator/RobloxStudioBeta_wLwvxKzzXs.png)

_Settings menu with toggles and numeric fields_

![](https://ik.imagekit.io/somewhatmay/project-outline-images/curve-creator/RobloxStudioBeta_06RD2x3Thi.png)

_File menu showing save/load operations_

![](https://ik.imagekit.io/somewhatmay/project-outline-images/curve-creator/RobloxStudioBeta_oXCJwou2xv.png)

_Readonly visualization mode toggle_

![](https://ik.imagekit.io/somewhatmay/project-outline-images/curve-creator/RobloxStudioBeta_MDTrYHMMUs.png)

### Demo Video

[![IMAGE ALT TEXT](http://img.youtube.com/vi/RPI2X9-zisc/0.jpg)](http://www.youtube.com/watch?v=RPI2X9-zisc "Curve Creator Demo")
