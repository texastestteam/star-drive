### README.md

# Starfield Simulation 🌌

This project is a p5.js sketch that simulates a starfield with scattered stars of different colors and sizes. The stars move in the direction of the mouse, with a smooth transition to multi-directional movement. When the mouse stops moving, the stars gradually slow down. The cursor fades away after 2 seconds of inactivity.

## Features ✨

- **Continuous Movement**: Stars move continuously in the direction relative to the center of the window based on mouse position.
- **Smooth Transition**: Smooth transition from forward to multi-directional movement.
- **Adjustable Speed**: Central forward speed can be controlled and is faster by default.
- **Dynamic Interaction**: Stars slow down after 5 seconds of no mouse movement.
- **Star Colors and Sizes**: Stars come in various colors (white, yellow/orange, red, blue) with different sizes.
- **Mouse Cursor Fade**: Mouse cursor fades away after 2 seconds of inactivity.
- **Adjustable Star Density**: Control the number of stars using a density multiplier.

## File Explanation 📂

### `index.html`

The HTML file that sets up the p5.js environment and includes the main script.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Starfield Simulation</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
    <script src="sketch.js"></script>
  </head>
  <body></body>
</html>
```

### `sketch.js`

The main JavaScript file containing the p5.js sketch. This file includes the setup and draw functions, star class, and window resize handling.

#### Key Variables

- `starDensityMultiplier`: Multiplier for star density, allowing control over the number of stars.
- `centerSpeedMultiplier`: Speed multiplier for center forward movement.
- `mouseInactiveTime`: Duration (in milliseconds) after which the mouse cursor will be hidden.
- `whiteStarSize`, `yellowOrangeStarSize`, `redStarSize`, `blueStarSize`: Size ranges for different star color groups.

#### Functions

1. **`setup`**: Initializes the canvas and creates stars based on the `starDensityMultiplier`.
2. **`draw`**: 
   - Clears the background.
   - Calculates the speed based on the mouse distance from the center.
   - Handles the transition from forward to multi-directional movement.
   - Updates and displays each star.
   - Calls `handleMouseVisibility` to manage the mouse cursor visibility.
3. **`Star` Class**:
   - `reset`: Resets star properties and assigns a random color and size.
   - `setColorAndSize`: Assigns a color and size based on random distribution, with updated size ranges.
   - `update`: Updates star position based on speed and direction.
   - `show`: Displays the star with the assigned color and size.
4. **`handleMouseVisibility`**:
   - Hides the mouse cursor if the time since the last mouse movement exceeds `mouseInactiveTime`.
   - Shows the mouse cursor if the mouse is moved.
5. **`mouseMoved`**: Updates `lastMouseMoveTime` whenever the mouse is moved.
6. **`createStars`**: Creates a specified number of star objects based on the given count.
7. **`windowResized`**: Adjusts the canvas size when the window is resized and recreates stars based on the updated canvas size and star density multiplier.

## Quick GPT-4o p5.js Trial ⏱️

This project was created as a quick trial to demonstrate the capabilities of GPT-4 in generating a p5.js project. The entire implementation and adjustments were completed in less than 1 hour.

## Adjusting Functionality 🔧

### Change Star Density

To adjust the number of stars, modify the `starDensityMultiplier` variable in `sketch.js`:

```javascript
let starDensityMultiplier = 1; // Change this value to increase/decrease star density
```

### Change Center Speed Multiplier

To adjust the central forward speed, modify the `centerSpeedMultiplier` variable in `sketch.js`:

```javascript
let centerSpeedMultiplier = 10; // Change this value to control the center forward speed
```

### Change Mouse Inactivity Time

To change the duration after which the mouse cursor fades away, modify the `mouseInactiveTime` variable in `sketch.js`:

```javascript
let mouseInactiveTime = 2000; // Change this value (in milliseconds) to adjust mouse fade delay
```

### Change Star Sizes

To change the size ranges for different star colors, modify the respective size arrays in `sketch.js`:

```javascript
// Star size ranges for each color group
let whiteStarSize = [2, 3, 5];
let yellowOrangeStarSize = [2, 3, 5, 4, 6];
let redStarSize = [1, 2, 3, 3, 5];
let blueStarSize = [5, 6, 8];
```

## License 📜

This project is licensed under the IDK License. (so dont copy... unless)
Enjoy the starfield simulation! 🌟
```

This README provides a comprehensive overview of the project's functionality and detailed instructions on how to adjust various parameters in the code.
