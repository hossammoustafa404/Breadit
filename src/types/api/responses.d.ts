// User Response
interface UserResponse {
  _id: string;
  name: string;
  email: string;
  username: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  _v: number;
}

// // Subscription response
// interface SubscriptionResponse {
//   _id: string;
//   user: string;
//   community: string;
//   createdAt: Date;
//   updatedAt: Date;
//   _v: number;
// }

// Community response
interface CommunityResponse {
  _id: string;
  title: string;
  superAdmin: UserModel;
  subscriptions: {
    _id: string;
    user: UserModel;
    createdAt: Date;
    updatedAt: Date;
    _v: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
  _v: number;
}

// Post Response
interface PostResponse {
  _id: string;
  title: string;
  content: any;
  author: UserResponse;
  community: CommunityResponse;
  createdAt: Date;
  updatedAt: Date;
  _v: number;
}
