import { TELEGRAM_MODULE_OPTIONS } from './telegram.constatns';
import { ITelegramOptions } from './telegram.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';

@Injectable()
export class TelegramService {
  bot: Telegraf;
  options: ITelegramOptions;
  constructor(@Inject(TELEGRAM_MODULE_OPTIONS) options: ITelegramOptions) {
    this.bot = new Telegraf(options.token);
    this.options = options;
  }

  async sendMessage(msg: string, chatId: string = this.options.chatId) {
    await this.bot.telegram.sendMessage(chatId, msg);
  }
}
