export class MessageStorage {
  private messages: string[] = [];
  private maxSize: number;

  constructor(maxSize: number) {
    this.maxSize = maxSize;
  }

  addMessage(message: string): void {
    if (this.messages.length >= this.maxSize) {
      this.messages.shift();
    }
    this.messages.push(message);
  }

  getMessages(): string[] {
    return this.messages.slice().reverse();
  }
}
