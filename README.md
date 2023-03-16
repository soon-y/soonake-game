## Snake Game
<https://snake-game-soon-y.vercel.app/>


# 1. Description
- Date: October 2022 to Febraury 2023
- Personal project in 'Introduction of Computer Graphics' class


# 2. Technologies
- Three.js
- GSAP
- Hammer.js; swiping gestures for touch devices
- Vite.js; provided by [Three.js journey](https://threejs-journey.com/)
- Blender; Snake, Walls


# 3. Features
- Head of Snake is initially placed at the random spot. 
- Snake is controlled by arrow keys/swiping gestures.
- Snake moves froward by one unit every 250ms.
- When Snake eats Apple, its body grows by one unit and Apple is repositioned.
- Apple is placed at the random spot not overlapping with snake's position.
- When Snake hits the walls or intersects its body, the game is over.
- In touch devices, after "start" button is clicked; 
    - Camera position is reset.
    - Camera controls target is reset.
    - OrbitControls are not enabled.
    - swiping gestures are enabled.


# 4. Graphics Source
- [Snake skin](https://www.freepik.com/free-vector/flat-design-snake-skin-pattern-background_28159235.htm#query=snake%20skin&position=17&from_view=search&track=ais)
 

# 5. Difficulties
- Audio did not play at all on an IPhone;
    -  Error: The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page.
    -  Therefore, I added "Start" button.
- Audio did not play when an alert box was displayed on an IPhone;
    - An alert box was supposed to be shown to report game over whenever the game ended. 
    - Remove `alert()` and display 'Game over' layer.