
class Logout {
    constructor() {
        this.logout = this.logout.bind(this);
    }

    async logout(req, res) {
        try {
            res.clearCookie('_frtoken');
            res.status(200).json({
                error: false,
                message: 'logged out'
            });

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}


export default new Logout();