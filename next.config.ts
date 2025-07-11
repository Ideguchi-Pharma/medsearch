import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
};

// true: TypeScriptの型エラーを無視してビルドを続行
// false: TypeScriptの型エラーがあるとビルドが失敗

export default nextConfig;
