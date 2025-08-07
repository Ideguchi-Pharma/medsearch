import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // TypeScriptのエラーがあってもビルドを強制する
    ignoreBuildErrors: true,
  },
  eslint: {
    // ESLintのエラーをビルド時に無視する
    ignoreDuringBuilds: true,
  },
  // Spanner関連ライブラリをNext.jsの最適化（バンドル）対象から除外する設定
  // これにより、Spannerライブラリが内部ファイルを見失う問題を根本的に解決します
  serverExternalPackages: ["@google-cloud/spanner", "@grpc/grpc-js"],
};

export default nextConfig;