/**
 * Vercel Speed Insights Integration
 * 
 * Note: Speed Insights is designed for frontend/client-side performance monitoring.
 * This utility provides integration for API responses that serve HTML content.
 * For pure JSON APIs, Speed Insights is not applicable.
 * 
 * Usage:
 * - Use injectSpeedInsights() function to add the Speed Insights script to HTML responses
 * - Use speedInsightsMiddleware() to automatically inject into HTML responses
 */

/**
 * Injects the Vercel Speed Insights script into an HTML string.
 * The script is inserted before the closing </body> tag.
 * 
 * @param html - The HTML content to inject the script into
 * @returns The HTML with Speed Insights script injected
 */
export function injectSpeedInsights(html: string): string {
  const script = `
  <script type="module">
    import { injectSpeedInsights } from 'https://esm.sh/@vercel/speed-insights';
    injectSpeedInsights();
  </script>`;

  // Check if there's a closing body tag
  if (html.includes('</body>')) {
    return html.replace('</body>', `${script}\n</body>`);
  }
  
  // If no body tag, append at the end
  return html + script;
}

/**
 * Express middleware that automatically injects Speed Insights into HTML responses.
 * 
 * Usage:
 * ```typescript
 * import { speedInsightsMiddleware } from './lib/speed-insights';
 * app.use(speedInsightsMiddleware());
 * ```
 */
export function speedInsightsMiddleware() {
  return (req: any, res: any, next: any) => {
    const originalSend = res.send;
    
    res.send = function (data: any) {
      // Only inject if content-type is HTML
      const contentType = res.get('Content-Type') || '';
      
      if (contentType.includes('text/html') && typeof data === 'string') {
        data = injectSpeedInsights(data);
      }
      
      return originalSend.call(this, data);
    };
    
    next();
  };
}
