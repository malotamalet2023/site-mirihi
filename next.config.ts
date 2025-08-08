import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  experimental: {
    // S'assurer que Next peut localiser la config next-intl à la racine
  }
};

export default withNextIntl(nextConfig);
