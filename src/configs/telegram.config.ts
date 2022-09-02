import { ConfigService } from '@nestjs/config';

export const getTelegramConfig = (configService: ConfigService) => {
  const token = configService.get('TELEGRAM_TOKEN');
  if (!token) {
    throw new Error('Telegram token not found');
  }

  return {
    chatId: configService.get('CHAT_ID') ?? '',
    token,
  };
};
