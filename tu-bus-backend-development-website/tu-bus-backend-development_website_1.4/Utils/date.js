// Get the current date function
function get_current_time() {
    const currentDate = new Date();
    const time = currentDate.toLocaleTimeString(); // get the current time
    const day = currentDate.getDate();             // get the current day
    const month = currentDate.getMonth() + 1;      // get the current month
    const year = currentDate.getFullYear();        // get the current year
    const currentTime = `${time} ${day}/${month}/${year}`;
    return currentTime;
  }

export default get_current_time;