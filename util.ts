const toLocalTime = (timeStr: string): { hour: number; minute: number } => {
  const [hour, minute] = timeStr.split(':').map(Number);
  return { hour, minute };
};
