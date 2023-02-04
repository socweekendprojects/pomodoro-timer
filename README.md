Pomodoro timer
A simple timer app to help you boost your productivity.


Main Learning points:
The main problem I faced was with clearInterval onClick -> ‘its because start variable is re-created on each render and don’t have timer id when clearing interval you need to store it in useRef hook’. I took a lot of digging into google forums but the issue we had was the pause button kept on resetting. useRef seemed to do the trick. 'useRef is basically useState but React won't render component when ref changes nor ref value will change when render happens'. I was not able to use useState as it did not update the variables. 
Solution found in https://www.reddit.com/r/reactjs/comments/y1aorm/clear_interval_is_not_working_on_onclick/