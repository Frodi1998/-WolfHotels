import { Command } from 'commander-core';
import { BotContext } from '../../../common/telegram';
import { Utils } from '../utils';

export abstract class BaseCommand extends Command {
  public abstract hasAccess(context?: BotContext): boolean;
  protected readonly utils = Utils.instance;

  public get display() {
    const description = this.description ? ` - ${this.description}` : '';
    return this.name + description;
  }

  public addCommands(commands: Command | Command[]) {
    if (!Array.isArray(commands)) {
      commands = [commands];
    }

    for (const command of commands) {
      this.commands.push(command);
    }

    return this;
  }
}
