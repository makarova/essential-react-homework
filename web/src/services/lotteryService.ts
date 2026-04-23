import type { CreateLotteryRequest, Lottery } from '../types/lottery';

const API_URL = import.meta.env.VITE_API_URL;

export const createLottery = async (
  data: CreateLotteryRequest,
): Promise<Lottery> => {
  const response = await fetch(`${API_URL}/lotteries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      type: 'simple',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create lottery');
  }

  return response.json();
};

export const fetchLotteries = async (): Promise<Lottery[]> => {
  const response = await fetch(`${API_URL}/lotteries`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch lotteries');
  }

  return response.json();
};
