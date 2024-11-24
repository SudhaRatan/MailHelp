type dayOptions = {
  weekday: "long" | "narrow" | "short"
}

export function formatDate(isoDateString: string) {
  const inputDate = new Date(isoDateString);
  const currentDate = new Date();
  
  // Create options for formatting
  const dayOptions: dayOptions = { weekday: 'long' };
  // const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
  
  // Check if the date is in the current week
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  
  if (inputDate >= startOfWeek && inputDate <= endOfWeek) {
    // If in current week, return day of week and time
    return `${inputDate.toLocaleDateString('en-US', dayOptions)} ${inputDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
  } else {
    // If not in current week, return day of week and date
    const formattedDate = `${inputDate.getDate().toString().padStart(2, '0')}/${(inputDate.getMonth() + 1).toString().padStart(2, '0')}`;
    return `${inputDate.toLocaleDateString('en-US', dayOptions)} ${formattedDate}`;
  }
}

export function formatDateCustom(isoDateString: string) {
  const date = new Date(isoDateString);
  
  // Array of month names
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 
    'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  // Function to get ordinal suffix
  const getOrdinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  
  // Format components
  const day = date.getDate();
  const month = months[date.getMonth()];
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  const formattedHours = (hours % 12 || 12).toString();
  
  return `${day}${getOrdinalSuffix(day)} ${month} at ${formattedHours}:${minutes}${ampm}`;
}