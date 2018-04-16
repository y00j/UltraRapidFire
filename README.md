# README - UltraRapidFire

## Background and Overview
UltraRapidFire will be a fast pace classic arcade style shooter inspired by old retro sprite based games such as Space Invaders, and Cho Ren Sha. The player will control a ship using each of the arrow keys to move, and the space bar to shoot.

There will be 4 different types of enemy ships that will fire bullets in different patterns with increasing difficulty to avoid
+ directly straight forwards
+ towards the player's current location
+ a cluster of bullets that are shot in the direction of the player
+ a large spiral pattern that moves out radially


## Features/MVPs

The game will have sound effects, and music running in the background, all of which will be toggle-able.

The player will also be able to pause the game. 

The player will be able to set the game speed at the beginning of the game with a slider as a way to change the difficulty.

When certain enemies are destroyed, they will release power-up packages that will increase the number of bullets that the player's ship can shoot.

## Technologies/Architecture

The main technologies used will be vanilla Javascript, and Canvas. The specific ship images, and bullets will be sprites taken from opensource websites. 

The main game logic will be `game.js`, and there will also be a folder for objects, which will have files for `enemy.js`, and `bullet.js` that will hold the logic for how each of those objects move, and their collision properties, since the bullets will damage on impact.

## Wireframe

![Wireframes](/Users/Yujie/Desktop/App Academy/projects/js_project/UltraRapidFire/UltraRapidFire.png)




