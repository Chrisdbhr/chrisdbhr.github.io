import { describe, it, expect } from 'vitest';
import { getAssetUrl, baseURL, getHashedColor } from '../utils';

describe('Utility Functions', () => {
  describe('getAssetUrl', () => {
    const assetId = 'abcde12345';
    const defaultWidth = 800;

    it('should return null if id is null', () => {
      expect(getAssetUrl(null)).toBeNull();
    });

    it('should return the default optimized URL with webp and default width', () => {
      const expectedUrl = `${baseURL}/assets/${assetId}?format=webp&width=${defaultWidth}`;
      expect(getAssetUrl(assetId)).toBe(expectedUrl);
    });

    it('should respect custom width', () => {
      const customWidth = 400;
      const expectedUrl = `${baseURL}/assets/${assetId}?format=webp&width=${customWidth}`;
      expect(getAssetUrl(assetId, customWidth)).toBe(expectedUrl);
    });

    it('should include additional options', () => {
      const options = 'height=100&fit=cover';
      const expectedUrl = `${baseURL}/assets/${assetId}?format=webp&width=${defaultWidth}&${options}`;
      expect(getAssetUrl(assetId, defaultWidth, options)).toBe(expectedUrl);
    });

    it('should return original URL if mimeType is image/gif', () => {
      const mimeType = 'image/gif';
      const expectedUrl = `${baseURL}/assets/${assetId}`;
      expect(getAssetUrl(assetId, 1200, '', mimeType)).toBe(expectedUrl);
    });

    it('should optimize non-gif images even if mimeType is provided', () => {
      const mimeType = 'image/jpeg';
      const expectedUrl = `${baseURL}/assets/${assetId}?format=webp&width=${defaultWidth}`;
      expect(getAssetUrl(assetId, defaultWidth, '', mimeType)).toBe(expectedUrl);
    });
  });

  describe('getHashedColor', () => {
    it('should return the default grey color for empty string', () => {
      expect(getHashedColor('')).toBe('hsl(0, 0%, 30%)');
    });

    it('should generate a consistent HSL color for a given string', () => {
      // Tags should always result in the same color for consistency
      const color1 = getHashedColor('Unity');
      const color2 = getHashedColor('Unity');
      const color3 = getHashedColor('C#');

      expect(color1).toBe(color2);
      expect(color1).toMatch(/^hsl\(\d+, 60%, 35%\)$/);
      expect(color1).not.toBe(color3); // Should be different hash
    });

    it('should generate colors within the HSL range (0-359)', () => {
      const color = getHashedColor('VeryLongAndUniqueTagForTestingHashDistribution');
      const hueMatch = color.match(/^hsl\((\d+), 60%, 35%\)$/);
      const hue = parseInt(hueMatch[1], 10);
      expect(hue).toBeGreaterThanOrEqual(0);
      expect(hue).toBeLessThanOrEqual(359);
    });
  });
});