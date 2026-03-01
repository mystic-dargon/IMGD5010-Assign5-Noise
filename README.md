# IMGD5010 - Assignment 5 - Noise and Complexity

[Swarming Agents | View Only](https://editor.p5js.org/mystic-dargon/full/-Q_eVUG_k) || [Swarming Agents | Code View](https://editor.p5js.org/mystic-dargon/sketches/-Q_eVUG_k) <br><br>

For this assignment, I wanted to play around with simulating insects-- in particular the way they gather or disperse when things happen in their environment.

The way I decided to approch this was by designing 3 main actions the bugs could take: 'Wandering', where the bugs wander along a course (with randomnization making their paths jitter and change); 'swarming', where the bugs gather around the mouse so long as they are close enough to 'notice' it (activated via holding left click on the canvas); and 'fleeing', where the bugs move away from the mouse if they are within a certain distance of it (activated via holding right click on the canvas).

Overall, I'm pretty happy with how these 3 forms of movement turned out. I do wish the 'wandering' had a little more structure, where the bugs responded to other bugs around them, but I was unsure on how to do the math to make that happen.<br><br>

Other randomized attributes for the bugs include:
- Color (within a range)
- Size (within a range)
- Starting location
- Starting direction
