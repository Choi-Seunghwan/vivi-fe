class Logger {
  info(...messages): void {
    console.log('[Info]', ...messages);
  }

  debug(...messages): void {
    console.log('[Debug]', ...messages);
  }

  warn(error, ...messages): void {
    console.log('[Warn]', error, ...messages);
  }

  error(error, ...messages): void {
    console.log('[Error]', error, ...messages);
  }
}

const logger = new Logger();

export default logger;
