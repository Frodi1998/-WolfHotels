// import { Command, ICommand, IContext } from 'commander-core';
import { BotContext } from '../../../common/telegram.js';
import { Utils } from '../utils.js';

import { BaseCommand } from './base.js';
// import { Categories } from './categories.js';

export class CustomCommand extends BaseCommand {

  public static init(alias: RegExp | string | string[], args?: RegExp) {
    const pattern = this.createPattern(alias, args);

    const command = new this({
      pattern,
      async handler(context: BotContext, utils: Utils) {
        await this.run(context, utils);
      },
    });

    return command;
  }

  // protected async filterCommands(inputCommands: Command[], filter?: Categories) {
  //   const currentCommands = inputCommands.filter(command => {
  //     const isCustomCommand = command instanceof CustomCommand;
  //     if (filter) {
  //       return isCustomCommand && command.categories.includes(filter);
  //     }

  //     return isCustomCommand;
  //   });

  //   if (!currentCommands.length) {
  //     throw new Error('commands not found');
  //   }

  //   return currentCommands;
  // }

  protected async getCommandList(inputCommands: CustomCommand[]) {
    // const commandList = inputCommands.map(command => command.display);
    const commandList: string[] = [];

    for await (const command of inputCommands) {
      if (command.commands.length > 0) {
        for await (const subCommand of command.commands) {
          if (subCommand instanceof CustomCommand && subCommand.name) {
            commandList.push(subCommand.display);
          }
        }
      }

      if (command.name) {
        commandList.push(command.display);
      }
    }

    return commandList.join('\n');
  }

  private static createPattern(inputAlias: RegExp | string | string[], args?: RegExp) {
    if (inputAlias instanceof RegExp) {
      return this.mergePattern(inputAlias, args);
    }

    const pattern = Array.isArray(inputAlias) ? inputAlias.join('|') : inputAlias;
    const alias = new RegExp(`^(?:${pattern})`, 'i');

    return this.mergePattern(alias, args);
  }

  private static mergePattern(alias: RegExp, args?: RegExp) {
    if (args) {
      return new RegExp([alias.source, args.source].join(''), 'i');
    }

    return alias;
  }

  public hasAccess(_: BotContext) {
    return true;
  }
}
