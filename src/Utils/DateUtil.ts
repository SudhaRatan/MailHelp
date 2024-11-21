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