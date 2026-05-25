/**
 * Calcula o tempo estimado de viagem baseado em distância e velocidade
 * @param distance - Distância em quilômetros
 * @param speed - Velocidade média em km/h
 * @returns Tempo estimado em minutos
 */
export const calculateTravelTime = (distance: number, speed: number): number => {
  if (speed <= 0) {
    throw new Error('A velocidade deve ser maior que zero');
  }
  
  // Fórmula: tempo = distância / velocidade
  const timeInHours = distance / speed;
  const timeInMinutes = timeInHours * 60;
  
  return Math.round(timeInMinutes);
};

/**
 * Formata o tempo em minutos para um formato legível (horas e minutos)
 * @param minutes - Tempo em minutos
 * @returns String formatada (ex: "2h 30min")
 */
export const formatTravelTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${mins}min`;
  }
  
  if (mins === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${mins}min`;
};

/**
 * Calcula a velocidade média necessária para chegar no horário desejado
 * @param distance - Distância em quilômetros
 * @param timeInMinutes - Tempo disponível em minutos
 * @returns Velocidade média necessária em km/h
 */
export const calculateRequiredSpeed = (distance: number, timeInMinutes: number): number => {
  if (timeInMinutes <= 0) {
    throw new Error('O tempo deve ser maior que zero');
  }
  
  const timeInHours = timeInMinutes / 60;
  const speed = distance / timeInHours;
  
  return Math.round(speed * 10) / 10; // Arredonda para uma casa decimal
};

/**
 * Calcula a distância baseada em velocidade e tempo
 * @param speed - Velocidade em km/h
 * @param timeInMinutes - Tempo em minutos
 * @returns Distância em quilômetros
 */
export const calculateDistance = (speed: number, timeInMinutes: number): number => {
  const timeInHours = timeInMinutes / 60;
  const distance = speed * timeInHours;
  
  return Math.round(distance * 10) / 10; // Arredonda para uma casa decimal
};

/**
 * Estima o horário de chegada baseado no horário de saída e tempo de viagem
 * @param departureTime - Horário de saída (ISO string ou Date)
 * @param travelTimeInMinutes - Tempo de viagem em minutos
 * @returns Horário de chegada estimado como Date
 */
export const estimateArrivalTime = (departureTime: string | Date, travelTimeInMinutes: number): Date => {
  const departure = typeof departureTime === 'string' ? new Date(departureTime) : departureTime;
  const arrival = new Date(departure.getTime() + travelTimeInMinutes * 60000);
  
  return arrival;
};

/**
 * Formata uma data para o formato de hora legível
 * @param date - Data a ser formatada
 * @returns String formatada (ex: "14:30")
 */
export const formatTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  
  return `${hours}:${minutes}`;
};

/**
 * Calcula o custo estimado da viagem (exemplo simples)
 * @param distance - Distância em quilômetros
 * @param pricePerKm - Preço por quilômetro
 * @returns Custo total estimado
 */
export const estimateTripCost = (distance: number, pricePerKm: number = 2.5): number => {
  const baseCost = distance * pricePerKm;
  return Math.round(baseCost * 100) / 100; // Arredonda para 2 casas decimais
};
