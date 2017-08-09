# chat.nice
For the final iteration of this project, I'm looking to update chat.nice from a separated player and chat into a chat with integrated music players.

### steps to do this
Working on better formatting the chat from just a simple list with minimally formatted entries into something more aesthetically pleaseing.
Players will be embedded using tags within chat messages.
I'd also like to add some little user interactive features between different chat users - indicate you're listening to a song, indicate if you liked it, etc.

### technical challenges
I'm still trying to figure out how to dynamically size a box to use as a container for text and audio content.
I tried using a few graphics libraries but haven't had much luck making something useful in the context of my application. Also running p5 in node was giving me trouble. Right now I'm just using d3 to format the color of each text entry in the chat, with some commented out stuff I was working toward using to make an svg to contain each message. This might be close to working, but hard to tell.

### things I learned
I learned a fair bit just playing around with p5 examples and running some little graphics exercises outside of the context of the project. Useful to the assignment, didn't get too far.
I looked into my original idea of finding further utilization for sharing a Spotify player between users, but they're definitely not into the idea of people doing this. The player doesn't listen for any actions from a user, and sends no actions when interacted with. Autoplay was recently deprecated, which I had hoped to use as a workaround.


