# Pomodoro timer 
A simple timer app to help you boost your productivity. Working is cycles of 25min work 5min break and after 3 cycles of work you get a longer 15min break. 
Click for [Demo](https://pomodoro-app1.netlify.app/).
<br><br>
<div align="center">
<img src='./public/Pomodoro Timer Screenshot.png' width=300px>
</div>

<br>

<h2> Main Learning Points</h2>

- I used Tailwind CSS for the first time.
- Used useRef hook
- Used setInterval & clearInterval
- The main problem I faced was with clearInterval onClick -> ‘its because start variable is re-created on each render and don’t have timer id when clearing interval you need to store it in useRef hook’. I took a lot of digging into google forums but the issue we had was the pause button kept on resetting. useRef seemed to do the trick. 'useRef is basically useState but React won't render component when ref changes nor ref value will change when render happens'. I was not able to use useState as it did not update the variables. 
Solution found in https://www.reddit.com/r/reactjs/comments/y1aorm/clear_interval_is_not_working_on_onclick/

<h2> Stretch Goals</h2>

- Allow the user to select number of work cycles and change length of breaks
- Write tests

<h2> Built with</h2>

- Next.js
- Tailwind CSS

<h2> Installation</h2>

1.  `git clone https://github.com/socweekendprojects/pomodoro-timer.git`

2. <code>npm i & npm run dev</code>


