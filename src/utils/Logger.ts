class Logger {
  info(message: string): void {
    console.log('[Info]' + message);
  }

  debug(message: string): void {
    console.log('[Debug]' + message);
  }
}

const logger = new Logger();

export default logger;
