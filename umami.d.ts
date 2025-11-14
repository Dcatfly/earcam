// Type definitions for Umami Analytics
interface Window {
  umami?: {
    track: (eventName: string, eventData?: Record<string, any>) => void;
  };
}
