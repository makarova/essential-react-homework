export interface Lottery {
  id: string;
  name: string;
  prize: string;
}

export interface CreateLotteryRequest {
  name: string;
  prize: string;
}