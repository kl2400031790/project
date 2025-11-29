# How to Add Your Food Pattern Background Image

## Option 1: Add Image to Public Folder (Recommended)

1. Save your food pattern image (PNG, JPG, or SVG) to:
   ```
   project/public/food-pattern.png
   ```
   (or `food-pattern.jpg`, `food-pattern.svg`, etc.)

2. The code is already set up to use it! Just update the backgroundImage URL in:
   - `src/SignIn.jsx`
   - `src/SignUp.jsx`

   Change this line:
   ```javascript
   backgroundImage: "url('data:image/svg+xml,...')"
   ```
   
   To:
   ```javascript
   backgroundImage: "url('/food-pattern.png')"
   ```

## Option 2: Add Image to Assets Folder

1. Save your image to:
   ```
   project/src/assets/food-pattern.png
   ```

2. Import it in the component:
   ```javascript
   import foodPattern from '../assets/food-pattern.png';
   ```

3. Use it:
   ```javascript
   backgroundImage: `url(${foodPattern})`
   ```

## Current Implementation

Right now, I've added a simple food-themed pattern using SVG. If you want to use your actual image, follow the steps above!

