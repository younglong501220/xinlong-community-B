export interface ProductReview {
  id: string;
  productId: string;
  authorName: string;
  authorCity?: string;
  rating: number; // 1 - 5
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  likes: number;
  tags?: string[];
}

export type MemberTier = '新三漁之友' | '銀鱗會員' | '金斑尊榮VIP';

export interface PointTransaction {
  id: string;
  date: string;
  title: string;
  pointsChange: number;
  type: 'earn' | 'redeem';
}

export interface MemberProfile {
  phone: string;
  name: string;
  points: number;
  tier: MemberTier;
  joinDate: string;
  lifetimeSpent: number;
  pointHistory: PointTransaction[];
  redeemedRewards: string[];
}

export interface LoyaltyReward {
  id: string;
  title: string;
  pointsCost: number;
  category: 'coupon' | 'gift' | 'experience';
  img: string;
  desc: string;
  stock: number;
}
