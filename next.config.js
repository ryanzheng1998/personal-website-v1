module.exports = {
    async rewrites() {
        return [
            {
                source: '/english/:path',
                destination: '/:path'
            }
        ];
    }
}