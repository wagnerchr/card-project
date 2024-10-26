/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
          {
              protocol: 'https',
              hostname: '**', // Permite qualquer domínio
              port: '', // Pode deixar vazio para qualquer porta
          },
      ],
  },
}

module.exports = nextConfig;
