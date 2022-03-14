export const NODE_ENV = () => process.env.NODE_ENV || 'production';

export const CORS_ORIGINS = () => {
  if (NODE_ENV() === 'production') {
    return 'SOME URL';
  } else {
    return '*';
  }
};
