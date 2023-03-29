export const waitForMs = (ms: number): Promise<void> => {
  return new Promise((res) => {
    setTimeout(() => res(), ms);
  });
};

export function generateRandomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}
