import type {
  CreateLotteryRequest,
  Lottery,
  RegisterForLotteryRequest,
} from '../types';

const API_URL = 'http://localhost:3000';

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

export const registerForLottery = async (
  data: RegisterForLotteryRequest,
): Promise<Lottery[]> => {
  const response = await fetch(`${API_URL}/register`, {
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
    throw new Error('Failed to register for lottery');
  }

  return response.json();
};

export async function getLotteryById(lotteryId: string) {
  try {
    const response = await fetch(`${API_URL}/lottery/${lotteryId}`);

    const body: Awaited<Lottery> = await response.json();

    return body;
  } catch (error) {
    console.error(error);

    throw error;
  }
}
