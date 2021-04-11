# Math - Overview

This project's puropuse to double up as vault of my mathematical knowledge. Here I will try to learn and implement different algorithms and concepts, visualize, and later explain how they work.
Project done mostly in Angular/Typescript, some features should be double-checked by API(python + flask).

## Fields of math included (the planned structure ATM)

- Algorithms and data structures
    - Hanoi towers
    - Sorting
    - Monte carlo method
- Combinatorics
    - Pathfinding
- Dynamical systems
    - Lorenz attractor
    - Ablion sandpile
    - Double(2+) pendulum
- Data science
    - Letter detection
    - Regression
- Mathematical Analysis
    - Differencial equations
    - Exhaution method

## Project structure

1. Modules
Project is split into modules, one for each branch of math. This is done for two purpouses: to keep code cleaner and more logical, and to have them **lazy loaded**. Given the project's size and usage of **Three.js** and **Canvas2d**, it'd be straining of users' computers to load every big module at once.

2. Components
Each module is split into components, one for each concept. This keeps it easy to navigate around. Additionaly, every concept, in addition to explaining itself when viewing website, should have README attatched basically repeating what this component does and why.

3. Shared
Each component will be using reusable parts of the code, shared components, models and guards. Examples of such would be *explanation.component* or *button-normal.component*, used to keep the styling of each module and component as similar as possible.

4. Services
Some of the components will be needing external help. As such, they will be communicating to our *Python/Flask API* via *HTTP protocols*. "Front-end" server is built using *node.js and express*.

5. External libraries used
- anime.js
- three.js
- express

## User experience and design

1. Project general design

2. Color schema
#272727
#636363
#F3F3F3
#FF0090
#00FFEE

## Running locally

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files. 

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
